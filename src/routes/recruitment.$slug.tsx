import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { ArticleView } from "@/components/site/ArticleView";
import { RecruitmentDetail } from "@/components/site/RecruitmentDetail";
import { NotFound } from "@/components/site/NotFound";
import { recruitmentBySlug, recruitmentPostAlias } from "@/data/recruitment";
import { postsBySlug } from "@/data/content";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/recruitment/$slug")({
  loader: ({ params }) => {
    const aliasSlug = recruitmentPostAlias[params.slug];
    if (aliasSlug) {
      const post = postsBySlug[aliasSlug];
      if (post) return { kind: "post" as const, post };
    }
    const job = recruitmentBySlug[params.slug];
    if (job) return { kind: "job" as const, job };
    throw notFound();
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Recruitment not found" }] };
    const title = loaderData.kind === "post" ? loaderData.post.title : loaderData.job.title;
    const description =
      loaderData.kind === "post" ? loaderData.post.excerpt : loaderData.job.description;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: SITE.ogImage },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: () => <NotFound kind="Recruitment" />,
  component: RecruitmentPage,
});

function RecruitmentPage() {
  const data = Route.useLoaderData();
  if (data.kind === "post") {
    return (
      <PageShell bodyClass="post-page">
        <ArticleView post={data.post} />
      </PageShell>
    );
  }
  return (
    <PageShell bodyClass="recruitment-page">
      <RecruitmentDetail job={data.job} />
    </PageShell>
  );
}
