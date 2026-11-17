"""Hacker News story collection using its public Firebase API."""
from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

HN_TOP_STORIES_URL = "https://hacker-news.firebaseio.com/v0/topstories.json"
HN_ITEM_URL = "https://hacker-news.firebaseio.com/v0/item/{story_id}.json"
USER_AGENT = "daily-tech-news-scraper/1.0"


def create_session() -> requests.Session:
    session = requests.Session()
    retry = Retry(
        total=3,
        connect=3,
        read=3,
        backoff_factor=0.5,
        status_forcelist=(429, 500, 502, 503, 504),
        allowed_methods=frozenset({"GET"}),
    )
    session.mount("https://", HTTPAdapter(max_retries=retry))
    session.headers.update({"User-Agent": USER_AGENT})
    return session


def _get_json(url: str, session: requests.Session) -> Any:
    response = session.get(url, timeout=(5, 20))
    response.raise_for_status()
    return response.json()


def scrape_top_stories(limit: int = 30, session: requests.Session | None = None) -> list[dict]:
    """Return top stories with stable IDs and UTC scrape timestamps."""
    if limit < 1:
        raise ValueError("limit must be at least 1")

    owns_session = session is None
    client = session or create_session()
    scraped_at = datetime.now(timezone.utc).isoformat(timespec="seconds")

    try:
        story_ids = _get_json(HN_TOP_STORIES_URL, client)
        if not isinstance(story_ids, list):
            raise ValueError("Hacker News top-stories response was not a list")

        stories = []
        for story_id in story_ids[:limit]:
            try:
                item = _get_json(HN_ITEM_URL.format(story_id=story_id), client)
            except (requests.RequestException, ValueError):
                continue
            if not isinstance(item, dict) or item.get("deleted") or item.get("dead"):
                continue
            title = item.get("title")
            if not title:
                continue

            stories.append({
                "scraped_at": scraped_at,
                "story_id": str(story_id),
                "title": str(title).strip(),
                "url": str(item.get("url") or f"https://news.ycombinator.com/item?id={story_id}").strip(),
                "points": int(item.get("score") or 0),
            })
        return stories
    finally:
        if owns_session:
            client.close()
