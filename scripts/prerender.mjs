/**
 * scripts/prerender.mjs
 *
 * Build-time static pre-rendering script.
 *
 * After `vite build` and `vite build --ssr`, this script:
 *  1. Imports the SSR bundle (dist/server/entry-server.js)
 *  2. Reads dist/public/index.html as the HTML template
 *  3. For every public route in the sitemap, renders the React tree to HTML
 *  4. Writes dist/public/<route>/index.html with full pre-rendered HTML
 *
 * The Manus hosting platform serves static files from dist/public/ at the CDN
 * edge. By pre-generating per-route index.html files, crawlers and social
 * scrapers receive full HTML (title, meta description, canonical, H1) without
 * needing the Express SSR middleware.
 *
 * Uses AppSSR.tsx (eagerly imports all public pages) to ensure renderToString
 * produces full HTML — lazy() components render empty during SSR.
 *
 * Run with: node scripts/prerender.mjs
 * (called automatically as part of pnpm build)
 */

import { writeFileSync, mkdirSync, readFileSync, existsSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "../dist");
const distPublicDir = resolve(distDir, "public");
const ssrBundlePath = resolve(distDir, "server", "entry-server.js");
const indexHtmlPath = resolve(distPublicDir, "index.html");

// ─── Verify build artifacts exist ────────────────────────────────────────────
if (!existsSync(ssrBundlePath)) {
  console.error(`[prerender] ERROR: SSR bundle not found at ${ssrBundlePath}`);
  console.error("[prerender] Run 'vite build --ssr' first.");
  process.exit(1);
}
if (!existsSync(indexHtmlPath)) {
  console.error(`[prerender] ERROR: index.html not found at ${indexHtmlPath}`);
  console.error("[prerender] Run 'vite build' first.");
  process.exit(1);
}

