function readBoundedText(response, limit) {
  return (async () => {
    const reader = response.body?.getReader();
    if (!reader) return "";
    const chunks = [];
    let size = 0;
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      size += part.value.byteLength;
      if (size > limit) {
        try { await reader.cancel(); } catch {}
        throw new Error("Target response exceeds the " + Math.round(limit / 1000) + " KB safety limit.");
      }
      chunks.push(part.value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return new TextDecoder().decode(bytes);
  })();
}

export async function fetchPublicText(raw, { publicUrl, publicCrawlUrl, fetchImpl = fetch, limit = 1000000 }) {
  let current = publicUrl(raw);
  const redirects = [];
  for (let i = 0; i < 4; i++) {
    await publicCrawlUrl(current.href);
    const response = await fetchImpl(current, {
      redirect: "manual",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; PythonScraperDashboard/1.0)",
        "Accept": "text/html,application/xhtml+xml,application/xml,text/plain,*/*"
      }
    });
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get("Location");
      if (!location) throw new Error("Website redirect had no Location header.");
      redirects.push({ status: response.status, from: current.href, to: new URL(location, current).href });
      current = publicUrl(new URL(location, current).href);
      continue;
    }
    return { url: current.href, status: response.status, content_type: response.headers.get("Content-Type") || "", headers: Object.fromEntries(response.headers.entries()), redirects, text: await readBoundedText(response, limit) };
  }
  throw new Error("Too many redirects.");
}

export function detectTechStack(html, headers = {}) {
  const source = String(html || "").toLowerCase();
  const h = Object.fromEntries(Object.entries(headers || {}).map(([k, v]) => [k.toLowerCase(), String(v).toLowerCase()]));
  const found = [];
  const add = (name, yes) => { if (yes && !found.includes(name)) found.push(name); };
  add("Next.js", /__next|_next\/static|next-router-state-tree/.test(source));
  add("React", /react\.dom|reactroot|__react|data-reactroot/.test(source));
  add("WordPress", /wp-content|wp-includes|wp-json/.test(source) || /x-powered-by.*wordpress/.test(h.server || ""));
  add("Tailwind CSS", /tailwindcss|--tw-[a-z-]+/.test(source));
  add("Shopify", /cdn\.shopify\.com|shopify-section|\.myshopify\.com/.test(source));
  add("Vite", /@vite\/client|vite\/modulepreload/.test(source));
  add("Cloudflare", /cf-ray|cloudflare/.test(h.server || "") || /__cf_bm|cf_clearance/.test(source));
  add("Vue", /__vue__|data-v-[a-f0-9]+|vue\.runtime/.test(source));
  add("Angular", /ng-version=|ng-app=/.test(source));
  return found;
}
export function auditSeo(html, url, status, { decode, meta, attrValue, findTagMatches, cleanText, headers = {} }) {
  const title = decode(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "");
  const description = meta(html, "description", "name");
  let canonical = "";
  for (const match of html.matchAll(/<link\b((?:"[^"]*"|'[^']*'|[^'">])*)>/gi)) {
    const tag = match[0];
    if (attrValue(tag, "rel").toLowerCase().split(/\s+/).includes("canonical")) {
      canonical = attrValue(tag, "href");
      break;
    }
  }
  if (canonical) { try { canonical = new URL(canonical, url).href; } catch {} }
  const h1 = findTagMatches(html, "h1").map(match => cleanText(match[3])).filter(Boolean);
  const images = [...html.matchAll(/<img\b((?:"[^"]*"|'[^']*'|[^'">])*)>/gi)].map(match => match[0]);
  const missingAlt = images.filter(tag => !attrValue(tag, "alt").trim()).length;
  const viewport = !!meta(html, "viewport", "name");
  const ogTitle = !!meta(html, "og:title");
  const ogDescription = !!meta(html, "og:description");
  const ogImage = !!meta(html, "og:image");
  const schema = /<script\b[^>]*type\s*=\s*["']application\/ld\+json["']/i.test(html);
  const robots = meta(html, "robots", "name");
  const checks = [
    { label: "Page title", status: title.length >= 30 && title.length <= 60 ? "pass" : title ? "warn" : "fail", detail: title ? title.length + " characters (recommended 30–60)" : "Missing title" },
    { label: "Meta description", status: description.length >= 70 && description.length <= 160 ? "pass" : description ? "warn" : "fail", detail: description ? description.length + " characters (recommended 70–160)" : "Missing description" },
    { label: "H1 heading", status: h1.length === 1 ? "pass" : h1.length ? "warn" : "fail", detail: h1.length + " H1 elements" },
    { label: "Canonical URL", status: canonical ? "pass" : "warn", detail: canonical || "No canonical link found" },
    { label: "Viewport meta", status: viewport ? "pass" : "warn", detail: viewport ? "Present" : "Missing responsive viewport tag" },
    { label: "Open Graph", status: ogTitle && ogDescription && ogImage ? "pass" : "warn", detail: [ogTitle ? "title" : "no title", ogDescription ? "description" : "no description", ogImage ? "image" : "no image"].join(" · ") },
    { label: "Image alt text", status: missingAlt === 0 ? "pass" : "warn", detail: missingAlt + " of " + images.length + " images missing alt" },
    { label: "Structured data", status: schema ? "pass" : "warn", detail: schema ? "JSON-LD detected" : "No JSON-LD script detected" }
  ];
  const score = Math.round(checks.reduce((sum, check) => sum + (check.status === "pass" ? 12.5 : check.status === "warn" ? 7 : 0), 0));
  return { url, status_code: status, score, title, description, canonical, h1, images_count: images.length, images_missing_alt: missingAlt, robots_meta: robots, tech_stack: detectTechStack(html, headers), checks };
}

