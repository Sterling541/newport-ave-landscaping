/**
 * build-vercel-api.mjs
 *
 * Creates a Vercel Build Output API v3 structure under .vercel/output/:
 *
 *   .vercel/output/
 *   ├── config.json                     ← routing rules
 *   ├── static/                         ← all static assets (from dist/public/)
 *   └── functions/
 *       └── api.func/
 *           ├── .vc-config.json         ← function runtime config
 *           ├── index.js                ← compiled Express handler
 *           ├── server/                 ← SSR bundle (entry-server.js + assets)
 *           └── public/
 *               └── index.html          ← HTML template for SSR
 *
 * References:
 *   https://vercel.com/docs/build-output-api/v3
 */
import { build } from 'esbuild';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// ─── Paths ────────────────────────────────────────────────────────────────────
const vercelOut   = path.join(root, '.vercel', 'output');
const staticDir   = path.join(vercelOut, 'static');
const funcDir     = path.join(vercelOut, 'functions', 'api.func');
const configPath  = path.join(vercelOut, 'config.json');

// ─── Clean previous output ────────────────────────────────────────────────────
if (fs.existsSync(vercelOut)) {
  fs.rmSync(vercelOut, { recursive: true, force: true });
}
fs.mkdirSync(funcDir, { recursive: true });
fs.mkdirSync(staticDir, { recursive: true });

// ─── 1. Compile server/vercel-entry.ts → .vercel/output/functions/api.func/index.js
console.log('Compiling server/vercel-entry.ts → .vercel/output/functions/api.func/index.js...');
await build({
  entryPoints: [path.join(root, 'server', 'vercel-entry.ts')],
  outfile: path.join(funcDir, 'index.js'),
  platform: 'node',
  bundle: true,
  format: 'esm',
  target: 'node20',
  // Bundle all runtime dependencies into the function.
  // Mark build-time-only packages as external (they're pulled in transitively
  // by server/_core/vite.ts but are never called in production mode):
  external: [
    // Vite and its ecosystem — only used in dev mode via setupVite()
    'vite',
    '@tailwindcss/oxide',
    '@tailwindcss/vite',
    'lightningcss',
    // Babel — pulled in by vite, not needed at runtime
    '@babel/core',
    '@babel/preset-typescript',
    // Native binary modules that can't be bundled
    'fsevents',
    // CLI tools, not runtime
    'drizzle-kit',
  ],
  // Suppress warnings about dynamic requires in bundled packages
  logLevel: 'error',
  // CJS shim: some bundled packages (e.g. dotenv) use require() internally.
  // When bundled into ESM, these become "Dynamic require of X is not supported".
  // This banner injects a require() shim that delegates to createRequire.
  banner: {
    js: [
      `import { createRequire } from 'module';`,
      `const require = createRequire(import.meta.url);`,
    ].join('\n'),
  },
});
console.log('Compiled .vercel/output/functions/api.func/index.js');

// ─── 2. Write .vc-config.json for the function ────────────────────────────────
// Inject RESEND_API_KEY into the Vercel function environment at build time.
// This key is read from the build environment (set via Vercel project settings
// or passed as RESEND_API_KEY=... before the build command).
const resendApiKey = process.env.RESEND_API_KEY || 're_5bnA1tZt_DoWraNNBadaNfL9gjYvc8ayG';
fs.writeFileSync(
  path.join(funcDir, '.vc-config.json'),
  JSON.stringify({
    runtime: 'nodejs20.x',
    handler: 'index.js',
    launcherType: 'Nodejs',
    shouldAddHelpers: true,
    environment: { RESEND_API_KEY: resendApiKey },
  }, null, 2),
);
console.log('Wrote .vercel/output/functions/api.func/.vc-config.json');

// ─── 3. Copy SSR server bundle to func/server/ ────────────────────────────────
const serverSrc  = path.join(root, 'dist', 'server');
const serverDest = path.join(funcDir, 'server');

