/**
 * build-vercel-api.mjs
 *
 * Compiles server/vercel-entry.ts with esbuild into api/index.js so Vercel
 * auto-detects it as a serverless function. Also copies the SSR bundle
 * (dist/server/) to api/server/ so the handler can find it at runtime.
 *
 * Vercel's outputDirectory is set to dist/public (static assets).
 * The api/ directory is auto-detected as serverless functions.
 */
import { build } from 'esbuild';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// Ensure api/ directory exists
const apiDir = path.join(root, 'api');
if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir, { recursive: true });
}

// Compile server/vercel-entry.ts → api/index.js using esbuild
// ESM format so Vercel's Node.js 20 runtime can import it
console.log('Compiling server/vercel-entry.ts → api/index.js...');
await build({
  entryPoints: [path.join(root, 'server', 'vercel-entry.ts')],
  outfile: path.join(apiDir, 'index.js'),
  platform: 'node',
  packages: 'external',
  bundle: true,
  format: 'esm',
  target: 'node20',
});
console.log('Compiled api/index.js');

// Copy the SSR server bundle to api/server/ so the function can find it
const serverSrc = path.join(root, 'dist', 'server');
const serverDest = path.join(apiDir, 'server');

if (fs.existsSync(serverSrc)) {
  if (!fs.existsSync(serverDest)) {
    fs.mkdirSync(serverDest, { recursive: true });
  }
  for (const file of fs.readdirSync(serverSrc)) {
    const srcPath = path.join(serverSrc, file);
    const destPath = path.join(serverDest, file);
    // Skip directories (e.g. __manus__ subdirectory)
    if (fs.statSync(srcPath).isDirectory()) continue;
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied dist/server/${file} → api/server/${file}`);
  }
}

// Copy dist/public/index.html to api/public/index.html
// The SSR middleware reads index.html from the public directory
const publicSrc = path.join(root, 'dist', 'public');
const publicDest = path.join(apiDir, 'public');

if (fs.existsSync(publicSrc)) {
  if (!fs.existsSync(publicDest)) {
    fs.mkdirSync(publicDest, { recursive: true });
  }
  // Only copy index.html — other static files are served by Vercel CDN from outputDirectory
  const indexSrc = path.join(publicSrc, 'index.html');
  if (fs.existsSync(indexSrc)) {
    fs.copyFileSync(indexSrc, path.join(publicDest, 'index.html'));
    console.log('Copied dist/public/index.html → api/public/index.html');
  }
}

console.log('Vercel API build complete.');
