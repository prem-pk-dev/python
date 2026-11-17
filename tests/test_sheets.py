import unittest
from types import SimpleNamespace
from unittest.mock import Mock

import gspread

from src.sheets import HEADERS, append_new_stories


class SheetsTests(unittest.TestCase):
    def setUp(self):
        self.settings = SimpleNamespace(
            google_sheet_id="spreadsheet-id",
            worksheet_name="Sheet1",
        )
        self.client = Mock()
        self.spreadsheet = Mock()
        self.worksheet = Mock()
        self.client.open_by_key.return_value = self.spreadsheet
        self.spreadsheet.worksheet.return_value = self.worksheet

    def test_appends_only_unseen_story_ids(self):
        self.worksheet.get_all_values.return_value = [
            HEADERS,
            ["2026-11-17T08:00:00+00:00", "101", "Existing", "https://old.example", "10"],
        ]
        stories = [
            {
                "scraped_at": "2026-11-17T09:00:00+00:00",
                "story_id": "101",
                "title": "Existing",
                "url": "https://old.example",
                "points": 10,
            },
            {
                "scraped_at": "2026-11-17T09:00:00+00:00",
                "story_id": "202",
                "title": "New story",
                "url": "https://new.example",
                "points": 25,
            },
        ]

        appended = append_new_stories(self.client, self.settings, stories)

        self.assertEqual(appended, 1)
        self.worksheet.append_rows.assert_called_once_with(
            [["2026-11-17T09:00:00+00:00", "202", "New story", "https://new.example", 25]],
            value_input_option="RAW",
        )

    def test_creates_header_for_empty_worksheet(self):
        self.worksheet.get_all_values.return_value = []
        self.assertEqual(append_new_stories(self.client, self.settings, []), 0)
        self.worksheet.append_row.assert_called_once_with(HEADERS, value_input_option="RAW")

    def test_rejects_unexpected_existing_header(self):
        self.worksheet.get_all_values.return_value = [["Different header"]]
        with self.assertRaisesRegex(RuntimeError, "Worksheet header"):
            append_new_stories(self.client, self.settings, [])

    def test_creates_missing_worksheet(self):
        self.spreadsheet.worksheet.side_effect = gspread.WorksheetNotFound
        self.spreadsheet.add_worksheet.return_value = self.worksheet
        self.worksheet.get_all_values.return_value = []

        self.assertEqual(append_new_stories(self.client, self.settings, []), 0)
        self.spreadsheet.add_worksheet.assert_called_once_with(
            title="Sheet1", rows=1000, cols=len(HEADERS)
        )


if __name__ == "__main__":
    unittest.main()
