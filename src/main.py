"""Command-line entry point for the scheduled Hacker News scraper."""
from __future__ import annotations

import logging
import sys

from src.config import load_settings
from src.scraper import scrape_top_stories
from src.sheets import append_new_stories, connect

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
logger = logging.getLogger("daily-tech-news-scraper")


def main() -> int:
    try:
        settings = load_settings()
        stories = scrape_top_stories(limit=30)
        if not stories:
            logger.warning("No stories were collected; the spreadsheet was not changed.")
            return 0

        client = connect(settings)
        appended = append_new_stories(client, settings, stories)
        logger.info(
            "Collected %d stories; appended %d new rows to '%s'.",
            len(stories), appended, settings.worksheet_name,
        )
        return 0
    except Exception:
        logger.exception("Scraper run failed.")
        return 1


if __name__ == "__main__":
    sys.exit(main())
