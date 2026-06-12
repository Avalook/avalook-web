import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/SimplePage";

const TITLE = "Contact | Avalook";
const DESC =
  "Email Avalook at creative.avalook@gmail.com for partnerships, media, recruitment and IP development conversations.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: () => <SimplePage label="Get in touch" title="Contact" body={DESC} />,
});
