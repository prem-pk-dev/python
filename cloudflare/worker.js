const HTML = String.raw`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#06101f"><title>Python Scraper · Automation Dashboard</title>
<style>
:root{color-scheme:dark;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif;background:#06101f;color:#e8f2ff;--panel:#0d1c30;--panel2:#10243a;--line:#173a55;--cyan:#00d7e8;--muted:#9bb2ca;--blue:#1689ff}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;min-height:100vh;background:radial-gradient(ellipse at 58% -12%,#0e4163 0,transparent 42%),radial-gradient(ellipse at 0 35%,#0b2944 0,transparent 38%),#06101f}.hidden{display:none!important}.shell{min-height:100vh}.sidebar{position:fixed;inset:0 auto 0 0;width:264px;background:#071626;border-right:1px solid #12334c;padding:22px 18px;display:flex;flex-direction:column;z-index:5}.brandmark{display:flex;gap:12px;align-items:center;padding:4px 6px 30px}.brandicon{width:42px;height:42px;border-radius:13px;background:linear-gradient(145deg,#0da9db,#1554a7);display:grid;place-items:center;font-size:25px;box-shadow:0 0 25px #00c5ed33}.brandname{font-size:17px;font-weight:800}.brandname small{display:block;color:#8ba6c0;font-size:11px;font-weight:500;margin-top:2px}.nav{display:grid;gap:7px}.nav a,.quick a{color:#b7cbe0;text-decoration:none;display:flex;align-items:center;gap:13px;padding:12px 14px;border-radius:13px;font-size:14px}.nav a:hover,.quick a:hover{background:#102d45;color:white}.nav a.active{background:linear-gradient(100deg,#08b9ca,#07506c);color:white;box-shadow:0 7px 22px #00b9ce22}.nav .ico{width:22px;text-align:center;font-size:18px}.side-rule{height:1px;background:#17344a;margin:22px 6px}.quick-title{font-size:13px;font-weight:750;margin:0 8px 10px}.quick a{background:#10263b;border:1px solid #173a54;margin-bottom:8px}.side-note{margin-top:auto;color:#6f8ba7;font-size:11px;line-height:1.6;padding:16px 7px 2px}.main{margin-left:264px;min-width:0}.topbar{height:64px;position:sticky;top:0;z-index:4;background:#071626eF;backdrop-filter:blur(16px);border-bottom:1px solid #15334b;display:flex;align-items:center;justify-content:space-between;padding:0 clamp(20px,3vw,44px);gap:20px}.searchfake{width:min(590px,65%);border:1px solid #183b56;border-radius:15px;background:#0b1e32;color:#8ca7c2;padding:11px 16px;font-size:13px}.userchip{display:flex;align-items:center;gap:10px;font-size:13px;font-weight:700}.avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(145deg,#164a70,#167f9a);display:grid;place-items:center}.content{max-width:1500px;margin:auto;padding:28px clamp(20px,2.5vw,40px) 56px}.hero{display:flex;justify-content:space-between;align-items:center;gap:24px;margin:4px 4px 26px;position:relative}.eyebrow{font-size:11px;letter-spacing:.17em;text-transform:uppercase;color:#53dafa}.hero h1{font-size:clamp(29px,3.2vw,42px);letter-spacing:-.035em;margin:9px 0 6px}.hero h1 span{color:var(--cyan)}.hero p{color:#a9bfd5;margin:0;font-size:15px}.hero-art{width:290px;height:118px;border-radius:20px;background:linear-gradient(130deg,#07345b,#0a6b90 55%,#071d3b);border:1px solid #155b84;display:flex;align-items:center;justify-content:center;gap:18px;overflow:hidden;box-shadow:0 12px 40px #0076b333}.hero-art .py{font-size:58px;filter:drop-shadow(0 0 15px #00bfff88)}.hero-art .code{font:11px/1.7 ui-monospace,monospace;color:#9feaff;border:1px solid #1e83a6;background:#07182bcc;padding:12px 15px;border-radius:9px}.metrics{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-bottom:18px}.metriccard{background:linear-gradient(135deg,#0d263c,#0b1b2e);border:1px solid #16415d;border-radius:16px;padding:17px;min-height:90px;display:flex;align-items:center;gap:14px;min-width:0}.metricicon{width:47px;height:47px;flex:0 0 47px;border-radius:50%;display:grid;place-items:center;background:#073b5b;color:#39dff5;font-size:22px}.metriccard:nth-child(2) .metricicon{background:#064b42;color:#43e7b4}.metriccard:nth-child(3) .metricicon{background:#51233b;color:#ff7c9c}.metriccard:nth-child(4) .metricicon{background:#24265e;color:#9c9dff}.metriclabel{font-size:12px;color:#a9bfd3}.metricvalue{font-size:23px;font-weight:800;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.grid{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(320px,1fr);gap:18px}.panel{background:linear-gradient(145deg,#10243a,#0d1b2e);border:1px solid #1b405b;border-radius:18px;padding:22px;box-shadow:0 12px 36px #0002;min-width:0}.scrape-panel{border-color:#087f9d;box-shadow:0 0 0 1px #00d4e71a,0 14px 38px #0003;position:relative;overflow:hidden}.scrape-panel:after{content:"";position:absolute;right:-38px;top:-42px;width:170px;height:170px;border-radius:50%;border:22px solid #0c6e8a22;pointer-events:none}.panelhead{display:flex;align-items:center;gap:13px;margin-bottom:8px}.panelicon{width:42px;height:42px;border-radius:12px;background:#06455e;color:#46e7fa;display:grid;place-items:center;font-size:20px;flex:0 0 auto}.panel h2{font-size:19px;margin:0 0 8px}.panelhead h2{margin:0}.panel p{font-size:13px;line-height:1.6;color:#a7bdd2;margin:7px 0 17px}.panel label{display:block;font-size:13px;font-weight:650;color:#d3e3f1;margin:18px 0 8px}.panel input{width:100%;background:#07182a;border:1px solid #28516e;border-radius:11px;padding:14px 15px;color:#f3f8ff;font:inherit;font-size:14px;outline:none}.panel input:focus{border-color:#00cce2;box-shadow:0 0 0 3px #00cce222}.row{display:flex;gap:10px;align-items:center;flex-wrap:wrap}.btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;background:linear-gradient(100deg,#00c5d7,#00a6c5);color:#032131;border:0;border-radius:11px;padding:12px 17px;font-weight:800;font-size:13px;cursor:pointer;margin-top:12px;text-decoration:none}.btn.secondary{background:#142f49;color:#d8ebfa;border:1px solid #20506b}.btn:hover{filter:brightness(1.1)}.btn:disabled{opacity:.5;cursor:wait}.status{min-height:23px;margin-top:10px;font-size:12px;color:#64e3f4}.muted{color:var(--muted)}.hn-card{border-color:#3d367a;background:linear-gradient(145deg,#14213a,#171d3b)}.hn-card .panelicon{background:#482b38;color:#ff917c}.metric{font-size:26px;font-weight:800;margin:12px 0 1px}.sheetlink{display:inline-block;color:#6beaff;font-size:13px;margin-top:22px}.lower{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(270px,.8fr);gap:18px;margin-top:18px}.resulthead{display:flex;align-items:center;justify-content:space-between;gap:12px}.result{white-space:pre;overflow:auto;overflow-wrap:normal;background:#071626;border:1px solid #1d4563;padding:17px;border-radius:12px;font:12px/1.7 ui-monospace,SFMono-Regular,monospace;max-height:480px;min-height:180px;color:#d7eaff;margin-top:15px;tab-size:2}.list{display:grid;gap:9px}.run{padding:13px;border:1px solid #1b3b55;border-radius:11px;background:#0b1b2d;font-size:12px;overflow-wrap:anywhere}.run strong{display:block;margin-bottom:5px;color:#e5f2ff}.activity{display:grid;gap:0}.activityitem{display:flex;gap:12px;padding:13px 0;border-bottom:1px solid #1a354d;font-size:12px}.activityitem:last-child{border:0}.activitydot{width:32px;height:32px;border-radius:50%;background:#075442;color:#4be6b5;display:grid;place-items:center;flex:0 0 auto}.activityitem strong{display:block;font-size:13px;margin-bottom:4px}.activityitem small{color:#91abc4}.foot{font-size:11px;color:#718ba5;margin-top:24px;line-height:1.7}.statusline{color:#5ce5b6;font-size:12px}.loginbox{max-width:480px;margin:10vh auto;padding:30px;background:#10243a;border:1px solid #1b405b;border-radius:18px}.loginbox h2{margin-top:0}.loginbox input{width:100%;background:#07182a;border:1px solid #28516e;border-radius:10px;padding:13px;color:white;margin-top:10px}.hidden{display:none!important}@media(max-width:1120px){.sidebar{width:220px}.main{margin-left:220px}.metrics{grid-template-columns:repeat(2,minmax(0,1fr))}.hero-art{width:220px}}@media(max-width:820px){.sidebar{position:static;width:auto;height:auto;padding:12px 14px}.brandmark{padding:4px 4px 12px}.nav{display:flex;overflow:auto}.nav a{white-space:nowrap;padding:9px 11px}.nav .ico{display:none}.side-rule,.quick,.side-note{display:none}.main{margin-left:0}.hero-art{display:none}.grid,.lower{grid-template-columns:1fr}.topbar{height:56px}.content{padding:20px 14px 40px}}@media(max-width:460px){.metrics{grid-template-columns:1fr 1fr;gap:8px}.metriccard{padding:12px;gap:9px}.metricicon{width:36px;height:36px;flex-basis:36px}.metricvalue{font-size:18px}.panel{padding:16px}.resulthead{align-items:flex-start;flex-direction:column}.searchfake{width:100%}.userchip{display:none}}

#liveWorkspace{margin:18px 0 22px;background:linear-gradient(145deg,#091827,#0b1d30);border:1px solid #1c526d;border-radius:18px;padding:18px;box-shadow:0 14px 40px #0003}
.live-head{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:14px}.live-head h2{margin:0;font-size:19px}.live-sub{font-size:11px;color:#9bb2ca;margin-top:5px}
.live-badge{display:inline-flex;align-items:center;gap:6px;border:1px solid #176c61;background:#06382f;color:#70f0c3;border-radius:20px;padding:6px 10px;font-size:10px;font-weight:800}
.live-dot{width:7px;height:7px;border-radius:50%;background:#44e9b1;box-shadow:0 0 10px #44e9b1}
.live-stage{border:1px solid #244b67;border-radius:14px;overflow:hidden;background:#030b14}.live-browserbar{display:flex;align-items:center;gap:9px;padding:10px 12px;background:#10263b;border-bottom:1px solid #24445d;flex-wrap:wrap}
.live-lights{display:flex;gap:5px}.live-lights i{width:8px;height:8px;border-radius:50%;background:#f87171}.live-lights i:nth-child(2){background:#fbbf24}.live-lights i:nth-child(3){background:#4ade80}
#liveUrl{flex:1;min-width:160px;color:#c9d9e9;font:11px ui-monospace,monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.live-pill{font-size:10px;font-weight:800;border-radius:8px;padding:5px 8px;background:#183b55;color:#cde8fb}.live-pill.good{background:#064a39;color:#71f0bd}.live-pill.bad{background:#51242c;color:#ff9ca5}
.live-progress{height:4px;background:#122b40}.live-progress>span{display:block;height:100%;width:0;background:linear-gradient(90deg,#00c9de,#49e8b5);transition:width .25s}
.live-viewport{height:420px;display:grid;place-items:center;position:relative;background:repeating-linear-gradient(135deg,#071421,#071421 12px,#091a29 12px,#091a29 24px);overflow:hidden}
#liveFrame{max-width:100%;max-height:100%;object-fit:contain;display:none;box-shadow:0 8px 35px #0009}#liveBoot{color:#9bb7cd;text-align:center;padding:25px;font-size:13px}#liveBoot strong{display:block;color:#d8f5ff;font-size:16px;margin-bottom:8px}
.live-work-grid{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(260px,.7fr);gap:14px;margin-top:14px}.live-panel{background:#0a1929;border:1px solid #1c3d56;border-radius:13px;padding:13px;min-width:0}.live-panel h3{font-size:13px;margin:0 0 10px;color:#d9eafb}
#liveLogs{height:190px;overflow:auto;font:10px/1.65 ui-monospace,monospace;color:#a9c4d9}.live-log{padding:3px 0;border-bottom:1px solid #132c40;overflow-wrap:anywhere}.live-log .time{color:#5d829e;margin-right:7px}.live-log.warn{color:#ffd28a}.live-log.error{color:#ff9b9b}.live-log.success{color:#69e8b7}
.live-gallery-head{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin:18px 0 10px}.live-gallery-head h3{margin:0;font-size:15px}.live-filters{display:flex;gap:7px;flex-wrap:wrap}.live-filters select{background:#07182a;border:1px solid #28516e;border-radius:8px;padding:8px;color:#e9f4ff;font-size:11px}
#liveGallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:11px}.shot-card{background:#0a1929;border:1px solid #1c3d56;border-radius:12px;overflow:hidden;min-width:0}.shot-preview{height:145px;background:#030b14;display:grid;place-items:center;cursor:zoom-in}.shot-preview img{width:100%;height:100%;object-fit:contain}
.shot-info{padding:10px}.shot-url{font:10px ui-monospace,monospace;color:#a9c4d9;overflow-wrap:anywhere;max-height:34px;overflow:hidden}.shot-meta{display:flex;gap:5px;flex-wrap:wrap;margin:8px 0}.shot-meta span{font-size:9px;padding:4px 6px;border-radius:6px;background:#17344b;color:#cde8fb}.shot-meta .pass{background:#064a39;color:#70eab8}.shot-meta .warning{background:#4b3a1b;color:#ffd58a}
.shot-actions{display:flex;gap:6px}.shot-actions button{flex:1;margin:0;padding:7px 5px;font-size:10px}#liveEmpty{color:#7895ae;text-align:center;padding:24px;font-size:12px;grid-column:1/-1}
#liveLightbox{position:fixed;inset:0;z-index:50;background:#020810ed;display:none;align-items:center;justify-content:center;padding:24px}#liveLightbox.open{display:flex}#liveLightbox img{max-width:95vw;max-height:88vh;object-fit:contain}#liveLightbox button{position:absolute;top:18px;right:20px}
@media(max-width:820px){.live-work-grid{grid-template-columns:1fr}.live-viewport{height:300px}}
</style><script src="https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js"></script></head><body><div class="shell">
<aside class="sidebar"><div class="brandmark"><div class="brandicon">🐍</div><div class="brandname">Python Scraper<small>Automation Dashboard</small></div></div>
<nav class="nav"><a class="active" href="#dashboard"><span class="ico">⌂</span>Dashboard</a><a href="#website-scraper"><span class="ico">◎</span>Website Scraper</a><a href="#hn-scraper"><span class="ico">♨</span>Hacker News Scraper</a><a href="#workflows"><span class="ico">▱</span>Workflows</a><a href="#history"><span class="ico">◷</span>Extraction History</a><a href="#exports"><span class="ico">▤</span>Data &amp; Exports</a><a href="#settings"><span class="ico">⚙</span>Settings</a></nav>
<div class="side-rule"></div><div class="quick"><div class="quick-title">Quick Actions</div><a href="#website-scraper">＋ New Scrape</a><a href="#hn-scraper">▷ Run HN Scraper</a><a href="#exports">↓ View Exports</a></div><div class="side-note">Public-page extraction · GitHub Actions<br>Python automation · Cloudflare Worker</div></aside>
<div class="main"><header class="topbar"><div class="searchfake">⌕ &nbsp; Search workflows, results, or URLs…</div><div class="userchip"><span class="avatar">PK</span><span>Scraper Admin&nbsp;⌄</span></div></header>
<main class="content" id="dashboard"><section class="hero"><div><div class="eyebrow">Python Automation · Control Center</div><h1>Scraper <span>Dashboard</span></h1><p>Website extraction and Hacker News workflow control</p></div><div class="hero-art"><div class="py">🐍</div><div class="code">fetch(url)<br>parse(html)<br>export(json)</div></div></section>
<section class="metrics" aria-label="Live dashboard metrics"><div class="metriccard"><div class="metricicon">◎</div><div><div class="metriclabel">Website scraping</div><div class="metricvalue" id="metricScrape">Ready</div></div></div><div class="metriccard"><div class="metricicon">✓</div><div><div class="metriclabel">Latest scrape status</div><div class="metricvalue" id="metricStatus">—</div></div></div><div class="metriccard"><div class="metricicon">♨</div><div><div class="metriclabel">HN workflow</div><div class="metricvalue">Available</div></div></div><div class="metriccard"><div class="metricicon">▤</div><div><div class="metriclabel">Recent Actions runs</div><div class="metricvalue" id="metricRuns">Loading</div></div></div></section>
<section class="panel scrape-panel" id="visual-crawler" style="margin-bottom:18px"><div class="panelhead"><div class="panelicon">📸</div><h2>Visual Website Crawler · Playwright</h2></div><p>Open public pages in real Chromium, discover same-site links, capture responsive screenshots and run basic UI checks. Screenshots stream live to this tab only. Nothing is stored on the server or uploaded as a GitHub artifact.</p><label for="crawlUrl">Website URL</label><input id="crawlUrl" type="url" placeholder="https://example.com"><div class="row"><div style="flex:1;min-width:130px"><label for="crawlPages">Maximum pages (1–100)</label><input id="crawlPages" type="number" min="1" max="100" value="50"></div><div style="flex:1;min-width:130px"><label for="crawlDevices">Devices</label><select id="crawlDevices" style="width:100%;background:#07182a;border:1px solid #28516e;border-radius:11px;padding:14px;color:#fff"><option value="Desktop,Tablet,Mobile">Desktop + Tablet + Mobile</option><option value="Desktop">Desktop</option><option value="Tablet">Tablet</option><option value="Mobile">Mobile</option></select></div><div style="flex:1;min-width:130px"><label for="crawlCapture">Screenshot</label><select id="crawlCapture" style="width:100%;background:#07182a;border:1px solid #28516e;border-radius:11px;padding:14px;color:#fff"><option value="both">Full page + viewport</option><option value="full_page">Full page</option><option value="viewport">Viewport</option></select></div></div><div class="row"><button class="btn" id="crawlBtn">▶ Start visual crawl</button></div><div class="status" id="crawlStatus"></div></section>

<section id="liveWorkspace">
 <div class="live-head"><div><h2>◉ Live Browser Workspace</h2><div class="live-sub">Live Chromium · Activity stream · In-memory screenshot gallery</div></div><div class="row"><span class="live-badge"><i class="live-dot"></i> LIVE SESSION ONLY · NOTHING SAVED ON SERVER</span><button class="btn secondary" id="clearCrawlBtn" style="margin:0">Clear Session</button></div></div>
 <div class="live-stage"><div class="live-browserbar"><span class="live-lights"><i></i><i></i><i></i></span><span id="liveUrl">Waiting for a crawl session…</span><span class="live-pill" id="liveHttp">HTTP —</span><span class="live-pill" id="liveDevice">Desktop</span><span class="live-pill" id="livePage">Page 0 of 0</span><span class="live-badge"><i class="live-dot"></i> LIVE</span></div><div class="live-progress"><span id="liveProgress"></span></div><div class="live-viewport"><img id="liveFrame" alt="Live Playwright browser viewport"><div id="liveBoot"><strong>Booting Chromium Runner…</strong>Start a visual crawl to stream the live browser here.</div></div></div>
 <div class="live-work-grid"><div class="live-panel"><h3>▤ Live Activity Stream</h3><div id="liveLogs"><div class="live-log">Waiting for session events…</div></div></div><div class="live-panel"><h3>◈ Current UI Checks</h3><div id="liveChecks" class="muted" style="font-size:11px;line-height:1.8">Checks appear after each page loads.</div></div></div>
 <div class="live-gallery-head"><h3>▧ Live Captured Screenshots <span id="shotCount" class="muted">(0)</span></h3><div class="row"><div class="live-filters"><select id="filterDevice"><option value="all">All devices</option><option>Desktop</option><option>Tablet</option><option>Mobile</option></select><select id="filterMode"><option value="all">All modes</option><option value="viewport">Viewport</option><option value="full_page">Full Page</option></select></div><button class="btn secondary" id="downloadAllBtn" style="margin:0" disabled>↓ Download All (.zip)</button></div></div>
 <div id="liveGallery"><div id="liveEmpty">Screenshots will appear here as soon as Playwright captures them. Nothing is stored after this browser session.</div></div>
</section><div id="liveLightbox"><button class="btn secondary" id="closeLightbox">✕ Close</button><img id="lightboxImage" alt="Screenshot preview"></div>

<div class="grid"><section class="panel scrape-panel" id="website-scraper"><div class="panelhead"><div class="panelicon">◎</div><h2>Scrape a Public Website</h2></div><p>Extract title, description, canonical URL, Open Graph image, article text and available Product JSON-LD fields.</p><label for="url">Website or product URL</label><input id="url" type="url" placeholder="https://example.com/product"><div class="row"><button class="btn" id="scrapeBtn">▶ &nbsp; Scrape Website</button><button class="btn secondary" id="downloadBtn" disabled>↓ &nbsp; Download JSON</button></div><div class="status" id="scrapeStatus"></div></section>
<section class="panel hn-card" id="hn-scraper"><div class="panelhead"><div class="panelicon">♨</div><h2>Hacker News Scraper</h2></div><p>Starts the existing Python GitHub Actions workflow. Results continue to be appended to your existing Google Sheet.</p><div class="metric">🐍 &nbsp; Python · HN</div><div class="muted" style="font-size:13px">Scheduled workflow remains independent of this dashboard.</div><button class="btn" id="runBtn">▷ &nbsp; Run Hacker News Scraper</button><div class="status" id="runStatus"></div><a class="sheetlink" href="https://docs.google.com/spreadsheets/d/1CmtA7GWPs6KBJDYmGps7KhjMTCc-mANMx4ClbigfxiA/edit#gid=570987850" target="_blank" rel="noopener">▤ &nbsp; Open existing Google Sheet ↗</a></section></div>
<div class="lower"><section class="panel" id="exports"><div class="resulthead"><div><div class="panelhead"><div class="panelicon">▤</div><h2>Latest Website Scrape Result</h2></div><p>Structured output returned by the Worker.</p></div><button class="btn secondary" id="refreshBtn">↻ &nbsp; Refresh Workflow History</button></div><pre class="result" id="output">No website scrape has been run in this session.</pre></section><section class="panel" id="history"><div class="panelhead"><div class="panelicon">◷</div><h2>Recent Activity</h2></div><div class="activity" id="activity"><div class="muted">Recent scrape and workflow events appear here.</div></div></section></div>
<section class="panel" id="workflows" style="margin-top:18px"><div class="panelhead"><div class="panelicon">▱</div><h2>Recent GitHub Actions Runs</h2></div><div class="status" id="historyStatus"></div><div class="list" id="historyList"></div></section>
<footer class="foot" id="settings">Only public HTML pages are supported. Login-protected, paywalled and anti-bot restricted content is not bypassed. Product prices and stock appear only when exposed in public page metadata or page HTML. Respect website terms and robots policies.</footer></main></div></div>
<section class="loginbox hidden" id="login"><h2>Dashboard sign in</h2><p class="muted">Enter the dashboard password configured in Cloudflare Worker secrets.</p><label for="password">Dashboard password</label><input id="password" type="password" autocomplete="current-password" placeholder="Enter password"><button class="btn" id="loginBtn">Unlock dashboard</button><div class="status" id="loginStatus"></div></section>
<script>
let token=sessionStorage.getItem('scraper_token')||'',lastResult=null;
const $=id=>document.getElementById(id);
async function api(path,options={}){const res=await fetch(path,{...options,headers:{'Content-Type':'application/json','Authorization':'Bearer '+token,...options.headers}});const data=await res.json().catch(()=>({error:'Invalid server response'}));if(!res.ok)throw new Error(data.error||('HTTP '+res.status));return data}
function showApp(){$('login').classList.add('hidden');document.querySelector('.shell').classList.remove('hidden');loadRuns()}
async function login(){$('loginStatus').textContent='Checking…';try{const r=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:$('password').value})});const d=await r.json();if(!r.ok)throw new Error(d.error||'Sign-in failed');token=d.token;sessionStorage.setItem('scraper_token',token);showApp()}catch(e){$('loginStatus').textContent=e.message}}
$('loginBtn').onclick=login;$('password').addEventListener('keydown',e=>{if(e.key==='Enter')login()});
if(token)showApp();else{document.querySelector('.shell').classList.add('hidden');$('login').classList.remove('hidden')}
$('scrapeBtn').onclick=async()=>{const b=$('scrapeBtn');b.disabled=true;$('scrapeStatus').textContent='Fetching and parsing page…';try{lastResult=await api('/api/scrape',{method:'POST',body:JSON.stringify({url:$('url').value})});$('output').textContent=JSON.stringify(lastResult,null,2);$('downloadBtn').disabled=false;$('scrapeStatus').textContent='Completed · HTTP '+lastResult.status_code;$('metricScrape').textContent='Completed';$('metricStatus').textContent='HTTP '+lastResult.status_code;$('activity').innerHTML='';const item=document.createElement('div');item.className='activityitem';item.innerHTML='<span class="activitydot">✓</span><div><strong></strong><small></small></div>';item.querySelector('strong').textContent=new URL(lastResult.url).hostname;item.querySelector('small').textContent='HTTP '+lastResult.status_code+' · Latest scrape';$('activity').append(item)}catch(e){$('scrapeStatus').textContent=e.message;$('metricScrape').textContent='Failed';$('metricStatus').textContent='Error'}finally{b.disabled=false}};
$('downloadBtn').onclick=()=>{if(!lastResult)return;const a=document.createElement('a');const blobUrl=URL.createObjectURL(new Blob([JSON.stringify(lastResult,null,2)],{type:'application/json'}));a.href=blobUrl;a.download='website-scrape-result.json';a.click();setTimeout(()=>URL.revokeObjectURL(blobUrl),1000)};
$('runBtn').onclick=async()=>{const b=$('runBtn');b.disabled=true;$('runStatus').textContent='Sending workflow dispatch…';try{await api('/api/run-hn',{method:'POST',body:'{}'});$('runStatus').textContent='Workflow dispatch accepted. Refresh history in a few seconds.';setTimeout(loadRuns,4000)}catch(e){$('runStatus').textContent=e.message}finally{b.disabled=false}};
async function loadRuns(){$('historyStatus').textContent='Loading…';try{const d=await api('/api/runs');$('historyList').innerHTML='';$('metricRuns').textContent=String(d.runs.length);const activity=$('activity');if(!lastResult)activity.innerHTML='';for(const r of d.runs){const el=document.createElement('div');el.className='run';const strong=document.createElement('strong');strong.textContent='#'+r.id+' · '+r.status+' · '+(r.conclusion||'in progress');const sub=document.createElement('span');sub.className='muted';sub.textContent=r.event+' · '+r.branch+' · '+new Date(r.created_at).toLocaleString();el.append(strong,sub);$('historyList').append(el);if(activity.children.length<4){const ai=document.createElement('div');ai.className='activityitem';const dot=document.createElement('span');dot.className='activitydot';dot.textContent=r.conclusion==='success'?'✓':r.conclusion==='failure'?'!':'◷';const body=document.createElement('div');const title=document.createElement('strong');title.textContent='Hacker News · '+(r.conclusion||r.status);const detail=document.createElement('small');detail.textContent='#'+r.id+' · '+new Date(r.created_at).toLocaleString();body.append(title,detail);ai.append(dot,body);activity.append(ai)}}$('historyStatus').textContent=d.runs.length+' recent runs'}catch(e){$('historyStatus').textContent=e.message;$('metricRuns').textContent='Unavailable'}}
$('refreshBtn').onclick=loadRuns;

/* RAM-only live crawl client */
let activeCrawlSocket=null,activeCrawlId=null,liveShots=[],stageObjectUrl=null,livePageTotal=0,liveDone=0;
function crawlUnsavedGuard(event){if(liveShots.length){event.preventDefault();event.returnValue='This live session has unsaved screenshots. Leaving will clear them.';return event.returnValue}}
function releaseCrawlMemory(){
 for(const shot of liveShots){try{URL.revokeObjectURL(shot.objectUrl)}catch{}}
 liveShots=[];
 if(stageObjectUrl){URL.revokeObjectURL(stageObjectUrl);stageObjectUrl=null}
 $('liveFrame').removeAttribute('src');$('liveLightbox').classList.remove('open');$('lightboxImage').removeAttribute('src');$('liveGallery').innerHTML='<div id="liveEmpty">Screenshots will appear here as the live crawl runs.</div>';
 $('shotCount').textContent='(0)';$('downloadAllBtn').disabled=true;
 window.removeEventListener('beforeunload',crawlUnsavedGuard);
}
function addCrawlLog(message,level='info',stamp=Date.now()){
 const row=document.createElement('div');row.className='live-log '+level;
 const time=document.createElement('span');time.className='time';time.textContent=new Date(stamp).toLocaleTimeString();
 row.append(time,document.createTextNode(message));$('liveLogs').append(row);$('liveLogs').scrollTop=$('liveLogs').scrollHeight;
}
function base64Blob(data,mime){
 const raw=atob(data),bytes=new Uint8Array(raw.length);
 for(let i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);
 return new Blob([bytes],{type:mime||'image/jpeg'});
}
function safeFileName(value){return (value||'screenshot').toLowerCase().replace(/^https?:\/\//,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,65)||'screenshot'}
function downloadBlob(blob,name){
 const href=URL.createObjectURL(blob),a=document.createElement('a');a.href=href;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(href),1500);
}
function renderShotFilters(){
 const device=$('filterDevice').value,mode=$('filterMode').value;
 const visible=liveShots.filter(x=>(device==='all'||x.device===device)&&(mode==='all'||x.mode===mode));
 $('liveGallery').innerHTML='';
 if(!visible.length){const empty=document.createElement('div');empty.id='liveEmpty';empty.textContent=liveShots.length?'No screenshots match these filters.':'Screenshots will appear here as Playwright captures them.';$('liveGallery').append(empty)}
 for(const shot of visible){
  const card=document.createElement('div');card.className='shot-card';
  const preview=document.createElement('div');preview.className='shot-preview';
  const img=document.createElement('img');img.src=shot.objectUrl;img.alt=shot.device+' '+shot.mode+' screenshot';preview.append(img);
  preview.onclick=()=>{$('lightboxImage').src=shot.objectUrl;$('liveLightbox').classList.add('open')};
  const info=document.createElement('div');info.className='shot-info';
  const url=document.createElement('div');url.className='shot-url';url.textContent=shot.url;
  const meta=document.createElement('div');meta.className='shot-meta';
  for(const label of ['Page '+shot.page,shot.device,shot.mode==='full_page'?'Full Page':'Viewport']){const tag=document.createElement('span');tag.textContent=label;meta.append(tag)}
  const status=document.createElement('span');status.className=shot.ui_status==='pass'?'pass':'warning';status.textContent='UI '+(shot.ui_status||'unknown');meta.append(status);
  const actions=document.createElement('div');actions.className='shot-actions';
  const view=document.createElement('button');view.className='btn secondary';view.textContent='Preview';view.onclick=preview.onclick;
  const down=document.createElement('button');down.className='btn';down.textContent='↓ Download';down.onclick=()=>downloadBlob(shot.blob,shot.filename);
  actions.append(view,down);info.append(url,meta,actions);card.append(preview,info);$('liveGallery').append(card);
 }
 $('shotCount').textContent='('+liveShots.length+')';$('downloadAllBtn').disabled=!liveShots.length;
 if(liveShots.length)window.addEventListener('beforeunload',crawlUnsavedGuard);
}
function receiveCrawlEvent(event){
 if(event.crawl_id&&event.crawl_id!==activeCrawlId)return;
 const type=event.type||'event',stamp=event.timestamp||Date.now();
 const message=event.message||type.replaceAll('_',' ');
 addCrawlLog(message,event.level==='error'||type==='failed'?'error':event.level==='warning'?'warn':type==='completed'?'success':'info',stamp);
 if(event.url)$('liveUrl').textContent=event.url;
 if(event.device)$('liveDevice').textContent=event.device;
 if(event.page){$('livePage').textContent='Page '+event.page+' of '+(event.total||livePageTotal||'?');}
 if(type==='opening_url'){$('liveHttp').textContent='HTTP —';$('liveHttp').className='live-pill'}
 if(type==='opening_url'||type==='booting'){
  $('liveBoot').style.display='block';
  $('liveBoot').innerHTML='<strong>Booting Chromium Runner…</strong>'+(event.message||'Launching Chromium. Live frames will appear shortly.');
 }
 if(type==='frame'){
  try{const blob=base64Blob(event.image,event.mime),next=URL.createObjectURL(blob);if(stageObjectUrl)URL.revokeObjectURL(stageObjectUrl);stageObjectUrl=next;$('liveFrame').src=next;$('liveFrame').style.display='block';$('liveBoot').style.display='none'}catch(e){addCrawlLog('Could not render live frame: '+e.message,'warn')}
 }
 if(type==='screenshot'){
  try{
   const blob=base64Blob(event.image,event.mime),host=safeFileName(new URL(event.url).hostname);
   const name=host+'-page'+event.page+'-'+String(event.device||'desktop').toLowerCase()+'-'+event.mode+'.jpg';
   liveShots.push({blob,objectUrl:URL.createObjectURL(blob),filename:name,url:event.url,page:event.page,device:event.device,mode:event.mode,ui_status:event.ui_status||'warning'});
   renderShotFilters();
  }catch(e){addCrawlLog('Screenshot render failed: '+e.message,'error')}
 }
 if(type==='ui_checks'){
  const c=event.checks||{},rows=[['HTTP status',c.http_status??'—'],['Load time',(c.load_time_ms??'—')+' ms'],['Console errors',c.console_error_count??(c.console_errors||[]).length],['Broken images',c.broken_images??'—'],['Horizontal overflow',c.horizontal_overflow?'Yes':'No']];
  $('liveChecks').textContent='';for(const pair of rows){const line=document.createElement('div');line.textContent=pair[0]+': '+pair[1];$('liveChecks').append(line)}
 }
 if(type==='page_done'){
  if(event.status){$('liveHttp').textContent='HTTP '+event.status;$('liveHttp').className='live-pill '+(event.status>=200&&event.status<400?'good':'bad')}
  liveDone=Math.max(liveDone,event.page||0);$('liveProgress').style.width=Math.min(100,liveDone/Math.max(1,event.total||livePageTotal)*100)+'%';
 }
 if(type==='completed'||type==='failed'){
  if(type==='completed'){$('liveProgress').style.width='100%';if(event.pages_completed)$('livePage').textContent='Page '+event.pages_completed+' of '+event.pages_completed}
  $('crawlStatus').textContent=type==='completed'?'Live crawl completed · '+liveShots.length+' screenshots in browser memory.':'Live crawl failed.';
  if(activeCrawlSocket){const socket=activeCrawlSocket;activeCrawlSocket=null;setTimeout(()=>{try{socket.close()}catch{}},800)}
  $('crawlBtn').disabled=false;
 }
}
$('filterDevice').onchange=renderShotFilters;$('filterMode').onchange=renderShotFilters;
$('closeLightbox').onclick=()=>{$('liveLightbox').classList.remove('open');$('lightboxImage').removeAttribute('src')};
$('liveLightbox').onclick=e=>{if(e.target===$('liveLightbox'))$('closeLightbox').click()};
$('clearCrawlBtn').onclick=()=>{
 if(activeCrawlSocket){try{activeCrawlSocket.close()}catch{}activeCrawlSocket=null}
 releaseCrawlMemory();activeCrawlId=null;liveDone=0;livePageTotal=0;
 $('liveLogs').innerHTML='';$('liveChecks').textContent='Session cleared.';
 $('liveBoot').style.display='block';$('liveBoot').innerHTML='<strong>Live session cleared</strong>All screenshot Blob URLs have been revoked.';
 $('liveFrame').style.display='none';$('liveHttp').textContent='HTTP —';$('liveDevice').textContent='Desktop';$('livePage').textContent='Page 0 of 0';$('liveProgress').style.width='0%';$('liveUrl').textContent='No active crawl session';$('crawlStatus').textContent='Session cleared from browser memory.';
};
$('downloadAllBtn').onclick=async()=>{
 if(!liveShots.length)return;
 if(!window.JSZip){addCrawlLog('ZIP library is unavailable; use individual downloads.','error');return}
 const b=$('downloadAllBtn');b.disabled=true;b.textContent='Packing ZIP…';
 try{const zip=new JSZip();for(const shot of liveShots)zip.file(shot.filename,shot.blob);const blob=await zip.generateAsync({type:'blob',compression:'STORE'});downloadBlob(blob,'visual-crawl-'+(activeCrawlId||'session')+'.zip');addCrawlLog('Created client-side ZIP from '+liveShots.length+' in-memory screenshots.','success')}
 catch(e){addCrawlLog('ZIP creation failed: '+e.message,'error')}
 finally{b.disabled=false;b.textContent='↓ Download All (.zip)'}
};
async function startLiveCrawl(){
 const b=$('crawlBtn');b.disabled=true;releaseCrawlMemory();liveDone=0;livePageTotal=Math.max(1,Number($('crawlPages').value)||1);
 $('liveLogs').innerHTML='';$('liveChecks').textContent='Waiting for first page…';$('liveBoot').style.display='block';
 $('liveBoot').innerHTML='<strong>Booting Chromium Runner…</strong>GitHub Actions runner is starting. This commonly takes 15–30 seconds.';
 $('liveFrame').style.display='none';$('liveProgress').style.width='0%';$('liveHttp').textContent='HTTP —';$('livePage').textContent='Page 0 of '+livePageTotal;addCrawlLog('Dispatching live Playwright crawl…');
 try{
  const d=await api('/api/crawl/start',{method:'POST',body:JSON.stringify({url:$('crawlUrl').value,max_pages:Number($('crawlPages').value),devices:$('crawlDevices').value,screenshot_mode:$('crawlCapture').value})});
  activeCrawlId=d.crawl_id;
  const socketUrl=d.ws_url+'?token='+encodeURIComponent(d.ws_token);activeCrawlSocket=new WebSocket(socketUrl);
  activeCrawlSocket.onopen=()=>addCrawlLog('Connected to in-memory CrawlSessionHub relay.','success');
  activeCrawlSocket.onmessage=message=>{try{receiveCrawlEvent(JSON.parse(message.data))}catch(e){addCrawlLog('Invalid stream message: '+e.message,'error')}};
  activeCrawlSocket.onerror=()=>addCrawlLog('Live WebSocket connection error.','error');
  activeCrawlSocket.onclose=()=>{if(activeCrawlSocket!==null){activeCrawlSocket=null;addCrawlLog('Live connection closed.','warn');$('crawlBtn').disabled=false}};
  $('crawlStatus').textContent='Crawl '+d.crawl_id+' dispatched. Connecting to live browser…';
 }catch(e){$('crawlStatus').textContent=e.message;addCrawlLog('Could not start crawl: '+e.message,'error');b.disabled=false}
}
$('crawlBtn').onclick=startLiveCrawl;

</script></body></html>`
const cors = { "Access-Control-Allow-Origin": "same-origin", "Vary": "Origin" };
function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"}})}
function b64url(bytes){return btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}
async function sign(payload,secret){const key=await crypto.subtle.importKey("raw",new TextEncoder().encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]);return b64url(await crypto.subtle.sign("HMAC",key,new TextEncoder().encode(payload)))}
async function createWsToken(crawlId,secret){const payload=btoa(JSON.stringify({crawl_id:crawlId,exp:Date.now()+2*60*1000})).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_");return payload+"."+await sign(payload,secret)}
async function verifyWsToken(token,crawlId,env){const [payload,sig]=String(token||"").split(".");if(!payload||!sig||!env.DASHBOARD_PASSWORD)return false;try{if(await sign(payload,env.DASHBOARD_PASSWORD)!==sig)return false;const data=JSON.parse(atob(payload.replace(/-/g,"+").replace(/_/g,"/")));return data.crawl_id===crawlId&&data.exp>Date.now()}catch{return false}}
async function authorized(request,env){const h=request.headers.get("Authorization")||"";const token=h.startsWith("Bearer ")?h.slice(7):"";const [payload,sig]=token.split(".");if(!payload||!sig)return false;try{const expected=await sign(payload,env.DASHBOARD_PASSWORD);if(expected!==sig)return false;const data=JSON.parse(atob(payload.replace(/-/g,"+").replace(/_/g,"/")));return data.exp>Date.now()}catch{return false}}
function decode(s){return (s||"").replace(/&nbsp;|&#160;|&#xA0;/gi," ").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#(\\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/&#x([\\da-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).trim()}
function meta(html,key,attr="property"){for(const m of html.matchAll(/<meta\b[^>]*>/gi)){const tag=m[0];const av=tag.match(new RegExp("\\b"+attr+"\\s*=\\s*[\"']([^\"']+)","i"))?.[1];if(av===key){const cv=tag.match(/\bcontent\s*=\s*[\"']([^\"']*)/i)?.[1]||"";return decode(cv)}}return ""}
function collapseRepeatedPrefix(value){const text=(value||"").trim();const max=Math.min(700,Math.floor(text.length/2));for(let n=max;n>=40;n--){const prefix=text.slice(0,n);const at=text.indexOf(prefix,n);if(at>=n&&at<=900)return text.slice(at).trim()}return text}
function cleanText(html){return decode(html.replace(/<!--[\s\S]*?-->/g," ").replace(/<script\b(?:"[^"]*"|'[^']*'|[^'">])*?>[\s\S]*?<\/script\s*>/gi," ").replace(/<style\b(?:"[^"]*"|'[^']*'|[^'">])*?>[\s\S]*?<\/style\s*>/gi," ").replace(/<\/?[a-z][\w:-]*(?:\s+(?:"[^"]*"|'[^']*'|[^'"<>])*)?\s*\/?>/gi," ").replace(/\s+/g," "))}
function findTagMatches(html,tags){const re=new RegExp("<("+tags+")\\b((?:\"[^\"]*\"|'[^']*'|[^'\">])*)>([\\s\\S]*?)<\\/\\1\\s*>","gi");return [...html.matchAll(re)]}
function findTagText(html,tag){const match=findTagMatches(html,tag)[0];return match?cleanText(match[3]):""}
function findClassText(html,tag,className){const re=new RegExp("<"+tag+"\\\\b((?:\\"[^\\"]*\\"|'[^']*'|[^'\\">])*)>([\\\\s\\\\S]*?)<\\\\/"+tag+"\\\\s*>","gi");for(const match of html.matchAll(re)){if(new RegExp("\\\\bclass\\\\s*=\\\\s*([\\\"'])[^\\\"']*\\\\b"+className+"\\\\b[^\\\"']*\\\\1","i").test(match[1]))return cleanText(match[2])}return ""}
function findClassTag(html,tag,className){const re=new RegExp("<"+tag+"\\\\b((?:\\"[^\\"]*\\"|'[^']*'|[^'\\">])*)>","gi");for(const match of html.matchAll(re)){if(new RegExp("\\\\bclass\\\\s*=\\\\s*([\\\"'])[^\\\"']*\\\\b"+className+"\\\\b[^\\\"']*\\\\1","i").test(match[1]))return match[0]}return ""}
function attrValue(tag,name){return decode(tag.match(new RegExp("\\b"+name+"\\s*=\\s*[\"']([^\"']*)","i"))?.[1]||"")}
function extract(html,url,status){const title=decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]||"");const desc=meta(html,"description","name")||meta(html,"og:description");let image=meta(html,"og:image")||meta(html,"twitter:image","name");const canonical=decode(html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1]||url);let product={};for(const m of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)){try{const parsed=JSON.parse(m[1]);const stack=[parsed];while(stack.length){const x=stack.pop();if(Array.isArray(x)){stack.push(...x);continue}if(x&&typeof x==="object"){const t=Array.isArray(x["@type"])?x["@type"]:[x["@type"]];if(t.includes("Product")){product=x;break}stack.push(...Object.values(x))}}if(product.name)break}catch{}}let offers=Array.isArray(product.offers)?product.offers[0]:product.offers||{};let productName=product.name||findTagText(html,"h1");let price=offers.price??"";let currency=offers.priceCurrency||"";let availability=(offers.availability||"").split("/").pop();let priceText=findClassText(html,"p","price_color");if(!price&&priceText){price=priceText;const symbol=(priceText.match(/[£$€]/)||[])[0];currency=symbol==="£"?"GBP":symbol==="$"?"USD":symbol==="€"?"EUR":""}if(!availability)availability=findClassText(html,"p","availability");if(!image){const img=findClassTag(html,"img","thumbnail")||html.match(/<img[^>]+>/i)?.[0]||"";const src=attrValue(img,"src")||attrValue(img,"data-src");if(src)image=new URL(src,url).href}let productDescription="";const marker=html.search(/id=["']product_description["']/i);if(marker>=0){const section=html.slice(marker);const p=findTagMatches(section,"p")[0];if(p)productDescription=collapseRepeatedPrefix(cleanText(p[3]))}if(!productDescription){const candidates=findTagMatches(html,"p").map(m=>cleanText(m[3])).filter(t=>t.length>100&&!/customer reviews|write a review|availability|price/i.test(t));productDescription=collapseRepeatedPrefix(candidates[0]||"")}const description=productDescription||collapseRepeatedPrefix(product.description||desc||"");const seen=new Set();let paragraphs=findTagMatches(html,"p|h1|h2|h3").map(m=>collapseRepeatedPrefix(cleanText(m[3]))).filter(x=>x.length>35&&!/customer reviews|write a review|add to basket|add to cart/i.test(x)).filter(x=>{const key=x.toLowerCase();if(seen.has(key))return false;seen.add(key);return true}).slice(0,12);return {url,title:title||productName||"Untitled page",description,image,canonical,site_name:meta(html,"og:site_name"),published:meta(html,"article:published_time")||meta(html,"date","name"),author:meta(html,"author","name"),product_name:productName,price,currency,availability,paragraphs,status_code:status}}
function nonPublicAddress(value){
 const ip=String(value||"").toLowerCase().replace(/^\[|\]$/g,"");
 if(ip.includes(".")){
  const parts=ip.split(".").map(Number);
  if(parts.length===4&&parts.every(n=>Number.isInteger(n)&&n>=0&&n<=255)){
   const [a,b,c]=parts;
   return a===0||a===10||a===127||a>=224||(a===100&&b>=64&&b<=127)||(a===169&&b===254)||(a===172&&b>=16&&b<=31)||(a===192&&(b===168||(b===0&&(c===0||c===2))||(b===88&&c===99)))||(a===198&&(b===18||b===19||(b===51&&c===100)))||(a===203&&b===0&&c===113);
  }
 }
 if(ip.includes(":")){
  if(ip==="::"||ip==="::1"||ip.startsWith("fc")||ip.startsWith("fd")||ip.startsWith("fe8")||ip.startsWith("fe9")||ip.startsWith("fea")||ip.startsWith("feb")||ip.startsWith("ff")||ip.startsWith("2001:db8"))return true;
  const mapped=ip.match(/::ffff:(\d+\.\d+\.\d+\.\d+)$/);if(mapped)return nonPublicAddress(mapped[1]);
  const first=parseInt(ip.split(":")[0]||"0",16);return !(first>=0x2000&&first<=0x3fff);
 }
 return true;
}
async function publicCrawlUrl(raw){
 const target=publicUrl(raw),host=target.hostname.replace(/^\[|\]$/g,"").toLowerCase();if(host.endsWith(".internal")||host.endsWith(".lan")||host.endsWith(".home")||host.endsWith(".test"))throw new Error("Internal hostnames are blocked.");
 const lookups=await Promise.all(["A","AAAA"].map(async type=>{
  const response=await fetch("https://cloudflare-dns.com/dns-query?name="+encodeURIComponent(host)+"&type="+type,{headers:{"accept":"application/dns-json"}});
  if(!response.ok)throw new Error("Could not validate public DNS for the target hostname.");
  const data=await response.json();if(data.Status!==0&&data.Status!==3)throw new Error("DNS validation failed for the target hostname.");
  return (data.Answer||[]).filter(answer=>answer.type===1||answer.type===28).map(answer=>answer.data);
 }));
 const addresses=lookups.flat();if(!addresses.length)throw new Error("Target hostname has no public DNS address.");
 if(addresses.some(nonPublicAddress))throw new Error("Target hostname resolves to a private or reserved IP range.");
 return target;
}
function publicUrl(raw){let u;try{u=new URL(raw)}catch{throw new Error("Enter a valid complete website URL.")}if(!["http:","https:"].includes(u.protocol)||u.username||u.password)throw new Error("Only public HTTP/HTTPS URLs without embedded credentials are accepted.");const h=u.hostname.toLowerCase();if(h==="localhost"||h.endsWith(".localhost")||h.endsWith(".local")||h==="metadata.google.internal"||/^\d{1,3}(\.\d{1,3}){3}$/.test(h)||h.includes(":")||!h.includes("."))throw new Error("Local, IP-literal and internal hostnames are blocked.");return u}
async function fetchPublic(url){let current=url;for(let i=0;i<4;i++){const res=await fetch(current,{redirect:"manual",headers:{"User-Agent":"Mozilla/5.0 (compatible; PythonScraperDashboard/1.0)","Accept":"text/html,application/xhtml+xml"}});if([301,302,303,307,308].includes(res.status)){const loc=res.headers.get("Location");if(!loc)throw new Error("Website redirect had no Location header.");current=publicUrl(new URL(loc,current).href);continue}if(!res.ok)throw new Error("Website returned HTTP "+res.status);const type=res.headers.get("Content-Type")||"";if(!type.toLowerCase().includes("html"))throw new Error("URL did not return an HTML webpage.");const len=Number(res.headers.get("Content-Length")||0);if(len>5_000_000)throw new Error("Page exceeds the 5 MB safety limit.");const html=await res.text();if(new TextEncoder().encode(html).length>5_000_000)throw new Error("Page exceeds the 5 MB safety limit.");return extract(html,current.href,res.status)}throw new Error("Too many redirects.")}
async function github(path,env,options={}){const r=await fetch("https://api.github.com/repos/prem-pk-dev/python/"+path,{...options,headers:{"Accept":"application/vnd.github+json","Authorization":"Bearer "+env.GITHUB_TOKEN,"X-GitHub-Api-Version":"2022-11-28","User-Agent":"python-scraper-dashboard",...(options.headers||{})}});if(!r.ok)throw new Error("GitHub API returned HTTP "+r.status+": "+(await r.text()).slice(0,350));return r}
export default {async fetch(request,env){const url=new URL(request.url);if(request.method==="OPTIONS")return new Response(null,{status:204,headers:{"Access-Control-Allow-Methods":"GET,POST,OPTIONS","Access-Control-Allow-Headers":"Content-Type,Authorization"}});if(url.pathname==="/"&&request.method==="GET")return new Response(HTML,{headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff","Referrer-Policy":"strict-origin-when-cross-origin","X-Frame-Options":"DENY","Content-Security-Policy":"default-src 'self'; script-src 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'unsafe-inline'; img-src 'self' https: data: blob:; connect-src 'self' wss:; base-uri 'none'; frame-ancestors 'none'"}});if(url.pathname==="/api/login"&&request.method==="POST"){try{const body=await request.json();if(!env.DASHBOARD_PASSWORD||body.password!==env.DASHBOARD_PASSWORD)return json({error:"Incorrect password."},401);const payload=btoa(JSON.stringify({exp:Date.now()+12*60*60*1000})).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_");return json({token:payload+"."+await sign(payload,env.DASHBOARD_PASSWORD)})}catch{return json({error:"Invalid sign-in request."},400)}}
if(url.pathname==="/api/crawl/start"&&request.method==="POST"){
 try{
  if(!await authorized(request,env))return json({error:"Session expired. Sign in again."},401);
  const body=await request.json();let target;try{target=await publicCrawlUrl(body.url)}catch(e){return json({error:e.message},400)}
  const pages=Number(body.max_pages);if(!Number.isInteger(pages)||pages<1||pages>100)return json({error:"max_pages must be an integer from 1 to 100."},400);
  const allowedDevices=["Desktop","Tablet","Mobile","Desktop,Tablet,Mobile"];if(!allowedDevices.includes(body.devices))return json({error:"Select Desktop, Tablet, Mobile, or all three devices."},400);
  const devices=body.devices;const mode=["viewport","full_page","both"].includes(body.screenshot_mode)?body.screenshot_mode:null;if(!mode)return json({error:"screenshot_mode must be viewport, full_page, or both."},400);
  const crawlId=crypto.randomUUID();
  await github("actions/workflows/visual-crawler.yml/dispatches",env,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({ref:"main",inputs:{crawl_id:crawlId,target_url:target.href,max_pages:String(pages),devices,screenshot_mode:mode}})});
  return json({accepted:true,crawl_id:crawlId,ws_url:(url.protocol==="https:"?"wss:":"ws:")+"//"+url.host+"/api/crawl/"+crawlId+"/ws",ws_token:await createWsToken(crawlId,env.DASHBOARD_PASSWORD),message:"Live visual crawl dispatched."});
 }catch(e){return json({error:e.message||"Could not start crawl."},400)}
}
const wsMatch=url.pathname.match(/^\/api\/crawl\/([0-9a-f-]+)\/ws$/i);
if(wsMatch&&request.headers.get("Upgrade")?.toLowerCase()==="websocket"){
 const tokenFromQuery=url.searchParams.get("token")||"";
 if(!await verifyWsToken(tokenFromQuery,wsMatch[1],env))return json({error:"Unauthorized or expired WebSocket session."},401);
 const origin=request.headers.get("Origin");if(origin&&new URL(origin).host!==url.host)return json({error:"WebSocket origin rejected."},403);
 const stub=env.CRAWL_SESSION_HUB.get(env.CRAWL_SESSION_HUB.idFromName(wsMatch[1]));
 return stub.fetch(request);
}
const ingestMatch=url.pathname.match(/^\/api\/crawl\/([0-9a-f-]+)\/ingest$/i);
if(ingestMatch&&request.method==="POST"){
 const expected=env.INGEST_SECRET||"";const provided=(request.headers.get("Authorization")||"").replace(/^Bearer\s+/i,"");
 const a=new TextEncoder().encode(expected),b=new TextEncoder().encode(provided);let diff=a.length^b.length;for(let i=0;i<Math.max(a.length,b.length);i++)diff|=(a[i]||0)^(b[i]||0);
 if(!expected||diff!==0)return json({error:"Unauthorized ingest request."},401);
 const body=await request.clone().text();if(new TextEncoder().encode(body).length>950000)return json({error:"Ingest message exceeds the 950 KB relay limit."},413);
 let event;try{event=JSON.parse(body)}catch{return json({error:"Ingest body must be valid JSON."},400)}
 if(!event||typeof event!=="object"||Array.isArray(event)||event.crawl_id!==ingestMatch[1]||typeof event.type!=="string")return json({error:"Ingest crawl_id or event type does not match this session."},400);
 const stub=env.CRAWL_SESSION_HUB.get(env.CRAWL_SESSION_HUB.idFromName(ingestMatch[1]));
 return stub.fetch(new Request("https://crawl-hub/ingest",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(event)}));
}
if(!url.pathname.startsWith("/api/"))return new Response("Not found",{status:404});if(!await authorized(request,env))return json({error:"Session expired. Sign in again."},401);try{if(url.pathname==="/api/scrape"&&request.method==="POST"){const body=await request.json();return json(await fetchPublic(publicUrl(body.url)))}if(url.pathname==="/api/run-hn"&&request.method==="POST"){await github("actions/workflows/scraper.yml/dispatches",env,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({ref:"main"})});return json({accepted:true})}if(url.pathname==="/api/runs"&&request.method==="GET"){const r=await github("actions/workflows/scraper.yml/runs?per_page=8",env);const d=await r.json();return json({runs:(d.workflow_runs||[]).map(x=>({id:x.id,status:x.status,conclusion:x.conclusion,event:x.event,branch:x.head_branch,created_at:x.created_at}))})}return json({error:"API route not found."},404)}catch(e){return json({error:e.message||"Request failed."},400)}}};


