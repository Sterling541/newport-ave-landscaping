#!/bin/bash
# SSR Proof: verifies that H1, meta description, and canonical appear in raw HTML
# BEFORE the first <script> tag (i.e., server-rendered, not client-rendered)
BASE="https://3000-ic88d26cx335mlq1l01vj-694efbc5.us2.manus.computer"

URLS=(
  "/"
  "/services/pavers"
  "/landscaping/bend"
  "/resources/paver-patio-cost-bend-oregon"
  "/our-work"
)

for url in "${URLS[@]}"; do
  echo "============================================================"
  echo "URL: ${url}"
  echo "------------------------------------------------------------"

  html=$(curl -s "${BASE}${url}")

  # Find position of first <script> tag
  script_pos=$(echo "$html" | grep -bo "<script" | head -1 | cut -d: -f1)

  # Extract content before first <script>
  if [ -n "$script_pos" ]; then
    pre_script=$(echo "$html" | head -c "$script_pos")
  else
    pre_script="$html"
  fi

  # Check title
  title=$(echo "$pre_script" | grep -o '<title[^>]*>[^<]*</title>' | head -1)
  echo "TITLE (before <script>): ${title:-NOT FOUND}"

  # Check meta description
  meta_desc=$(echo "$pre_script" | grep -o 'name="description"[^>]*' | head -1)
  echo "META DESCRIPTION (before <script>): ${meta_desc:-NOT FOUND}"

  # Check canonical
  canonical=$(echo "$pre_script" | grep -o 'rel="canonical"[^>]*' | head -1)
  echo "CANONICAL (before <script>): ${canonical:-NOT FOUND}"

  # Check og:title
  og_title=$(echo "$pre_script" | grep -o 'property="og:title"[^>]*' | head -1)
  echo "OG:TITLE (before <script>): ${og_title:-NOT FOUND}"

  # Check H1
  h1=$(echo "$pre_script" | grep -o '<h1[^>]*>[^<]*</h1>' | head -1)
  echo "H1 (before <script>): ${h1:-NOT FOUND (may span multiple lines)}"

  # Check if root div has content
  root_content=$(echo "$pre_script" | grep -o '<div id="root">[^<]\{1,50\}' | head -1)
  echo "ROOT DIV CONTENT (before <script>): ${root_content:-checking...}"

  # Count chars before first script
  echo "Chars before first <script>: ${script_pos:-N/A (no script tag found)}"
  echo ""
done
