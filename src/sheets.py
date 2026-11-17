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
    """Append unseen stories; initialize a blank header row and preserve existing rows."""
    spreadsheet = client.open_by_key(settings.google_sheet_id)
    try:
        worksheet = spreadsheet.worksheet(settings.worksheet_name)
    except gspread.WorksheetNotFound:
        worksheet = spreadsheet.add_worksheet(
            title=settings.worksheet_name, rows=1000, cols=len(HEADERS)
        )

    existing_values = worksheet.get_all_values()
    first_row = existing_values[0] if existing_values else []
    header_is_blank = not any(str(cell).strip() for cell in first_row)

    if not existing_values or header_is_blank:
        # A newly-created worksheet can be returned as a blank first row ([""]).
        # Write the header explicitly to A1 so it is not appended below blank rows.
        worksheet.update(range_name="A1:E1", values=[HEADERS])
        data_rows = existing_values[1:] if existing_values else []
    else:
        if first_row != HEADERS:
            raise RuntimeError(
                "Worksheet header does not match expected scraper columns. "
                "Use a dedicated worksheet or correct its header row."
            )
        data_rows = existing_values[1:]

    id_index = HEADERS.index("Story ID")
    existing_ids = {
        row[id_index]
        for row in data_rows
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
