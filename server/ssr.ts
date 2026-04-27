/**
 * ssr.ts
 * Server-Side Rendering middleware for production.
 *
 * For every non-admin GET request, this middleware:
 * 1. Loads the pre-built SSR bundle (dist/server/entry-server.js)
 * 2. Calls render(url) to get the React HTML string
 * 3. Looks up the pathname in the static routeMeta map to get per-page
 *    title, canonical URL, and description
 * 4. Strips the default homepage meta tags from index.html
 * 5. Injects the correct per-page <title>, <link rel="canonical">, and
 *    <meta name="description"> into <head> BEFORE sending the response
 * 6. Injects the body HTML into <div id="root">
 * 7. Returns the fully-rendered HTML to the client
 *
 * NOTE: react-helmet-async v3 is BROKEN with React 19 in SSR mode.
 * HelmetProvider renders as a Fragment and never populates the context.
 * We use a static routeMeta lookup table (server/routeMeta.ts) instead.
 *
 * Admin routes (/admin/*) are excluded — they stay client-rendered.
 * Static assets (/assets/*, /manus-storage/*, etc.) are excluded.
 */

import fs from "fs";
import path from "path";
import { Express, Request, Response, NextFunction } from "express";
import { routeMeta, defaultMeta, RouteMeta } from "./routeMeta.js";

// Patterns that should NOT be SSR-rendered (serve as static files or skip)
const SKIP_SSR_PATTERNS = [
  /^\/admin\//,           // Admin routes — client-rendered
  /^\/api\//,             // API routes
  /^\/assets\//,          // Vite build assets
  /^\/manus-storage\//,   // CDN proxy
  /\.[a-z0-9]+$/i,        // Any file with an extension (js, css, png, etc.)
];

function shouldSkipSSR(pathname: string): boolean {
  return SKIP_SSR_PATTERNS.some(pattern => pattern.test(pathname));
}

/**
 * Look up route meta for a given pathname.
 * Tries exact match first, then strips trailing slash.
 * Falls back to defaultMeta if no match found.
 */
function getRouteMeta(pathname: string): RouteMeta {
  // Exact match
  if (routeMeta[pathname]) return routeMeta[pathname];

  // Try without trailing slash
  const withoutSlash = pathname.endsWith("/") && pathname !== "/"
    ? pathname.slice(0, -1)
    : pathname;
  if (routeMeta[withoutSlash]) return routeMeta[withoutSlash];

  // Try with trailing slash
  const withSlash = pathname + "/";
  if (routeMeta[withSlash]) return routeMeta[withSlash];

  return defaultMeta;
}

/**
 * Inject per-page meta tags into the HTML template.
 * Strips existing homepage defaults and injects correct per-page values.
 */
