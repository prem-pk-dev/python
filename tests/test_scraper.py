import unittest

from src.scraper import HN_TOP_STORIES_URL, scrape_top_stories


class FakeResponse:
    def __init__(self, payload):
        self.payload = payload

    def raise_for_status(self):
        return None

    def json(self):
        return self.payload


class FakeSession:
    def __init__(self, payloads):
        self.payloads = payloads
        self.headers = {}
        self.closed = False

    def get(self, url, timeout):
        return FakeResponse(self.payloads[url])

    def close(self):
        self.closed = True


class ScraperTests(unittest.TestCase):
    def test_collects_story_fields_and_fallback_url(self):
        session = FakeSession({
            HN_TOP_STORIES_URL: [123, 456],
            "https://hacker-news.firebaseio.com/v0/item/123.json": {
                "title": "Example story", "url": "https://example.com", "score": 42
            },
            "https://hacker-news.firebaseio.com/v0/item/456.json": {
                "title": "Ask HN: Example", "score": 7
            },
        })
        stories = scrape_top_stories(limit=2, session=session)
        self.assertEqual(len(stories), 2)
        self.assertEqual(stories[0]["story_id"], "123")
        self.assertEqual(stories[0]["points"], 42)
        self.assertEqual(stories[0]["url"], "https://example.com")
        self.assertEqual(stories[1]["url"], "https://news.ycombinator.com/item?id=456")
        self.assertIn("T", stories[0]["scraped_at"])

    def test_rejects_invalid_limit(self):
        with self.assertRaises(ValueError):
            scrape_top_stories(limit=0, session=FakeSession({}))


if __name__ == "__main__":
    unittest.main()
