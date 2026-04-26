/**
 * entry-server.tsx
 * Server-side rendering entry point.
 * Used by the Express server to pre-render public routes with renderToString.
 * Admin routes (/admin/*) are NOT rendered here — they stay client-only.
 *
 * Uses wouter's ssrPath prop for correct SSR routing.
 * Uses react-helmet-async's HelmetProvider with context to capture meta tags.
 * Wraps with trpc.Provider so pages using useMutation/useQuery don't throw.
 */
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import { HelmetProvider, HelmetServerState } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { trpc } from "./lib/trpc";
import App from "./AppSSR";

export interface HelmetContext {
  helmet?: HelmetServerState;
}

export interface RenderResult {
  html: string;
  helmetContext: HelmetContext;
  notFound: boolean;
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

  // Create a no-op tRPC client for SSR — mutations and queries are disabled,
  // but the context must exist so useMutation/useQuery hooks don't throw.
  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: "http://localhost/api/trpc",
        transformer: superjson,
      }),
    ],
  });

  // Extract just the pathname (strip query string) for wouter's ssrPath
  const pathname = url.split("?")[0] || "/";

  // Use wouter's ssrPath prop — this uses useBrowserLocation which provides
  // getServerSnapshot correctly for React's useSyncExternalStore in SSR
  const html = renderToString(
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <HelmetProvider context={helmetContext}>
        <QueryClientProvider client={queryClient}>
          <Router ssrPath={pathname}>
            <App />
          </Router>
        </QueryClientProvider>
      </HelmetProvider>
    </trpc.Provider>
  );

  // Detect 404: wouter renders NotFound when no route matches.
  // The NotFound component renders a unique id="not-found-button-group" element.
  const notFound = html.includes('id="not-found-button-group"');

  return { html, helmetContext, notFound };
}