function injectMetaTags(template: string, meta: RouteMeta): string {
  let page = template;

  // 1. Strip existing homepage defaults from the template
  page = page
    // Remove <title> tag
    .replace(/<title[^>]*>[^<]*<\/title>/g, "")
    // Remove canonical link
    .replace(/<link[^>]+rel="canonical"[^>]*\/?>/g, "")
    // Remove meta description
    .replace(/<meta[^>]+name="description"[^>]*\/?>/g, "")
    // Remove og:title
    .replace(/<meta[^>]+property="og:title"[^>]*\/?>/g, "")
    // Remove og:description
    .replace(/<meta[^>]+property="og:description"[^>]*\/?>/g, "")
    // Remove og:url
    .replace(/<meta[^>]+property="og:url"[^>]*\/?>/g, "")
    // Remove twitter:title
    .replace(/<meta[^>]+name="twitter:title"[^>]*\/?>/g, "")
    // Remove twitter:description
    .replace(/<meta[^>]+name="twitter:description"[^>]*\/?>/g, "");

  // 2. Build the per-page head tags to inject
  const escapedTitle = meta.title.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const escapedDesc = meta.description.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const escapedCanonical = meta.canonical.replace(/"/g, "&quot;");

  const headTags = [
    `<title>${escapedTitle}</title>`,
    `<link rel="canonical" href="${escapedCanonical}" />`,
    meta.description ? `<meta name="description" content="${escapedDesc}" />` : "",
    `<meta property="og:title" content="${escapedTitle}" />`,
    meta.description ? `<meta property="og:description" content="${escapedDesc}" />` : "",
    `<meta property="og:url" content="${escapedCanonical}" />`,
    `<meta name="twitter:title" content="${escapedTitle}" />`,
    meta.description ? `<meta name="twitter:description" content="${escapedDesc}" />` : "",
  ].filter(Boolean).join("\n    ");

  // 3. Inject before </head>
  page = page.replace("</head>", `    ${headTags}\n  </head>`);

  return page;
}

export async function registerSSR(app: Express): Promise<void> {
  // Resolve paths to the SSR bundle and index.html.
  // We try multiple strategies in order of reliability:
  // 1. process.argv[1] — the running script path (works when started as: node dist/index.js)
  // 2. process.cwd() + /dist — works when CWD is the project root
  // 3. import.meta.dirname — esbuild inlines the SOURCE directory, so we walk up to find dist/
  function findDistDir(): string {
    // Strategy 0: explicit env var override (used by Vercel serverless function)
    if (process.env.SSR_DIST_DIR) {
      return process.env.SSR_DIST_DIR;
    }
    // Strategy 1: derive from process.argv[1]
    const argv1 = process.argv[1] ?? "";
    if (argv1) {
      const d = path.dirname(argv1);
      // Verify it looks like a dist dir (has index.js or public/)
      if (fs.existsSync(path.join(d, "public")) || fs.existsSync(path.join(d, "index.js"))) {
        return d;
      }
    }
    // Strategy 2: CWD/dist
    const cwdDist = path.join(process.cwd(), "dist");
    if (fs.existsSync(cwdDist)) {
      return cwdDist;
    }
    // Strategy 3: walk up from import.meta.dirname to find dist/
    let dir = import.meta.dirname;
    for (let i = 0; i < 5; i++) {
      if (path.basename(dir) === "dist") return dir;
      const candidate = path.join(dir, "dist");
      if (fs.existsSync(candidate)) return candidate;
      dir = path.dirname(dir);
    }
    // Fallback: use argv1 dirname even if unverified
    return path.dirname(process.argv[1] ?? "");
  }

  const distDir = findDistDir();
  const distPublicPath = path.join(distDir, "public");
  const ssrBundlePath = path.join(distDir, "server", "entry-server.js");
  const indexHtmlPath = path.join(distPublicPath, "index.html");

  console.log(`[SSR] distDir=${distDir} ssrExists=${fs.existsSync(ssrBundlePath)} indexExists=${fs.existsSync(indexHtmlPath)}`);

  // Only register SSR if the SSR bundle exists (i.e., production build)
  if (!fs.existsSync(ssrBundlePath)) {
    console.log("[SSR] SSR bundle not found — skipping SSR middleware (dev mode or build not run)");
    return;
  }

  if (!fs.existsSync(indexHtmlPath)) {
    console.log("[SSR] index.html not found — skipping SSR middleware");
    return;
  }

  // Read the index.html template once at startup
  const indexHtmlTemplate = fs.readFileSync(indexHtmlPath, "utf-8");

  // Dynamically import the SSR bundle (built by vite build --ssr)
  // IMPORTANT: We await this before registering the middleware so the render function
  // is always available when the first request arrives.
  type RenderFn = (url: string) => { html: string; notFound: boolean };
  let renderFn: RenderFn;

  try {
    const mod = await import(ssrBundlePath);
    renderFn = mod.render as RenderFn;
    console.log("[SSR] SSR bundle loaded successfully");
  } catch (err) {
    console.error("[SSR] Failed to load SSR bundle:", err);
    return; // Skip SSR middleware if bundle fails to load
  }

  app.use((req: Request, res: Response, next: NextFunction) => {
    // Only handle GET requests
    if (req.method !== "GET") return next();

    const pathname = req.path;

    // Skip SSR for admin routes, API, static assets
    if (shouldSkipSSR(pathname)) return next();

    try {
      const url = req.originalUrl;
      const { html: appHtml, notFound } = renderFn(url);

      // Look up per-page meta from the static route map
      const meta = getRouteMeta(pathname);

      // Start with the index.html template
      let page = indexHtmlTemplate;

      // Inject per-page title, canonical, and description
      page = injectMetaTags(page, meta);

      // Inject the rendered React body HTML into the root div
      page = page.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

      const statusCode = notFound ? 404 : 200;
      res.status(statusCode).set({ "Content-Type": "text/html" }).end(page);
    } catch (err) {
      // On SSR error, fall through to static serving (graceful degradation)
      console.error(`[SSR] Render error for ${req.originalUrl}:`, err);
      next();
    }
  });
}
