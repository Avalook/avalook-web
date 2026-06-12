import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/SimplePage";

const TITLE = "About | Avalook";
const DESC =
  "Avalook is a Vietnam-based creative unit focused on researching and developing Intellectual Property products across books, comics, animations and digital assets.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: () => <SimplePage label="Who we are" title="About" body={DESC} />,
});
