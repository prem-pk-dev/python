"""Streamlit control panel for scheduled and on-demand website scraping."""
from __future__ import annotations

import io
import ipaddress
import json
import socket
import zipfile
from datetime import datetime
from urllib.parse import urlparse
from zoneinfo import ZoneInfo

import gspread
import requests
import streamlit as st
from bs4 import BeautifulSoup

REPO_DEFAULT = "prem-pk-dev/python"
WORKFLOW_FILE = "scraper.yml"
API_ROOT = "https://api.github.com"
IST = ZoneInfo("Asia/Kolkata")
SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
USER_AGENT = "Mozilla/5.0 (compatible; PythonScraperDashboard/1.0; +https://github.com/prem-pk-dev/python)"


st.set_page_config(page_title="Python Scraper Control Panel", page_icon="🕷️", layout="wide")


def config():
    required = ["GITHUB_TOKEN", "GOOGLE_CREDENTIALS", "GOOGLE_SHEET_ID"]
    missing = [key for key in required if not st.secrets.get(key)]
    if missing:
        st.error("Streamlit Secrets में ये values configure करें: " + ", ".join(missing))
        st.info("Deployment guide के लिए repository का STREAMLIT_DASHBOARD.md देखें।")
        st.stop()
    return {
        "token": st.secrets["GITHUB_TOKEN"],
        "repo": st.secrets.get("GITHUB_REPOSITORY", REPO_DEFAULT),
        "credentials": json.loads(st.secrets["GOOGLE_CREDENTIALS"]),
        "sheet_id": st.secrets["GOOGLE_SHEET_ID"],
        "worksheet": st.secrets.get("GOOGLE_WORKSHEET_NAME", "HN_Stories"),
    }


def validate_public_url(raw_url: str) -> str:
    parsed = urlparse(raw_url.strip())
    if parsed.scheme not in {"http", "https"} or not parsed.hostname:
        raise ValueError("कृपया पूरा http:// या https:// website URL डालें।")
    if parsed.username or parsed.password:
        raise ValueError("Login credentials वाले URLs स्वीकार नहीं हैं।")
    host = parsed.hostname
    try:
        addresses = socket.getaddrinfo(host, None)
    except socket.gaierror as exc:
        raise ValueError("यह website hostname resolve नहीं हो पाया।") from exc
    for address in addresses:
        ip = ipaddress.ip_address(address[4][0])
        if not ip.is_global:
            raise ValueError("Private, local या internal network URLs scrape नहीं किए जा सकते।")
    return raw_url.strip()


def first_text(soup: BeautifulSoup, selectors: list[str]) -> str:
    for selector in selectors:
        node = soup.select_one(selector)
        if node:
            value = node.get("content") if node.name == "meta" else node.get_text(" ", strip=True)
            if value:
                return str(value).strip()
    return ""


def walk_json(value):
    if isinstance(value, dict):
        yield value
        for child in value.values():
            yield from walk_json(child)
    elif isinstance(value, list):
        for child in value:
            yield from walk_json(child)