// ─── All public routes (auto-generated from App.tsx route list) ──────────────
// 307 routes — all public pages excluding /admin/* and /game
const routes = [
  "/",
  "/404",
  "/about",
  "/bend-neighborhoods",
  "/blog",
  "/blog/climate-change-landscaping",
  "/blog/lawn-care-bend-oregon",
  "/blog/paver-patio-ideas-bend-oregon",
  "/blog/seasonal-landscaping-guide",
  "/blog/sprinkler-winterization-bend-oregon",
  "/blog/xeriscape-landscaping-bend-oregon",
  "/careers",
  "/commercial",
  "/commercial-landscaping-bend",
  "/contact",
  "/get-a-quote",
  "/irrigation-bend-oregon",
  "/landscape-design-bend",
  "/landscape-design-bend/hoa-design",
  "/landscape-design-bend/modern-design",
  "/landscaping-bend-oregon",
  "/landscaping/bend",
  "/landscaping/eagle-crest",
  "/landscaping/la-pine",
  "/landscaping/madras",
  "/landscaping/powell-butte",
  "/landscaping/prineville",
  "/landscaping/redmond",
  "/landscaping/sisters",
  "/landscaping/sunriver",
  "/landscaping/terrebonne",
  "/landscaping/tumalo",
  "/maintenance",
  "/maintenance/commercial-hoa",
  "/membership",
  "/opt-out",
  "/our-work",
  "/paver-patios-bend",
  "/paver-patios-bend/concrete-pavers",
  "/portfolio/awbrey-butte-patio",
  "/portfolio/awbrey-butte-xeriscape",
  "/portfolio/awbrey-glenn-flagstone",
  "/portfolio/backyard-renovation",
  "/portfolio/bend-full-yard-transformation",
  "/portfolio/broken-top-water-feature",
  "/portfolio/broken-top-xeriscape",
  "/portfolio/century-drive",
  "/portfolio/east-bend-landscape",
  "/portfolio/nw-bend-backyard",
  "/portfolio/nw-bend-lighting",
  "/portfolio/paver-patio-firepit",
  "/portfolio/sw-bend-backyard",
  "/portfolio/westside-outdoor-living",
  "/privacy-policy",
  "/quote",
  "/resources",
  "/resources/backflow-preventer-testing-bend-oregon",
  "/resources/bend-oregon-turf-rebate-program",
  "/resources/bend-turf-replacement-rebate",
  "/resources/bend-watering-restrictions",
  "/resources/best-grass-bend-oregon",
  "/resources/best-plants-central-oregon-xeriscape",
  "/resources/best-plants-xeriscape-central-oregon",
  "/resources/boulder-landscaping-cost-bend-oregon",
  "/resources/brown-lawn-bend-oregon",
  "/resources/central-oregon-landscaping-guide",
  "/resources/commercial-landscaping-bend-oregon",
  "/resources/commercial-landscaping-cost-bend-oregon",
  "/resources/defensible-space-bend-oregon",
  "/resources/deschutes-county-fire-hardening-requirements",
  "/resources/drainage-solutions-cost-bend-oregon",
  "/resources/drip-vs-spray-irrigation-bend-oregon",
  "/resources/driveway-paver-cost-bend-oregon",
  "/resources/fall-landscaping-guide-bend-oregon",
  "/resources/faq-irrigation-bend-oregon",
  "/resources/faq-lawn-care-bend-oregon",
  "/resources/faq-outdoor-lighting-bend-oregon",
  "/resources/faq-paver-patio-bend-oregon",
  "/resources/faq-retaining-wall-bend-oregon",
  "/resources/faq-snow-removal-bend-oregon",
  "/resources/faq-water-feature-bend-oregon",
  "/resources/faq-xeriscape-bend-oregon",
  "/resources/fencing-cost-bend-oregon",
  "/resources/fire-pit-patio-cost-bend-oregon",
  "/resources/fire-resistant-plants-central-oregon",
  "/resources/gas-vs-propane-fire-pit-bend-oregon",
  "/resources/hoa-landscaping-bend-oregon",
  "/resources/how-to-choose-landscaper-bend-oregon",
  "/resources/how-to-install-drip-irrigation-bend-oregon",
  "/resources/how-to-maintain-paver-patio-bend-oregon",
  "/resources/how-to-plant-trees-bend-oregon",
  "/resources/how-to-prevent-lawn-fungus-bend-oregon",
  "/resources/how-to-read-landscape-proposal-bend-oregon",
  "/resources/how-to-select-pavers-bend-oregon",
  "/resources/how-to-water-lawn-bend-oregon",
  "/resources/how-to-xeriscape-bend-oregon",
  "/resources/irrigation-faq-bend-oregon",
  "/resources/irrigation-repair-bend-oregon",
  "/resources/irrigation-repair-cost-bend-oregon",
  "/resources/juniper-removal-bend-oregon",
  "/resources/landscape-design-cost-bend-oregon",
  "/resources/landscape-lighting-bend-oregon",
  "/resources/landscape-lighting-cost-bend-oregon",
  "/resources/landscape-maintenance-plan-bend-oregon",
  "/resources/landscape-transformation-bend-oregon",
  "/resources/landscape-warranty-bend-oregon",
  "/resources/landscape-design-ideas-bend-oregon",
  "/resources/landscaping-bend-oregon",
  "/resources/landscaping-company-bend-oregon",
  "/resources/landscaping-cost-guide-bend-oregon",
  "/resources/landscaping-home-value-bend-oregon",
  "/resources/landscaping-seasons-bend-oregon",
  "/resources/landscaping-tips-bend-oregon",
  "/resources/lawn-aeration-cost-bend-oregon",
  "/resources/lawn-care-cost-bend-oregon",
  "/resources/lawn-fungus-treatment-bend-oregon",
  "/resources/lawn-maintenance-cost-bend-oregon",
  "/resources/mulch-installation-cost-bend-oregon",
  "/resources/native-vs-adapted-plants-bend-oregon",
  "/resources/natural-stone-vs-concrete-pavers-bend-oregon",
  "/resources/new-construction-landscaping-bend-oregon",
  "/resources/outdoor-kitchen-cost-bend-oregon",
  "/resources/outdoor-lighting-cost-bend-oregon",
  "/resources/paver-faq-bend-oregon",
  "/resources/deck-cost-bend-oregon",
  "/resources/paver-patio-cost-bend-oregon",
  "/resources/paver-patio-faq-bend-oregon",
  "/resources/paver-walkway-cost-bend-oregon",
  "/resources/pavers-vs-concrete-bend-oregon",
  "/resources/perennial-garden-cost-bend-oregon",
  "/resources/pergola-cost-bend-oregon",
  "/resources/professional-vs-diy-landscaping-bend-oregon",
  "/resources/retaining-wall-cost-bend-oregon",
  "/resources/snow-removal-bend-oregon",
  "/resources/snow-removal-cost-bend-oregon",
  "/resources/sod-installation-cost-bend-oregon",
  "/resources/sod-vs-seed-bend-oregon",
  "/resources/spring-landscaping-guide-bend-oregon",
  "/resources/sprinkler-system-cost-bend-oregon",
  "/resources/sprinkler-winterization-guide-bend-oregon",
  "/resources/summer-landscaping-guide-bend-oregon",
  "/resources/tree-removal-cost-bend-oregon",
  "/resources/understanding-soil-bend-oregon",
  "/resources/water-feature-cost-bend-oregon",
  "/resources/water-wise-landscaping-bend-oregon",
  "/resources/waterwise-communities-bend-hoa",
  "/resources/when-to-aerate-lawn-bend-oregon",
  "/resources/when-to-plant-bend-oregon",
  "/resources/winter-landscaping-guide-bend-oregon",
  "/resources/xeriscape-cost-bend-oregon",
  "/resources/xeriscape-faq-bend-oregon",
  "/resources/xeriscape-vs-traditional-lawn-bend-oregon",
  "/resources/bend-turf-rebate-program",
  "/resources/best-plants-xeriscape-central-oregon",
  "/resources/bend-landscaping-cost-guide",
  "/resources/hoa-landscaping-bend-oregon",
  "/resources/landscape-transformation-bend-oregon",
  "/resources/landscape-design-ideas-bend-oregon",
  "/resources/landscape-maintenance-plan-bend-oregon",
  "/resources/landscape-warranty-bend-oregon",
  "/resources/landscaping-company-bend-oregon",
  "/resources/landscaping-cost-guide-bend-oregon",
  "/resources/landscaping-seasons-bend-oregon",
  "/resources/landscaping-tips-bend-oregon",
  "/resources/new-construction-landscaping-bend-oregon",
  "/resources/landscaping-home-value-bend-oregon",
  "/schedule-services",
  "/service-areas",
  "/service-areas/alfalfa-irrigation",
  "/service-areas/alfalfa-lawn-care",
  "/service-areas/alfalfa-paver-patio",
  "/service-areas/awbrey-butte-landscaping",
  "/service-areas/bend-country-club-landscaping",
  "/service-areas/bend-east-side-landscaping",
  "/service-areas/bend-south-landscaping",
  "/service-areas/bend-westside-landscaping",
  "/service-areas/broken-top-landscaping",
  "/service-areas/brookswood-landscaping",
  "/service-areas/nw-crossing-landscaping",
  "/service-areas/century-drive-corridor-landscaping",
  "/service-areas/crooked-river-ranch",
  "/service-areas/crooked-river-ranch-irrigation",
  "/service-areas/crooked-river-ranch-lawn-care",
  "/service-areas/crooked-river-ranch-paver-patio",
  "/service-areas/culver",
  "/service-areas/culver-irrigation",
  "/service-areas/culver-lawn-care",
  "/service-areas/culver-paver-patio",
  "/service-areas/deschutes-river-woods-landscaping",
  "/service-areas/discovery-west-landscaping",
  "/service-areas/eagle-crest-landscaping",
  "/service-areas/hunnell-road-area-landscaping",
  "/service-areas/la-pine",
  "/service-areas/la-pine-irrigation",
  "/service-areas/la-pine-landscape-design",
  "/service-areas/la-pine-lawn-care",
  "/service-areas/la-pine-lawn-service",
  "/service-areas/la-pine-paver-patio",
  "/service-areas/la-pine-pavers",
  "/service-areas/la-pine-snow-removal",
  "/service-areas/la-pine-sprinkler-system",
  "/service-areas/la-pine-xeriscape",
  "/service-areas/la-pine-xeriscaping",
  "/service-areas/larkspur-landscaping",
  "/service-areas/lava-butte-area-landscaping",
  "/service-areas/madras",
  "/service-areas/madras-irrigation",
  "/service-areas/madras-landscape-design",
  "/service-areas/madras-lawn-care",
  "/service-areas/madras-lawn-service",
  "/service-areas/madras-paver-patio",
  "/service-areas/madras-pavers",
  "/service-areas/madras-snow-removal",
  "/service-areas/madras-xeriscaping",
  "/service-areas/murphy-road-area-landscaping",
  "/service-areas/northeast-bend-landscaping",
  "/service-areas/northwest-crossing-landscaping",
  "/service-areas/old-bend-landscaping",
  "/service-areas/old-mill-district-landscaping",
  "/service-areas/orion-greens-landscaping",
  "/service-areas/powell-butte-irrigation",
  "/service-areas/powell-butte-landscaping",
  "/service-areas/powell-butte-lawn-care",
  "/service-areas/powell-butte-paver-patio",
  "/service-areas/prineville",
  "/service-areas/prineville-irrigation",
  "/service-areas/prineville-landscape-design",
  "/service-areas/prineville-lawn-care",
  "/service-areas/prineville-lawn-service",
  "/service-areas/prineville-paver-patio",
  "/service-areas/prineville-pavers",
  "/service-areas/prineville-snow-removal",
  "/service-areas/prineville-sprinkler-system",
  "/service-areas/prineville-xeriscape",
  "/service-areas/prineville-xeriscaping",
  "/service-areas/redmond",
  "/service-areas/redmond-irrigation",
  "/service-areas/redmond-landscape-design",
  "/service-areas/redmond-landscaping",
  "/service-areas/redmond-lawn-care",
  "/service-areas/redmond-lawn-service",
  "/service-areas/redmond-paver-patio",
  "/service-areas/redmond-pavers",
  "/service-areas/redmond-snow-removal",
  "/service-areas/redmond-sprinkler-system",
  "/service-areas/redmond-xeriscape",
  "/service-areas/redmond-xeriscaping",
  "/service-areas/river-west-landscaping",
  "/service-areas/shevlin-meadows-landscaping",
  "/service-areas/shevlin-park-area-landscaping",
  "/service-areas/sisters",
  "/service-areas/sisters-irrigation",
  "/service-areas/sisters-landscape-design",
  "/service-areas/sisters-lawn-care",
  "/service-areas/sisters-lawn-service",
  "/service-areas/sisters-paver-patio",
  "/service-areas/sisters-pavers",
  "/service-areas/sisters-snow-removal",
  "/service-areas/sisters-sprinkler-system",
  "/service-areas/sisters-xeriscape",
  "/service-areas/sisters-xeriscaping",
  "/service-areas/skyline-ranch-landscaping",
  "/service-areas/southeast-bend-landscaping",
  "/service-areas/summit-west-landscaping",
  "/service-areas/sunriver",
  "/service-areas/sunriver-irrigation",
  "/service-areas/sunriver-landscape-design",
  "/service-areas/sunriver-landscaping",
  "/service-areas/sunriver-lawn-care",
  "/service-areas/sunriver-lawn-service",
  "/service-areas/decks-bend-oregon",
  "/service-areas/decks-redmond-oregon",
  "/service-areas/decks-sisters-oregon",
  "/service-areas/decks-sunriver-oregon",
  "/service-areas/sunriver-paver-patio",
  "/service-areas/sunriver-pavers",
  "/service-areas/sunriver-snow-removal",
  "/service-areas/sunriver-sprinkler-system",
  "/service-areas/sunriver-xeriscape",
  "/service-areas/sunriver-xeriscaping",
  "/service-areas/terrebonne",
  "/service-areas/terrebonne-irrigation",
  "/service-areas/terrebonne-landscape-design",
  "/service-areas/terrebonne-lawn-care",
  "/service-areas/terrebonne-lawn-service",
  "/service-areas/terrebonne-paver-patio",
  "/service-areas/terrebonne-pavers",
  "/service-areas/terrebonne-snow-removal",
  "/service-areas/terrebonne-xeriscaping",
  "/service-areas/tetherow-landscaping",
  "/service-areas/tumalo-irrigation",
  "/service-areas/tumalo-landscape-design",
  "/service-areas/tumalo-lawn-care",
  "/service-areas/tumalo-lawn-service",
  "/service-areas/tumalo-paver-patio",
  "/service-areas/tumalo-pavers",
  "/service-areas/tumalo-snow-removal",
  "/service-areas/tumalo-sprinkler-system",
  "/service-areas/tumalo-xeriscape",
  "/service-areas/tumalo-xeriscaping",
  "/service-areas/woodriver-village-landscaping",
  "/services",
  "/services/aeration",
  "/services/commercial-maintenance",
  "/services/drainage",
  "/services/fire-features",
  "/services/firewise-landscaping",
  "/firewise-landscaping-bend-oregon",
  "/services/irrigation",
  "/services/landscape-design",
  "/services/landscape-lighting",
  "/services/lawn-fungus",
  "/services/lawn-service",
  "/services/decks",
  "/services/outdoor-living",
  "/services/pavers",
  "/services/retaining-walls",
  "/services/snow-removal",
  "/services/sprinkler-activation",
  "/services/sprinkler-blowout",
  "/services/sprinkler-repair",
  "/services/water-features",
  "/services/water-wise-landscaping",
  "/services/xeriscaping",
  "/terms",
];

