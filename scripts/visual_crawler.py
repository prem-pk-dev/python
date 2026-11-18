#!/usr/bin/env python3
import argparse, asyncio, csv, json, re
from collections import deque
from pathlib import Path
from urllib.parse import urljoin, urlparse, urldefrag, urlunparse
from playwright.async_api import async_playwright

OUT=Path("visual-crawl-output")
def norm(u):
 p=urlparse(urldefrag(u)[0]); return urlunparse((p.scheme.lower(),p.netloc.lower(),p.path or "/",p.params,p.query,""))
def same(a,b):
 x,y=urlparse(a),urlparse(b); return (x.scheme,x.netloc)==(y.scheme,y.netloc)
async def main():
 ap=argparse.ArgumentParser()
 ap.add_argument("--url",required=True); ap.add_argument("--max-pages",type=int,default=50)
 ap.add_argument("--devices",choices=["desktop","mobile","all"],default="all")
 ap.add_argument("--capture",choices=["full","viewport","both"],default="both")
 a=ap.parse_args(); start=norm(a.url)
 if urlparse(start).scheme not in ("http","https"): raise SystemExit("Only http/https URLs are allowed")
 limit=max(1,min(a.max_pages,100)); OUT.mkdir(exist_ok=True); shots=OUT/"screenshots"; shots.mkdir(exist_ok=True)
 devices=["desktop","tablet","mobile"] if a.devices=="all" else [a.devices]
 sizes={"desktop":{"width":1440,"height":1000},"tablet":{"width":820,"height":1180},"mobile":{"width":390,"height":844}}
 queue=deque([start]); seen=set(); records=[]
 async with async_playwright() as p:
  browser=await p.chromium.launch()
  while queue and len(seen)<limit:
   url=queue.popleft()
   if url in seen: continue
   seen.add(url); page=await browser.new_page(viewport=sizes["desktop"])
   errors=[]; failed=[]
   page.on("pageerror",lambda e:errors.append(str(e)[:300]))
   page.on("requestfailed",lambda r:failed.append({"url":r.url,"error":r.failure}))
   rec={"url":url,"title":"","status":None,"text":"","links":[],"images":[],"screenshots":{},"console_errors":errors,"failed_requests":failed,"audit":{}}
   try:
    response=await page.goto(url,wait_until="domcontentloaded",timeout=45000)
    try: await page.wait_for_load_state("networkidle",timeout=8000)
    except Exception: pass
    rec["status"]=response.status if response else None; rec["title"]=await page.title()
    data=await page.evaluate("""() => ({text:(document.body?.innerText||'').slice(0,30000),links:[...document.querySelectorAll('a[href]')].map(a=>({url:a.href,text:(a.innerText||a.getAttribute('aria-label')||'').trim().slice(0,180)})),images:[...document.images].map(i=>({src:i.currentSrc||i.src,alt:i.alt||'',loaded:i.complete&&i.naturalWidth>0})),headings:[...document.querySelectorAll('h1,h2,h3')].slice(0,100).map(h=>({tag:h.tagName,text:(h.innerText||'').trim().slice(0,200)})),audit:{viewportWidth:innerWidth,documentWidth:document.documentElement.scrollWidth,horizontalOverflow:document.documentElement.scrollWidth>innerWidth,missingImageAlt:[...document.images].filter(i=>!i.hasAttribute('alt')).length,emptyLinks:[...document.querySelectorAll('a')].filter(a=>!(a.innerText||a.getAttribute('aria-label')||'').trim()).length,missingMain:!document.querySelector('main'),missingH1:!document.querySelector('h1')}})""")
    rec.update(data)
    for link in data["links"]:
     candidate=norm(link["url"])
     if same(start,candidate) and candidate not in seen and candidate not in queue and len(seen)+len(queue)<limit*3 and not re.search(r"\.(pdf|zip|png|jpe?g|gif|svg|webp|mp4|mp3|css|js|xml|json)(\?|$)",candidate,re.I): queue.append(candidate)
    for device in devices:
     await page.set_viewport_size(sizes[device]); await page.wait_for_timeout(350)
     slug=re.sub(r"[^a-zA-Z0-9]+","-",urlparse(url).path.strip("/") or "home").strip("-")[:55] or "home"
     base=f"{len(records)+1:03d}-{slug}-{device}"
     if a.capture in ("full","both"):
      path=shots/f"{base}-full.png"; await page.screenshot(path=str(path),full_page=True,animations="disabled",timeout=30000); rec["screenshots"][device+"_full"]=str(path)
     if a.capture in ("viewport","both"):
      path=shots/f"{base}-viewport.png"; await page.screenshot(path=str(path),full_page=False,animations="disabled",timeout=30000); rec["screenshots"][device+"_viewport"]=str(path)
   except Exception as e: rec["error"]=str(e)[:1000]
   records.append(rec); await page.close()
  await browser.close()
 (OUT/"crawl-report.json").write_text(json.dumps({"start_url":start,"pages_discovered":len(seen),"pages_captured":len(records),"records":records},ensure_ascii=False,indent=2),encoding="utf-8")
 with (OUT/"pages.csv").open("w",newline="",encoding="utf-8") as f:
  w=csv.DictWriter(f,fieldnames=["url","title","status","error","screenshots"]); w.writeheader()
  for r in records: w.writerow({k:(json.dumps(r.get(k),ensure_ascii=False) if k=="screenshots" else r.get(k,"")) for k in w.fieldnames})
 print(f"Captured {len(records)} pages. Files saved to {OUT}")
if __name__=="__main__": asyncio.run(main())