def scrape_website(raw_url: str) -> dict:
    url = validate_public_url(raw_url)
    response = requests.get(
        url, headers={"User-Agent": USER_AGENT, "Accept": "text/html,application/xhtml+xml"},
        timeout=(8, 25), allow_redirects=True,
    )
    response.raise_for_status()
    if response.url != url:
        validate_public_url(response.url)
    content_type = response.headers.get("Content-Type", "").lower()
    if "html" not in content_type:
        raise ValueError(f"यह HTML webpage नहीं है (Content-Type: {content_type or 'unknown'}).")
    if len(response.content) > 5_000_000:
        raise ValueError("Page 5 MB से बड़ा है; सुरक्षा के लिए processing रोक दी गई।")

    soup = BeautifulSoup(response.text, "html.parser")
    title = first_text(soup, ["meta[property='og:title']", "meta[name='twitter:title']", "title", "h1"])
    description = first_text(soup, ["meta[name='description']", "meta[property='og:description']", "meta[name='twitter:description']"])
    image = first_text(soup, ["meta[property='og:image']", "meta[name='twitter:image']"])
    canonical_node = soup.select_one("link[rel='canonical']")
    canonical = canonical_node.get("href", "") if canonical_node else response.url
    site_name = first_text(soup, ["meta[property='og:site_name']"])
    published = first_text(soup, ["meta[property='article:published_time']", "meta[name='date']", "meta[name='pubdate']"])
    author = first_text(soup, ["meta[name='author']", "meta[property='article:author']"])

    product = {}
    for script in soup.select("script[type='application/ld+json']"):
        try:
            data = json.loads(script.string or script.get_text())
        except (json.JSONDecodeError, TypeError):
            continue
        for item in walk_json(data):
            types = item.get("@type", [])
            if isinstance(types, str):
                types = [types]
            if "Product" in types:
                product = item
                break
        if product:
            break

    product_name = product.get("name", "") if product else ""
    product_description = product.get("description", "") if product else ""
    product_image = product.get("image", "") if product else ""
    if isinstance(product_image, list):
        product_image = product_image[0] if product_image else ""
    if isinstance(product_image, dict):
        product_image = product_image.get("url", "")
    offers = product.get("offers", {}) if product else {}
    if isinstance(offers, list):
        offers = offers[0] if offers else {}
    if not isinstance(offers, dict):
        offers = {}
    price = offers.get("price", "")
    currency = offers.get("priceCurrency", "")
    availability = offers.get("availability", "")
    if isinstance(availability, str):
        availability = availability.rsplit("/", 1)[-1]

    paragraphs = []
    article = soup.select_one("article") or soup.body or soup
    for node in article.select("h1, h2, h3, p"):
        text = node.get_text(" ", strip=True)
        if text and text not in paragraphs and len(text) > 35:
            paragraphs.append(text)
        if len(paragraphs) >= 12:
            break

    return {
        "url": response.url, "title": title or product_name or "Untitled page",
        "description": description or product_description,
        "image": image or str(product_image or ""),
        "site_name": site_name, "canonical": canonical,
        "published": published, "author": author,
        "product_name": product_name, "price": str(price) if price != "" else "",
        "currency": currency, "availability": availability,
        "paragraphs": paragraphs, "status_code": response.status_code,
    }


def github_request(method: str, path: str, cfg: dict, **kwargs):
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {cfg['token']}",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    response = requests.request(
        method, f"{API_ROOT}/repos/{cfg['repo']}/{path}",
        headers=headers, timeout=25, **kwargs
    )
    response.raise_for_status()
    return response


def dispatch_workflow(cfg: dict):
    response = github_request(
        "POST", f"actions/workflows/{WORKFLOW_FILE}/dispatches", cfg,
        json={"ref": "main"},
    )
    return response.status_code == 204


def get_recent_runs(cfg: dict):
    response = github_request(
        "GET", "actions/workflows/scraper.yml/runs", cfg,
        params={"per_page": 8},
    )
    return response.json().get("workflow_runs", [])


def get_sheet_rows(cfg: dict):
    client = gspread.service_account_from_dict(cfg["credentials"], scopes=SCOPES)
    book = client.open_by_key(cfg["sheet_id"])
    try:
        worksheet = book.worksheet(cfg["worksheet"])
    except gspread.WorksheetNotFound:
        return []
    values = worksheet.get_all_values()
    if len(values) < 2:
        return []
    headers = values[0]
    return [dict(zip(headers, row)) for row in values[1:] if any(row)]


def local_time(value: str) -> str:
    if not value:
        return "—"
    dt = datetime.fromisoformat(value.replace("Z", "+00:00"))
    return dt.astimezone(IST).strftime("%d %b %Y, %I:%M:%S %p IST")


def get_run_log(cfg: dict, run_id: int) -> str:
    response = github_request("GET", f"actions/runs/{run_id}/logs", cfg)
    with zipfile.ZipFile(io.BytesIO(response.content)) as archive:
        parts = []
        for name in archive.namelist():
            if name.lower().endswith(".txt"):
                content = archive.read(name).decode("utf-8", errors="replace")
                parts.append(f"===== {name} =====\n{content}")
        return "\n\n".join(parts)[-18000:] or "इस run के लिए text logs उपलब्ध नहीं हैं।"


cfg = config()
st.title("🕷️ Python Scraper Control Panel")
st.caption("Website URL scraper · Daily Hacker News workflow · Google Sheets")

st.subheader("Scrape Any Public Website")
website_url = st.text_input(
    "Website या product URL",
    placeholder="https://example.com/product",
    help="Public webpage URL डालें। Product का नाम, कीमत और image तभी मिलेंगे जब page उन्हें public metadata/structured data में देता हो।",
)
if st.button("🔎 Scrape Website", type="primary", use_container_width=False):
    try:
        with st.spinner("Website fetch और parse हो रही है..."):
            st.session_state["website_result"] = scrape_website(website_url)
            st.session_state["website_error"] = ""
    except Exception as exc:
        st.session_state["website_result"] = None
        st.session_state["website_error"] = str(exc)

