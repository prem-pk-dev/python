# Cloudflare Scraper Dashboard

The dashboard is a single Cloudflare Worker serving its frontend and authenticated API. It controls the existing Python GitHub Actions workflow; it does not replace the Python scraper or its Google Sheets integration.

## Deploy
1. Configure the Worker secrets `DASHBOARD_PASSWORD` and `GITHUB_TOKEN`.
2. The GitHub fine-grained token must be scoped to `prem-pk-dev/python` with **Actions: Read and write**.
3. Deploy `cloudflare/worker.js` as Worker `python-scraper-dashboard` and enable its `workers.dev` subdomain.
4. Open the Worker URL and sign in with `DASHBOARD_PASSWORD`.

The Worker token never reaches the browser. The browser receives a short-lived signed session token held only in sessionStorage. Sessions expire after 12 hours.

## Routes
- `/` dashboard frontend
- `POST /api/login` password sign-in
- `POST /api/scrape` scrape one public HTML URL
- `POST /api/run-hn` dispatch the existing `scraper.yml` workflow on `main`
- `GET /api/runs` recent workflow run history

## Scraping boundaries
Only public HTTP/HTTPS HTML is accepted. Local/IP-literal/internal hostnames, embedded credentials, non-HTML responses, oversized pages and excessive redirects are rejected. This is a basic URL guard, not a guarantee against every DNS-level SSRF technique. It does not bypass authentication, paywalls, CAPTCHAs or anti-bot controls. Product fields are populated only when public JSON-LD is present.

## Existing automation preserved
The Python source under `src/`, GitHub Actions workflow and Google Sheets append-only/deduplication logic remain unchanged. The existing Google Sheet is linked from the dashboard.
