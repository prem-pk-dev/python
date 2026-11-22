#!/usr/bin/env python3
"""RAM-only Playwright crawler that streams live events to the Cloudflare Worker."""
import argparse
import asyncio
import base64
import ipaddress
import json
import os
import re
import socket
import sys
import time
import gzip
import xml.etree.ElementTree as ET
from urllib.parse import urljoin
from urllib.robotparser import RobotFileParser
from collections import deque
from urllib.parse import urldefrag, urlparse, urlunparse

import httpx
from PIL import Image
from io import BytesIO
from playwright.async_api import async_playwright

MAX_IMAGE_BYTES = 650 * 1024
DEVICES = {
    "Desktop": {"width": 1440, "height": 1000},
    "Tablet": {"width": 820, "height": 1180},
    "Mobile": {"width": 390, "height": 844},
}
DNS_CACHE = {}


MAX_SITEMAP_FILES = 20
MAX_SITEMAP_BYTES = 2 * 1024 * 1024


def parse_sitemap_document(xml_text):
    """Return ('index'|'urlset', locs); reject malformed or unexpected XML."""
    root = ET.fromstring(xml_text)
    kind = root.tag.rsplit("}", 1)[-1].lower()
    if kind not in ("sitemapindex", "urlset"):
        return "unknown", []
    locations = []
    for node in root.iter():
        if node.tag.rsplit("}", 1)[-1].lower() == "loc" and node.text:
            value = node.text.strip()
            if value:
                locations.append(value)
    return ("index" if kind == "sitemapindex" else "urlset"), locations


def same_site_http_url(candidate, root_host):
    try:
        parsed = urlparse(candidate)
        return parsed.scheme in ("http", "https") and parsed.hostname and parsed.hostname.lower() == root_host.lower()
    except Exception:
        return False


async def fetch_bounded_text(client, url, limit=MAX_SITEMAP_BYTES):
    """Fetch a small public discovery document without unbounded response buffering."""
    chunks = []
    size = 0
    async with client.stream("GET", url, timeout=20.0, follow_redirects=True,
                             headers={"User-Agent": "PythonScraperDashboard/1.0 (+public-site-crawler)"} ) as response:
        final_url = str(response.url)
        await validate_public_url(final_url)
        if response.status_code < 200 or response.status_code >= 300:
            return response.status_code, final_url, ""
        async for chunk in response.aiter_bytes():
            size += len(chunk)
            if size > limit:
                raise ValueError(f"Discovery document exceeds {limit // 1024} KB safety limit.")
            chunks.append(chunk)
        raw = b"".join(chunks)
        if final_url.lower().endswith(".gz"):
            with gzip.GzipFile(fileobj=BytesIO(raw)) as compressed:
                raw = compressed.read(limit + 1)
            if len(raw) > limit:
                raise ValueError(f"Decompressed sitemap exceeds {limit // 1024} KB safety limit.")
        return response.status_code, final_url, raw.decode("utf-8", errors="replace")


async def discover_sitemap_urls(client, start_url, limit):
    """Discover same-host sitemap URLs; bounded by file count, bytes and requested page cap."""
    root = urlparse(start_url)
    origin = f"{root.scheme}://{root.netloc}"
    robots_url = urljoin(origin, "/robots.txt")
    robots_status = None
    robots_parser = RobotFileParser()
    sitemap_queue = deque()
    try:
        robots_status, robots_final, robots_text = await fetch_bounded_text(client, robots_url, 256 * 1024)
        if 200 <= robots_status < 300:
            robots_parser.set_url(robots_final)
            robots_parser.parse(robots_text.splitlines())
            for line in robots_text.splitlines():
                if line.strip().lower().startswith("sitemap:"):
                    sitemap_queue.append(line.split(":", 1)[1].strip())
    except Exception as exc:
        print(f"[discovery-warning] robots.txt unavailable: {str(exc)[:180]}", flush=True)
    if not sitemap_queue:
        sitemap_queue.append(urljoin(origin, "/sitemap.xml"))

    found = []
    found_set = set()
    visited_sitemaps = set()
    sitemap_count = 0
    while sitemap_queue and sitemap_count < MAX_SITEMAP_FILES and len(found) < limit:
        sitemap_url = sitemap_queue.popleft()
        if sitemap_url in visited_sitemaps:
            continue
        visited_sitemaps.add(sitemap_url)
        if not same_site_http_url(sitemap_url, root.hostname):
            continue
        try:
            await validate_public_url(sitemap_url)
            status, final_url, xml_text = await fetch_bounded_text(client, sitemap_url)
            sitemap_count += 1
            if status < 200 or status >= 300:
                continue
            kind, locations = parse_sitemap_document(xml_text)
            if kind == "index":
                for location in locations:
                    child = urljoin(final_url, location)
                    if same_site_http_url(child, root.hostname) and child not in visited_sitemaps and len(sitemap_queue) < MAX_SITEMAP_FILES:
                        sitemap_queue.append(child)
            elif kind == "urlset":
                for location in locations:
                    candidate = normalize_url(urljoin(final_url, location))
                    if not same_site_http_url(candidate, root.hostname) or candidate in found_set:
                        continue
                    if not robots_parser.can_fetch("*", candidate) and robots_status and 200 <= robots_status < 300:
                        continue
                    found_set.add(candidate)
                    found.append(candidate)
                    if len(found) >= limit:
                        break
        except Exception as exc:
            print(f"[discovery-warning] sitemap skipped {sitemap_url}: {str(exc)[:180]}", flush=True)
    return found, {"robots_status": robots_status, "sitemaps_read": sitemap_count,
                   "sitemap_limit": MAX_SITEMAP_FILES, "url_limit": limit,
                   "robots_url": robots_url}, robots_parser