export function parseSitemapLocs(xml, decode) {
  return [...xml.matchAll(/<loc\b[^>]*>([\s\S]*?)<\/loc>/gi)]
    .map(match => decode(match[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim()))
    .filter(Boolean);
}

export async function inspectSiteDiscovery(raw, { publicCrawlUrl, fetchPublicText, decode }) {
  const target = await publicCrawlUrl(raw);
  const origin = target.origin;
  const robots = await fetchPublicText(new URL("/robots.txt", origin).href, 250000);
  const rules = [];
  const sitemapRefs = [];
  let agent = "*";
  for (const line of robots.text.split(/\r?\n/)) {
    const clean = line.replace(/#.*$/, "").trim();
    if (!clean) continue;
    const match = clean.match(/^(user-agent|allow|disallow|sitemap)\s*:\s*(.*)$/i);
    if (!match) continue;
    const key = match[1].toLowerCase();
    const value = match[2].trim();
    if (key === "user-agent") agent = value;
    else if (key === "sitemap") { try { sitemapRefs.push(new URL(value, origin).href); } catch {} }
    else rules.push({ agent, rule: key.toUpperCase() + ": " + (value || "(empty)") });
  }
  if (!sitemapRefs.length) sitemapRefs.push(new URL("/sitemap.xml", origin).href);
  const sitemaps = [];
  const urls = [];
  const visited = new Set();
  const queue = sitemapRefs.slice(0, 3);
  while (queue.length && sitemaps.length < 4 && urls.length < 100) {
    const sitemapUrl = queue.shift();
    if (visited.has(sitemapUrl)) continue;
    visited.add(sitemapUrl);
    let parsed;
    try {
      const sitemap = new URL(sitemapUrl);
      if (sitemap.hostname !== target.hostname) continue;
      parsed = await fetchPublicText(sitemap.href, 1000000);
    } catch { continue; }
    sitemaps.push({ url: parsed.url, status: parsed.status });
    if (parsed.status < 200 || parsed.status >= 300) continue;
    const locations = parseSitemapLocs(parsed.text, decode);
    if (/<sitemapindex\b/i.test(parsed.text)) {
      for (const location of locations) {
        try {
          const child = new URL(location);
          if (child.hostname === target.hostname && !visited.has(child.href) && queue.length < 3) queue.push(child.href);
        } catch {}
      }
    } else {
      for (const location of locations) {
        try {
          const page = new URL(location);
          if (["http:", "https:"].includes(page.protocol) && page.hostname === target.hostname && !urls.includes(page.href)) {
            urls.push(page.href);
            if (urls.length >= 100) break;
          }
        } catch {}
      }
    }
  }
  return { site: origin, robots_url: robots.url, robots_status: robots.status, robots_rules: rules, sitemaps, urls, limits: { max_sitemap_files: 4, max_urls: 100 } };
}
