import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

const CSS_VERSION = "v=2026-06-12-team-arrows";
const AVALOOK_CSS = [
  "/assets/fonts/google-fonts.css",
  "/css/base.css",
  "/css/layout.css",
  "/css/components.css",
  "/css/animations.css",
  "/css/section-backgrounds.css",
  "/css/responsive.css",
].map((href) => `${href}?${CSS_VERSION}`);


function NotFoundComponent() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}>
      <div>
        <h1 style={{ fontSize: "4rem", margin: 0 }}>404</h1>
        <p>Page not found</p>
        <Link to="/">Go home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}>
      <div>
        <h1>Something went wrong</h1>
        <p>{error.message}</p>
        <button onClick={() => { router.invalidate(); reset(); }}>Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Welcome to Avalook" },
      { name: "description", content: "Avalook is a Vietnam-based creative unit focused on researching and developing Intellectual Property (IP) products. Rooted in innovation through advanced technology application, Avalook aims to enhance the value of artists' works and user experiences." },
      { property: "og:title", content: "Welcome to Avalook" },
      { property: "og:description", content: "Avalook is a Vietnam-based creative unit focused on researching and developing Intellectual Property (IP) products." },
      { property: "og:image", content: "/assets/img/logo-avalook2.png" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      ...AVALOOK_CSS.map((href) => ({ rel: "stylesheet", href })),
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