/** Volatile WebSocket relay only. No storage API is called. */
export class CrawlSessionHub {
 constructor(state, env) { this.state=state; this.env=env; }
 async fetch(request) {
  const url=new URL(request.url);
  if(url.pathname.endsWith("/ws")&&request.method==="GET"){
   const pair=new WebSocketPair();const client=pair[0],server=pair[1];
   this.state.acceptWebSocket(server);
   server.send(JSON.stringify({type:"connected",timestamp:Date.now(),message:"Connected to volatile in-memory relay."}));
   return new Response(null,{status:101,webSocket:client});
  }
  if(url.pathname==="/ingest"&&request.method==="POST"){
   const raw=await request.text();if(new TextEncoder().encode(raw).length>950000)return new Response("too large",{status:413});
   const clients=this.state.getWebSockets();if(!clients.length)return new Response("no connected clients; event discarded",{status:202});
   let event;try{event=JSON.parse(raw)}catch{return new Response("invalid JSON",{status:400})}
   const message=JSON.stringify(event);
   for(const ws of clients){try{ws.send(message)}catch{try{ws.close(1011,"relay send failed")}catch{}}}
   return new Response("relayed",{status:202});
  }
  return new Response("not found",{status:404});
 }
 webSocketClose(ws, code, reason, wasClean) {
  try { ws.close(code, reason); } catch {}
 }
 webSocketError(ws, error) {
  try { ws.close(1011, "relay socket error"); } catch {}
 }
}
