#!/bin/bash
BASE="https://3000-ic88d26cx335mlq1l01vj-694efbc5.us2.manus.computer"

URLS=(
  "/"
  "/about-us/"
  "/contact/"
  "/our-work/"
  "/landscape-design/"
  "/landscaping-services/"
  "/commercial-landscape-maintenance-bend-oregon/"
  "/maintenance-services/lawn-service-bend-oregon/"
  "/sprinkler-repair-bend-oregon/"
  "/sprinkler-system-design-and-installation-bend-oregon/"
  "/paver-patios-and-walkways-bend-oregon/"
  "/water-features-bend-oregon/"
  "/fire-pits-and-outdoor-fireplaces-bend-oregon/"
  "/landscape-lighting-bend-oregon-2/"
  "/aeration-services-bend-oregon/"
  "/landscaping-portfolio/nw-bend-backyard-landscaping/"
  "/landscaping-portfolio/east-bend-landscape-install/"
  "/landscaping-portfolio/century-drive-landscape-enhancement/"
  "/landscaping-portfolio/backyard-landscape-renovation/"
  "/landscaping-portfolio/awbrey-butte-xeriscape/"
  "/landscaping-portfolio/awbrey-glenn-flagstone-patio-and-walkway/"
  "/landscaping-portfolio/sw-bend-backyard-landscaping/"
  "/landscaping-portfolio/broken-top-xeriscape/"
  "/landscaping-portfolio/broken-top-water-feature-and-sunken-fire-pit/"
  "/your-seasonal-guide-to-seasonal-landscaping-maintenance/"
  "/the-impact-of-climate-change-on-landscaping/"
  "/privacy-policy/"
  "/terms-and-conditions/"
  "/elementor-3860/"
)

# Valid pages that should return 200 (not redirects)
VALID_PAGES=("/" "/contact/" "/our-work/" "/privacy-policy/")

echo "SOURCE URL | STATUS | DESTINATION | PASS/FAIL"
echo "-----------|--------|-------------|----------"

PASS=0
FAIL=0

for url in "${URLS[@]}"; do
  result=$(curl -s -o /dev/null -w "%{http_code}|%{redirect_url}" --max-redirs 0 "${BASE}${url}" 2>/dev/null)
  status=$(echo "$result" | cut -d'|' -f1)
  dest=$(echo "$result" | cut -d'|' -f2)
  dest_path="${dest#$BASE}"

  # Determine if this URL is a valid page (should be 200) or should redirect (301)
  is_valid_page=0
  for vp in "${VALID_PAGES[@]}"; do
    if [ "$url" = "$vp" ]; then
      is_valid_page=1
      break
    fi
  done

  if [ "$is_valid_page" = "1" ]; then
    if [ "$status" = "200" ]; then
      result_label="PASS (valid page)"
      PASS=$((PASS+1))
    else
      result_label="FAIL (expected 200)"
      FAIL=$((FAIL+1))
    fi
    echo "${url} | ${status} | ${dest_path:-[valid page]} | ${result_label}"
  else
    if [ "$status" = "301" ]; then
      result_label="PASS"
      PASS=$((PASS+1))
    else
      result_label="FAIL (expected 301, got ${status})"
      FAIL=$((FAIL+1))
    fi
    echo "${url} | ${status} | ${dest_path:-[no redirect]} | ${result_label}"
  fi
done

echo ""
echo "Results: ${PASS} passed, ${FAIL} failed"
