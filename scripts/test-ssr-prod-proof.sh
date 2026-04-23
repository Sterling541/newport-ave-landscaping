#!/bin/bash
# SSR Proof: verifies that meta tags and content appear in raw HTML
# BEFORE the first <script> tag (i.e., server-rendered, not client-rendered)
# Tests against the local production server on port 3001
BASE="http://localhost:3001"

URLS=(
  "/"
  "/services/pavers"
  "/landscaping/bend"
  "/resources/paver-patio-cost-bend-oregon"
  "/our-work"
)

ALL_PASS=1

for url in "${URLS[@]}"; do
  echo "============================================================"
  echo "URL: ${url}"
  echo "------------------------------------------------------------"

  html=$(curl -s "${BASE}${url}")

  # Find byte position of first <script> tag
  script_pos=$(echo "$html" | grep -bo "<script" | head -1 | cut -d: -f1)

  if [ -z "$script_pos" ]; then
    echo "WARNING: No <script> tag found"
    pre_script="$html"
    script_pos="N/A"
  else
    pre_script="${html:0:$script_pos}"
  fi

  echo "Chars before first <script>: ${script_pos}"

  # Check title
  title=$(echo "$pre_script" | grep -o '<title[^>]*>[^<]*</title>' | head -1)
  if [ -n "$title" ]; then
    echo "✅ TITLE: ${title}"
  else
    echo "❌ TITLE: NOT FOUND before <script>"
    ALL_PASS=0
  fi

  # Check meta description
  meta_desc=$(echo "$pre_script" | grep -o 'content="[^"]*"' | head -2 | tail -1)
  meta_name=$(echo "$pre_script" | grep -o 'name="description"' | head -1)
  if [ -n "$meta_name" ]; then
    echo "✅ META DESCRIPTION: present"
  else
    echo "❌ META DESCRIPTION: NOT FOUND before <script>"
    ALL_PASS=0
  fi

  # Check canonical
  canonical=$(echo "$pre_script" | grep -o 'rel="canonical" href="[^"]*"' | head -1)
  if [ -n "$canonical" ]; then
    echo "✅ CANONICAL: ${canonical}"
  else
    echo "❌ CANONICAL: NOT FOUND before <script>"
    ALL_PASS=0
  fi

  # Check og:title
  og_title=$(echo "$pre_script" | grep -o 'property="og:title" content="[^"]*"' | head -1)
  if [ -n "$og_title" ]; then
    echo "✅ OG:TITLE: present"
  else
    echo "❌ OG:TITLE: NOT FOUND before <script>"
    ALL_PASS=0
  fi

  # Check og:image
  og_image=$(echo "$pre_script" | grep -o 'property="og:image" content="[^"]*"' | head -1)
  if [ -n "$og_image" ]; then
    echo "✅ OG:IMAGE: present"
  else
    echo "❌ OG:IMAGE: NOT FOUND before <script>"
    ALL_PASS=0
  fi

  # Check H1 (may span multiple lines, so check for opening tag)
  h1_open=$(echo "$pre_script" | grep -o '<h1[^>]*>' | head -1)
  if [ -n "$h1_open" ]; then
    echo "✅ H1: opening tag present before <script>"
  else
    echo "❌ H1: NOT FOUND before <script>"
    ALL_PASS=0
  fi

  # Check root div has content
  root_empty=$(echo "$pre_script" | grep -c '<div id="root"></div>')
  if [ "$root_empty" -eq "0" ]; then
    echo "✅ ROOT DIV: has server-rendered content"
  else
    echo "❌ ROOT DIV: empty (SSR not working)"
    ALL_PASS=0
  fi

  echo ""
done

echo "============================================================"
if [ "$ALL_PASS" = "1" ]; then
  echo "✅ ALL SSR CHECKS PASSED"
else
  echo "❌ SOME SSR CHECKS FAILED"
fi