if (fs.existsSync(serverSrc)) {
  fs.mkdirSync(serverDest, { recursive: true });
  for (const file of fs.readdirSync(serverSrc)) {
    const srcPath  = path.join(serverSrc, file);
    const destPath = path.join(serverDest, file);
    if (fs.statSync(srcPath).isDirectory()) continue;
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied dist/server/${file} → func/server/${file}`);
  }
}

// ─── 4. Copy dist/public/index.html to func/public/ ──────────────────────────
const publicSrc  = path.join(root, 'dist', 'public');
const publicDest = path.join(funcDir, 'public');

if (fs.existsSync(publicSrc)) {
  fs.mkdirSync(publicDest, { recursive: true });
  const indexSrc = path.join(publicSrc, 'index.html');
  if (fs.existsSync(indexSrc)) {
    fs.copyFileSync(indexSrc, path.join(publicDest, 'index.html'));
    console.log('Copied dist/public/index.html → func/public/index.html');
  }
}

// ─── 5. Copy all static assets to .vercel/output/static/ ─────────────────────
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath  = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (fs.existsSync(publicSrc)) {
  copyDir(publicSrc, staticDir);
  console.log('Copied dist/public/ → .vercel/output/static/');
}

// ─── 6. Write .vercel/output/config.json ─────────────────────────────────────
//
// Routing rules (Build Output API v3):
//   1. 301 redirects (old WordPress URLs → new site structure)
//   2. Serve static assets with long-lived cache headers
//   3. Check filesystem (serves pre-rendered HTML pages, robots.txt, sitemap)
//   4. Route everything else to the Express serverless function
//

// Static 301 redirect map (mirrors server/redirects.ts REDIRECTS)
const REDIRECTS = {
  "/home":  "/",
  "/home/": "/",
  "/about-us":    "/about",
  "/about-us/":   "/about",
  "/contact-us":  "/contact",
  "/contact-us/": "/contact",
  "/landscaping-services":  "/services",
  "/landscaping-services/": "/services",
  "/landscape-design":   "/services/landscape-design",
  "/landscape-design/":  "/services/landscape-design",
  "/pavers-bend-oregon":  "/services/pavers",
  "/pavers-bend-oregon/": "/services/pavers",
  "/paver-patios-and-walkways-bend-oregon":  "/services/pavers",
  "/paver-patios-and-walkways-bend-oregon/": "/services/pavers",
  "/snow-removal-bend-oregon":  "/services/snow-removal",
  "/snow-removal-bend-oregon/": "/services/snow-removal",
  "/sprinkler-system-design-and-installation-bend-oregon":  "/services/irrigation",
  "/sprinkler-system-design-and-installation-bend-oregon/": "/services/irrigation",
  "/landscape-lighting-bend-oregon-2":  "/services/landscape-lighting",
  "/landscape-lighting-bend-oregon-2/": "/services/landscape-lighting",
  "/landscape-lighting-bend-oregon":  "/services/landscape-lighting",
  "/landscape-lighting-bend-oregon/": "/services/landscape-lighting",
  "/commercial-landscape-maintenance-bend-oregon":  "/services/commercial-maintenance",
  "/commercial-landscape-maintenance-bend-oregon/": "/services/commercial-maintenance",
  "/water-features-bend-oregon":  "/services/water-features",
  "/water-features-bend-oregon/": "/services/water-features",
  "/outdoor-kitchens-and-living-spaces-bend-oregon":  "/services/outdoor-living",
  "/outdoor-kitchens-and-living-spaces-bend-oregon/": "/services/outdoor-living",
  "/xeriscape-landscaping-bend-oregon":  "/services/xeriscaping",
  "/xeriscape-landscaping-bend-oregon/": "/services/xeriscaping",
  "/retaining-walls-bend-oregon":  "/services/retaining-walls",
  "/retaining-walls-bend-oregon/": "/services/retaining-walls",
  "/artificial-turf-bend-oregon":  "/services/artificial-turf",
  "/artificial-turf-bend-oregon/": "/services/artificial-turf",
  "/maintenance-services":  "/maintenance",
  "/maintenance-services/": "/maintenance",
  "/maintenance-services/lawn-service-bend-oregon":  "/services/lawn-service",
  "/maintenance-services/lawn-service-bend-oregon/": "/services/lawn-service",
  "/maintenance-services/residential-lawncare-bend-oregon":  "/services/lawn-service",
  "/maintenance-services/residential-lawncare-bend-oregon/": "/services/lawn-service",
  "/maintenance-services/sprinkler-repair-bend-oregon":  "/services/sprinkler-repair",
  "/maintenance-services/sprinkler-repair-bend-oregon/": "/services/sprinkler-repair",
  "/maintenance-services/snow-removal-bend-oregon":  "/services/snow-removal",
  "/maintenance-services/snow-removal-bend-oregon/": "/services/snow-removal",
  "/sprinkler-system-activation-bend-oregon":  "/services/sprinkler-activation",
  "/sprinkler-system-activation-bend-oregon/": "/services/sprinkler-activation",
  "/sprinkler-blowout-service-central-oregon":  "/services/sprinkler-blowout",
  "/sprinkler-blowout-service-central-oregon/": "/services/sprinkler-blowout",
  "/sprinkler-repair-bend-oregon":  "/services/sprinkler-repair",
  "/sprinkler-repair-bend-oregon/": "/services/sprinkler-repair",
  "/aeration-services-bend-oregon":  "/services/aeration",
  "/aeration-services-bend-oregon/": "/services/aeration",
  "/landscaping-portfolio/awbrey-butte-xeriscape":  "/portfolio/awbrey-butte-xeriscape",
  "/landscaping-portfolio/awbrey-butte-xeriscape/": "/portfolio/awbrey-butte-xeriscape",
  "/landscaping-portfolio/backyard-landscape-renovation":  "/portfolio/backyard-renovation",
  "/landscaping-portfolio/backyard-landscape-renovation/": "/portfolio/backyard-renovation",
  "/landscaping-portfolio/sw-bend-backyard-landscaping":  "/portfolio/sw-bend-backyard",
  "/landscaping-portfolio/sw-bend-backyard-landscaping/": "/portfolio/sw-bend-backyard",
  "/landscaping-portfolio/nw-bend-backyard-landscaping":  "/portfolio/nw-bend-backyard",
  "/landscaping-portfolio/nw-bend-backyard-landscaping/": "/portfolio/nw-bend-backyard",
  "/portfolio-item/backyard-landscape-renovation":  "/portfolio/backyard-renovation",
  "/portfolio-item/backyard-landscape-renovation/": "/portfolio/backyard-renovation",
  "/landscaping-portfolio":  "/our-work",
  "/landscaping-portfolio/": "/our-work",
  "/landscaping-portfolio/awbrey-butte-patio-extension-and-wall":  "/portfolio/awbrey-butte-patio",
  "/landscaping-portfolio/awbrey-butte-patio-extension-and-wall/": "/portfolio/awbrey-butte-patio",
  "/landscaping-portfolio/nw-bend-landscape-lighting":  "/portfolio/nw-bend-lighting",
  "/landscaping-portfolio/nw-bend-landscape-lighting/": "/portfolio/nw-bend-lighting",
  "/landscaping-portfolio/westside-outdoor-living-space":  "/portfolio/westside-outdoor-living",
  "/landscaping-portfolio/westside-outdoor-living-space/": "/portfolio/westside-outdoor-living",
  "/landscaping-portfolio/broken-top-water-feature-and-sunken-fire-pit":  "/portfolio/broken-top-water-feature",
  "/landscaping-portfolio/broken-top-water-feature-and-sunken-fire-pit/": "/portfolio/broken-top-water-feature",
  "/landscaping-portfolio/century-drive-landscape-enhancement":  "/portfolio/century-drive",
  "/landscaping-portfolio/century-drive-landscape-enhancement/": "/portfolio/century-drive",
  "/landscaping-portfolio/broken-top-xeriscape":  "/portfolio/broken-top-xeriscape",
  "/landscaping-portfolio/broken-top-xeriscape/": "/portfolio/broken-top-xeriscape",
  "/landscaping-portfolio/awbrey-glenn-flagstone-patio-and-walkway":  "/portfolio/awbrey-glenn-flagstone",
  "/landscaping-portfolio/awbrey-glenn-flagstone-patio-and-walkway/": "/portfolio/awbrey-glenn-flagstone",
  "/landscaping-portfolio/east-bend-landscape-install":  "/portfolio/east-bend-landscape",
  "/landscaping-portfolio/east-bend-landscape-install/": "/portfolio/east-bend-landscape",
  "/landscaping-portfolio/paver-patio-and-gas-firepit":  "/portfolio/paver-patio-firepit",
  "/landscaping-portfolio/paver-patio-and-gas-firepit/": "/portfolio/paver-patio-firepit",
  "/landscaping-portfolio-categories/pavers":  "/our-work",
  "/landscaping-portfolio-categories/pavers/": "/our-work",
  "/our-work/nw-delaware-landscape-renovation":  "/our-work",
  "/our-work/nw-delaware-landscape-renovation/": "/our-work",
  "/lawn-fungus":  "/resources/lawn-fungus",
  "/lawn-fungus/": "/resources/lawn-fungus",
  "/the-impact-of-climate-change-on-landscaping":  "/resources/climate-change-landscaping",
  "/the-impact-of-climate-change-on-landscaping/": "/resources/climate-change-landscaping",
  "/your-seasonal-guide-to-seasonal-landscaping-maintenance":  "/resources/seasonal-maintenance",
  "/your-seasonal-guide-to-seasonal-landscaping-maintenance/": "/resources/seasonal-maintenance",
  "/fire-pits-and-outdoor-fireplaces-bend-oregon":  "/services/fire-features",
  "/fire-pits-and-outdoor-fireplaces-bend-oregon/": "/services/fire-features",
  // Canonical city URLs: /landscaping/[city] is canonical; redirect /service-areas/[city]-landscaping
  "/service-areas/redmond-landscaping":      "/landscaping/redmond",
  "/service-areas/redmond-landscaping/":     "/landscaping/redmond",
  "/service-areas/sunriver-landscaping":     "/landscaping/sunriver",
  "/service-areas/sunriver-landscaping/":    "/landscaping/sunriver",
  "/service-areas/eagle-crest-landscaping":  "/landscaping/eagle-crest",
  "/service-areas/eagle-crest-landscaping/": "/landscaping/eagle-crest",
  "/service-areas/powell-butte-landscaping": "/landscaping/powell-butte",
  "/service-areas/powell-butte-landscaping/":"/landscaping/powell-butte",
  "/terms-and-conditions":  "/terms",
  "/terms-and-conditions/": "/terms",
  "/wp-admin":          "/",
  "/wp-login.php":      "/",
  "/feed":              "/",
  "/feed/":             "/",
  "/sitemap_index.xml": "/sitemap.xml",
  "/elementor-3860":    "/",
  "/elementor-3860/":   "/",
};

// Wildcard prefix redirects (mirrors server/redirects.ts WILDCARD_PREFIXES)
const WILDCARD_PREFIXES = [
  { prefix: '/landscaping-portfolio/', destination: '/portfolio/' },
  { prefix: '/portfolio-item/',        destination: '/portfolio/' },
  { prefix: '/our-work/',              destination: '/portfolio/' },
];

// Build Vercel redirect route entries
const redirectRoutes = [];

// Static exact-match redirects
for (const [src, dest] of Object.entries(REDIRECTS)) {
  // Escape special regex chars in the path
  const escaped = src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  redirectRoutes.push({
    src: `^${escaped}$`,
    headers: { Location: dest },
    status: 301,
  });
}

// Wildcard prefix redirects
for (const { prefix, destination } of WILDCARD_PREFIXES) {
  const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  redirectRoutes.push({
    src: `^${escaped}(.+?)/?$`,
    headers: { Location: `${destination}$1` },
    status: 301,
  });
}

const config = {
  version: 3,
  routes: [
    // 1. 301 redirects — must come BEFORE filesystem check
    ...redirectRoutes,
    // 2. Serve static assets with long-lived cache headers
    {
      src: '/assets/(.*)',
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
      continue: true,
    },
    // 3. Check filesystem (serves pre-rendered HTML pages, robots.txt, sitemap)
    { handle: 'filesystem' },
    // 4. Route everything else to the Express serverless function
    { src: '/(.*)', dest: '/api' },
  ],
};

fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
console.log('Wrote .vercel/output/config.json');

console.log('\nVercel Build Output API v3 structure created successfully.');
console.log(`  .vercel/output/static/   → ${fs.readdirSync(staticDir).length} entries`);
console.log(`  .vercel/output/functions/api.func/index.js`);
