"""Google Sheets append-only storage with story-ID deduplication."""
from __future__ import annotations

import gspread
from google.oauth2.service_account import Credentials

from src.config import Settings

HEADERS = ["Scraped At (UTC)", "Story ID", "Title", "URL", "Points"]
SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]


def connect(settings: Settings):
    credentials = Credentials.from_service_account_info(settings.google_credentials, scopes=SCOPES)
    return gspread.authorize(credentials)


def append_new_stories(client, settings: Settings, stories: list[dict]) -> int:
    """Append unseen stories; preserve existing rows and return the appended count."""
    spreadsheet = client.open_by_key(settings.google_sheet_id)
    try:
        worksheet = spreadsheet.worksheet(settings.worksheet_name)
    except gspread.WorksheetNotFound:
        worksheet = spreadsheet.add_worksheet(
            title=settings.worksheet_name, rows=1000, cols=len(HEADERS)
        )

    existing_values = worksheet.get_all_values()
    if not existing_values:
        worksheet.append_row(HEADERS, value_input_option="RAW")
        existing_ids: set[str] = set()
    else:
        if existing_values[0] != HEADERS:
            raise RuntimeError(
                "Worksheet header does not match expected scraper columns. "
                "Use a dedicated worksheet or correct its header row."
            )
        id_index = HEADERS.index("Story ID")
        existing_ids = {
            row[id_index]
            for row in existing_values[1:]
            if len(row) > id_index and row[id_index]
        }

    rows = []
    for story in stories:
        story_id = str(story["story_id"])
        if story_id in existing_ids:
            continue
        rows.append([
            story["scraped_at"], story_id, story["title"], story["url"], story["points"]
        ])
        existing_ids.add(story_id)

    if rows:
        worksheet.append_rows(rows, value_input_option="RAW")
    return len(rows)
