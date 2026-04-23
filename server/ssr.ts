/**
 * ssr.ts
 * Server-Side Rendering middleware for production.
 *
 * For every non-admin GET request, this middleware:
 * 1. Loads the pre-built SSR bundle (dist/server/entry-server.js)
 * 2. Calls render(url) to get the React HTML string
 * 3. Splits the HTML into head tags + body HTML
 *    - react-helmet-async renders <title>, <meta>, <link> tags at the START
 *      of the renderToString output (before the first <div>)
 * 4. Injects head tags into the <head> section of index.html
 *    (replacing the default <title> with the per-page one)
 * 5. Injects the body HTML into <div id="root">
 * 6. Returns the fully-rendered HTML to the client
 *
 * Admin routes (/admin/*) are excluded — they stay client-rendered.
 * Static assets (/assets/*, /manus-storage/*, etc.) are excluded.
 */

import fs from "fs";
import path from "path";
import { Express, Request, Response, NextFunction } from "express";

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
 * Extract react-helmet-async tags from the rendered HTML.
 * react-helmet-async in SSR mode renders <title>, <meta>, <link> tags with
 * data-loc attributes directly inside the component tree.
 * We extract them and inject into <head>.
 *
 * Also handles the case where Helmet renders tags before the first <div>
 * (older behavior).
 */
function extractHelmetTags(appHtml: string): { headTags: string; bodyHtml: string } {
  // react-helmet-async in SSR mode renders tags with data-loc attributes.
  // We use two separate patterns:
  // 1. <title data-loc="...">content</title>  — title with content
  // 2. <meta data-loc="..." .../> or <link data-loc="..." .../> — self-closing
  const extractedTags: string[] = [];

  // Pattern 1: title tags with data-loc (capture content + closing tag)
  const titlePattern = /<title\s+data-loc="[^"]*"[^>]*>[^<]*<\/title>/g;
  // Pattern 2: meta and link tags with data-loc (self-closing)
  const metaLinkPattern = /<(?:meta|link)\s+data-loc="[^"]*"[^>]*\/>/g;

  let bodyHtml = appHtml
    .replace(titlePattern, (match) => {
      extractedTags.push(match);
      return "";
    })
    .replace(metaLinkPattern, (match) => {
      extractedTags.push(match);
      return "";
    });

  // Also check for tags before the first <div> (legacy behavior)
  const firstDivIdx = bodyHtml.indexOf("<div");
  let preBodyTags = "";
  let finalBodyHtml = bodyHtml;
  if (firstDivIdx > 0) {
    preBodyTags = bodyHtml.slice(0, firstDivIdx).trim();
    finalBodyHtml = bodyHtml.slice(firstDivIdx);
  }

  const headTags = [...(preBodyTags ? [preBodyTags] : []), ...extractedTags].join("\n  ");

  return { headTags, bodyHtml: finalBodyHtml };
}

export function registerSSR(app: Express): void {
  // Resolve paths relative to the running server bundle.
  // import.meta.dirname in esbuild bundles resolves to the SOURCE file's directory,
  // not the output directory. We use process.argv[1] (the actual running script path)
  // to reliably find the dist/ directory regardless of where esbuild puts things.
  //
  // In production: node dist/index.js → process.argv[1] = /path/to/dist/index.js
  //   - dist/public/index.html
  //   - dist/server/entry-server.js
  const distDir = path.dirname(process.argv[1] ?? "");
  const distPublicPath = path.join(distDir, "public");
  const ssrBundlePath = path.join(distDir, "server", "entry-server.js");
  const indexHtmlPath = path.join(distPublicPath, "index.html");

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
  type RenderFn = (url: string) => { html: string; helmetContext: unknown };
  let renderFn: RenderFn | null = null;

  import(ssrBundlePath)
    .then((mod) => {
      renderFn = mod.render as RenderFn;
      console.log("[SSR] SSR bundle loaded successfully");
    })
    .catch((err) => {
      console.error("[SSR] Failed to load SSR bundle:", err);
    });

  app.use((req: Request, res: Response, next: NextFunction) => {
    // Only handle GET requests
    if (req.method !== "GET") return next();

    const pathname = req.path;

    // Skip SSR for admin routes, API, static assets
    if (shouldSkipSSR(pathname)) return next();

    // If SSR bundle isn't loaded yet, fall through to static serving
    if (!renderFn) return next();

    try {
      const url = req.originalUrl;
      const { html: appHtml } = renderFn(url);

      // Split rendered HTML: head tags (title, meta, etc.) + body HTML
      const { headTags, bodyHtml } = extractHelmetTags(appHtml);

      let page = indexHtmlTemplate;

      if (headTags) {
        // Remove overridable homepage meta tags from the template.
        // The SSR render provides per-page versions of all these.
        // We strip: <title>, canonical, og:title, og:description, og:url, og:image,
        //           twitter:title, twitter:description, twitter:image
        page = page
          // Remove <title> tag (with or without attributes)
          .replace(/<title[^>]*>[^<]*<\/title>/, "")
          // Remove canonical link
          .replace(/<link[^>]+rel="canonical"[^>]*\/>/g, "")
          // Remove og: meta tags that are page-specific
          .replace(/<meta[^>]+property="og:title"[^>]*\/>/g, "")
          .replace(/<meta[^>]+property="og:description"[^>]*\/>/g, "")
          .replace(/<meta[^>]+property="og:url"[^>]*\/>/g, "")
          .replace(/<meta[^>]+property="og:image"[^>]*\/>/g, "")
          // Remove twitter: meta tags that are page-specific
          .replace(/<meta[^>]+name="twitter:title"[^>]*\/>/g, "")
          .replace(/<meta[^>]+name="twitter:description"[^>]*\/>/g, "")
          .replace(/<meta[^>]+name="twitter:image"[^>]*\/>/g, "")
          // Remove meta description (SSR provides per-page one)
          .replace(/<meta[^>]+name="description"[^>]*\/>/g, "");

        // Inject per-page head tags before </head>
        page = page.replace("</head>", `  ${headTags}\n  </head>`);
      }

      // Inject the rendered React body HTML into the root div
      page = page.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);

      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (err) {
      // On SSR error, fall through to static serving (graceful degradation)
      console.error(`[SSR] Render error for ${req.originalUrl}:`, err);
      next();
    }
  });
}
