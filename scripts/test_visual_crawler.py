import unittest

from scripts.visual_crawler import normalize_url, parse_sitemap_document, same_site_http_url


class SitemapDiscoveryTests(unittest.TestCase):
    def test_parse_namespaced_urlset(self):
        xml = """<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://example.com/a</loc></url><url><loc>https://example.com/b</loc></url></urlset>"""
        kind, urls = parse_sitemap_document(xml)
        self.assertEqual(kind, "urlset")
        self.assertEqual(urls, ["https://example.com/a", "https://example.com/b"])

    def test_parse_sitemap_index(self):
        xml = """<sitemapindex><sitemap><loc>https://example.com/sitemap-products.xml</loc></sitemap></sitemapindex>"""
        kind, urls = parse_sitemap_document(xml)
        self.assertEqual(kind, "index")
        self.assertEqual(urls, ["https://example.com/sitemap-products.xml"])

    def test_reject_unknown_and_malformed_documents(self):
        self.assertEqual(parse_sitemap_document("<feed><entry/></feed>"), ("unknown", []))
        with self.assertRaises(Exception):
            parse_sitemap_document("<urlset>")

    def test_same_host_only(self):
        self.assertTrue(same_site_http_url("https://example.com/a", "example.com"))
        self.assertFalse(same_site_http_url("https://other.example.com/a", "example.com"))
        self.assertFalse(same_site_http_url("javascript:alert(1)", "example.com"))

    def test_url_normalization_removes_fragment(self):
        self.assertEqual(normalize_url("https://EXAMPLE.com/a#section"), "https://example.com/a")


if __name__ == "__main__":
    unittest.main()