// ─── Helper: extract helmet tags and inject into index.html ──────────────────
function extractHelmetTags(appHtml) {
  // react-helmet-async renders tags with data-loc attributes inline in the body
  // We extract them and move them to the <head> section
  const helmetTagRegex = /<(?:title|meta|link)[^>]*data-loc="[^"]*"[^>]*(?:\/>|>(?:[^<]*)<\/(?:title|meta|link)>)/g;
  const headTags = [];
  let match;
  while ((match = helmetTagRegex.exec(appHtml)) !== null) {
    headTags.push(match[0]);
  }
  // Remove helmet tags from body HTML
  const bodyHtml = appHtml.replace(helmetTagRegex, "");
  return { headTags: headTags.join("\n    "), bodyHtml };
}

function buildPage(indexHtmlTemplate, appHtml) {
  const { headTags, bodyHtml } = extractHelmetTags(appHtml);

  let page = indexHtmlTemplate;

  if (headTags) {
    // Remove overridable homepage meta tags from the template
    page = page
      .replace(/<title[^>]*>[^<]*<\/title>/, "")
      .replace(/<link[^>]+rel="canonical"[^>]*\/>/g, "")
      .replace(/<meta[^>]+property="og:title"[^>]*\/>/g, "")
      .replace(/<meta[^>]+property="og:description"[^>]*\/>/g, "")
      .replace(/<meta[^>]+property="og:url"[^>]*\/>/g, "")
      .replace(/<meta[^>]+property="og:image"[^>]*\/>/g, "")
      .replace(/<meta[^>]+name="twitter:title"[^>]*\/>/g, "")
      .replace(/<meta[^>]+name="twitter:description"[^>]*\/>/g, "")
      .replace(/<meta[^>]+name="twitter:image"[^>]*\/>/g, "")
      .replace(/<meta[^>]+name="description"[^>]*\/>/g, "");

    // Inject SSR head tags before </head>
    page = page.replace("</head>", `    ${headTags}\n  </head>`);
  }

  // Inject pre-rendered body HTML into root div
  page = page.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);

  return page;
}

