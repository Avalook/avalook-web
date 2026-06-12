import { createFileRoute, redirect } from "@tanstack/react-router";
import { CmsDashboard } from "@/components/cms/CmsDashboard";
import { getSessionFn } from "@/lib/cms-server";
import cmsCss from "@/components/cms/cms-dashboard.css?url";

export const Route = createFileRoute("/dashboard")({
  // Server-checked password gate — redirect to /login when not authenticated.
  beforeLoad: async () => {
    const { authed } = await getSessionFn();
    if (!authed) throw redirect({ to: "/login" });
  },
  head: () => ({
    meta: [
      { title: "Avalook CMS" },
      { name: "description", content: "Avalook internal CMS dashboard." },
    ],
    links: [{ rel: "stylesheet", href: cmsCss }],
  }),
  component: Dashboard,
});

function Dashboard() {
  return <CmsDashboard />;
}
