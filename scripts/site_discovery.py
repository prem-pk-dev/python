"""Pure URL and sitemap parsing helpers shared by crawler and unit tests."""
from urllib.parse import urlparse


def parse_sitemap_document(xml_text):
    """Return ('index'|'urlset', locs); reject malformed or unexpected XML."""
    import xml.etree.ElementTree as ET
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
