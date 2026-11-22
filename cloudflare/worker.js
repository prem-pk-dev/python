import { auditSeo, fetchPublicText, inspectSiteDiscovery } from "./seo-tools.js";
const HTML = String.raw`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><script>(function(){try{var t=localStorage.getItem('automation-studio-theme');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark')}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();</script><meta name="theme-color" content="#0D1117"><title>Python Scraper · Automation Dashboard</title>
<style>
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;min-height:100vh;background:radial-gradient(ellipse at 58% -12%,#0e4163 0,transparent 42%),radial-gradient(ellipse at 0 35%,#0b2944 0,transparent 38%),#06101f}.hidden{display:none!important}.shell{min-height:100vh}.sidebar{position:fixed;inset:0 auto 0 0;width:264px;background:#071626;border-right:1px solid #12334c;padding:22px 18px;display:flex;flex-direction:column;z-index:5}.brandmark{display:flex;gap:12px;align-items:center;padding:4px 6px 30px}.brandicon{width:42px;height:42px;border-radius:13px;background:linear-gradient(145deg,#0da9db,#1554a7);display:grid;place-items:center;font-size:25px;box-shadow:0 0 25px #00c5ed33}.brandname{font-size:17px;font-weight:800}.brandname small{display:block;color:#8ba6c0;font-size:11px;font-weight:500;margin-top:2px}.nav{display:grid;gap:7px}.nav a,.quick a{color:#b7cbe0;text-decoration:none;display:flex;align-items:center;gap:13px;padding:12px 14px;border-radius:13px;font-size:14px}.nav a:hover,.quick a:hover{background:#102d45;color:white}.nav a.active{background:linear-gradient(100deg,#08b9ca,#07506c);color:white;box-shadow:0 7px 22px #00b9ce22}.nav .ico{width:22px;text-align:center;font-size:18px}.side-rule{height:1px;background:#17344a;margin:22px 6px}.quick-title{font-size:13px;font-weight:750;margin:0 8px 10px}.quick a{background:#10263b;border:1px solid #173a54;margin-bottom:8px}.side-note{margin-top:auto;color:#6f8ba7;font-size:11px;line-height:1.6;padding:16px 7px 2px}.main{margin-left:264px;min-width:0}.topbar{height:64px;position:sticky;top:0;z-index:4;background:#071626eF;backdrop-filter:blur(16px);border-bottom:1px solid #15334b;display:flex;align-items:center;justify-content:space-between;padding:0 clamp(20px,3vw,44px);gap:20px}.searchfake{width:min(590px,65%);border:1px solid #183b56;border-radius:15px;background:#0b1e32;color:#8ca7c2;padding:11px 16px;font-size:13px}.userchip{display:flex;align-items:center;gap:10px;font-size:13px;font-weight:700}.avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(145deg,#164a70,#167f9a);display:grid;place-items:center}.content{max-width:1500px;margin:auto;padding:28px clamp(20px,2.5vw,40px) 56px}.hero{display:flex;justify-content:space-between;align-items:center;gap:24px;margin:4px 4px 26px;position:relative}.eyebrow{font-size:11px;letter-spacing:.17em;text-transform:uppercase;color:#53dafa}.hero h1{font-size:clamp(29px,3.2vw,42px);letter-spacing:-.035em;margin:9px 0 6px}.hero h1 span{color:var(--cyan)}.hero p{color:#a9bfd5;margin:0;font-size:15px}.hero-art{width:290px;height:118px;border-radius:20px;background:linear-gradient(130deg,#07345b,#0a6b90 55%,#071d3b);border:1px solid #155b84;display:flex;align-items:center;justify-content:center;gap:18px;overflow:hidden;box-shadow:0 12px 40px #0076b333}.hero-art .py{font-size:58px;filter:drop-shadow(0 0 15px #00bfff88)}.hero-art .code{font:11px/1.7 ui-monospace,monospace;color:#9feaff;border:1px solid #1e83a6;background:#07182bcc;padding:12px 15px;border-radius:9px}.metrics{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-bottom:18px}.metriccard{background:linear-gradient(135deg,#0d263c,#0b1b2e);border:1px solid #16415d;border-radius:16px;padding:17px;min-height:90px;display:flex;align-items:center;gap:14px;min-width:0}.metricicon{width:47px;height:47px;flex:0 0 47px;border-radius:50%;display:grid;place-items:center;background:#073b5b;color:#39dff5;font-size:22px}.metriccard:nth-child(2) .metricicon{background:#064b42;color:#43e7b4}.metriccard:nth-child(3) .metricicon{background:#51233b;color:#ff7c9c}.metriccard:nth-child(4) .metricicon{background:#24265e;color:#9c9dff}.metriclabel{font-size:12px;color:#a9bfd3}.metricvalue{font-size:23px;font-weight:800;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.grid{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(320px,1fr);gap:18px}.panel{background:linear-gradient(145deg,#10243a,#0d1b2e);border:1px solid #1b405b;border-radius:18px;padding:22px;box-shadow:0 12px 36px #0002;min-width:0}.scrape-panel{border-color:#087f9d;box-shadow:0 0 0 1px #00d4e71a,0 14px 38px #0003;position:relative;overflow:hidden}.scrape-panel:after{content:"";position:absolute;right:-38px;top:-42px;width:170px;height:170px;border-radius:50%;border:22px solid #0c6e8a22;pointer-events:none}.panelhead{display:flex;align-items:center;gap:13px;margin-bottom:8px}.panelicon{width:42px;height:42px;border-radius:12px;background:#06455e;color:#46e7fa;display:grid;place-items:center;font-size:20px;flex:0 0 auto}.panel h2{font-size:19px;margin:0 0 8px}.panelhead h2{margin:0}.panel p{font-size:13px;line-height:1.6;color:#a7bdd2;margin:7px 0 17px}.panel label{display:block;font-size:13px;font-weight:650;color:#d3e3f1;margin:18px 0 8px}.panel input{width:100%;background:#07182a;border:1px solid #28516e;border-radius:11px;padding:14px 15px;color:#f3f8ff;font:inherit;font-size:14px;outline:none}.panel input:focus{border-color:#00cce2;box-shadow:0 0 0 3px #00cce222}.row{display:flex;gap:10px;align-items:center;flex-wrap:wrap}.btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;background:linear-gradient(100deg,#00c5d7,#00a6c5);color:#032131;border:0;border-radius:11px;padding:12px 17px;font-weight:800;font-size:13px;cursor:pointer;margin-top:12px;text-decoration:none}.btn.secondary{background:#142f49;color:#d8ebfa;border:1px solid #20506b}.btn:hover{filter:brightness(1.1)}.btn:disabled{opacity:.5;cursor:wait}.status{min-height:23px;margin-top:10px;font-size:12px;color:#64e3f4}.muted{color:var(--muted)}.hn-card{border-color:#3d367a;background:linear-gradient(145deg,#14213a,#171d3b)}.hn-card .panelicon{background:#482b38;color:#ff917c}.metric{font-size:26px;font-weight:800;margin:12px 0 1px}.sheetlink{display:inline-block;color:#6beaff;font-size:13px;margin-top:22px}.lower{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(270px,.8fr);gap:18px;margin-top:18px}.resulthead{display:flex;align-items:center;justify-content:space-between;gap:12px}.result{white-space:pre;overflow:auto;overflow-wrap:normal;background:#071626;border:1px solid #1d4563;padding:17px;border-radius:12px;font:12px/1.7 ui-monospace,SFMono-Regular,monospace;max-height:480px;min-height:180px;color:#d7eaff;margin-top:15px;tab-size:2}.list{display:grid;gap:9px}.run{padding:13px;border:1px solid #1b3b55;border-radius:11px;background:#0b1b2d;font-size:12px;overflow-wrap:anywhere}.run strong{display:block;margin-bottom:5px;color:#e5f2ff}.activity{display:grid;gap:0}.activityitem{display:flex;gap:12px;padding:13px 0;border-bottom:1px solid #1a354d;font-size:12px}.activityitem:last-child{border:0}.activitydot{width:32px;height:32px;border-radius:50%;background:#075442;color:#4be6b5;display:grid;place-items:center;flex:0 0 auto}.activityitem strong{display:block;font-size:13px;margin-bottom:4px}.activityitem small{color:#91abc4}.foot{font-size:11px;color:#718ba5;margin-top:24px;line-height:1.7}.statusline{color:#5ce5b6;font-size:12px}.loginbox{max-width:480px;margin:10vh auto;padding:30px;background:#10243a;border:1px solid #1b405b;border-radius:18px}.loginbox h2{margin-top:0}.loginbox input{width:100%;background:#07182a;border:1px solid #28516e;border-radius:10px;padding:13px;color:white;margin-top:10px}.hidden{display:none!important}@media(max-width:1120px){.sidebar{width:220px}.main{margin-left:220px}.metrics{grid-template-columns:repeat(2,minmax(0,1fr))}.hero-art{width:220px}}@media(max-width:820px){.sidebar{position:static;width:auto;height:auto;padding:12px 14px}.brandmark{padding:4px 4px 12px}.nav{display:flex;overflow:auto}.nav a{white-space:nowrap;padding:9px 11px}.nav .ico{display:none}.side-rule,.quick,.side-note{display:none}.main{margin-left:0}.hero-art{display:none}.grid,.lower{grid-template-columns:1fr}.topbar{height:56px}.content{padding:20px 14px 40px}}@media(max-width:460px){.metrics{grid-template-columns:1fr 1fr;gap:8px}.metriccard{padding:12px;gap:9px}.metricicon{width:36px;height:36px;flex-basis:36px}.metricvalue{font-size:18px}.panel{padding:16px}.resulthead{align-items:flex-start;flex-direction:column}.searchfake{width:100%}.userchip{display:none}}

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
#urlExplorer{margin:16px 0;background:#0a1929;border:1px solid #1c3d56;border-radius:12px;padding:14px}
#urlExplorer h3,#pageNavigator h3{margin:0 0 10px;color:#d9eafb;font-size:14px}
#urlInventory{max-height:240px;overflow:auto;display:grid;gap:5px}
.url-entry{display:flex;align-items:center;gap:8px;width:100%;text-align:left;background:#10263a;border:1px solid #1c3d56;color:#c9d9e8;border-radius:7px;padding:8px;font:10px monospace;cursor:pointer}
.url-entry[aria-current="true"]{border-color:#48b8a5;background:#123c3b}
.url-entry .url-state{margin-left:auto;white-space:nowrap;color:#86a2b9;font:9px sans-serif}
#pageNavigator{margin:16px 0;background:#0a1929;border:1px solid #1c3d56;border-radius:12px;padding:14px}
#selectedPageUrl{font:11px monospace;overflow-wrap:anywhere;color:#9fc6df;margin:8px 0 12px}
#selectedPageScreenshot{display:none;width:100%;max-height:560px;object-fit:contain;background:#071321;border-radius:8px;margin:10px 0}
#selectedPageNoShot{padding:24px;text-align:center;color:#7895ae;background:#071321;border-radius:8px;font-size:12px}
#pageNavigator .row{display:flex;align-items:center;justify-content:space-between;gap:8px}
#pageNavigator button:disabled{opacity:.45;cursor:not-allowed}
@media(max-width:600px){#pageNavigator .row{flex-wrap:wrap}#pageNavigator .row button{flex:1}#urlInventory{max-height:190px}}

@media(max-width:820px){.live-work-grid{grid-template-columns:1fr}.live-viewport{height:300px}}
:root{color-scheme:light;background:#f3f6fa;color:#172338}.hero-art{display:none}body{background:#f3f6fa;color:#172338}.sidebar{width:252px;background:#101b2b;border-right:1px solid #26364a;padding:22px 16px}.brandmark{padding-bottom:24px}.brandicon{background:#0d756e;box-shadow:none}.brandname{color:#f2f7fc}.brandname small{color:#91a4b9}.nav{display:grid;gap:4px}.nav-label{font-size:9px;letter-spacing:.16em;font-weight:800;color:#71849b;padding:17px 12px 5px}.nav-item{width:100%;border:0;background:transparent;color:#b8c7d8;text-align:left;display:flex;align-items:center;gap:12px;padding:11px 12px;border-radius:9px;font-size:13px;font-weight:600;cursor:pointer}.nav-item span{width:20px;color:#9eb2c7;font-size:17px}.nav-item:hover{background:#1b2c40;color:#fff}.nav-item.active{background:#17463f;color:#c9fff0}.side-rule{margin:17px 6px}.quick{display:grid;gap:7px}.quick-title{font-size:10px;letter-spacing:.13em;color:#71849b}.quick button{background:#172a3e;border:1px solid #2a4057;color:#d4e3f1;text-align:left;padding:10px 11px;border-radius:9px;font-size:12px;cursor:pointer}.side-note{color:#7c91a8}.main{margin-left:252px;background:#f3f6fa;min-height:100vh}.topbar{height:68px;background:#fff;border-color:#e6ebf2}.module-search{width:min(560px,70%);border:1px solid #e0e6ee;border-radius:10px;background:#f7f9fc;color:#24364c;padding:11px 14px;font-size:13px}.userchip{color:#26374d}.avatar{background:#dcefe9;color:#116c62}.content{max-width:1500px;padding:30px clamp(20px,3vw,44px) 60px}.view{display:none}.view.active{display:block;animation:viewIn .18s ease}@keyframes viewIn{from{opacity:.5;transform:translateY(4px)}to{opacity:1;transform:none}}.hero{margin:2px 0 25px}.eyebrow{color:#168276;font-size:10px;font-weight:800}.hero h1,.view-heading h1{font-size:clamp(29px,3.2vw,39px);color:#172338;letter-spacing:-.04em}.hero h1 span,.view-heading h1 span{color:#138579}.hero p,.view-heading p{color:#708097}.metrics{gap:12px}.metriccard{background:#fff;border:1px solid #e5eaf1;border-radius:13px;box-shadow:0 2px 8px #152b4210}.metricicon{background:#e8f4f1!important;color:#117b70!important;border-radius:11px}.metriclabel{color:#718097}.metricvalue{color:#1b2a3e}.section-heading{display:flex;justify-content:space-between;align-items:end;margin:28px 0 13px}.section-heading h2{font-size:18px;margin:0 0 5px}.section-heading p{font-size:12px;color:#75849a;margin:0}.section-kicker,.view-chip{font-size:9px;font-weight:800;letter-spacing:.12em;color:#168276;background:#e7f4f1;border:1px solid #cfe8e1;border-radius:30px;padding:7px 10px}.module-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px}.module-card[hidden]{display:none!important}.module-card{min-height:170px;background:#fff;border:1px solid #e3e9f0;border-radius:14px;padding:18px;text-align:left;display:flex;flex-direction:column;align-items:flex-start;cursor:pointer;box-shadow:0 2px 9px #152b4208;transition:transform .16s,border-color .16s}.module-card:hover{transform:translateY(-2px);border-color:#9bcfc3}.module-card b{width:36px;height:36px;display:grid;place-items:center;background:#eaf5f2;border-radius:10px;color:#11796e;font-size:20px;margin-bottom:12px}.module-card strong{font-size:14px;color:#1c2b40}.module-card small{font-size:11px;line-height:1.6;color:#728197;margin-top:7px}.module-card span{font-size:11px;color:#168276;font-weight:750;margin-top:auto;padding-top:12px}.overview-foot{color:#74849a;font-size:11px;margin-top:18px}.view-heading{display:flex;justify-content:space-between;align-items:flex-end;gap:18px;margin:2px 0 23px}.view-heading h1{margin:8px 0 5px}.view-heading p{margin:0;font-size:13px}.panel{background:#fff;border:1px solid #e4eaf1;border-radius:14px;padding:21px;box-shadow:0 2px 10px #152b4208}.panel h2{color:#1c2c41}.panel p{color:#718097}.panel label{color:#34465c}.panel input,.panel select{background:#f8fafc!important;border:1px solid #dce4ed!important;color:#1c2c41!important;border-radius:9px!important}.btn{background:#137d72;color:#fff;border-radius:9px;padding:11px 15px}.btn.secondary{background:#f1f5f8;color:#3b5066;border:1px solid #dce5ec}.status{color:#168276}.tool-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.tool-panel{min-width:0}.tool-results{border-top:1px solid #edf0f4;margin-top:16px;padding-top:14px;min-height:95px;font-size:12px;color:#66768b}.notice-strip{margin-top:16px;padding:12px 14px;background:#edf5f4;border:1px solid #d9ebe7;border-radius:9px;color:#5d766f;font-size:11px}.single-tool{max-width:900px}.single-tool .panel{width:100%}.data-layout,.settings-grid{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(260px,.8fr);gap:15px}.data-layout .result{background:#101d2b;color:#d9e6f2}.data-layout .activityitem strong{color:#24374d}.settings-list{padding:0;margin:15px 0 0;list-style:none}.settings-list li{display:flex;justify-content:space-between;gap:20px;padding:12px 0;border-bottom:1px solid #edf0f3;font-size:11px}.settings-list span{color:#728197;text-align:right;max-width:65%}.list .run{background:#f8fafb;border-color:#e5eaf0}.list .run strong{color:#25374c}#liveWorkspace{margin:18px 0 22px;color:#e8f2ff}.live-panel{background:#0a1929;border-color:#1c3d56}.live-head h2,.live-panel h3{color:#d9eafb}.foot{color:#7c8b9d}@media(max-width:1120px){.module-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.tool-grid{grid-template-columns:1fr}}@media(max-width:820px){.sidebar{position:static;width:auto;height:auto;padding:10px 13px}.brandmark{padding:4px 4px 12px}.nav{display:flex;overflow-x:auto;gap:4px}.nav-label{display:none}.nav-item{white-space:nowrap;width:auto;flex:0 0 auto;padding:9px 11px}.nav-item span{display:none}.side-rule,.quick,.side-note{display:none}.main{margin-left:0}.topbar{height:58px}.content{padding:20px 14px 40px}.module-grid,.data-layout,.settings-grid{grid-template-columns:1fr 1fr}.view-heading{align-items:flex-start;flex-direction:column}}@media(max-width:480px){.metrics,.module-grid,.tool-grid,.data-layout,.settings-grid{grid-template-columns:1fr}.panel{padding:16px}.settings-list li{flex-direction:column}.settings-list span{text-align:left;max-width:none}.module-search{width:100%}.userchip{display:none}}@media(max-width:820px){
.sidebar{position:static;width:auto;height:0;padding:0;border:0;overflow:visible;background:transparent;z-index:auto}
.sidebar .brandmark,.sidebar .side-rule,.sidebar .quick,.sidebar .side-note{display:none}
.sidebar .nav{display:none;position:fixed;top:58px;left:0;right:0;z-index:29;background:#101b2b;padding:12px 14px 16px;border-bottom:1px solid #2a4057;box-shadow:0 14px 28px #0b1726aa;max-height:calc(100dvh - 58px);overflow-y:auto;overscroll-behavior:contain}
.sidebar.menu-open .nav{display:grid;gap:4px}
.sidebar .nav-label{display:block}
.sidebar .nav-item{display:flex;width:100%;white-space:normal;padding:12px;border-radius:9px}
.sidebar .nav-item span{display:inline-block}
.main{margin-left:0;padding-top:58px}
.topbar{position:fixed;top:0;left:0;right:0;width:100%;height:58px;z-index:30;padding:0 12px;gap:10px;box-shadow:0 2px 12px #17233812}
.menu-toggle{display:inline-flex;flex:0 0 40px;width:40px;height:40px;align-items:center;justify-content:center;border:1px solid #dce5ec;border-radius:10px;background:#f7fafc;color:#26374d;font-size:21px;cursor:pointer}
.module-search{width:auto;min-width:0;flex:1}
.userchip{display:none}
}
@media(min-width:821px){.menu-toggle{display:none}}
@media(max-width:820px){body.menu-visible{overflow:hidden}}
:root,[data-theme="dark"]{
 color-scheme:dark;
 --bg-main:#0D1117;--bg-sidebar:#090C10;--bg-panel:#161B22;--bg-elevated:#21262D;--bg-code:#010409;
 --border-default:#30363D;--border-subtle:#21262D;--text-primary:#E6EDF3;--text-secondary:#8B949E;--text-muted:#6E7681;
 --accent-cyan:#06B6D4;--accent-hover:#0891B2;--accent-button-text:#041014;
 --python-highlight:#FACC15;--python-highlight-bg:rgba(250,204,21,.12);
 --status-success:#22C55E;--status-success-bg:rgba(34,197,94,.15);--status-warning:#F59E0B;--status-error:#F85149;
 font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif;
 background:var(--bg-main);color:var(--text-primary)
}
[data-theme="light"]{
 color-scheme:light;
 --bg-main:#F8FAFC;--bg-sidebar:#F1F5F9;--bg-panel:#FFFFFF;--bg-elevated:#F8FAFC;--bg-code:#0F172A;
 --border-default:#E2E8F0;--border-subtle:#E2E8F0;--text-primary:#0F172A;--text-secondary:#475569;--text-muted:#64748B;
 --accent-cyan:#0891B2;--accent-hover:#0E7490;--accent-button-text:#FFFFFF;
 --python-highlight:#CA8A04;--python-highlight-bg:rgba(202,138,4,.12);
 --status-success:#16A34A;--status-success-bg:rgba(34,197,94,.12);--status-warning:#D97706;--status-error:#DC2626
}
html,body{background:var(--bg-main)!important;color:var(--text-primary)!important;transition:background-color .18s ease,color .18s ease}
body{background-image:none!important}
.sidebar{background:var(--bg-sidebar)!important;border-color:var(--border-default)!important}
.brandname,.panel h2,.panelhead h2,.view-heading h1,.hero h1,.section-heading h2{color:var(--text-primary)!important}
.brandname small,.side-note,.nav-label,.metriclabel,.hero p,.view-heading p,.section-heading p,.panel p,.foot,.overview-foot{color:var(--text-secondary)!important}
.brandicon{background:var(--bg-elevated)!important;border:1px solid var(--border-default);box-shadow:none!important;color:var(--python-highlight)}
.nav-item{color:var(--text-secondary)!important;border-left:3px solid transparent!important;border-radius:0 9px 9px 0!important}
.nav-item:hover{background:var(--bg-elevated)!important;color:var(--text-primary)!important}
.nav-item.active{background:color-mix(in srgb,var(--accent-cyan) 13%,transparent)!important;color:var(--text-primary)!important;border-left:3px solid var(--accent-cyan)!important;box-shadow:none!important}
.nav-item span{color:var(--accent-cyan)!important}
.side-rule{background:var(--border-subtle)!important}
.quick button{background:var(--bg-panel)!important;border:1px solid var(--border-default)!important;color:var(--text-primary)!important}
.main{background:var(--bg-main)!important}
.topbar{background:color-mix(in srgb,var(--bg-sidebar) 92%,transparent)!important;border-color:var(--border-default)!important;color:var(--text-primary)!important;box-shadow:0 2px 18px #0002}
.module-search{background:var(--bg-elevated)!important;border:1px solid var(--border-default)!important;color:var(--text-primary)!important}
.module-search::placeholder{color:var(--text-muted)!important}
.userchip{color:var(--text-primary)!important}
.avatar{background:var(--bg-elevated)!important;color:var(--accent-cyan)!important;border:1px solid var(--border-default)}
.hero h1 span,.view-heading h1 span,.eyebrow{color:var(--accent-cyan)!important}
.metriccard,.module-card,.panel,.loginbox,.live-panel,.shot-card,#liveWorkspace,#urlExplorer,#pageNavigator,.run{
 background:var(--bg-panel)!important;border:1px solid var(--border-default)!important;color:var(--text-primary)!important;box-shadow:0 5px 18px #0002
}
.metricicon,.module-card b,.panelicon{background:var(--bg-elevated)!important;color:var(--accent-cyan)!important}
.metriclabel,.metricvalue,.module-card strong,.module-card small{color:var(--text-primary)!important}
.module-card small,.tool-results,.settings-list span{color:var(--text-secondary)!important}
.module-card:hover{border-color:var(--accent-cyan)!important}
.section-kicker,.view-chip{background:var(--python-highlight-bg)!important;border-color:color-mix(in srgb,var(--python-highlight) 35%,transparent)!important;color:var(--python-highlight)!important}
.python-badge,.python-tag,.py-badge,.tag-python,.badge-python{background:var(--python-highlight-bg)!important;color:var(--python-highlight)!important}
.panel label{color:var(--text-secondary)!important}
input,select,textarea,.panel input,.panel select,.panel textarea,.loginbox input{
 background:var(--bg-elevated)!important;border:1px solid var(--border-default)!important;color:var(--text-primary)!important
}
input::placeholder,textarea::placeholder{color:var(--text-muted)!important}
input:focus,select:focus,textarea:focus,.panel input:focus,.panel select:focus,.loginbox input:focus{
 outline:none!important;border-color:var(--accent-cyan)!important;box-shadow:0 0 0 3px color-mix(in srgb,var(--accent-cyan) 22%,transparent)!important
}
.btn{background:var(--accent-cyan)!important;color:var(--accent-button-text)!important;border:1px solid var(--accent-cyan)!important}
.btn:hover{background:var(--accent-hover)!important;border-color:var(--accent-hover)!important;filter:none}
.btn.secondary{background:var(--bg-elevated)!important;color:var(--text-primary)!important;border-color:var(--border-default)!important}
.status,.sheetlink{color:var(--accent-cyan)!important}
.statusline,.live-badge,.shot-meta .pass{color:var(--status-success)!important}
.live-badge,.shot-meta .pass{background:var(--status-success-bg)!important;border-color:color-mix(in srgb,var(--status-success) 35%,transparent)!important}
.live-pill.good{background:var(--status-success-bg)!important;color:var(--status-success)!important}
.live-pill.bad,.live-log.error{background:color-mix(in srgb,var(--status-error) 15%,transparent)!important;color:var(--status-error)!important}
.live-log.warn,.shot-meta .warning{color:var(--status-warning)!important}
.result,.data-layout .result,#liveLogs,.live-log,.live-panel,#liveLightbox{
 background:var(--bg-code)!important;color:#79C0FF!important;border-color:var(--border-default)!important;font-family:ui-monospace,SFMono-Regular,Menlo,monospace!important
}
.result{border:1px solid var(--border-default)!important}
#liveWorkspace{background:var(--bg-panel)!important}
.live-stage,.live-viewport,.shot-preview,#selectedPageScreenshot,#selectedPageNoShot{
 border:1px solid var(--border-default)!important;box-shadow:0 5px 18px #0003!important
}
.live-stage{background:var(--bg-code)!important}
.live-browserbar{background:var(--bg-elevated)!important;border-color:var(--border-default)!important}
.live-viewport{background:var(--bg-code)!important}
.live-panel{background:var(--bg-code)!important}
.live-panel h3,.live-head h2,#urlExplorer h3,#pageNavigator h3{color:var(--text-primary)!important}
#liveUrl,#selectedPageUrl,.shot-url{color:#79C0FF!important}
#selectedPageScreenshot,#selectedPageNoShot{background:var(--bg-code)!important}
.url-entry{background:var(--bg-elevated)!important;border-color:var(--border-default)!important;color:var(--text-primary)!important}
.url-entry[aria-current="true"]{border-color:var(--accent-cyan)!important;background:color-mix(in srgb,var(--accent-cyan) 14%,var(--bg-elevated))!important}
#liveGallery .shot-card{background:var(--bg-panel)!important}
.activityitem{border-color:var(--border-subtle)!important}
.activityitem strong,.run strong{color:var(--text-primary)!important}
.activityitem small{color:var(--text-secondary)!important}
.notice-strip{background:var(--bg-elevated)!important;border-color:var(--border-default)!important;color:var(--text-secondary)!important}
.settings-list li,.tool-results{border-color:var(--border-subtle)!important}
.menu-toggle{background:var(--bg-elevated)!important;border:1px solid var(--border-default)!important;color:var(--text-primary)!important}
#themeToggle{width:38px;height:38px;flex:0 0 38px;display:inline-grid;place-items:center;padding:0;margin:0;border:1px solid var(--border-default);border-radius:10px;background:var(--bg-elevated);color:var(--text-primary);cursor:pointer;transition:background .18s,border-color .18s,color .18s}
#themeToggle:hover{border-color:var(--accent-cyan);color:var(--accent-cyan)}
#themeToggle svg{width:18px;height:18px;display:block}
#themeToggle:focus-visible{outline:2px solid var(--accent-cyan);outline-offset:2px}
@media(prefers-reduced-motion:no-preference){.panel,.metriccard,.module-card,.topbar,.sidebar{transition:background-color .18s ease,border-color .18s ease,color .18s ease}}

:root{color-scheme:dark;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif;background:#06101f;color:#e8f2ff;--panel:#0d1c30;--panel2:#10243a;--line:#173a55;--cyan:#00d7e8;--muted:#9bb2ca;--blue:#1689ff}</style><script src="https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js"></script><style id="automation-studio-ui-fixes">
/* Automation Studio UI consistency and contrast patch */
:root,[data-theme="dark"]{--icon-filter:invert(74%) sepia(56%) saturate(572%) hue-rotate(142deg) brightness(96%) contrast(91%)}
[data-theme="light"]{
 --border-default:#CBD5E1;--border-subtle:#CBD5E1;--text-secondary:#475569;--text-muted:#64748B;
 --icon-filter:invert(35%) sepia(17%) saturate(875%) hue-rotate(167deg) brightness(91%) contrast(91%)
}
.topbar{justify-content:space-between!important;align-items:center!important;gap:16px!important}
.topbar .module-search{flex:1 1 auto!important;width:auto!important;min-width:180px;max-width:680px}
.topbar-actions{display:flex;align-items:center;gap:12px;margin-left:auto;flex:0 0 auto}
.topbar-actions .userchip{display:flex!important;align-items:center;gap:10px;white-space:nowrap}
.ui-icon{width:18px;height:18px;display:inline-block;flex:0 0 auto;object-fit:contain;filter:var(--icon-filter)}
.nav-item{display:flex;align-items:center;gap:10px}
.nav-item .ui-icon{width:19px;height:19px}
.nav-label-text{display:inline;width:auto!important;color:inherit!important;font-size:inherit!important}
.quick button,.btn,.sheetlink{display:inline-flex;align-items:center;gap:8px}
.quick button .ui-icon,.btn .ui-icon,.sheetlink .ui-icon{width:18px;height:18px}
.quick button span{display:inline}
.metricicon .ui-icon{width:23px;height:23px}
.module-card b .ui-icon{width:22px;height:22px}
.panelicon .ui-icon{width:23px;height:23px}
.icon-heading{display:flex;align-items:center;gap:9px}
.icon-heading .ui-icon{width:20px;height:20px}
#themeToggle{display:inline-flex;align-items:center;justify-content:center}
#themeToggle .ui-icon{width:19px;height:19px}
.profile-chevron{width:12px;height:12px;margin-left:2px}
.menu-toggle .ui-icon{width:19px;height:19px}
.inline-refresh{width:16px;height:16px}
.inline-play{width:17px;height:17px}
.activitydot .ui-icon{width:16px;height:16px;vertical-align:middle}
#pageNavigator .row{margin-bottom:12px}
#pageNavigator button:disabled,
#pageNavigator .btn:disabled{
 opacity:1!important;cursor:not-allowed!important;pointer-events:none;
 color:#94A3B8!important;background:#334155!important;border-color:#475569!important;
 box-shadow:none!important;filter:none!important
}
#pageNavigator button:disabled .ui-icon{opacity:.65;filter:grayscale(1)!important}
#liveLogs,#liveChecks,.live-stage,#urlExplorer,#pageNavigator{color:#E6EDF3}
.live-panel h3,#urlExplorer h3,#pageNavigator h3,
#liveLogs h4,#liveChecks h4{color:#E6EDF3!important}
.live-panel .muted,#liveChecks .muted,#liveLogs .muted,
.live-panel label,#urlExplorer .muted,#pageNavigator .muted{color:#94A3B8!important}
#urlDiscoveryMeta,#urlInventoryEmpty,#selectedPageUrl,#selectedPageNoShot,#liveEmpty,
#urlInventory .muted,.live-sub{color:var(--text-secondary)!important}
#liveEmpty{grid-column:1/-1}
[data-theme="light"] .panel,
[data-theme="light"] .metriccard,
[data-theme="light"] .module-card,
[data-theme="light"] .tool-results,
[data-theme="light"] .activityitem,
[data-theme="light"] .run{border-color:#CBD5E1!important;box-shadow:0 1px 3px rgba(15,23,42,.08)!important}
[data-theme="light"] .panel input,
[data-theme="light"] .panel select,
[data-theme="light"] .panel textarea,
[data-theme="light"] .module-search,
[data-theme="light"] input,
[data-theme="light"] select,
[data-theme="light"] textarea{border-color:#CBD5E1!important;color:#0F172A}
[data-theme="light"] .panel p,
[data-theme="light"] .metriclabel,
[data-theme="light"] .view-heading p,
[data-theme="light"] .section-heading p,
[data-theme="light"] .side-note,
[data-theme="light"] .nav-label,
[data-theme="light"] .muted{color:#475569}
[data-theme="light"] .badge,[data-theme="light"] .status{border-color:#CBD5E1}
@media(max-width:820px){
 .topbar-actions{gap:8px}
 .topbar-actions .userchip{gap:0}
 .topbar-actions .userchip>span:last-child{display:none}
 .topbar .module-search{min-width:0}
}
 .command-overlay{position:fixed;inset:0;z-index:100;background:#020817c9;display:none;align-items:flex-start;justify-content:center;padding:12vh 16px}.command-overlay.open{display:flex}.command-dialog{width:min(640px,100%);background:var(--bg-elevated);border:1px solid var(--border-default);border-radius:16px;overflow:hidden;box-shadow:0 24px 80px #0008}.command-dialog input{width:100%;padding:18px;border:0;border-bottom:1px solid var(--border-default);background:transparent;color:var(--text-primary);font:inherit}.command-list{max-height:55vh;overflow:auto;padding:8px}.command-item{display:flex;width:100%;justify-content:space-between;padding:11px;border:0;border-radius:8px;background:transparent;color:var(--text-primary);text-align:left;cursor:pointer}.command-item[aria-selected=true],.command-item:hover{background:var(--bg-panel)}.command-item small{color:var(--text-secondary)}.command-hint{padding:10px;color:var(--text-secondary);font-size:10px}.progress-meta{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;padding:8px;background:var(--bg-elevated);font-size:11px;color:var(--text-secondary)}.preset-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:10px 0}.compare-wrap{position:relative;height:420px;overflow:hidden;background:#030b14;display:none}.compare-wrap img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}.compare-wrap input{position:absolute;z-index:2;bottom:10px;left:5%;width:90%}.status-badge{display:inline-block;border-radius:20px;padding:3px 7px;font-size:10px;background:var(--bg-elevated);color:var(--text-primary);border:1px solid var(--border-default)}.status-badge.good{background:var(--status-success-bg);color:var(--status-success)}.status-badge.bad{background:var(--status-error-bg);color:var(--status-error)}.status-badge.warn{background:var(--status-warning-bg);color:var(--status-warning)}

/* Browser & QA viewport, screenshot gallery and preview layout fixes */
.live-viewport{height:auto;max-height:680px;overflow-y:auto;overflow-x:hidden;background:#010409;display:flex;justify-content:center;align-items:flex-start;position:relative}
#liveFrame{max-width:100%;height:auto;max-height:none;display:none;object-fit:contain;object-position:top center;flex:0 0 auto}
#liveWorkspace:fullscreen{width:100%;height:100%;max-height:100vh;overflow:auto;background:var(--bg-panel,#071626);padding:18px}
#liveWorkspace:fullscreen .live-viewport{max-height:calc(100vh - 230px);min-height:180px}
#liveGallery{grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:18px}
#liveGallery .shot-card{display:flex;flex-direction:column;overflow:hidden;min-width:0;background:var(--bg-card,var(--bg-panel));border:1px solid var(--border-default);border-radius:10px}
#liveGallery .shot-preview{width:100%;height:auto;aspect-ratio:16 / 10;overflow:hidden;flex-shrink:0;background:#010409;border-bottom:1px solid var(--border-default);display:block}
#liveGallery .shot-preview img{width:100%;height:100%;object-fit:cover;object-position:top center;display:block}
#liveGallery .shot-info{background:var(--bg-card,var(--bg-panel));padding:12px;position:relative;z-index:2;min-width:0}
#liveGallery .shot-url{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;overflow-wrap:normal;max-height:none}
#liveLightbox{overflow-y:auto;overflow-x:hidden;align-items:flex-start}
#liveLightbox img{max-width:95vw;max-height:none;width:auto;height:auto;object-fit:contain;flex:0 0 auto;margin:auto}
@media(max-width:680px){#liveGallery{grid-template-columns:minmax(0,1fr)}}

/* Live Hacker News reader */
#hnNewsFeed{margin-top:18px}
.hn-feed-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin:14px 0}
.hn-tabs{display:flex;gap:7px;flex-wrap:wrap}
.hn-tab{border:1px solid var(--border-default);background:var(--bg-elevated);color:var(--text-secondary);border-radius:9px;padding:8px 11px;font-size:12px;font-weight:700;cursor:pointer}
.hn-tab[aria-selected="true"]{background:color-mix(in srgb,var(--accent-cyan) 15%,var(--bg-elevated));border-color:var(--accent-cyan);color:var(--text-primary)}
.hn-feed-tools{display:flex;align-items:center;gap:8px;flex:1 1 300px;justify-content:flex-end}
#hnNewsSearch{max-width:310px;min-width:160px;padding:10px 12px;font-size:12px}
#hnRefreshBtn{margin:0;white-space:nowrap}
#hnFeedStatus{font-size:11px;color:var(--text-secondary);margin:4px 0 12px}
#hnNewsGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px}
.hn-news-card{min-width:0;padding:16px;background:var(--bg-panel);border:1px solid var(--border-default);border-radius:13px;display:flex;flex-direction:column;gap:10px;box-shadow:0 3px 12px #0000000a}
.hn-news-top{display:flex;align-items:center;justify-content:space-between;gap:8px}
.hn-rank,.hn-points,.hn-domain{display:inline-flex;align-items:center;border-radius:30px;padding:5px 9px;font-size:10px;font-weight:800;white-space:nowrap}
.hn-rank{background:var(--bg-elevated);color:var(--text-secondary);border:1px solid var(--border-default)}
.hn-points{background:var(--status-success-bg);color:var(--status-success)}
.hn-domain{background:color-mix(in srgb,var(--accent-cyan) 12%,var(--bg-elevated));color:var(--accent-cyan);max-width:100%;overflow:hidden;text-overflow:ellipsis}
.hn-news-title{font-size:16.5px;line-height:1.4;font-weight:750;letter-spacing:-.01em;color:var(--text-primary);margin:0;overflow-wrap:anywhere}
.hn-news-title a{color:inherit;text-decoration:none}
.hn-news-title a:hover{color:var(--accent-cyan)}
.hn-story-preview{font-size:12px;line-height:1.55;color:var(--text-secondary);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:36px}
.hn-story-meta{font-size:11px;line-height:1.5;color:var(--text-secondary)}
.hn-news-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:auto;padding-top:2px}
.hn-news-actions a{display:inline-flex;align-items:center;justify-content:center;border-radius:8px;padding:8px 10px;font-size:11px;font-weight:750;text-decoration:none;background:var(--accent-cyan);color:var(--accent-button-text);border:1px solid var(--accent-cyan)}
.hn-news-actions a.secondary{background:var(--bg-elevated);color:var(--text-primary);border-color:var(--border-default)}
.hn-news-actions a:hover{filter:brightness(1.08)}
.hn-skeleton{height:185px;border-radius:13px;border:1px solid var(--border-default);background:linear-gradient(100deg,var(--bg-panel) 25%,var(--bg-elevated) 45%,var(--bg-panel) 65%);background-size:220% 100%;animation:hnShimmer 1.2s linear infinite}
@keyframes hnShimmer{to{background-position-x:-220%}}
#hnNewsEmpty{grid-column:1/-1;text-align:center;padding:30px;color:var(--text-secondary);background:var(--bg-elevated);border:1px dashed var(--border-default);border-radius:12px;font-size:12px}
@media(max-width:680px){#hnNewsGrid{grid-template-columns:minmax(0,1fr)}.hn-feed-tools{justify-content:stretch}#hnNewsSearch{max-width:none;flex:1}.hn-news-card{padding:14px}}
<body><div class="shell">
<aside class="sidebar"><div class="brandmark"><div class="brandicon">🐍</div><div class="brandname">Automation Studio<small>Modular workflow workspace</small></div></div>
<nav class="nav" id="mainNavigation" aria-label="Main navigation"><div class="nav-label">WORKSPACE</div><button class="nav-item active" data-view="overview"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/house.svg" alt="" aria-hidden="true"><span class="nav-label-text">Overview</span></button><div class="nav-label">AUTOMATIONS</div><button class="nav-item" data-view="web"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/cloud.svg" alt="" aria-hidden="true"><span class="nav-label-text">Web Scraping</span></button><button class="nav-item" data-view="seo"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/list.svg" alt="" aria-hidden="true"><span class="nav-label-text">SEO &amp; Discovery</span></button><button class="nav-item" data-view="visual"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/camera.svg" alt="" aria-hidden="true"><span class="nav-label-text">Browser &amp; QA</span></button><button class="nav-item" data-view="research"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/file.svg" alt="" aria-hidden="true"><span class="nav-label-text">News &amp; Research</span></button><div class="nav-label">OPERATIONS</div><button class="nav-item" data-view="workflows"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/clock.svg" alt="" aria-hidden="true"><span class="nav-label-text">Workflow Center</span></button><button class="nav-item" data-view="data"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/download.svg" alt="" aria-hidden="true"><span class="nav-label-text">Data &amp; Exports</span></button><button class="nav-item" data-view="settings"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/gear.svg" alt="" aria-hidden="true"><span class="nav-label-text">Settings</span></button></nav>
<div class="side-rule"></div><div class="quick"><div class="quick-title">QUICK LAUNCH</div><button data-open-view="web"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/plus.svg" alt="" aria-hidden="true"><span>New website scrape</span></button><button data-open-view="seo"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/list.svg" alt="" aria-hidden="true"><span>Run SEO audit</span></button><button data-open-view="visual"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/camera.svg" alt="" aria-hidden="true"><span>Visual QA crawl</span></button></div><div class="side-note">Public-page extraction · GitHub Actions<br>Python automation · Cloudflare Worker</div></aside>
<div class="main"><header class="topbar"><button class="menu-toggle" id="menuToggle" type="button" aria-label="Open navigation menu" aria-controls="mainNavigation" aria-expanded="false"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/bars.svg" alt="" aria-hidden="true"></button><input id="moduleSearch" class="module-search" type="search" placeholder="Search automation modules…  Ctrl K" aria-label="Open command palette" readonly role="button" aria-haspopup="dialog"><div class="topbar-actions"><button id="themeToggle" type="button" aria-label="Switch to light theme" title="Switch to light theme"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/sun.svg" alt="" aria-hidden="true"></button><div class="userchip"><span class="avatar">PK</span><span>Workspace Admin <img class="ui-icon profile-chevron" src="https://media-assets-4sb.pages.dev/icons/ui/chevron-down.svg" alt="" aria-hidden="true"></span></div></div></header>
<div class="command-overlay" id="commandPalette" role="dialog" aria-modal="true" aria-label="Command palette"><div class="command-dialog"><input id="commandInput" type="text" placeholder="Search modules and actions…" autocomplete="off"><div class="command-list" id="commandList" role="listbox"></div><div class="command-hint">↑ ↓ Navigate · Enter Run · Esc Close · Ctrl K / ⌘ K</div></div></div><main class="content" id="appContent"><section class="view active" id="view-overview"><section class="hero"><div><div class="eyebrow">AUTOMATION WORKSPACE</div><h1>One workspace. <span>Many automations.</span></h1><p>Launch focused tools, inspect runs, and export clean results.</p></div><div class="hero-art"><div class="py">🐍</div><div class="code">fetch(url)<br>parse(html)<br>export(json)</div></div></section><section class="metrics" aria-label="Live dashboard metrics"><div class="metriccard"><div class="metricicon"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/cloud.svg" alt="" aria-hidden="true"></div><div><div class="metriclabel">Website scraping</div><div class="metricvalue" id="metricScrape">Ready</div></div></div><div class="metriccard"><div class="metricicon"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/circle-check.svg" alt="" aria-hidden="true"></div><div><div class="metriclabel">Latest scrape status</div><div class="metricvalue" id="metricStatus">—</div></div></div><div class="metriccard"><div class="metricicon"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/clock.svg" alt="" aria-hidden="true"></div><div><div class="metriclabel">HN workflow</div><div class="metricvalue">Available</div></div></div><div class="metriccard"><div class="metricicon"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/list.svg" alt="" aria-hidden="true"></div><div><div class="metriclabel">Recent Actions runs</div><div class="metricvalue" id="metricRuns">Loading</div></div></div></section><div class="section-heading"><div><h2>Automation modules</h2><p>Open a dedicated workspace. Each action runs independently.</p></div><span class="section-kicker">MODULE LIBRARY</span></div><div class="module-grid"><button class="module-card" data-open-view="web" data-search="website scrape extraction html product metadata"><b><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/cloud.svg" alt="" aria-hidden="true"></b><strong>Website Scraper</strong><small>Extract metadata, product fields and page content.</small><span>Open workspace <img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/chevron-right.svg" alt="" aria-hidden="true"></span></button><button class="module-card" data-open-view="seo" data-search="seo audit sitemap robots title description"><b><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/list.svg" alt="" aria-hidden="true"></b><strong>SEO &amp; Discovery</strong><small>Audit page SEO and inspect sitemap and robots rules.</small><span>Open workspace →</span></button><button class="module-card" data-open-view="visual" data-search="playwright browser visual qa screenshot responsive"><b><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/camera.svg" alt="" aria-hidden="true"></b><strong>Browser &amp; QA</strong><small>Live Chromium crawls, screenshots and responsive checks.</small><span>Open workspace →</span></button><button class="module-card" data-open-view="research" data-search="hacker news research stories"><b><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/file.svg" alt="" aria-hidden="true"></b><strong>News &amp; Research</strong><small>Trigger the existing Hacker News collector.</small><span>Open workspace →</span></button><button class="module-card" data-open-view="workflows" data-search="workflow history github actions"><b><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/clock.svg" alt="" aria-hidden="true"></b><strong>Workflow Center</strong><small>Inspect execution history and outcomes.</small><span>Open workspace →</span></button><button class="module-card" data-open-view="data" data-search="data exports json downloads"><b><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/download.svg" alt="" aria-hidden="true"></b><strong>Data &amp; Exports</strong><small>Review extraction output and download JSON.</small><span>Open workspace →</span></button></div><div class="overview-foot"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/circle-check.svg" alt="" aria-hidden="true"> Click-to-run tools · Existing HN daily schedule preserved · No paid AI/API</div></section><section class="view" id="view-web"><div class="view-heading"><div><div class="eyebrow">WEB AUTOMATION</div><h1>Website <span>Scraper</span></h1><p>Extract structured information from public HTML pages.</p></div></div><div class="single-tool"><section class="panel scrape-panel" id="website-scraper"><div class="panelhead"><div class="panelicon"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/cloud.svg" alt="" aria-hidden="true"></div><h2>Scrape a Public Website</h2></div><p>Extract title, description, canonical URL, Open Graph image, article text and available Product JSON-LD fields.</p><label for="url">Website or product URL</label><input id="url" type="url" placeholder="https://example.com/product"><label for="cssSelector">Custom CSS Selector (optional)</label><input id="cssSelector" type="text" placeholder="h1, .price, table tr, a[href]"><div class="row"><button class="btn" id="scrapeBtn"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/cloud.svg" alt="" aria-hidden="true">Scrape Website</button><button class="btn secondary" id="downloadBtn" disabled><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/download.svg" alt="" aria-hidden="true">Download JSON</button></div><div class="status" id="scrapeStatus"></div><div class="row"><button class="btn secondary" id="scrapeCsvBtn" disabled>Download CSV</button><button class="btn secondary" id="scrapeMdBtn" disabled>Download Markdown</button><button class="btn secondary" id="scrapePrintBtn" disabled>Print / Save PDF</button></div></section></div></section><section class="view" id="view-seo"><div class="view-heading"><div><div class="eyebrow">DISCOVERY TOOLKIT</div><h1>SEO &amp; <span>Discovery</span></h1><p>Inspect public pages and site discovery files without paid APIs.</p></div></div><div class="tool-grid"><section class="panel tool-panel"><h2 class="icon-heading"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/list.svg" alt="" aria-hidden="true">On-page SEO Audit</h2><p>Title, description, headings, canonical, Open Graph and image alt checks.</p><label for="seoUrl">Public website URL</label><input id="seoUrl" type="url" placeholder="https://example.com/page"><div class="row"><button class="btn" id="seoRunBtn">Run SEO audit</button><button class="btn secondary" id="seoDownloadBtn" disabled>Download JSON</button></div><div class="status" id="seoStatus"></div><div class="row"><button class="btn secondary" id="seoCsvBtn" disabled>Download CSV</button><button class="btn secondary" id="seoMdBtn" disabled>Download Markdown</button><button class="btn secondary" id="seoPrintBtn" disabled>Print / Save PDF</button></div><div id="seoResults" class="tool-results">Enter a public URL to generate an SEO report.</div></section><section class="panel tool-panel"><h2 class="icon-heading"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/list.svg" alt="" aria-hidden="true">Sitemap &amp; Robots Inspector</h2><p>Read robots.txt, discover sitemap files and list up to 100 public URLs.</p><label for="mapUrl">Website root or page URL</label><input id="mapUrl" type="url" placeholder="https://example.com"><div class="row"><button class="btn" id="mapRunBtn">Inspect site files</button><button class="btn secondary" id="mapDownloadBtn" disabled>Download JSON</button></div><div class="status" id="mapStatus"></div><div id="mapResults" class="tool-results">Sitemap and robots findings will appear here.</div></section></div><div class="notice-strip">Public HTTP/HTTPS only. Private/internal IPs are blocked. Sitemap inspector: 4 files / 100 URLs. Visual crawler: up to 20 sitemap files and the selected 1–100 page limit; robots.txt rules are respected.</div></section><section class="view" id="view-visual"><div class="view-heading"><div><div class="eyebrow">BROWSER AUTOMATION</div><h1>Browser <span>&amp; QA</span></h1><p>Live Playwright browser, responsive captures and UI checks.</p></div></div><section class="panel scrape-panel" id="visual-crawler" style="margin-bottom:18px"><div class="panelhead"><div class="panelicon"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/camera.svg" alt="" aria-hidden="true"></div><h2>Visual Website Crawler · Playwright</h2></div><p>Open public pages in real Chromium, discover URLs from robots.txt, sitemaps and same-site links, capture responsive screenshots and run basic UI checks. Screenshots stream live to this tab only. Nothing is stored on the server or uploaded as a GitHub artifact.</p><label for="crawlUrl">Website URL</label><div class="preset-row"><select id="savedTargets" aria-label="Saved targets"><option value="">Saved Targets…</option></select><button class="btn secondary" id="saveTargetBtn" type="button" style="margin:0">Save current target</button></div><input id="crawlUrl" type="url" placeholder="https://example.com"><div class="row"><div style="flex:1;min-width:130px"><label for="crawlPages">Maximum pages (1–100)</label><input id="crawlPages" type="number" min="1" max="100" value="50"></div><div style="flex:1;min-width:130px"><label for="crawlDevices">Devices</label><select id="crawlDevices" style="width:100%;background:#07182a;border:1px solid #28516e;border-radius:11px;padding:14px;color:#fff"><option value="Desktop,Tablet,Mobile">Desktop + Tablet + Mobile</option><option value="Desktop">Desktop</option><option value="Tablet">Tablet</option><option value="Mobile">Mobile</option></select></div><div style="flex:1;min-width:130px"><label for="crawlCapture">Screenshot</label><select id="crawlCapture" style="width:100%;background:#07182a;border:1px solid #28516e;border-radius:11px;padding:14px;color:#fff"><option value="both">Full page + viewport</option><option value="full_page">Full page</option><option value="viewport">Viewport</option></select></div></div><div class="row"><button class="btn" id="crawlBtn"><svg class="ui-icon inline-play" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 5 11 7-11 7z"/></svg>Start visual crawl</button></div><div class="status" id="crawlStatus"></div></section>

<section id="liveWorkspace">
 <div class="live-head"><div><h2 class="icon-heading"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/camera.svg" alt="" aria-hidden="true">Live Browser Workspace</h2><div class="live-sub">Live Chromium · Activity stream · In-memory screenshot gallery</div></div><div class="row"><span class="live-badge"><i class="live-dot"></i> LIVE SESSION ONLY · NOTHING SAVED ON SERVER</span><button class="btn secondary" id="stopCrawlBtn" type="button" style="margin:0" disabled>Stop Crawl</button><button class="btn secondary" id="clearCrawlBtn" style="margin:0">Clear Session</button></div></div>
 <div class="live-stage"><div class="live-browserbar"><span class="live-lights"><i></i><i></i><i></i></span><span id="liveUrl">Waiting for a crawl session…</span><span class="live-pill" id="liveHttp">HTTP —</span><span class="live-pill" id="liveDevice">Desktop</span><span class="live-pill" id="livePage">Page 0 of 0</span><span class="live-badge"><i class="live-dot"></i> LIVE</span><button class="btn secondary" id="liveFullscreenBtn" type="button" style="margin:0;padding:6px 10px;font-size:10px" aria-label="Toggle live browser fullscreen">Fullscreen ⛶</button></div><div class="live-progress"><span id="liveProgress"></span></div><div class="progress-meta"><span id="crawlProgressText">Page 0 of 0 · Waiting</span><span id="crawlElapsed">Elapsed 0s · ETA —</span></div><div class="live-viewport"><img id="liveFrame" alt="Live Playwright browser viewport"><div id="liveBoot"><strong>Booting Chromium Runner…</strong>Start a visual crawl to stream the live browser here.</div></div></div>
 <div class="live-work-grid"><div class="live-panel"><h3 class="icon-heading"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/list.svg" alt="" aria-hidden="true">Live Activity Stream</h3><div id="liveLogs"><div class="live-log">Waiting for session events…</div></div></div><div class="live-panel"><h3 class="icon-heading"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/circle-check.svg" alt="" aria-hidden="true">Current UI Checks</h3><div id="liveChecks" class="muted" style="font-size:11px;line-height:1.8">Checks appear after each page loads.</div><div class="row" style="margin-top:10px"><button class="btn secondary" id="qaCsvBtn" type="button" disabled>Download CSV</button><button class="btn secondary" id="qaMdBtn" type="button" disabled>Download Markdown</button><button class="btn secondary" id="qaPrintBtn" type="button" disabled>Print / Save PDF</button></div></div></div>
 <section id="urlExplorer"><h3 class="icon-heading"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/list.svg" alt="" aria-hidden="true">Discovered Website URLs <span id="urlCount" class="muted">(0)</span></h3><div id="urlDiscoveryMeta" class="live-sub">URLs discovered from sitemap and same-site links will appear here.</div><div id="urlInventory"><div id="urlInventoryEmpty" class="muted">Start a crawl to discover public URLs.</div></div></section>
 <section id="pageNavigator"><div class="row" style="justify-content:space-between"><h3 class="icon-heading"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/camera.svg" alt="" aria-hidden="true">URL Screenshot Navigator</h3><button class="btn secondary" id="compareToggle" type="button" style="margin:0">⇄ Desktop vs Mobile</button></div><div class="compare-wrap" id="compareView"><img id="compareDesktop" alt="Desktop screenshot"><img id="compareMobile" alt="Mobile screenshot"><input id="compareSlider" type="range" min="0" max="100" value="50" aria-label="Compare screenshots"></div><div id="selectedPagePosition" class="live-sub">Page 0 of 0</div><div id="selectedPageUrl">Choose a discovered URL or start a crawl.</div><div class="row"><button class="btn secondary" id="previousPageBtn" disabled><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/arrow-left.svg" alt="" aria-hidden="true">Previous</button><button class="btn" id="nextPageBtn" disabled>Next <img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/arrow-right.svg" alt="" aria-hidden="true"></button></div><img id="selectedPageScreenshot" alt="Selected URL screenshot"><div id="selectedPageNoShot">Screenshots will appear here as pages are captured.</div></section>
 <div class="live-gallery-head"><h3 class="icon-heading"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/image.svg" alt="" aria-hidden="true">Live Captured Screenshots <span id="shotCount" class="muted">(0)</span></h3><div class="row"><div class="live-filters"><select id="filterDevice"><option value="all">All devices</option><option>Desktop</option><option>Tablet</option><option>Mobile</option></select><select id="filterMode"><option value="all">All modes</option><option value="viewport">Viewport</option><option value="full_page">Full Page</option></select></div><button class="btn secondary" id="downloadAllBtn" style="margin:0" disabled><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/download.svg" alt="" aria-hidden="true">Download All (.zip)</button></div></div>
 <div id="liveGallery"><div id="liveEmpty">Screenshots will appear here as soon as Playwright captures them. Nothing is stored after this browser session.</div></div>
</section><div id="liveLightbox"><button class="btn secondary" id="closeLightbox"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/xmark.svg" alt="" aria-hidden="true">Close</button><img id="lightboxImage" alt="Screenshot preview"></div>

</section><section class="view" id="view-research"><div class="view-heading"><div><div class="eyebrow">PUBLIC SOURCE COLLECTION</div><h1>News &amp; <span>Research</span></h1><p>Run the existing Hacker News collection workflow.</p></div></div><div class="single-tool"><section class="panel hn-card" id="hn-scraper"><div class="panelhead"><div class="panelicon"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/clock.svg" alt="" aria-hidden="true"></div><h2>Hacker News Scraper</h2></div><p>Starts the existing Python GitHub Actions workflow. Results continue to be appended to your existing Google Sheet.</p><div class="metric">🐍 &nbsp; Python · HN</div><div class="muted" style="font-size:13px">Scheduled workflow remains independent of this dashboard.</div><button class="btn" id="runBtn"><svg class="ui-icon inline-play" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 5 11 7-11 7z"/></svg>Run Hacker News Scraper</button><div class="status" id="runStatus"></div><a class="sheetlink" href="https://docs.google.com/spreadsheets/d/1CmtA7GWPs6KBJDYmGps7KhjMTCc-mANMx4ClbigfxiA/edit#gid=570987850" target="_blank" rel="noopener"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/file.svg" alt="" aria-hidden="true">Open existing Google Sheet <img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/arrow-right.svg" alt="" aria-hidden="true"></a></section></div>
<section class="panel" id="hnNewsFeed" aria-labelledby="hnFeedTitle">
 <div class="panelhead"><div class="panelicon">📰</div><div><h2 id="hnFeedTitle">Live Hacker News Feed</h2><div class="muted" style="font-size:11px;margin-top:4px">Live stories from the official Hacker News Firebase API · Free, no paid APIs</div></div></div>
 <div class="hn-feed-toolbar"><div class="hn-tabs" role="tablist" aria-label="Hacker News categories">
  <button class="hn-tab" type="button" data-hn-category="top" role="tab" aria-selected="true">Top Stories</button>
  <button class="hn-tab" type="button" data-hn-category="new" role="tab" aria-selected="false">New</button>
  <button class="hn-tab" type="button" data-hn-category="best" role="tab" aria-selected="false">Best</button>
  <button class="hn-tab" type="button" data-hn-category="show" role="tab" aria-selected="false">Show HN</button>
 </div><div class="hn-feed-tools"><input id="hnNewsSearch" type="search" placeholder="Filter stories… AI, Python, Cloudflare" aria-label="Filter Hacker News stories"><button class="btn secondary" id="hnRefreshBtn" type="button"><span id="hnRefreshLabel">↻ Refresh News</span></button></div></div>
 <div id="hnFeedStatus" role="status" aria-live="polite">Loading latest stories…</div>
 <div id="hnNewsGrid"><div class="hn-skeleton"></div><div class="hn-skeleton"></div><div class="hn-skeleton"></div><div class="hn-skeleton"></div></div>
</section></section><section class="view" id="view-workflows"><div class="view-heading"><div><div class="eyebrow">OPERATIONS</div><h1>Workflow <span>Center</span></h1><p>Execution history from GitHub Actions.</p></div><button class="btn secondary" id="refreshBtn"><svg class="ui-icon inline-refresh" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7v5h-5M4 17v-5h5M5.6 9A7 7 0 0 1 18 6l2 2M4 16l2 2a7 7 0 0 0 12.4-3"/></svg>Refresh runs</button></div><section class="panel" id="workflows" style="margin-top:18px"><div class="panelhead"><div class="panelicon"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/clock.svg" alt="" aria-hidden="true"></div><h2>Recent GitHub Actions Runs</h2></div><div class="status" id="historyStatus"></div><div class="list" id="historyList"></div></section></section><section class="view" id="view-data"><div class="view-heading"><div><div class="eyebrow">RESULTS &amp; FILES</div><h1>Data &amp; <span>Exports</span></h1><p>Review the latest extraction and download structured output.</p></div></div><div class="data-layout"><section class="panel" id="exports"><div class="resulthead"><div><div class="panelhead"><div class="panelicon"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/download.svg" alt="" aria-hidden="true"></div><h2>Latest Website Scrape Result</h2></div><p>Structured output returned by the Worker.</p></div></div><pre class="result" id="output">No website scrape has been run in this session.</pre></section><section class="panel" id="history"><div class="panelhead"><div class="panelicon"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/clock.svg" alt="" aria-hidden="true"></div><h2>Recent Activity</h2></div><div class="activity" id="activity"><div class="muted">Recent scrape and workflow events appear here.</div></div></section></div></section><section class="view" id="view-settings"><div class="view-heading"><div><div class="eyebrow">WORKSPACE PREFERENCES</div><h1>System <span>Settings</span></h1><p>Runtime boundaries and connection information.</p></div></div><div class="settings-grid"><section class="panel"><h2>Execution policy</h2><p>Optional client-side notifications. Webhook URLs are stored only in this browser.</p><label for="webhookUrl">Webhook URL</label><input id="webhookUrl" type="url" placeholder="Discord / Telegram / Generic webhook URL"><div class="row"><button class="btn secondary" id="saveWebhookBtn" type="button">Save Webhook</button><button class="btn secondary" id="testWebhookBtn" type="button">Send Test Alert</button></div><div class="status" id="webhookStatus" aria-live="polite"></div><ul class="settings-list"><li><strong>Budget</strong><span>Zero-budget design; no paid AI/API integrations.</span></li><li><strong>Storage</strong><span>Visual crawl screenshots remain in browser memory only.</span></li><li><strong>Network</strong><span>Public HTTP/HTTPS targets only; private and reserved IPs blocked.</span></li><li><strong>Execution</strong><span>New tools run on click; the existing Hacker News daily schedule is preserved.</span></li></ul></section><section class="panel"><h2>Connected services</h2><ul class="settings-list"><li><strong>Cloudflare Worker</strong><span>Dashboard API and authentication.</span></li><li><strong>GitHub Actions</strong><span>Visual crawler and Hacker News runner.</span></li><li><strong>Google Sheets</strong><span>Existing Hacker News output.</span></li></ul></section></div><footer class="foot" id="settings">Only public HTML pages are supported. Login-protected, paywalled and anti-bot restricted content is not bypassed. Product prices and stock appear only when exposed in public page metadata or page HTML. Respect website terms and robots policies.</footer></section></main></div></div>
<section class="loginbox hidden" id="login"><h2>Dashboard sign in</h2><p class="muted">Enter the dashboard password configured in Cloudflare Worker secrets.</p><label for="password">Dashboard password</label><input id="password" type="password" autocomplete="current-password" placeholder="Enter password"><button class="btn" id="loginBtn">Unlock dashboard</button><div class="status" id="loginStatus"></div></section>
<script>
let token=sessionStorage.getItem('scraper_token')||'',lastResult=null,latestSeoResult=null,latestMapResult=null,latestQaResult=null;
let hnNewsItems=[],hnNewsCategory='top',hnNewsLoadedAt=0,hnNewsRequest=0;
const $=id=>document.getElementById(id);
const THEME_KEY='automation-studio-theme';
function setDashboardTheme(theme,save=true){
 const next=theme==='light'?'light':'dark';
 document.documentElement.setAttribute('data-theme',next);
 const button=$('themeToggle');
 if(button){
  const sunIcon='<img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/sun.svg" alt="" aria-hidden="true">';
  const moonIcon='<img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/moon.svg" alt="" aria-hidden="true">';
  const label=next==='dark'?'Switch to light theme':'Switch to dark theme';
  button.innerHTML=next==='dark'?sunIcon:moonIcon;
  button.setAttribute('aria-label',label);button.title=label;
 }
 if(save){try{localStorage.setItem(THEME_KEY,next)}catch(e){}}
}
setDashboardTheme(document.documentElement.getAttribute('data-theme')||'dark',false);
$('themeToggle').addEventListener('click',()=>setDashboardTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark'));

function closeMobileMenu(){const sidebar=document.querySelector('.sidebar');sidebar.classList.remove('menu-open');document.body.classList.remove('menu-visible');const toggle=$('menuToggle');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation menu');toggle.innerHTML='<img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/bars.svg" alt="" aria-hidden="true">'}function activateView(name){const target=$('view-'+name);if(!target)return;document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v===target));document.querySelectorAll('.nav-item').forEach(v=>v.classList.toggle('active',v.dataset.view===name));closeMobileMenu();if(name==='research'&&token)loadHnNews();if(location.hash!=='#'+name)history.replaceState(null,'','#'+name);window.scrollTo({top:0,behavior:'smooth'})} $('menuToggle').addEventListener('click',()=>{const sidebar=document.querySelector('.sidebar'),open=!sidebar.classList.contains('menu-open');sidebar.classList.toggle('menu-open',open);document.body.classList.toggle('menu-visible',open);$('menuToggle').setAttribute('aria-expanded',String(open));$('menuToggle').setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');$('menuToggle').innerHTML=open?'<img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/xmark.svg" alt="" aria-hidden="true">':'<img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/bars.svg" alt="" aria-hidden="true">'});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMobileMenu()});
document.querySelectorAll('[data-view]').forEach(v=>v.addEventListener('click',()=>activateView(v.dataset.view)));
document.querySelectorAll('[data-open-view]').forEach(v=>v.addEventListener('click',()=>activateView(v.dataset.openView)));
$('moduleSearch').addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();document.querySelectorAll('.module-card').forEach(c=>c.hidden=!!q&&!((c.innerText+' '+(c.dataset.search||'')).toLowerCase().includes(q)));if(q)activateView('overview')});

const PALETTE=[['Overview','view','overview'],['Web Scraping','view','web'],['SEO & Discovery','view','seo'],['Browser & QA','view','visual'],['News & Research','view','research'],['Workflow Center','view','workflows'],['Data & Exports','view','data'],['Settings','view','settings'],['New Website Scrape','action','scrape'],['Run SEO Audit','action','seo'],['Start Visual QA Crawl','action','crawl'],['Clear Session','action','clear'],['Toggle Dark/Light Theme','action','theme']];
let paletteIndex=0;
function renderPalette(){const q=$('commandInput').value.toLowerCase(),items=PALETTE.filter(x=>x[0].toLowerCase().includes(q));paletteIndex=Math.max(0,Math.min(paletteIndex,items.length-1));$('commandList').textContent='';items.forEach((x,i)=>{const b=document.createElement('button');b.className='command-item';b.type='button';b.setAttribute('role','option');b.setAttribute('aria-selected',String(i===paletteIndex));const n=document.createElement('span');n.textContent=x[0];const h=document.createElement('small');h.textContent=x[1]==='view'?'Navigate':'Quick action';b.append(n,h);b.onclick=()=>runPalette(x);$('commandList').append(b)})}
function openPalette(){$('commandPalette').classList.add('open');$('commandInput').value='';renderPalette();$('commandInput').focus()}
function closePalette(){$('commandPalette').classList.remove('open')}
function runPalette(x){closePalette();if(x[1]==='view')activateView(x[2]);else if(x[2]==='scrape'){activateView('web');$('url').focus()}else if(x[2]==='seo'){activateView('seo');$('seoRunBtn').click()}else if(x[2]==='crawl'){activateView('visual');$('crawlBtn').click()}else if(x[2]==='clear')$('clearCrawlBtn').click();else if(x[2]==='theme')$('themeToggle').click()}
$('moduleSearch').onclick=openPalette;$('commandInput').oninput=()=>{paletteIndex=0;renderPalette()};$('commandInput').onkeydown=e=>{const items=PALETTE.filter(x=>x[0].toLowerCase().includes($('commandInput').value.toLowerCase()));if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();paletteIndex=(paletteIndex+(e.key==='ArrowDown'?1:-1)+items.length)%Math.max(1,items.length);renderPalette()}else if(e.key==='Enter'&&items[paletteIndex])runPalette(items[paletteIndex]);else if(e.key==='Escape')closePalette()};$('commandPalette').onclick=e=>{if(e.target===$('commandPalette'))closePalette()};document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openPalette()}});
async function api(path,options={}){const res=await fetch(path,{...options,headers:{'Content-Type':'application/json','Authorization':'Bearer '+token,...options.headers}});const data=await res.json().catch(()=>({error:'Invalid server response'}));if(!res.ok)throw new Error(data.error||('HTTP '+res.status));return data}
function showApp(){$('login').classList.add('hidden');document.querySelector('.shell').classList.remove('hidden');const initial=location.hash.slice(1);activateView($('view-'+initial)?initial:'overview');loadRuns()}
async function login(){$('loginStatus').textContent='Checking…';try{const r=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:$('password').value})});const d=await r.json();if(!r.ok)throw new Error(d.error||'Sign-in failed');token=d.token;sessionStorage.setItem('scraper_token',token);showApp()}catch(e){$('loginStatus').textContent=e.message}}

function renderChecks(root,checks){root.textContent='';const list=document.createElement('div');list.style.cssText='display:grid;gap:7px';for(const item of checks){const row=document.createElement('div');row.style.cssText='display:flex;justify-content:space-between;gap:12px;padding:9px;background:#f7f9fb;border-radius:8px;font-size:11px';const l=document.createElement('strong');l.textContent=item.label;const v=document.createElement('span');v.textContent=item.detail;v.style.color=item.status==='pass'?'#17845e':item.status==='warn'?'#b77a2d':'#bf4b4b';row.append(l,v);list.append(row)}root.append(list)}
function exportRows(data){return Array.isArray(data)?data:Object.entries(data||{}).map(([key,value])=>({key,value:typeof value==='object'?JSON.stringify(value):value}))}
function downloadCsv(data,name){const rows=exportRows(data),keys=[...new Set(rows.flatMap(x=>Object.keys(x)))],q=v=>'"'+String(v??'').replace(/"/g,'""')+'"';downloadBlob(new Blob([[keys.map(q).join(','),...rows.map(r=>keys.map(k=>q(r[k])).join(','))].join('\r\n')],{type:'text/csv'}),name)}
function downloadMd(data,name){const rows=exportRows(data),keys=[...new Set(rows.flatMap(x=>Object.keys(x)))],cell=v=>String(v??'').replace(/\|/g,'\\|').replace(/\n/g,' ');downloadBlob(new Blob([['| '+keys.join(' | ')+' |','| '+keys.map(()=> '---').join(' | ')+' |',...rows.map(r=>'| '+keys.map(k=>cell(r[k])).join(' | ')+' |')].join('\n')],{type:'text/markdown'}),name)}
function printReport(title,data){const w=window.open('','_blank');if(!w){alert('Allow pop-ups to print reports.');return}const pre=w.document.createElement('pre');pre.textContent=JSON.stringify(data,null,2);w.document.body.append(pre);w.document.title=title;w.document.body.style.cssText='white-space:pre-wrap;font:12px monospace;padding:24px';w.print()}
function downloadJson(data,name){const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
$('qaCsvBtn').onclick=()=>latestQaResult&&downloadCsv(latestQaResult,'browser-qa-report.csv');$('qaMdBtn').onclick=()=>latestQaResult&&downloadMd(latestQaResult,'browser-qa-report.md');$('qaPrintBtn').onclick=()=>latestQaResult&&printReport('Browser QA report',latestQaResult);
$('seoRunBtn').onclick=async()=>{const b=$('seoRunBtn');b.disabled=true;$('seoStatus').textContent='Analyzing page metadata…';try{latestSeoResult=await api('/api/seo-audit',{method:'POST',body:JSON.stringify({url:$('seoUrl').value})});$('seoStatus').textContent='Completed · HTTP '+latestSeoResult.status_code;$('seoDownloadBtn').disabled=false;$('seoCsvBtn').disabled=$('seoMdBtn').disabled=$('seoPrintBtn').disabled=false;const d=latestSeoResult;const summary=document.createElement('p');summary.textContent='SEO score: '+d.score+'/100 · '+d.checks.length+' checks · Links '+(d.link_check_summary?.checked||0)+' checked / '+(d.link_check_summary?.broken||0)+' broken';$('seoResults').textContent='';$('seoResults').append(summary);const tech=document.createElement('div');tech.className='row';tech.style.margin='10px 0';(d.tech_stack||[]).forEach(name=>{const badge=document.createElement('span');badge.className='status-badge good';badge.textContent=name;tech.append(badge)});if(!tech.children.length)tech.textContent='No common stack signatures detected';$('seoResults').append(tech);renderChecks($('seoResults'),d.checks);const links=document.createElement('div');links.style.marginTop='12px';const heading=document.createElement('strong');heading.textContent='Broken links & redirects';links.append(heading);const filter=document.createElement('select');filter.setAttribute('aria-label','Filter link check results');filter.style.margin='8px 0';for(const [value,label] of [['all','All results'],['broken','Broken only'],['redirect','Redirects only'],['ok','OK only']]){const option=document.createElement('option');option.value=value;option.textContent=label;filter.append(option)}links.append(filter);const linkRows=[];(d.link_checks||[]).forEach(item=>{const row=document.createElement('div');row.style.cssText='padding:6px;border-bottom:1px solid var(--border-default);overflow-wrap:anywhere;font-size:10px';row.textContent=(item.status||'ERR')+' · '+(item.redirected?'HTTP '+(item.redirect_statuses||[]).join('/')+' → ':'')+item.url;const badge=document.createElement('span');badge.className='status-badge '+(!item.ok?'bad':item.redirected?'warn':'good');badge.textContent=!item.ok?'Broken':item.redirected?'Redirect':'OK';row.append(' ',badge);row.dataset.kind=!item.ok?'broken':item.redirected?'redirect':'ok';linkRows.push(row);links.append(row)});filter.onchange=()=>linkRows.forEach(row=>{row.hidden=filter.value!=='all'&&row.dataset.kind!==filter.value});$('seoResults').append(links)}catch(e){$('seoStatus').textContent=e.message}finally{b.disabled=false}};$('seoDownloadBtn').onclick=()=>{if(latestSeoResult)downloadJson(latestSeoResult,'seo-audit-report.json')};$('seoCsvBtn').onclick=()=>latestSeoResult&&downloadCsv(latestSeoResult,'seo-audit-report.csv');$('seoMdBtn').onclick=()=>latestSeoResult&&downloadMd(latestSeoResult,'seo-audit-report.md');$('seoPrintBtn').onclick=()=>latestSeoResult&&printReport('SEO report',latestSeoResult);
$('mapRunBtn').onclick=async()=>{const b=$('mapRunBtn');b.disabled=true;$('mapStatus').textContent='Inspecting robots.txt and sitemap…';try{latestMapResult=await api('/api/site-discovery',{method:'POST',body:JSON.stringify({url:$('mapUrl').value})});const d=latestMapResult;$('mapStatus').textContent='Completed · '+d.urls.length+' URLs found';$('mapDownloadBtn').disabled=false;$('mapResults').textContent='Robots HTTP '+d.robots_status+' · Sitemaps '+d.sitemaps.length+' · URLs '+d.urls.length;const group=(label,items,empty)=>{const section=document.createElement('section');section.style.cssText='margin-top:12px';const heading=document.createElement('strong');heading.textContent=label;heading.style.cssText='display:block;margin-bottom:6px';section.append(heading);if(!items.length){const note=document.createElement('div');note.textContent=empty;note.className='muted';section.append(note)}for(const value of items){const item=document.createElement('div');item.textContent=typeof value==='string'?value:value.text;item.style.cssText='font:10px monospace;overflow-wrap:anywhere;padding:7px;background:#f5f8fa;border-radius:5px;margin-top:4px';section.append(item)}$('mapResults').append(section)};group('Robots directives',d.robots_rules.map(r=>r.agent+' · '+r.rule),'No directives found.');group('Sitemap files',d.sitemaps.map(m=>m.url+' · HTTP '+m.status),'No sitemap file could be read.');group('Discovered URLs',d.urls,'No same-host URLs found in the sitemap.')}catch(e){$('mapStatus').textContent=e.message}finally{b.disabled=false}};$('mapDownloadBtn').onclick=()=>{if(latestMapResult)downloadJson(latestMapResult,'site-discovery-report.json')};
$('loginBtn').onclick=login;$('password').addEventListener('keydown',e=>{if(e.key==='Enter')login()});
if(token)showApp();else{document.querySelector('.shell').classList.add('hidden');$('login').classList.remove('hidden')}
$('scrapeBtn').onclick=async()=>{const b=$('scrapeBtn');b.disabled=true;$('scrapeStatus').textContent='Fetching and parsing page…';try{lastResult=await api('/api/scrape',{method:'POST',body:JSON.stringify({url:$('url').value,selector:$('cssSelector').value.trim()})});$('output').textContent=JSON.stringify(lastResult,null,2);$('downloadBtn').disabled=false;$('scrapeStatus').textContent='Completed · HTTP '+lastResult.status_code;$('scrapeCsvBtn').disabled=$('scrapeMdBtn').disabled=$('scrapePrintBtn').disabled=false;$('metricScrape').textContent='Completed';$('metricStatus').textContent='HTTP '+lastResult.status_code;$('activity').innerHTML='';const item=document.createElement('div');item.className='activityitem';item.innerHTML='<span class="activitydot"><img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/circle-check.svg" alt="" aria-hidden="true"></span><div><strong></strong><small></small></div>';item.querySelector('strong').textContent=new URL(lastResult.url).hostname;item.querySelector('small').textContent='HTTP '+lastResult.status_code+' · Latest scrape';$('activity').append(item)}catch(e){$('scrapeStatus').textContent=e.message;$('metricScrape').textContent='Failed';$('metricStatus').textContent='Error'}finally{b.disabled=false}};
$('downloadBtn').onclick=()=>{if(!lastResult)return;const a=document.createElement('a');const blobUrl=URL.createObjectURL(new Blob([JSON.stringify(lastResult,null,2)],{type:'application/json'}));a.href=blobUrl;a.download='website-scrape-result.json';a.click();setTimeout(()=>URL.revokeObjectURL(blobUrl),1000)};$('scrapeCsvBtn').onclick=()=>lastResult&&downloadCsv(lastResult,'website-scrape.csv');$('scrapeMdBtn').onclick=()=>lastResult&&downloadMd(lastResult,'website-scrape.md');$('scrapePrintBtn').onclick=()=>lastResult&&printReport('Website scrape',lastResult);
$('runBtn').onclick=async()=>{loadHnNews();const b=$('runBtn');b.disabled=true;$('runStatus').textContent='Sending workflow dispatch…';try{await api('/api/run-hn',{method:'POST',body:'{}'});$('runStatus').textContent='Workflow dispatch accepted. Refresh history in a few seconds.';setTimeout(loadRuns,4000)}catch(e){$('runStatus').textContent=e.message}finally{b.disabled=false}};
function hnRelativeTime(epoch){const seconds=Math.max(0,Math.floor(Date.now()/1000-Number(epoch||0)));if(seconds<60)return'just now';const mins=Math.floor(seconds/60);if(mins<60)return mins+' min ago';const hours=Math.floor(mins/60);if(hours<24)return hours+' hour'+(hours===1?'':'s')+' ago';const days=Math.floor(hours/24);if(days<30)return days+' day'+(days===1?'':'s')+' ago';return new Date(Number(epoch)*1000).toLocaleDateString()}
function hnDomain(story){try{return new URL(story.url||('https://news.ycombinator.com/item?id='+story.id)).hostname.replace(/^www\./,'')}catch{return'Hacker News'}}
function renderHnNews(){
 const root=$('hnNewsGrid');if(!root)return;root.textContent='';
 const q=$('hnNewsSearch').value.trim().toLowerCase();
 const filtered=hnNewsItems.filter(item=>[item.title,item.text,item.by,hnDomain(item)].join(' ').toLowerCase().includes(q));
 if(!filtered.length){const empty=document.createElement('div');empty.id='hnNewsEmpty';empty.textContent=q?'No stories match “'+$('hnNewsSearch').value.trim()+'”.':'No stories are available in this category right now.';root.append(empty);return}
 filtered.forEach((story,index)=>{
  const card=document.createElement('article');card.className='hn-news-card';
  const top=document.createElement('div');top.className='hn-news-top';
  const rank=document.createElement('span');rank.className='hn-rank';rank.textContent='#'+(hnNewsItems.indexOf(story)+1);
  const points=document.createElement('span');points.className='hn-points';points.textContent='▲ '+Number(story.score||0).toLocaleString()+' pts';top.append(rank,points);
  const title=document.createElement('h3');title.className='hn-news-title';const titleLink=document.createElement('a');titleLink.href=story.url||('https://news.ycombinator.com/item?id='+story.id);titleLink.target='_blank';titleLink.rel='noopener noreferrer';titleLink.textContent=story.title||'Untitled story';title.append(titleLink);
  const domain=document.createElement('span');domain.className='hn-domain';domain.textContent=hnDomain(story);domain.title=domain.textContent;
  const preview=document.createElement('div');preview.className='hn-story-preview';preview.textContent=story.text||'';if(!story.text)preview.hidden=true;
  const meta=document.createElement('div');meta.className='hn-story-meta';meta.textContent=hnRelativeTime(story.time)+' · by '+(story.by||'unknown')+' · '+Number(story.descendants||0).toLocaleString()+' comments';
  const actions=document.createElement('div');actions.className='hn-news-actions';
  const article=document.createElement('a');article.href=story.url||('https://news.ycombinator.com/item?id='+story.id);article.target='_blank';article.rel='noopener noreferrer';article.textContent='Read Article ↗';
  const discussion=document.createElement('a');discussion.className='secondary';discussion.href='https://news.ycombinator.com/item?id='+encodeURIComponent(story.id);discussion.target='_blank';discussion.rel='noopener noreferrer';discussion.textContent='Discussion';
  actions.append(article,discussion);card.append(top,title,domain,preview,meta,actions);root.append(card);
 });
}
async function loadHnNews(){
 const requestId=++hnNewsRequest,button=$('hnRefreshBtn'),label=$('hnRefreshLabel'),status=$('hnFeedStatus'),root=$('hnNewsGrid');if(!root)return;
 if(button){button.disabled=true;label.textContent='⟳ Refreshing…'}
 status.textContent='Fetching latest Hacker News stories…';root.innerHTML='<div class="hn-skeleton"></div><div class="hn-skeleton"></div><div class="hn-skeleton"></div><div class="hn-skeleton"></div>';
 try{const data=await api('/api/news?category='+encodeURIComponent(hnNewsCategory));if(requestId!==hnNewsRequest)return;hnNewsItems=Array.isArray(data.stories)?data.stories:[];hnNewsLoadedAt=Date.now();renderHnNews();status.textContent=hnNewsItems.length+' stories · Updated '+new Date(hnNewsLoadedAt).toLocaleTimeString()}
 catch(error){if(requestId!==hnNewsRequest)return;root.textContent='';const empty=document.createElement('div');empty.id='hnNewsEmpty';empty.textContent='Could not load Hacker News: '+error.message;root.append(empty);status.textContent='Feed unavailable · Try Refresh News'}
 finally{if(requestId===hnNewsRequest&&button){button.disabled=false;label.textContent='↻ Refresh News'}}
}
document.querySelectorAll('[data-hn-category]').forEach(tab=>tab.addEventListener('click',()=>{hnNewsCategory=tab.dataset.hnCategory;document.querySelectorAll('[data-hn-category]').forEach(item=>item.setAttribute('aria-selected',String(item===tab)));loadHnNews()}));
$('hnNewsSearch').addEventListener('input',renderHnNews);
$('hnRefreshBtn').addEventListener('click',loadHnNews);


const WEBHOOK_KEY='automation-webhook-url';$('webhookUrl').value=localStorage.getItem(WEBHOOK_KEY)||'';
$('saveWebhookBtn').onclick=()=>{localStorage.setItem(WEBHOOK_KEY,$('webhookUrl').value.trim());$('webhookStatus').textContent='Saved in this browser.'};
$('testWebhookBtn').onclick=async()=>{try{const url=$('webhookUrl').value.trim();if(!url)throw new Error('Enter a webhook URL');const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({content:'Automation Studio test alert',text:'Automation Studio test alert'}),mode:'cors'});if(!r.ok)throw new Error('HTTP '+r.status);$('webhookStatus').textContent='Test request sent.'}catch(e){$('webhookStatus').textContent='Could not confirm delivery: '+e.message+' (CORS may block browser webhooks).'}};
function sendWebhookAlert(title,event){const url=localStorage.getItem(WEBHOOK_KEY);if(!url)return;fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({content:title+' · '+(event.message||''),text:title+' · '+(event.message||''),event:title}),mode:'cors'}).catch(()=>{})}
async function loadRuns(){$('historyStatus').textContent='Loading…';try{const d=await api('/api/runs');$('historyList').innerHTML='';$('metricRuns').textContent=String(d.runs.length);const activity=$('activity');if(!lastResult)activity.innerHTML='';for(const r of d.runs){const el=document.createElement('div');el.className='run';const strong=document.createElement('strong');strong.textContent='#'+r.id+' · '+r.status+' · '+(r.conclusion||'in progress');const sub=document.createElement('span');sub.className='muted';sub.textContent=r.event+' · '+r.branch+' · '+new Date(r.created_at).toLocaleString();el.append(strong,sub);$('historyList').append(el);if(activity.children.length<4){const ai=document.createElement('div');ai.className='activityitem';const dot=document.createElement('span');dot.className='activitydot';dot.innerHTML=r.conclusion==='success'?'<img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/circle-check.svg" alt="" aria-hidden="true">':r.conclusion==='failure'?'<img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/circle-exclamation.svg" alt="" aria-hidden="true">':'<img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/clock.svg" alt="" aria-hidden="true">';const body=document.createElement('div');const title=document.createElement('strong');title.textContent='Hacker News · '+(r.conclusion||r.status);const detail=document.createElement('small');detail.textContent='#'+r.id+' · '+new Date(r.created_at).toLocaleString();body.append(title,detail);ai.append(dot,body);activity.append(ai)}}$('historyStatus').textContent=d.runs.length+' recent runs'}catch(e){$('historyStatus').textContent=e.message;$('metricRuns').textContent='Unavailable'}}
$('refreshBtn').onclick=loadRuns;

/* RAM-only live crawl client */
let activeCrawlSocket=null,activeCrawlId=null,activeWorkflowRunId=null,crawlStartedAt=0,crawlTimer=null,liveShots=[],stageObjectUrl=null,livePageTotal=0,liveDone=0,discoveredUrls=[],urlStates={},selectedUrlIndex=0,autoFollowUrls=true;
function crawlUnsavedGuard(event){if(liveShots.length){event.preventDefault();event.returnValue='This live session has unsaved screenshots. Leaving will clear them.';return event.returnValue}}
function releaseCrawlMemory(){
 for(const shot of liveShots){try{URL.revokeObjectURL(shot.objectUrl)}catch{}}
 liveShots=[];
 if(stageObjectUrl){URL.revokeObjectURL(stageObjectUrl);stageObjectUrl=null}
 $('liveFrame').removeAttribute('src');$('liveLightbox').classList.remove('open');$('lightboxImage').removeAttribute('src');$('liveGallery').innerHTML='<div id="liveEmpty">Screenshots will appear here as the live crawl runs.</div>';
 $('shotCount').textContent='(0)';$('downloadAllBtn').disabled=true;
 discoveredUrls=[];urlStates={};selectedUrlIndex=0;autoFollowUrls=true;
 $('urlCount').textContent='(0)';$('urlDiscoveryMeta').textContent='URLs discovered from sitemap and same-site links will appear here.';
 $('urlInventory').innerHTML='<div id="urlInventoryEmpty" class="muted">Start a crawl to discover public URLs.</div>';
 renderPageNavigator();
 window.removeEventListener('beforeunload',crawlUnsavedGuard);
}

function renderUrlInventory(){
 $('urlCount').textContent='('+discoveredUrls.length+')';
 $('urlInventory').textContent='';
 if(!discoveredUrls.length){const empty=document.createElement('div');empty.className='muted';empty.textContent='No URLs discovered yet.';$('urlInventory').append(empty);return}
 discoveredUrls.forEach((url,index)=>{
  const button=document.createElement('button');button.type='button';button.className='url-entry';button.setAttribute('aria-current',String(index===selectedUrlIndex));button.onclick=()=>selectDiscoveredUrl(index);
  const address=document.createElement('span');address.textContent=(index+1)+'. '+url;
  const state=document.createElement('span');state.className='url-state';state.textContent=urlStates[url]||'Queued';
  button.append(address,state);$('urlInventory').append(button);
 });
}
function renderPageNavigator(){
 const total=discoveredUrls.length,index=total?Math.min(selectedUrlIndex,total-1):0,url=total?discoveredUrls[index]:'';
 $('selectedPagePosition').textContent=total?'Page '+(index+1)+' of '+total:'Page 0 of 0';
 $('selectedPageUrl').textContent=url||'Choose a discovered URL or start a crawl.';
 $('previousPageBtn').disabled=!total||index===0;$('nextPageBtn').disabled=!total||index>=total-1;
 const shot=liveShots.find(item=>item.url===url);
 if(shot){$('selectedPageScreenshot').src=shot.objectUrl;$('selectedPageScreenshot').style.display='block';$('selectedPageNoShot').style.display='none'}
 else{$('selectedPageScreenshot').removeAttribute('src');$('selectedPageScreenshot').style.display='none';$('selectedPageNoShot').style.display='block';$('selectedPageNoShot').textContent=url?(urlStates[url]==='Failed'?'This page failed; no screenshot was captured.':'Waiting for this URL screenshot to be captured.'):'Screenshots will appear here as pages are captured.'}
 renderUrlInventory();if($('compareView').style.display==='block')updateCompare();
}
function selectDiscoveredUrl(index){
 if(index<0||index>=discoveredUrls.length)return;
 selectedUrlIndex=index;autoFollowUrls=false;renderPageNavigator();
}
function moveDiscoveredUrl(delta){
 if(!discoveredUrls.length)return;
 const next=Math.max(0,Math.min(discoveredUrls.length-1,selectedUrlIndex+delta));
 if(next!==selectedUrlIndex)selectDiscoveredUrl(next);
}
$('previousPageBtn').onclick=()=>moveDiscoveredUrl(-1);
$('nextPageBtn').onclick=()=>moveDiscoveredUrl(1);
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
  const url=document.createElement('div');url.className='shot-url';url.textContent=shot.url;url.title=shot.url;
  const meta=document.createElement('div');meta.className='shot-meta';
  for(const label of ['Page '+shot.page,shot.device,shot.mode==='full_page'?'Full Page':'Viewport']){const tag=document.createElement('span');tag.textContent=label;meta.append(tag)}
  const status=document.createElement('span');status.className=shot.ui_status==='pass'?'pass':'warning';status.textContent='UI '+(shot.ui_status||'unknown');meta.append(status);
  const actions=document.createElement('div');actions.className='shot-actions';
  const view=document.createElement('button');view.className='btn secondary';view.textContent='Preview';view.onclick=preview.onclick;
  const down=document.createElement('button');down.className='btn';down.innerHTML='<img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/download.svg" alt="" aria-hidden="true">Download';down.onclick=()=>downloadBlob(shot.blob,shot.filename);
  actions.append(view,down);info.append(url,meta,actions);card.append(preview,info);$('liveGallery').append(card);
 }
 $('shotCount').textContent='('+liveShots.length+')';$('downloadAllBtn').disabled=!liveShots.length;
 if(liveShots.length)window.addEventListener('beforeunload',crawlUnsavedGuard);
}
function receiveCrawlEvent(event){
 if(event.crawl_id&&event.crawl_id!==activeCrawlId)return;if(event.workflow_run_id){activeWorkflowRunId=String(event.workflow_run_id);$('stopCrawlBtn').disabled=false}
 const type=event.type||'event',stamp=event.timestamp||Date.now();
 const message=event.message||type.replaceAll('_',' ');
 addCrawlLog(message,event.level==='error'||type==='failed'?'error':event.level==='warning'?'warn':type==='completed'?'success':'info',stamp);
 if(type==='url_inventory'){
  const incoming=Array.isArray(event.urls)?event.urls:[];
  discoveredUrls=incoming.filter((url,index)=>typeof url==='string'&&url.startsWith('http')&&incoming.indexOf(url)===index).slice(0,100);
  discoveredUrls.forEach(url=>{if(!urlStates[url])urlStates[url]='Queued'});
  $('urlDiscoveryMeta').textContent='Sources: '+(event.sources||[]).join(', ')+' · Sitemap files: '+(event.discovery?.sitemaps_read??'—')+' · Robots HTTP: '+(event.discovery?.robots_status??'unavailable')+(event.truncated?' · URL limit reached':'');
  if(autoFollowUrls&&event.url){const at=discoveredUrls.indexOf(event.url);if(at>=0)selectedUrlIndex=at}
  renderPageNavigator();
 }
 if(event.url)$('liveUrl').textContent=event.url;
 if(event.device)$('liveDevice').textContent=event.device;
 if(event.page){$('livePage').textContent='Page '+event.page+' of '+(event.total||livePageTotal||'?');}
 if(type==='opening_url'){
  $('liveHttp').textContent='HTTP —';$('liveHttp').className='live-pill';
  if(!discoveredUrls.includes(event.url)&&discoveredUrls.length<100){discoveredUrls.push(event.url);urlStates[event.url]='Queued'}
  urlStates[event.url]='Crawling';
  if(autoFollowUrls){const at=discoveredUrls.indexOf(event.url);if(at>=0)selectedUrlIndex=at}
  renderPageNavigator();
 }
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
   renderShotFilters();renderPageNavigator();
  }catch(e){addCrawlLog('Screenshot render failed: '+e.message,'error')}
 }
 if(type==='ui_checks'){
  const c=event.checks||{};latestQaResult=c;$('qaCsvBtn').disabled=$('qaMdBtn').disabled=$('qaPrintBtn').disabled=false;if((c.http_status||0)>=400||(c.broken_asset_count||0)>0)sendWebhookAlert('HTTP or broken asset errors detected',event);const rows=[['HTTP status',c.http_status??'—'],['Load time',(c.load_time_ms??'—')+' ms'],['Total page size',(c.total_page_size_kb??'—')+' KB'],['Heavy images >500KB',c.heavy_image_count??0],['Broken assets 4xx/5xx',c.broken_asset_count??0],['Console errors',c.console_error_count??(c.console_errors||[]).length],['Broken images',c.broken_images??'—'],['Horizontal overflow',c.horizontal_overflow?'Yes':'No']];
  $('liveChecks').textContent='';for(const pair of rows){const line=document.createElement('div');line.textContent=pair[0]+': '+pair[1];$('liveChecks').append(line)}for(const [title,items,format] of [['Heavy image URLs',c.heavy_images||[],x=>Math.round(x.bytes/1024)+' KB · '+x.url],['Failed asset URLs',c.broken_assets||[],x=>'HTTP '+x.status+' · '+x.url]]){if(items.length){const heading=document.createElement('strong');heading.textContent=title;heading.style.display='block';heading.style.marginTop='8px';$('liveChecks').append(heading);items.slice(0,8).forEach(item=>{const line=document.createElement('div');line.style.cssText='font-size:10px;overflow-wrap:anywhere;padding:3px 0';line.textContent=format(item);$('liveChecks').append(line)})}}
 }
 if(type==='page_done'){
  if(event.status){$('liveHttp').textContent='HTTP '+event.status;$('liveHttp').className='live-pill '+(event.status>=200&&event.status<400?'good':'bad')}
  if(event.url)urlStates[event.url]=event.error?'Failed':'Completed';
  liveDone=Math.max(liveDone,event.page||0);$('crawlProgressText').textContent='Page '+liveDone+' of '+(event.total||livePageTotal);$('liveProgress').style.width=Math.min(100,liveDone/Math.max(1,event.total||livePageTotal)*100)+'%';
  renderPageNavigator();
 }
 if(type==='completed'||type==='failed'){sendWebhookAlert(type==='completed'?'Crawl completed':'Crawl failed',event);if(crawlTimer){clearInterval(crawlTimer);crawlTimer=null}$('stopCrawlBtn').disabled=true;
  if(type==='completed'){$('liveProgress').style.width='100%';if(event.pages_completed)$('livePage').textContent='Page '+event.pages_completed+' of '+event.pages_completed}
  $('crawlStatus').textContent=type==='completed'?'Live crawl completed · '+liveShots.length+' screenshots in browser memory.':'Live crawl failed.';
  if(activeCrawlSocket){const socket=activeCrawlSocket;activeCrawlSocket=null;setTimeout(()=>{try{socket.close()}catch{}},800)}
  $('crawlBtn').disabled=false;
 }
}
$('filterDevice').onchange=renderShotFilters;$('filterMode').onchange=renderShotFilters;
$('closeLightbox').onclick=()=>{$('liveLightbox').classList.remove('open');$('lightboxImage').removeAttribute('src')};
$('liveFullscreenBtn').onclick=async()=>{try{if(document.fullscreenElement){await document.exitFullscreen()}else{await $('liveWorkspace').requestFullscreen()}}catch(e){addCrawlLog('Fullscreen is unavailable in this browser: '+e.message,'warn')}};
document.addEventListener('fullscreenchange',()=>{$('liveFullscreenBtn').textContent=document.fullscreenElement?'Exit Fullscreen':'Fullscreen ⛶';$('liveFullscreenBtn').setAttribute('aria-label',document.fullscreenElement?'Exit live browser fullscreen':'Toggle live browser fullscreen')});
$('liveLightbox').onclick=e=>{if(e.target===$('liveLightbox'))$('closeLightbox').click()};
$('stopCrawlBtn').onclick=async()=>{if(!activeWorkflowRunId){addCrawlLog('Workflow run ID is not available yet.','warn');return}try{await api('/api/crawl/stop',{method:'POST',body:JSON.stringify({run_id:activeWorkflowRunId})});addCrawlLog('Stop request sent to GitHub Actions.','warn');$('stopCrawlBtn').disabled=true}catch(e){addCrawlLog('Stop failed: '+e.message,'error')}};
$('clearCrawlBtn').onclick=()=>{
 if(activeCrawlSocket){try{activeCrawlSocket.close()}catch{}activeCrawlSocket=null}
 releaseCrawlMemory();latestQaResult=null;$('qaCsvBtn').disabled=$('qaMdBtn').disabled=$('qaPrintBtn').disabled=true;activeCrawlId=null;activeWorkflowRunId=null;liveDone=0;livePageTotal=0;if(crawlTimer){clearInterval(crawlTimer);crawlTimer=null}$('stopCrawlBtn').disabled=true;$('crawlElapsed').textContent='Elapsed 0s';$('crawlProgressText').textContent='Page 0 of 0';
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
 finally{b.disabled=false;b.innerHTML='<img class="ui-icon" src="https://media-assets-4sb.pages.dev/icons/ui/download.svg" alt="" aria-hidden="true">Download All (.zip)'}
};
async function startLiveCrawl(){
 const b=$('crawlBtn');b.disabled=true;releaseCrawlMemory();liveDone=0;livePageTotal=Math.max(1,Number($('crawlPages').value)||1);
 $('liveLogs').innerHTML='';$('liveChecks').textContent='Waiting for first page…';$('liveBoot').style.display='block';
 $('liveBoot').innerHTML='<strong>Booting Chromium Runner…</strong>GitHub Actions runner is starting. This commonly takes 15–30 seconds.';
 $('liveFrame').style.display='none';$('liveProgress').style.width='0%';$('liveHttp').textContent='HTTP —';$('livePage').textContent='Page 0 of '+livePageTotal;autoFollowUrls=true;addCrawlLog('Dispatching live Playwright crawl…');
 try{
  const d=await api('/api/crawl/start',{method:'POST',body:JSON.stringify({url:$('crawlUrl').value,max_pages:Number($('crawlPages').value),devices:$('crawlDevices').value,screenshot_mode:$('crawlCapture').value})});activeWorkflowRunId=d.workflow_run_id||null;$('stopCrawlBtn').disabled=!activeWorkflowRunId;crawlStartedAt=Date.now();if(crawlTimer)clearInterval(crawlTimer);crawlTimer=setInterval(()=>{const elapsed=Math.floor((Date.now()-crawlStartedAt)/1000),eta=liveDone?Math.max(0,Math.round(elapsed/liveDone*(livePageTotal-liveDone))):null;$('crawlElapsed').textContent='Elapsed '+elapsed+'s · ETA '+(eta===null?'—':eta+'s')},1000);
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

function updateCompare(){const url=discoveredUrls[selectedUrlIndex],shots=liveShots.filter(x=>x.url===url),d=shots.find(x=>x.device==='Desktop'),m=shots.find(x=>x.device==='Mobile');if(!d||!m){$('compareView').dataset.empty='true';return}$('compareView').dataset.empty='false';$('compareDesktop').src=d.objectUrl;$('compareMobile').src=m.objectUrl;$('compareMobile').style.clipPath='inset(0 0 0 '+$('compareSlider').value+'%)'}
$('compareToggle').onclick=()=>{$('compareView').style.display=$('compareView').style.display==='block'?'none':'block';updateCompare()};$('compareSlider').oninput=updateCompare;
function refreshSavedTargets(){const s=$('savedTargets'),items=JSON.parse(localStorage.getItem('automation-saved-targets')||'[]');s.innerHTML='<option value="">Saved Targets…</option>';items.forEach((x,i)=>{const o=document.createElement('option');o.value=String(i);o.textContent=x.name+' · '+x.url;s.append(o)})}
try{refreshSavedTargets()}catch{}
$('saveTargetBtn').onclick=()=>{try{const url=$('crawlUrl').value.trim();if(!url)throw new Error('Enter a URL first');const items=JSON.parse(localStorage.getItem('automation-saved-targets')||'[]'),entry={name:new URL(url).hostname,url,pages:$('crawlPages').value,devices:$('crawlDevices').value,capture:$('crawlCapture').value};const i=items.findIndex(x=>x.url===url);if(i>=0)items[i]=entry;else items.unshift(entry);localStorage.setItem('automation-saved-targets',JSON.stringify(items.slice(0,12)));refreshSavedTargets();$('savedTargets').value='0';$('crawlStatus').textContent='Saved in this browser.'}catch(e){$('crawlStatus').textContent=e.message}};
$('savedTargets').onchange=()=>{const x=JSON.parse(localStorage.getItem('automation-saved-targets')||'[]')[Number($('savedTargets').value)];if(x){$('crawlUrl').value=x.url;$('crawlPages').value=x.pages;$('crawlDevices').value=x.devices;$('crawlCapture').value=x.capture}};

$('stopCrawlBtn').onclick=async()=>{if(!activeWorkflowRunId){addCrawlLog('Waiting for workflow run ID.','warn');return}try{await api('/api/crawl/stop',{method:'POST',body:JSON.stringify({run_id:activeWorkflowRunId})});addCrawlLog('Cancellation requested.','warn');$('stopCrawlBtn').disabled=true}catch(e){addCrawlLog('Stop failed: '+e.message,'error')}};

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
function findClassText(html,tag,className){const re=new RegExp("<"+tag+"\\b((?:\"[^\"]*\"|'[^']*'|[^'\">])*)>([\\s\\S]*?)<\\/"+tag+"\\s*>","gi");for(const match of html.matchAll(re)){if(new RegExp("\\bclass\\s*=\\s*([\"'])[^\"']*\\b"+className+"\\b[^\"']*\\1","i").test(match[1]))return cleanText(match[2])}return ""}
function findClassTag(html,tag,className){const re=new RegExp("<"+tag+"\\b((?:\"[^\"]*\"|'[^']*'|[^'\">])*)>","gi");for(const match of html.matchAll(re)){if(new RegExp("\\bclass\\s*=\\s*([\"'])[^\"']*\\b"+className+"\\b[^\"']*\\1","i").test(match[1]))return match[0]}return ""}
function attrValue(tag,name){return decode(tag.match(new RegExp("\\b"+name+"\\s*=\\s*[\"']([^\"']*)","i"))?.[1]||"")}

function extractSelector(html,selector){
 const selectors=String(selector||"").split(",").map(x=>x.trim()).filter(Boolean);
 if(!selectors.length)return [];
 if(selectors.length>8||String(selector).length>180)throw new Error("Use up to 8 simple CSS selectors.");
 const out=[],seen=new Set();
 for(const rawSel of selectors){
  const sel=rawSel.split(/\s+/).pop();
  if(!/^(?:[a-z][\w-]*|[.#][\w-]+|[a-z][\w-]*\[[\w:-]+(?:=[\w-]+)?\])$/i.test(sel))throw new Error("Supported selectors: tag, .class, #id, tag[attr], tag[attr=value].");
  const tag=(sel.match(/^[a-z][\w-]*/i)||[])[0]||"[a-z][\\w:-]*";
  const matcher=new RegExp("<("+tag+")\\b([^>]*)>([\\s\\S]*?)<\\/\\1\\s*>","gi");
  for(const m of html.matchAll(matcher)){
   if(rawSel.toLowerCase().startsWith("table ")&&html.lastIndexOf("<table",m.index)<html.lastIndexOf("</table",m.index))continue;
   const attrs=m[2],plain=cleanText(m[3]);
   if(sel[0]==="."&&!new RegExp("class\\s*=\\s*[\"'][^\"']*\\b"+sel.slice(1)+"\\b").test(attrs))continue;
   if(sel[0]==="#"&&attrValue("<x "+attrs+">","id")!==sel.slice(1))continue;
   const a=sel.match(/^([a-z][\w-]*)?\[([\w:-]+)(?:=([\w-]+))?\]$/i);
   if(a){const v=attrValue("<x "+attrs+">",a[2]);if(!v||(a[3]&&v!==a[3]))continue}
   if(seen.has(m[0]))continue;seen.add(m[0]);out.push({tag:m[1].toLowerCase(),text:plain,attributes:{class:attrValue("<x "+attrs+">","class"),id:attrValue("<x "+attrs+">","id"),href:attrValue("<x "+attrs+">","href"),src:attrValue("<x "+attrs+">","src")}});if(out.length>=200)return out;
  }
 }
 return out;
}
function extract(html,url,status,selector){const title=decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]||"");const desc=meta(html,"description","name")||meta(html,"og:description");let image=meta(html,"og:image")||meta(html,"twitter:image","name");const canonical=decode(html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1]||url);let product={};for(const m of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)){try{const parsed=JSON.parse(m[1]);const stack=[parsed];while(stack.length){const x=stack.pop();if(Array.isArray(x)){stack.push(...x);continue}if(x&&typeof x==="object"){const t=Array.isArray(x["@type"])?x["@type"]:[x["@type"]];if(t.includes("Product")){product=x;break}stack.push(...Object.values(x))}}if(product.name)break}catch{}}let offers=Array.isArray(product.offers)?product.offers[0]:product.offers||{};let productName=product.name||findTagText(html,"h1");let price=offers.price??"";let currency=offers.priceCurrency||"";let availability=(offers.availability||"").split("/").pop();let priceText=findClassText(html,"p","price_color");if(!price&&priceText){price=priceText;const symbol=(priceText.match(/[£$€]/)||[])[0];currency=symbol==="£"?"GBP":symbol==="$"?"USD":symbol==="€"?"EUR":""}if(!availability)availability=findClassText(html,"p","availability");if(!image){const img=findClassTag(html,"img","thumbnail")||html.match(/<img[^>]+>/i)?.[0]||"";const src=attrValue(img,"src")||attrValue(img,"data-src");if(src)image=new URL(src,url).href}let productDescription="";const marker=html.search(/id=["']product_description["']/i);if(marker>=0){const section=html.slice(marker);const p=findTagMatches(section,"p")[0];if(p)productDescription=collapseRepeatedPrefix(cleanText(p[3]))}if(!productDescription){const candidates=findTagMatches(html,"p").map(m=>cleanText(m[3])).filter(t=>t.length>100&&!/customer reviews|write a review|availability|price/i.test(t));productDescription=collapseRepeatedPrefix(candidates[0]||"")}const description=productDescription||collapseRepeatedPrefix(product.description||desc||"");const seen=new Set();let paragraphs=findTagMatches(html,"p|h1|h2|h3").map(m=>collapseRepeatedPrefix(cleanText(m[3]))).filter(x=>x.length>35&&!/customer reviews|write a review|add to basket|add to cart/i.test(x)).filter(x=>{const key=x.toLowerCase();if(seen.has(key))return false;seen.add(key);return true}).slice(0,12);return {url,title:title||productName||"Untitled page",description,image,canonical,site_name:meta(html,"og:site_name"),published:meta(html,"article:published_time")||meta(html,"date","name"),author:meta(html,"author","name"),product_name:productName,price,currency,availability,paragraphs,status_code:status,...(selector?{selector,selected_items:extractSelector(html,selector)}:{})}}
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
async function fetchPublic(url){let current=url;for(let i=0;i<4;i++){const res=await fetch(current,{redirect:"manual",headers:{"User-Agent":"Mozilla/5.0 (compatible; PythonScraperDashboard/1.0)","Accept":"text/html,application/xhtml+xml"}});if([301,302,303,307,308].includes(res.status)){const loc=res.headers.get("Location");if(!loc)throw new Error("Website redirect had no Location header.");current=publicUrl(new URL(loc,current).href);continue}if(!res.ok)throw new Error("Website returned HTTP "+res.status);const type=res.headers.get("Content-Type")||"";if(!type.toLowerCase().includes("html"))throw new Error("URL did not return an HTML webpage.");const len=Number(res.headers.get("Content-Length")||0);if(len>5_000_000)throw new Error("Page exceeds the 5 MB safety limit.");const html=await res.text();if(new TextEncoder().encode(html).length>5_000_000)throw new Error("Page exceeds the 5 MB safety limit.");return extract(html,current.href,res.status,'')}throw new Error("Too many redirects.")}

async function github(path,env,options={}){const r=await fetch("https://api.github.com/repos/prem-pk-dev/python/"+path,{...options,headers:{"Accept":"application/vnd.github+json","Authorization":"Bearer "+env.GITHUB_TOKEN,"X-GitHub-Api-Version":"2022-11-28","User-Agent":"python-scraper-dashboard",...(options.headers||{})}});if(!r.ok)throw new Error("GitHub API returned HTTP "+r.status+": "+(await r.text()).slice(0,350));return r}
export default {async fetch(request,env){const url=new URL(request.url);if(request.method==="OPTIONS")return new Response(null,{status:204,headers:{"Access-Control-Allow-Methods":"GET,POST,OPTIONS","Access-Control-Allow-Headers":"Content-Type,Authorization"}});if(url.pathname==="/"&&request.method==="GET")return new Response(HTML,{headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff","Referrer-Policy":"strict-origin-when-cross-origin","X-Frame-Options":"DENY","Content-Security-Policy":"default-src 'self'; script-src 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'unsafe-inline'; img-src 'self' https: data: blob:; connect-src 'self' wss:; base-uri 'none'; frame-ancestors 'none'"}});if(url.pathname==="/api/login"&&request.method==="POST"){try{const body=await request.json();if(!env.DASHBOARD_PASSWORD||body.password!==env.DASHBOARD_PASSWORD)return json({error:"Incorrect password."},401);const payload=btoa(JSON.stringify({exp:Date.now()+12*60*60*1000})).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_");return json({token:payload+"."+await sign(payload,env.DASHBOARD_PASSWORD)})}catch{return json({error:"Invalid sign-in request."},400)}}
if(url.pathname==="/api/crawl/stop"&&request.method==="POST"){if(!await authorized(request,env))return json({error:"Session expired. Sign in again."},401);try{const body=await request.json(),runId=String(body.run_id||"");if(!/^\d{1,20}$/.test(runId))return json({error:"A valid GitHub workflow run ID is required."},400);await github("actions/runs/"+runId+"/cancel",env,{method:"POST"});return json({accepted:true,run_id:runId})}catch(e){return json({error:e.message},400)}}
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
if(!url.pathname.startsWith("/api/"))return new Response("Not found",{status:404});if(!await authorized(request,env))return json({error:"Session expired. Sign in again."},401);try{if(url.pathname==="/api/scrape"&&request.method==="POST"){const body=await request.json();const result=await fetchPublic(publicUrl(body.url));if(body.selector){const page=await fetchPublicText(body.url,{publicUrl,publicCrawlUrl});result.selector=String(body.selector);result.selected_items=extractSelector(page.text,result.selector)}return json(result)}
if(url.pathname==="/api/seo-audit"&&request.method==="POST"){
 if(!await authorized(request,env))return json({error:"Session expired. Sign in again."},401);
 const body=await request.json(),page=await fetchPublicText(body.url,{publicUrl,publicCrawlUrl});
 if(page.status<200||page.status>=300)throw new Error("Website returned HTTP "+page.status);
 if(!page.content_type.toLowerCase().includes("html"))throw new Error("URL did not return an HTML webpage.");
 const result=auditSeo(page.text,page.url,page.status,{decode,meta,attrValue,findTagMatches,cleanText,headers:page.headers});
  const host=new URL(page.url).hostname,seen=new Set(),links=[];
  for(const match of findTagMatches(page.text,"a")){
   const raw=attrValue("<a "+match[2]+">","href");if(!raw||raw.startsWith("#")||/^(mailto:|tel:|javascript:)/i.test(raw))continue;
   let target;try{target=new URL(raw,page.url)}catch{continue}
   if(target.hostname!==host||!["http:","https:"].includes(target.protocol)||seen.has(target.href))continue;
   seen.add(target.href);if(links.length>=30)break;links.push(target.href);
  }
  result.link_checks=[];
  for(const link of links){try{const check=await fetchPublicText(link,{publicUrl,publicCrawlUrl,limit:16000});result.link_checks.push({url:link,final_url:check.url,status:check.status,redirected:check.redirects.length>0,redirect_statuses:check.redirects.map(x=>x.status),ok:check.status>=200&&check.status<400})}catch(error){result.link_checks.push({url:link,status:0,ok:false,error:String(error.message||error).slice(0,140)})}}
  result.link_check_summary={checked:result.link_checks.length,broken:result.link_checks.filter(x=>!x.ok).length,redirects:result.link_checks.filter(x=>x.redirected).length,limit:30};
  return json(result);
}
if(url.pathname==="/api/site-discovery"&&request.method==="POST"){
 if(!await authorized(request,env))return json({error:"Session expired. Sign in again."},401);
 const body=await request.json();return json(await inspectSiteDiscovery(body.url,{publicCrawlUrl,fetchPublicText:(raw,limit)=>fetchPublicText(raw,{publicUrl,publicCrawlUrl,limit}),decode}));
}if(url.pathname==="/api/news"&&request.method==="GET"){
 const category=url.searchParams.get("category")||"top";
 const feeds={top:"topstories",new:"newstories",best:"beststories",show:"showstories"};
 if(!Object.prototype.hasOwnProperty.call(feeds,category))return json({error:"Category must be top, new, best, or show."},400);
 const feedResponse=await fetch("https://hacker-news.firebaseio.com/v0/"+feeds[category]+".json",{headers:{"Accept":"application/json"}});
 if(!feedResponse.ok)throw new Error("Hacker News API returned HTTP "+feedResponse.status);
 const ids=await feedResponse.json();if(!Array.isArray(ids))throw new Error("Hacker News returned an invalid story list.");
 const selected=ids.slice(0,30);
 const stories=(await Promise.all(selected.map(async id=>{
  try{const response=await fetch("https://hacker-news.firebaseio.com/v0/item/"+id+".json",{headers:{"Accept":"application/json"}});
   if(!response.ok)return null;const item=await response.json();if(!item||item.deleted||item.dead||!item.title)return null;
   return{id:item.id,title:item.title,url:item.url||("https://news.ycombinator.com/item?id="+item.id),by:item.by||"unknown",score:Number(item.score||0),descendants:Number(item.descendants||0),time:Number(item.time||0),text:typeof item.text==="string"?item.text.replace(/<[^>]*>/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#x27;|&#39;/g,"'").replace(/\\s+/g," ").trim().slice(0,420):""};
  }catch{return null}
 }))).filter(Boolean);
 return json({category,stories,updated_at:Date.now()});
}if(url.pathname==="/api/run-hn"&&request.method==="POST"){await github("actions/workflows/scraper.yml/dispatches",env,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({ref:"main"})});return json({accepted:true})}if(url.pathname==="/api/runs"&&request.method==="GET"){const r=await github("actions/workflows/scraper.yml/runs?per_page=8",env);const d=await r.json();return json({runs:(d.workflow_runs||[]).map(x=>({id:x.id,status:x.status,conclusion:x.conclusion,event:x.event,branch:x.head_branch,created_at:x.created_at}))})}return json({error:"API route not found."},404)}catch(e){return json({error:e.message||"Request failed."},400)}}};


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
