import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

/**
 * Unique per full page load. Used as the home page's scroll-restoration key so
 * the router NEVER restores a saved scroll position there on reload: every load
 * gets a brand-new key with no cached entry, so the home page falls back to the
 * top. An in-page #hash (e.g. /#team) still wins, and back/forward navigation
 * within the SPA is unaffected. Sub-pages keep the default key, so their own
 * reload scroll restoration stays intact.
 */
const HOME_SCROLL_KEY = `home-${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    getScrollRestorationKey: (location) =>
      location.pathname === "/"
        ? HOME_SCROLL_KEY
        : (location.state as unknown as { __TSR_key?: string }).__TSR_key ?? location.href,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
