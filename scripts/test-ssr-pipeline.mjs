/**
 * test-ssr-pipeline.mjs
 * Simulates the full SSR pipeline: load bundle → render → inject into template → verify output.
 */
import { render } from "../dist/server/entry-server.js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexHtml = readFileSync(resolve(__dirname, "../dist/public/index.html"), "utf-8");

function splitRenderedHtml(appHtml) {
  const firstDivIdx = appHtml.indexOf("<div");
  if (firstDivIdx <= 0) return { headTags: "", bodyHtml: appHtml };
  return {
    headTags: appHtml.slice(0, firstDivIdx).trim(),
    bodyHtml: appHtml.slice(firstDivIdx),
  };
}

function buildPage(url) {
  const { html: appHtml } = render(url);
  const { headTags, bodyHtml } = splitRenderedHtml(appHtml);

  let page = indexHtml;
  if (headTags) {
    page = page.replace(/<title>[^<]*<\/title>/, "");
    page = page.replace("</head>", `  ${headTags}\n  </head>`);
  }
  page = page.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
  return page;
}

const testCases = [
  {
    url: "/",
    checks: [
      { label: "has <title>", test: p => /<title[^>]*>[^<]+<\/title>/.test(p) },
      { label: "title contains Newport", test: p => p.includes("Newport") },
      { label: "has meta description", test: p => p.includes('name="description"') },
      { label: "has og:title", test: p => p.includes('property="og:title"') },
      { label: "has canonical link", test: p => p.includes('rel="canonical"') },
      { label: "root div has content", test: p => !p.includes('<div id="root"></div>') },
      { label: "title in <head>", test: p => {
        const headEnd = p.indexOf("</head>");
        const titlePos = p.indexOf("<title");
        return titlePos > 0 && titlePos < headEnd;
      }},
    ],
  },
  {
    url: "/services/pavers",
    checks: [
      { label: "has <title>", test: p => /<title[^>]*>[^<]+<\/title>/.test(p) },
      { label: "title mentions Paver", test: p => p.toLowerCase().includes("paver") },
      { label: "has meta description", test: p => p.includes('name="description"') },
    ],
  },
  {
    url: "/landscaping/bend",
    checks: [
      { label: "has <title>", test: p => /<title[^>]*>[^<]+<\/title>/.test(p) },
      { label: "title mentions Bend", test: p => p.includes("Bend") },
    ],
  },
];

let passed = 0;
let failed = 0;

for (const { url, checks } of testCases) {
  console.log(`\nTesting: ${url}`);
  const page = buildPage(url);

  // Extract title for display
  const titleMatch = page.match(/<title>([^<]*)<\/title>/);
  const title = titleMatch?.[1] || "(no title)";
  console.log(`  Title: ${title.slice(0, 80)}`);
  console.log(`  Page size: ${page.length} chars`);

  for (const { label, test } of checks) {
    if (test(page)) {
      console.log(`  ✅ ${label}`);
      passed++;
    } else {
      console.log(`  ❌ ${label}`);
      failed++;
    }
  }
}

console.log(`\n${"=".repeat(50)}`);
console.log(`${passed} checks passed, ${failed} failed`);
if (failed > 0) process.exit(1);