// ─── Main pre-rendering loop ──────────────────────────────────────────────────
async function main() {
  console.log("[prerender] Loading SSR bundle...");
  const { render } = await import(ssrBundlePath);
  const indexHtmlTemplate = readFileSync(indexHtmlPath, "utf-8");

  // Deduplicate routes
  const uniqueRoutes = [...new Set(routes)];
  console.log(`[prerender] Pre-rendering ${uniqueRoutes.length} routes...`);
  let success = 0;
  let failed = 0;
  let skipped = 0;

  for (const route of uniqueRoutes) {
    try {
      const { html: appHtml, notFound } = render(route);

      if (notFound) {
        // Don't generate a file for 404 routes
        skipped++;
        continue;
      }

      const page = buildPage(indexHtmlTemplate, appHtml);

      // Determine output path: / → index.html, /about → about/index.html
      let outPath;
      if (route === "/") {
        outPath = join(distPublicDir, "index.html");
      } else {
        // Strip leading slash, create directory
        const routeDir = join(distPublicDir, route.replace(/^\//, ""));
        mkdirSync(routeDir, { recursive: true });
        outPath = join(routeDir, "index.html");
      }

      writeFileSync(outPath, page, "utf-8");
      success++;
    } catch (err) {
      console.error(`[prerender] ERROR rendering ${route}:`, err.message);
      failed++;
    }
  }

  console.log(`[prerender] Done: ${success} pages pre-rendered, ${skipped} skipped (404), ${failed} failed.`);
  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("[prerender] Fatal error:", err);
  process.exit(1);
});