if st.session_state.get("website_error"):
    st.error(st.session_state["website_error"])
result = st.session_state.get("website_result")
if result:
    st.success(f"Page fetch successful · HTTP {result['status_code']}")
    if result["image"]:
        st.image(result["image"], caption="Page / product image", width=260)
    st.markdown(f"### {result['title']}")
    if result["description"]:
        st.write(result["description"])
    a, b, c = st.columns(3)
    a.metric("Product name", result["product_name"] or "Not detected")
    price_text = f"{result['currency']} {result['price']}".strip() if result["price"] else "Not detected"
    b.metric("Price", price_text)
    c.metric("Availability", result["availability"] or "Not detected")
    st.write("**Website:**", result["site_name"] or result["url"])
    st.write("**Published:**", result["published"] or "—", " · **Author:**", result["author"] or "—")
    st.write("**Canonical URL:**", result["canonical"])
    if result["paragraphs"]:
        with st.expander("Extracted page content", expanded=True):
            for paragraph in result["paragraphs"]:
                st.write(paragraph)
    st.download_button(
        "Download result as JSON",
        data=json.dumps(result, ensure_ascii=False, indent=2),
        file_name="website-scrape-result.json",
        mime="application/json",
    )
    st.caption("यह one-time URL scrape है। इसे Google Sheet में अपने-आप save नहीं किया जाता।")

st.divider()
st.subheader("Daily Hacker News Scraper")
left, right = st.columns([1, 1])
with left:
    if st.button("▶ Run Hacker News Scraper", use_container_width=True):
        try:
            dispatch_workflow(cfg)
            st.success("Workflow dispatch request भेज दी गई है। नीचे Refresh दबाकर status देखें।")
        except requests.HTTPError as exc:
            detail = exc.response.text[:1000] if exc.response is not None else str(exc)
            st.error(f"Workflow start नहीं हो सका: {detail}")
        except Exception as exc:
            st.error(f"Workflow start नहीं हो सका: {exc}")
with right:
    if st.button("↻ Refresh Workflow Output", use_container_width=True):
        st.rerun()

st.divider()
try:
    runs = get_recent_runs(cfg)
    latest = runs[0] if runs else None
    rows = get_sheet_rows(cfg)
    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Latest workflow", latest.get("status", "—").title() if latest else "—")
    c2.metric("Conclusion", (latest.get("conclusion") or "Running").title() if latest else "—")
    c3.metric("Rows in Google Sheet", len(rows))
    c4.metric("Last workflow run (IST)", local_time(latest.get("created_at")) if latest else "—")

    st.subheader("Workflow Run History")
    if runs:
        history = [{
            "Run ID": run["id"], "Trigger": run.get("event", "—"),
            "Status": run.get("status", "—"), "Result": run.get("conclusion") or "In progress",
            "Started (IST)": local_time(run.get("created_at", "")),
            "Branch": run.get("head_branch", "—"),
        } for run in runs]
        st.dataframe(history, use_container_width=True, hide_index=True)
        choices = {f"#{r['id']} · {r.get('event')} · {r.get('conclusion') or r.get('status')}": r["id"] for r in runs}
        selected = st.selectbox("Execution logs देखें", list(choices))
        if st.button("Show selected run logs"):
            try:
                st.text_area("GitHub Actions output", get_run_log(cfg, choices[selected]), height=360)
            except Exception as exc:
                st.warning(f"Logs अभी उपलब्ध नहीं हैं: {exc}")
    else:
        st.info("अभी कोई workflow run उपलब्ध नहीं है।")

    st.subheader("Latest Hacker News Stories")
    if rows:
        st.caption(f"Google Sheet tab: {cfg['worksheet']} · कुल {len(rows)} records")
        st.dataframe(rows[-100:][::-1], use_container_width=True, hide_index=True)
    else:
        st.info("Google Sheet में अभी कोई story row उपलब्ध नहीं है।")
except requests.HTTPError as exc:
    detail = exc.response.text[:1000] if exc.response is not None else str(exc)
    st.error(f"GitHub API error: {detail}")
except Exception as exc:
    st.error(f"Dashboard data load नहीं हुआ: {exc}")

st.caption("Website URL scraper और Hacker News scheduled workflow अलग-अलग चलते हैं। Websites की terms और robots policy का सम्मान करें; login, paywall या anti-bot restrictions bypass नहीं किए जाते।")
