"""Streamlit control panel for the Daily Hacker News Scraper."""
from __future__ import annotations

import io
import json
import zipfile
from datetime import datetime
from zoneinfo import ZoneInfo

import gspread
import requests
import streamlit as st

REPO_DEFAULT = "prem-pk-dev/python"
WORKFLOW_FILE = "scraper.yml"
API_ROOT = "https://api.github.com"
IST = ZoneInfo("Asia/Kolkata")
SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]


st.set_page_config(page_title="Python Scraper Control Panel", page_icon="🕷️", layout="wide")


def config():
    required = ["GITHUB_TOKEN", "GOOGLE_CREDENTIALS", "GOOGLE_SHEET_ID"]
    missing = [key for key in required if not st.secrets.get(key)]
    if missing:
        st.error("Streamlit Secrets में ये values configure करें: " + ", ".join(missing))
        st.info("Deployment guide के लिए repository का STREAMLIT_DASHBOARD.md देखें।")
        st.stop()
    return {
        "token": st.secrets["GITHUB_TOKEN"],
        "repo": st.secrets.get("GITHUB_REPOSITORY", REPO_DEFAULT),
        "credentials": json.loads(st.secrets["GOOGLE_CREDENTIALS"]),
        "sheet_id": st.secrets["GOOGLE_SHEET_ID"],
        "worksheet": st.secrets.get("GOOGLE_WORKSHEET_NAME", "HN_Stories"),
    }


def github_request(method: str, path: str, cfg: dict, **kwargs):
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {cfg['token']}",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    response = requests.request(
        method, f"{API_ROOT}/repos/{cfg['repo']}/{path}",
        headers=headers, timeout=25, **kwargs
    )
    response.raise_for_status()
    return response


def dispatch_workflow(cfg: dict):
    response = github_request(
        "POST", f"actions/workflows/{WORKFLOW_FILE}/dispatches", cfg,
        json={"ref": "main"},
    )
    return response.status_code == 204


def get_recent_runs(cfg: dict):
    response = github_request(
        "GET", "actions/workflows/scraper.yml/runs", cfg,
        params={"per_page": 8},
    )
    return response.json().get("workflow_runs", [])


def get_sheet_rows(cfg: dict):
    client = gspread.service_account_from_dict(cfg["credentials"], scopes=SCOPES)
    book = client.open_by_key(cfg["sheet_id"])
    try:
        worksheet = book.worksheet(cfg["worksheet"])
    except gspread.WorksheetNotFound:
        return []
    values = worksheet.get_all_values()
    if len(values) < 2:
        return []
    headers = values[0]
    return [dict(zip(headers, row)) for row in values[1:] if any(row)]


def local_time(value: str) -> str:
    if not value:
        return "—"
    dt = datetime.fromisoformat(value.replace("Z", "+00:00"))
    return dt.astimezone(IST).strftime("%d %b %Y, %I:%M:%S %p IST")


def get_run_log(cfg: dict, run_id: int) -> str:
    response = github_request("GET", f"actions/runs/{run_id}/logs", cfg)
    with zipfile.ZipFile(io.BytesIO(response.content)) as archive:
        parts = []
        for name in archive.namelist():
            if name.lower().endswith(".txt"):
                content = archive.read(name).decode("utf-8", errors="replace")
                parts.append(f"===== {name} =====\n{content}")
        return "\n\n".join(parts)[-18000:] or "इस run के लिए text logs उपलब्ध नहीं हैं।"


cfg = config()
st.title("🕷️ Python Scraper Control Panel")
st.caption("Daily Hacker News Scraper · GitHub Actions + Google Sheets")

left, right = st.columns([1, 1])
with left:
    if st.button("▶ Run Scraper Now", type="primary", use_container_width=True):
        try:
            dispatch_workflow(cfg)
            st.success("Workflow dispatch request भेज दी गई है। नीचे Refresh दबाकर status देखें।")
            st.session_state["just_dispatched"] = True
        except requests.HTTPError as exc:
            detail = exc.response.text[:1000] if exc.response is not None else str(exc)
            st.error(f"Workflow start नहीं हो सका: {detail}")
        except Exception as exc:
            st.error(f"Workflow start नहीं हो सका: {exc}")
with right:
    if st.button("↻ Refresh Output", use_container_width=True):
        st.rerun()

st.divider()

try:
    runs = get_recent_runs(cfg)
    latest = runs[0] if runs else None
    rows = get_sheet_rows(cfg)
    new_count = len(rows)
    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Latest workflow", latest.get("status", "—").title() if latest else "—")
    c2.metric("Conclusion", (latest.get("conclusion") or "Running").title() if latest else "—")
    c3.metric("Rows in Google Sheet", new_count)
    c4.metric("Last workflow run (IST)", local_time(latest.get("created_at")) if latest else "—")

    st.subheader("Workflow Run History")
    if runs:
        history = [{
            "Run ID": run["id"],
            "Trigger": run.get("event", "—"),
            "Status": run.get("status", "—"),
            "Result": run.get("conclusion") or "In progress",
            "Started (IST)": local_time(run.get("created_at", "")),
            "Branch": run.get("head_branch", "—"),
        } for run in runs]
        st.dataframe(history, use_container_width=True, hide_index=True)
        choices = {f"#{r['id']} · {r.get('event')} · {r.get('conclusion') or r.get('status')}": r["id"] for r in runs}
        selected = st.selectbox("Execution logs देखें", list(choices))
        if st.button("Show selected run logs"):
            try:
                st.text_area("GitHub Actions output", get_run_log(cfg, choices[selected]), height=360)
            except Exception as exc:
                st.warning(f"Logs अभी उपलब्ध नहीं हैं: {exc}")
    else:
        st.info("अभी कोई workflow run उपलब्ध नहीं है।")

    st.subheader("Latest Scraped Stories")
    if rows:
        st.caption(f"Google Sheet tab: {cfg['worksheet']} · कुल {len(rows)} records")
        st.dataframe(rows[-100:][::-1], use_container_width=True, hide_index=True)
    else:
        st.info("Google Sheet में अभी कोई story row उपलब्ध नहीं है।")
except requests.HTTPError as exc:
    detail = exc.response.text[:1000] if exc.response is not None else str(exc)
    st.error(f"GitHub API error: {detail}")
except Exception as exc:
    st.error(f"Dashboard data load नहीं हुआ: {exc}")

st.caption("यह dashboard workflow trigger करता है; actual scraping GitHub Actions runner पर होती है।")
