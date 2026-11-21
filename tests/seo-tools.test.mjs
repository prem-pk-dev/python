import test from "node:test";
import assert from "node:assert/strict";
import { auditSeo, fetchPublicText, inspectSiteDiscovery, parseSitemapLocs } from "../cloudflare/seo-tools.js";

function decode(value) {
  return String(value || "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').trim();
}
function attrValue(tag, name) {
  return decode(tag.match(new RegExp("\\\\b" + name + "\\\\s*=\\\\s*['\\\"]([^'\\\"]*)", "i"))?.[1] || "");
}
function meta(html, key, attr = "property") {
  for (const match of html.matchAll(/<meta\\b[^>]*>/gi)) {
    const tag = match[0];
    const keyValue = tag.match(new RegExp("\\\\b" + attr + "=['\\\"]([^'\\\"]+)", "i"))?.[1];
    if (keyValue === key) return attrValue(tag, "content");
  }
  return "";
}
function findTagMatches(html, tags) {
  const regex = new RegExp("<(" + tags + ")\\\\b((?:\\"[^\\"]*\\"|'[^']*'|[^'\\">])*)>([\\\\s\\\\S]*?)<\\\\/\\\\1\\\\s*>", "gi");
  return [...html.matchAll(regex)];
}
function cleanText(value) {
  return decode(value.replace(/<[^>]*>/g, " ").replace(/\\s+/g, " "));
}

test("SEO audit reports useful checks and counts missing image alt attributes", () => {
  const html = '<title>Example site title that is long enough for search</title><meta name="description" content="A useful description that contains enough words and details to meet the recommended length for a search result snippet."><meta name="viewport" content="width=device-width"><meta property="og:title" content="Example"><meta property="og:description" content="Description"><meta property="og:image" content="/image.jpg"><link rel="canonical" href="/canonical"><h1>Heading</h1><img src="/a.jpg" alt="A"><img src="/b.jpg"><script type="application/ld+json">{}</script>';
  const result = auditSeo(html, "https://example.com/page", 200, { decode, meta, attrValue, findTagMatches, cleanText });
  assert.equal(result.status_code, 200);
  assert.equal(result.canonical, "https://example.com/canonical");
  assert.equal(result.images_count, 2);
  assert.equal(result.images_missing_alt, 1);
  assert.equal(result.checks.length, 8);
  assert.ok(result.score > 0 && result.score <= 100);
});

test("sitemap locations decode XML entities and CDATA", () => {
  assert.deepEqual(parseSitemapLocs("<loc>https://example.com/a&amp;b</loc><loc><![CDATA[https://example.com/c]]></loc>", decode), [
    "https://example.com/a&b",
    "https://example.com/c"
  ]);
});

test("redirect targets are revalidated before the next fetch", async () => {
  const checked = [];
  let calls = 0;
  const result = await fetchPublicText("https://example.com/start", {
    publicUrl: value => new URL(value),
    publicCrawlUrl: async value => { checked.push(value); return new URL(value); },
    fetchImpl: async () => {
      calls++;
      if (calls === 1) return new Response(null, { status: 302, headers: { Location: "/final" } });
      return new Response("<html>ok</html>", { status: 200, headers: { "Content-Type": "text/html" } });
    }
  });
  assert.deepEqual(checked, ["https://example.com/start", "https://example.com/final"]);
  assert.equal(result.status, 200);
  assert.equal(result.text, "<html>ok</html>");
});

test("bounded reader rejects oversized response bodies", async () => {
  await assert.rejects(fetchPublicText("https://example.com", {
    publicUrl: value => new URL(value),
    publicCrawlUrl: async value => new URL(value),
    limit: 4,
    fetchImpl: async () => new Response("12345", { status: 200 })
  }), /safety limit/);
});

test("sitemap discovery follows only same-host sitemap indexes and caps output", async () => {
  const fetched = [];
  const fakeFetch = async (url) => {
    fetched.push(url);
    if (url.endsWith("/robots.txt")) return { url, status: 200, text: "User-agent: *\\nDisallow: /private\\nSitemap: https://example.com/index.xml" };
    if (url.endsWith("/index.xml")) return { url, status: 200, text: "<sitemapindex><loc>https://example.com/child.xml</loc><loc>https://elsewhere.test/skip.xml</loc></sitemapindex>" };
    return { url, status: 200, text: "<urlset><loc>https://example.com/a</loc><loc>https://example.com/b</loc></urlset>" };
  };
  const result = await inspectSiteDiscovery("https://example.com", {
    publicCrawlUrl: async value => new URL(value),
    fetchPublicText: fakeFetch,
    decode
  });
  assert.equal(result.robots_rules[0].rule, "DISALLOW: /private");
  assert.equal(result.sitemaps.length, 2);
  assert.deepEqual(result.urls, ["https://example.com/a", "https://example.com/b"]);
  assert.equal(fetched.some(url => url.includes("elsewhere.test")), false);
});