def normalize_url(value):
    parsed = urlparse(urldefrag(value)[0])
    return urlunparse((parsed.scheme.lower(), parsed.netloc.lower(), parsed.path or "/", parsed.params, parsed.query, ""))


def is_public_ip(value):
    try:
        address = ipaddress.ip_address(value.split("%", 1)[0])
        return address.is_global and not (
            address.is_private or address.is_loopback or address.is_link_local
            or address.is_reserved or address.is_multicast or address.is_unspecified
        )
    except ValueError:
        return False


async def validate_public_url(value):
    parsed = urlparse(value)
    if parsed.scheme not in ("http", "https") or not parsed.hostname or parsed.username or parsed.password:
        raise ValueError("Only public HTTP/HTTPS URLs without credentials are accepted.")
    host = parsed.hostname.rstrip(".").lower()
    if host in ("localhost", "metadata.google.internal") or host.endswith((".localhost", ".local", ".internal", ".lan", ".home", ".test")):
        raise ValueError("Local and internal hostnames are blocked.")
    try:
        ipaddress.ip_address(host)
        raise ValueError("IP-literal URLs are blocked; use a public hostname.")
    except ValueError as exc:
        if "IP-literal" in str(exc):
            raise
    if "." not in host:
        raise ValueError("A fully qualified public hostname is required.")
    if host not in DNS_CACHE or DNS_CACHE[host] < time.monotonic():
        loop = asyncio.get_running_loop()
        try:
            records = await loop.getaddrinfo(host, parsed.port or (443 if parsed.scheme == "https" else 80), type=socket.SOCK_STREAM)
        except socket.gaierror as exc:
            raise ValueError(f"DNS lookup failed for {host}: {exc}") from exc
        addresses = {record[4][0] for record in records}
        if not addresses or any(not is_public_ip(address) for address in addresses):
            raise ValueError(f"Hostname {host} resolves to a non-public IP address.")
        DNS_CACHE[host] = time.monotonic() + 10
    return value


async def emit(client, crawl_id, event_type, **payload):
    message = {"crawl_id": crawl_id, "type": event_type, "timestamp": int(time.time() * 1000), **payload}
    try:
        response = await client.post(
            f"{os.environ['WORKER_BASE_URL'].rstrip('/')}/api/crawl/{crawl_id}/ingest",
            json=message,
            headers={"Authorization": f"Bearer {os.environ['INGEST_SECRET']}"},
            timeout=20.0,
        )
        response.raise_for_status()
    except Exception as exc:
        print(f"[stream-warning] {event_type} delivery failed: {exc}", flush=True)


def compact_image(raw, max_bytes=MAX_IMAGE_BYTES, max_height=5000):
    image = Image.open(BytesIO(raw)).convert("RGB")
    if image.height > max_height:
        width = max(1, round(image.width * max_height / image.height))
        image = image.resize((width, max_height), Image.Resampling.LANCZOS)
    for quality in (62, 55, 48, 42, 36, 30):
        out = BytesIO()
        image.save(out, format="JPEG", quality=quality, optimize=True, progressive=True)
        data = out.getvalue()
        if len(data) <= max_bytes:
            return data
    scale = 0.8
    while scale > 0.25:
        image = image.resize((max(1, int(image.width * scale)), max(1, int(image.height * scale))), Image.Resampling.LANCZOS)
        out = BytesIO()
        image.save(out, format="JPEG", quality=30, optimize=True, progressive=True)
        data = out.getvalue()
        if len(data) <= max_bytes:
            return data
        scale *= 0.8
    raise ValueError("Screenshot could not be reduced below the live-frame size limit.")


