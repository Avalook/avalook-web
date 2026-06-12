import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/SimplePage";

const TITLE = "Services | Avalook";
const DESC =
  "Avalook develops original IP, animation concepts, digital assets, promotional videos and cross-market creative partnerships.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: () => <SimplePage label="Creative IP" title="Services" body={DESC} />,
});
