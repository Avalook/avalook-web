import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { ArticleView } from "@/components/site/ArticleView";
import { NotFound } from "@/components/site/NotFound";
import { postsBySlug } from "@/data/content";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/post/$slug")({
  loader: ({ params }) => {
    const post = postsBySlug[params.slug];
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    if (!p) return { meta: [{ title: "Post not found" }] };
    return {
      meta: [
        { title: p.title },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { property: "og:image", content: SITE.ogImage },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: () => <NotFound kind="Post" />,
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  return (
    <PageShell bodyClass="post-page">
      <ArticleView post={post} />
    </PageShell>
  );
}
