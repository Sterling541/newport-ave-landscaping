/**
 * entry-server.tsx
 * Server-side rendering entry point.
 * Used by the Express server to pre-render public routes with renderToString.
 *
 * NOTE: react-helmet-async v3 is broken with React 19 in SSR mode — HelmetProvider
 * renders as a Fragment and never populates the context. Head tag injection is handled
 * by server/ssr.ts using the static routeMeta lookup table instead.
 *
 * Uses wouter's ssrPath prop for correct SSR routing.
 * Wraps with trpc.Provider so pages using useMutation/useQuery don't throw.
 */
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { trpc } from "./lib/trpc";
import App from "./AppSSR";

export interface RenderResult {
  html: string;
  notFound: boolean;
}

export function render(url: string): RenderResult {
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

  // Wrap with HelmetProvider (client-side hydration still needs it),
  // but we do NOT rely on it for SSR head injection.
  const html = renderToString(
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <HelmetProvider>
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

  return { html, notFound };
}
