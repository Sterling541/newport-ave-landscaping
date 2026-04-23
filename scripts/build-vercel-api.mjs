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
  packages: 'external',
  bundle: true,
  format: 'esm',
  target: 'node20',
  define: {
    // Tell the handler where to find the SSR bundle at runtime
    // (import.meta.dirname will be the func directory at runtime)
  },
});
console.log('Compiled .vercel/output/functions/api.func/index.js');

// ─── 2. Write .vc-config.json for the function ────────────────────────────────
fs.writeFileSync(
  path.join(funcDir, '.vc-config.json'),
  JSON.stringify({
    runtime: 'nodejs20.x',
    handler: 'index.js',
    launcherType: 'Nodejs',
    shouldAddHelpers: true,
    environment: {},
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
//   1. Serve static assets directly (filesystem check)
//   2. Route everything else to the /api serverless function
//
const config = {
  version: 3,
  routes: [
    // Serve static assets with long-lived cache headers
    {
      src: '/assets/(.*)',
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
      continue: true,
    },
    // Check filesystem first (serves pre-rendered HTML pages, robots.txt, sitemap, etc.)
    { handle: 'filesystem' },
    // Route everything else to the Express serverless function
    { src: '/(.*)', dest: '/api' },
  ],
};

fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
console.log('Wrote .vercel/output/config.json');

console.log('\nVercel Build Output API v3 structure created successfully.');
console.log(`  .vercel/output/static/   → ${fs.readdirSync(staticDir).length} entries`);
console.log(`  .vercel/output/functions/api.func/index.js`);
