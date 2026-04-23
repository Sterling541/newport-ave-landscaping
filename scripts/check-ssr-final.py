#!/usr/bin/env python3
import urllib.request
import re

def check(url, label):
    with urllib.request.urlopen(url) as r:
        html = r.read().decode('utf-8')
    
    empty = '<div id="root"></div>' in html
    head_end = html.find('</head>')
    head = html[:head_end]
    
    title_m = re.search(r'<title[^>]*>([^<]+)</title>', head)
    canonical_m = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']+)["\']', head)
    desc_m = re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']{20,80})', head)
    h1_m = re.search(r'<h1[^>]*>([^<]{5,80})', html)
    
    print(f"\n{'='*60}")
    print(f"URL: {label}")
    print(f"  Page size:   {len(html):,} chars")
    print(f"  Root empty:  {empty}  {'❌' if empty else '✅'}")
    print(f"  Title:       {title_m.group(1)[:70] if title_m else 'NOT FOUND ❌'}")
    print(f"  Canonical:   {canonical_m.group(1)[:70] if canonical_m else 'NOT FOUND ❌'}")
    print(f"  Description: {desc_m.group(1)[:70] + '...' if desc_m else 'NOT FOUND ❌'}")
    print(f"  H1:          {h1_m.group(1)[:70] if h1_m else 'NOT FOUND ❌'}")

BASE = "http://localhost:4000"
check(f"{BASE}/",                  "/  (homepage)")
check(f"{BASE}/services/pavers",   "/services/pavers")
check(f"{BASE}/landscaping/bend",  "/landscaping/bend")
check(f"{BASE}/services/irrigation", "/services/irrigation")
check(f"{BASE}/our-work",          "/our-work")

print("\n" + "="*60)
print("REDIRECT CHECKS")
import urllib.error

def check_redirect(path, expected_dest):
    try:
        req = urllib.request.Request(f"{BASE}{path}", method='GET')
        urllib.request.urlopen(req)
        print(f"  ❌ {path} → no redirect (expected 301 → {expected_dest})")
    except urllib.error.HTTPError as e:
        if e.code == 301:
            loc = e.headers.get('Location', '')
            loc_path = loc.replace(BASE, '')
            ok = loc_path == expected_dest
            print(f"  {'✅' if ok else '❌'} {path} → 301 → {loc_path}  (expected {expected_dest})")
        else:
            print(f"  ❌ {path} → HTTP {e.code}")

check_redirect("/sprinkler-repair-bend-oregon/",                          "/services/sprinkler-repair")
check_redirect("/landscaping-portfolio/awbrey-butte-xeriscape/",          "/portfolio/awbrey-butte-xeriscape")
check_redirect("/landscaping-portfolio/nw-bend-backyard-landscaping/",    "/portfolio/nw-bend-backyard")
check_redirect("/fire-pits-and-outdoor-fireplaces-bend-oregon/",          "/services/fire-features")
check_redirect("/elementor-3860/",                                        "/")
check_redirect("/terms-and-conditions/",                                  "/terms")
check_redirect("/the-impact-of-climate-change-on-landscaping/",           "/resources/climate-change-landscaping")
check_redirect("/your-seasonal-guide-to-seasonal-landscaping-maintenance/", "/resources/seasonal-maintenance")

print()