async def send_image(client, crawl_id, browser_page, event_type, **metadata):
    try:
        raw = await browser_page.screenshot(type="jpeg", quality=55, full_page=False, animations="disabled", timeout=5000)
        data = compact_image(raw)
        await emit(client, crawl_id, event_type, image=base64.b64encode(data).decode("ascii"), mime="image/jpeg", **metadata)
    except Exception as exc:
        await emit(client, crawl_id, "log", level="warning", message=f"Frame skipped: {str(exc)[:220]}")


async def live_preview(client, crawl_id, page, details):
    while True:
        await asyncio.sleep(1.5)
        if page.is_closed():
            return
        await send_image(client, crawl_id, page, "frame", **details)


async def request_guard(route):
    try:
        await validate_public_url(route.request.url)
        await route.continue_()
    except Exception:
        await route.abort("blockedbyclient")


async def capture_screenshot(client, crawl_id, page, url, page_number, device, mode, ui_status):
    try:
        raw = await page.screenshot(
            type="jpeg", quality=58, full_page=(mode == "full_page"),
            animations="disabled", timeout=30000,
        )
        image = compact_image(raw, max_height=5000 if mode == "full_page" else 2400)
        await emit(
            client, crawl_id, "screenshot",
            url=url, page=page_number, device=device, mode=mode,
            mime="image/jpeg", filename=f"page{page_number}-{device.lower()}-{mode}.jpg",
            image=base64.b64encode(image).decode("ascii"), ui_status=ui_status,
        )
    except Exception as exc:
        await emit(client, crawl_id, "log", level="error", message=f"{device} {mode} screenshot skipped: {str(exc)[:240]}")


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--crawl-id", required=True)
    parser.add_argument("--url", required=True)
    parser.add_argument("--max-pages", type=int, default=50)
    parser.add_argument("--devices", default="Desktop,Tablet,Mobile")
    parser.add_argument("--screenshot-mode", choices=("viewport", "full_page", "both"), default="both")
    args = parser.parse_args()

    crawl_id = args.crawl_id
    start_url = normalize_url(args.url)
    limit = max(1, min(args.max_pages, 100))
    selected = [name for name in args.devices.split(",") if name in DEVICES]
    if not selected:
        raise SystemExit("At least one valid device is required.")
    await validate_public_url(start_url)

    async with httpx.AsyncClient() as client:
        await emit(client, crawl_id, "booting", message="Launching Chromium runner", max_pages=limit, devices=selected)
        records = []
        queue = deque([start_url])
        seen = set()
        async with async_playwright() as playwright:
            browser = await playwright.chromium.launch(headless=True)
            try:
                while queue and len(seen) < limit:
                    url = queue.popleft()
                    if url in seen:
                        continue
                    await validate_public_url(url)
                    seen.add(url)
                    page_number = len(records) + 1
                    page = await browser.new_page(viewport=DEVICES["Desktop"])
                    await page.route("**/*", request_guard)
                    console_errors = []
                    page.on("console", lambda message: console_errors.append(message.text[:240]) if message.type == "error" and len(console_errors) < 40 else None)
                    page.on("pageerror", lambda error: console_errors.append(str(error)[:240]) if len(console_errors) < 40 else None)
                    started = time.perf_counter()
                    response = None
                    preview_task = None
                    await emit(client, crawl_id, "opening_url", url=url, page=page_number, total=limit, device=selected[0], message=f"Navigating to {url}")
                    try:
                        preview_task = asyncio.create_task(live_preview(client, crawl_id, page, {"url": url, "page": page_number, "device": selected[0]}))
                        response = await page.goto(url, wait_until="domcontentloaded", timeout=45000)
                        await validate_public_url(page.url)
                        try:
                            await page.wait_for_load_state("networkidle", timeout=7000)
                        except Exception:
                            pass
                        title = await page.title()
                        discovered = await page.evaluate("""() => ({
                          links: [...document.querySelectorAll('a[href]')].map(a => a.href),
                          brokenImages: [...document.images].filter(i => i.complete && i.naturalWidth === 0).length,
                          horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
                          loadTime: Math.round(performance.now()),
                          documentWidth: document.documentElement.scrollWidth,
                          viewportWidth: innerWidth
                        })""")
                        load_time = round((time.perf_counter() - started) * 1000)
                        status = response.status if response else None
                        checks = {
                            "http_status": status,
                            "http_ok": bool(status and 200 <= status < 400),
                            "load_time_ms": load_time,
                            "console_errors": console_errors[:40],
                            "console_error_count": len(console_errors),
                            "broken_images": discovered["brokenImages"],
                            "horizontal_overflow": discovered["horizontalOverflow"],
                            "viewport_width": discovered["viewportWidth"],
                            "document_width": discovered["documentWidth"],
                        }
                        await emit(client, crawl_id, "capturing", url=url, page=page_number, total=limit, device=selected[0], message=f"Capturing {url}")
                        checks["devices"] = {}
                        for device in selected:
                            await page.set_viewport_size(DEVICES[device])
                            await page.wait_for_timeout(250)
                            device_metrics = await page.evaluate("""() => ({
                              broken_images: [...document.images].filter(i => i.complete && i.naturalWidth === 0).length,
                              horizontal_overflow: document.documentElement.scrollWidth > innerWidth,
                              viewport_width: innerWidth,
                              document_width: document.documentElement.scrollWidth
                            })""")
                            checks["devices"][device] = device_metrics
                            for mode in (("viewport", "full_page") if args.screenshot_mode == "both" else (args.screenshot_mode,)):
                                await emit(client, crawl_id, "capturing", url=url, page=page_number, total=limit, device=device, mode=mode, message=f"Capturing {device} {mode}")
                                ui_status = "pass" if checks["http_ok"] and not device_metrics["horizontal_overflow"] and not device_metrics["broken_images"] and not checks["console_error_count"] else "warning"
                                await capture_screenshot(client, crawl_id, page, url, page_number, device, mode, ui_status)
                        checks["horizontal_overflow"] = any(item["horizontal_overflow"] for item in checks["devices"].values())
                        checks["broken_images"] = max((item["broken_images"] for item in checks["devices"].values()), default=0)
                        await emit(client, crawl_id, "ui_checks", url=url, page=page_number, checks=checks)
                        for candidate in discovered["links"]:
                            try:
                                candidate = normalize_url(candidate)
                                parsed = urlparse(candidate)
                                root = urlparse(start_url)
                                if same_site_http_url(candidate, root.hostname) and candidate not in seen and candidate not in queue and len(discovered_urls) < limit and not re.search(r"\.(pdf|zip|png|jpe?g|gif|svg|webp|mp4|mp3|css|js|xml|json)(\?|$)", candidate, re.I):
                                    if not robots_parser.can_fetch("*", candidate):
                                        continue
                                    await validate_public_url(candidate)
                                    queue.append(candidate)
                                    if candidate not in discovered_set:
                                        discovered_set.add(candidate)
                                        discovered_urls.append(candidate)
                            except Exception:
                                continue
                        await emit(client, crawl_id, "url_inventory", urls=discovered_urls, total=len(discovered_urls),
                                   truncated=len(discovered_urls) >= limit, sources=["robots.txt", "sitemap.xml", "internal links"],
                                   discovery=discovery_meta, message=f"Discovered {len(discovered_urls)} URLs so far")
                        records.append({"url": url, "title": title, "status": status, "checks": checks})
                        await emit(client, crawl_id, "page_done", url=url, page=page_number, total=limit, device=selected[-1], status=status, checks=checks, message=f"Completed page {page_number}")
                    except Exception as exc:
                        await emit(client, crawl_id, "log", level="error", message=f"Page failed {url}: {str(exc)[:350]}")
                        await emit(client, crawl_id, "page_done", url=url, page=page_number, total=limit, status=None, error=str(exc)[:350])
                        records.append({"url": url, "error": str(exc)[:350]})
                    finally:
                        if preview_task:
                            preview_task.cancel()
                            try:
                                await preview_task
                            except asyncio.CancelledError:
                                pass
                        await page.close()
                await emit(client, crawl_id, "completed", pages_completed=len(records), pages_discovered=len(seen), message=f"Completed · {len(records)} pages")
            finally:
                await browser.close()


async def report_failure(exc):
    crawl_id = os.environ.get("CRAWL_ID", "unknown")
    try:
        async with httpx.AsyncClient() as client:
            await emit(client, crawl_id, "failed", message=str(exc)[:500])
    except Exception:
        pass


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except Exception as exc:
        asyncio.run(report_failure(exc))
        print(f"Crawl failed: {exc}", file=sys.stderr)
        raise
