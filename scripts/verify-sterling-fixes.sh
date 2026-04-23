#!/usr/bin/env bash
# Verify Sterling's two redirect fixes against the live dev server
BASE="https://3000-ic88d26cx335mlq1l01vj-694efbc5.us2.manus.computer"
PASS=0
FAIL=0

check() {
  local src="$1"
  local expected="$2"
  local result
  result=$(curl -s -o /dev/null -w "%{http_code}|%{redirect_url}" -L --max-redirs 0 "$BASE$src")
  local code="${result%%|*}"
  local location="${result##*|}"
  # Strip base URL from location for comparison
  local dest="${location#$BASE}"
  if [[ "$code" == "301" && "$dest" == "$expected" ]]; then
    echo "✅ $src → $expected"
    ((PASS++))
  else
    echo "❌ $src → got HTTP $code to '$dest' (expected 301 → $expected)"
    ((FAIL++))
  fi
}

echo "=== Fix 1: Portfolio detail page redirects ==="
check "/landscaping-portfolio/nw-bend-backyard-landscaping"              "/portfolio/nw-bend-backyard"
check "/landscaping-portfolio/nw-bend-backyard-landscaping/"             "/portfolio/nw-bend-backyard"
check "/landscaping-portfolio/east-bend-landscape-install"               "/portfolio/east-bend-landscape"
check "/landscaping-portfolio/east-bend-landscape-install/"              "/portfolio/east-bend-landscape"
check "/landscaping-portfolio/century-drive-landscape-enhancement"       "/portfolio/century-drive"
check "/landscaping-portfolio/century-drive-landscape-enhancement/"      "/portfolio/century-drive"
check "/landscaping-portfolio/backyard-landscape-renovation"             "/portfolio/backyard-renovation"
check "/landscaping-portfolio/backyard-landscape-renovation/"            "/portfolio/backyard-renovation"
check "/landscaping-portfolio/awbrey-butte-xeriscape"                   "/portfolio/awbrey-butte-xeriscape"
check "/landscaping-portfolio/awbrey-butte-xeriscape/"                  "/portfolio/awbrey-butte-xeriscape"
check "/landscaping-portfolio/awbrey-glenn-flagstone-patio-and-walkway"  "/portfolio/awbrey-glenn-flagstone"
check "/landscaping-portfolio/awbrey-glenn-flagstone-patio-and-walkway/" "/portfolio/awbrey-glenn-flagstone"
check "/landscaping-portfolio/sw-bend-backyard-landscaping"              "/portfolio/sw-bend-backyard"
check "/landscaping-portfolio/sw-bend-backyard-landscaping/"             "/portfolio/sw-bend-backyard"
check "/landscaping-portfolio/broken-top-xeriscape"                     "/portfolio/broken-top-xeriscape"
check "/landscaping-portfolio/broken-top-xeriscape/"                    "/portfolio/broken-top-xeriscape"
check "/landscaping-portfolio/broken-top-water-feature-and-sunken-fire-pit"  "/portfolio/broken-top-water-feature"
check "/landscaping-portfolio/broken-top-water-feature-and-sunken-fire-pit/" "/portfolio/broken-top-water-feature"

echo ""
echo "=== Fix 2: Sprinkler repair (not irrigation) ==="
check "/sprinkler-repair-bend-oregon"  "/services/sprinkler-repair"
check "/sprinkler-repair-bend-oregon/" "/services/sprinkler-repair"

echo ""
echo "=== Summary: $PASS passed, $FAIL failed ==="
