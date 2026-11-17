# Daily Tech News Scraper

A zero-budget Python automation that collects top stories from [Hacker News](https://news.ycombinator.com/) and appends them to Google Sheets.

## Features

- Fetches Hacker News front-page stories using its public Firebase API.
- Collects title, article URL, points, story ID, and scrape timestamp.
- Appends rows without deleting existing data and skips previously recorded story IDs.
- Retries transient HTTP errors through Requests' standard adapter configuration.
- Runs daily with GitHub Actions and supports manual execution.

## Requirements

- Python 3.10+
- Google Cloud service account with Google Sheets API enabled.
- Spreadsheet shared with the service-account email as Editor.

## Local setup

```bash
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
```

Set environment variables: `GOOGLE_CREDENTIALS` (complete service-account JSON), `GOOGLE_SHEET_ID` (spreadsheet ID), and optionally `GOOGLE_WORKSHEET_NAME` (defaults to `Sheet1`). Never commit credential files.

## GitHub Actions setup

In **Settings → Secrets and variables → Actions**, add:
- Secret `GOOGLE_CREDENTIALS`: service-account JSON.
- Variable `GOOGLE_SHEET_ID`: spreadsheet ID.
- Optional variable `GOOGLE_WORKSHEET_NAME`: worksheet name.

The workflow runs daily at **08:00 UTC (13:30 IST)** and can also be triggered manually. GitHub may delay scheduled jobs during periods of high load.

## Run and test

```bash
python -m unittest discover -s tests -v
python -m src.main
```

Unit tests do not need Google credentials. A live Sheets run requires valid credentials, a spreadsheet ID, and Editor access for the service account.

## Sheet columns

`Scraped At (UTC)`, `Story ID`, `Title`, `URL`, `Points`

An empty worksheet gets a header row. Existing rows are retained; only unseen story IDs are appended.
