import json
import os
import unittest
from unittest.mock import patch

from src.config import load_settings


class ConfigTests(unittest.TestCase):
    def test_requires_credentials_and_sheet_id(self):
        with patch.dict(os.environ, {}, clear=True):
            with self.assertRaisesRegex(RuntimeError, "GOOGLE_CREDENTIALS"):
                load_settings()

    def test_loads_service_account_configuration(self):
        credentials = {
            "type": "service_account",
            "client_email": "test@example.iam.gserviceaccount.com",
            "private_key": "not-a-real-key",
            "token_uri": "https://oauth2.googleapis.com/token",
        }
        with patch.dict(os.environ, {
            "GOOGLE_CREDENTIALS": json.dumps(credentials),
            "GOOGLE_SHEET_ID": "sheet-id",
        }, clear=True):
            settings = load_settings()
        self.assertEqual(settings.google_sheet_id, "sheet-id")
        self.assertEqual(settings.worksheet_name, "Sheet1")


if __name__ == "__main__":
    unittest.main()
