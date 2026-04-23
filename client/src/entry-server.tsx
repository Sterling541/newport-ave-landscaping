/**
 * entry-server.tsx
 * Server-side rendering entry point.
 * Used by the Express server to pre-render public routes with renderToString.
 * Admin routes (/admin/*) are NOT rendered here — they stay client-only.
 *
 * Uses wouter's native SSR support (ssrPath prop on Router).
 * Uses react-helmet-async's HelmetProvider with context to capture meta tags.
 */
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import { HelmetProvider, HelmetServerState } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

export interface HelmetContext {
  helmet?: HelmetServerState;
}

export interface RenderResult {
  html: string;
  helmetContext: HelmetContext;
}

export function render(url: string): RenderResult {
  const helmetContext: HelmetContext = {};

  // Disable all tRPC/react-query fetches during SSR — we only need the static HTML structure
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: false,
        retry: false,
        staleTime: Infinity,
      },
    },
  });

  // Extract just the pathname (strip query string) for wouter's ssrPath
  const pathname = url.split("?")[0] || "/";

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <Router ssrPath={pathname}>
          <App />
        </Router>
      </QueryClientProvider>
    </HelmetProvider>
  );

  return { html, helmetContext };
}
