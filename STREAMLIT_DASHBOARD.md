# Streamlit Scraper Control Panel

This app provides a browser UI to dispatch the existing GitHub Actions workflow, inspect recent run status/logs, and view the latest rows in the existing Google Sheet. The scheduled workflow and Hacker News scraper remain unchanged.

## Deploy on Streamlit Community Cloud (free tier)

1. Push/merge this dashboard code to the repository's `main` branch.
2. Sign in at https://share.streamlit.io/ with GitHub.
3. Create an app from `prem-pk-dev/python`, branch `main`, main file path `app.py`.
4. In App settings → Secrets, add the TOML below, replacing values locally. Never commit secrets.

```toml
GITHUB_TOKEN = "YOUR_FINE_GRAINED_GITHUB_TOKEN"
GITHUB_REPOSITORY = "prem-pk-dev/python"
GOOGLE_SHEET_ID = "YOUR_EXISTING_GOOGLE_SHEET_ID"
GOOGLE_WORKSHEET_NAME = "HN_Stories"
GOOGLE_CREDENTIALS = '''
{ "paste": "the complete service-account JSON here" }
'''
```

## GitHub token permissions

Create a fine-grained token for only `prem-pk-dev/python`:
- Actions: Read and write

The dashboard uses this token only to dispatch the existing `scraper.yml` workflow and read its run history/logs. Keep the token in Streamlit Secrets, not in source code.

## Google Sheets access

Use the same service-account JSON already stored in GitHub Actions. Ensure the service-account email has Editor access to the existing spreadsheet. The dashboard reads the `HN_Stories` worksheet and does not change or delete rows.

## What the dashboard provides

- Run Scraper Now button (dispatches workflow on `main`)
- Recent workflow runs and status
- Run logs
- Latest scraped rows from Google Sheets

The scraper continues to run on GitHub Actions; Streamlit is only the control/output interface.
