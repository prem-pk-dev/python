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
        if parsed.scheme not in ("http", "https") or not parsed.hostname:
            return False
        candidate_host = parsed.hostname.lower().rstrip(".")
        root = root_host.lower().rstrip(".")
        return candidate_host == root or candidate_host.removeprefix("www.") == root.removeprefix("www.")
    except Exception:
        return False
