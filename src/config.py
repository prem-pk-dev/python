"""Environment-based configuration for the scraper."""
from __future__ import annotations

import json
import os
from dataclasses import dataclass


@dataclass(frozen=True)
class Settings:
    google_credentials: dict
    google_sheet_id: str
    worksheet_name: str = "Sheet1"


def load_settings() -> Settings:
    raw_credentials = os.getenv("GOOGLE_CREDENTIALS", "").strip()
    sheet_id = os.getenv("GOOGLE_SHEET_ID", "").strip()
    worksheet_name = os.getenv("GOOGLE_WORKSHEET_NAME", "Sheet1").strip() or "Sheet1"

    missing = []
    if not raw_credentials:
        missing.append("GOOGLE_CREDENTIALS")
    if not sheet_id:
        missing.append("GOOGLE_SHEET_ID")
    if missing:
        raise RuntimeError("Missing required environment variable(s): " + ", ".join(missing))

    try:
        credentials = json.loads(raw_credentials)
    except json.JSONDecodeError as exc:
        raise RuntimeError("GOOGLE_CREDENTIALS must contain valid service-account JSON.") from exc

    if not isinstance(credentials, dict):
        raise RuntimeError("GOOGLE_CREDENTIALS must be a JSON object.")

    required_fields = {"type", "client_email", "private_key", "token_uri"}
    absent = sorted(required_fields.difference(credentials))
    if absent:
        raise RuntimeError("GOOGLE_CREDENTIALS is missing required field(s): " + ", ".join(absent))
    if credentials.get("type") != "service_account":
        raise RuntimeError("GOOGLE_CREDENTIALS must be a service-account JSON document.")

    return Settings(credentials, sheet_id, worksheet_name)
