# Cloudflare Scraper Dashboard

The Worker serves the existing dashboard and authenticated APIs. The visual crawler now uses a volatile Durable Object WebSocket relay to stream Playwright events and screenshots into the open browser tab.

## Live visual crawler architecture

- `POST /api/crawl/start`: validates crawl parameters, creates a UUID session, dispatches `.github/workflows/visual-crawler.yml`, and returns the WebSocket URL.
- `GET /api/crawl/:crawl_id/ws`: authenticated browser WebSocket connection.
- `POST /api/crawl/:crawl_id/ingest`: accepts Python events only with `Authorization: Bearer <INGEST_SECRET>`.
- `CrawlSessionHub`: forwards JSON events to connected browser sockets. It keeps only volatile in-memory session/socket references and clears them when the last client disconnects.

## Zero-persistence behavior

The application does not write crawl data, images, logs, or screenshots to R2, KV, D1, filesystem, GitHub Actions artifacts, or Durable Object storage APIs. The DO class never calls `state.storage`, SQL, or storage methods. Screenshots are JPEG-compressed in Python memory, streamed through the relay, and held as browser Blob URLs only. Refreshing/leaving the tab drops the browser session; `Clear Session` revokes all Blob URLs.

**Cloudflare platform caveat:** Free-plan Durable Objects require a SQLite-backed namespace migration. The migration provisions the platform backend, but this application intentionally performs no SQLite or DO storage reads/writes. If the requirement means that no SQLite-backed namespace may even be provisioned, Cloudflare Free Durable Objects cannot satisfy that requirement.

## Configure secrets and variables

### Cloudflare Worker secrets

From the `cloudflare/` directory:

```bash
npx wrangler secret put DASHBOARD_PASSWORD
npx wrangler secret put GITHUB_TOKEN
npx wrangler secret put INGEST_SECRET
```

- `DASHBOARD_PASSWORD`: password used by the existing dashboard login.
- `GITHUB_TOKEN`: fine-grained token scoped to `prem-pk-dev/python`, with Actions: Read and write.
- `INGEST_SECRET`: high-entropy random secret shared only with the Worker and GitHub Actions.

### GitHub Actions secret and variable

In repository **Settings → Secrets and variables → Actions**:

- Add secret `INGEST_SECRET` with exactly the same value configured in the Worker.
- Add repository variable `WORKER_BASE_URL`, e.g. `https://python-scraper-dashboard.prem92006.workers.dev` (no trailing slash required).

Do not place either secret in source code or frontend JavaScript.

## Deploy

```bash
cd cloudflare
npx wrangler deploy
```

The `wrangler.toml` declares the `CRAWL_SESSION_HUB` binding and the `v1` Durable Object migration. Wrangler applies the migration during deployment.

## End-to-end test

1. Set all three Worker secrets and the GitHub Actions secret/variable above.
2. Deploy the Worker and open its `workers.dev` URL. Sign in normally.
3. Enter a public HTTPS URL, set 1–3 pages, select Desktop/Tablet/Mobile and Viewport/Full Page/Both.
4. Click **Start visual crawl**. Confirm the browser WebSocket connects and the booting state appears.
5. Confirm URL navigation, live preview frames, timestamped logs, UI checks, and screenshots arrive in the dashboard.
6. Test individual downloads, **Download All (.zip)**, gallery filters, lightbox, and **Clear Session**.
7. Confirm a page refresh clears the gallery and that the unsaved-session browser warning appears while screenshots exist.
8. Inspect the workflow run: no `actions/upload-artifact` step or screenshot artifact should exist.
9. Re-test **Scrape a Public Website**, **Hacker News Scraper**, and dashboard navigation to confirm they remain intact.

## Existing modules

The public website scraper, Hacker News workflow, Google Sheets integration, authentication, and dashboard history remain separate. The Worker still requires the existing `DASHBOARD_PASSWORD` and `GITHUB_TOKEN` secrets.
