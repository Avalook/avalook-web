import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { RichText } from "@/components/site/RichText";
import { NotFound } from "@/components/site/NotFound";
import { useFitOneLine } from "@/hooks/useFitOneLine";
import { projectsBySlug } from "@/data/projects";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projectsBySlug[params.slug];
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    if (!p) return { meta: [{ title: "Project not found" }] };
    return {
      meta: [
        { title: p.title },
        { name: "description", content: p.description },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.description },
        { property: "og:image", content: SITE.ogImage },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: () => <NotFound kind="Project" />,
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const titleRef = useFitOneLine<HTMLHeadingElement>(project.title);

  return (
    <PageShell bodyClass="detail-page">
      <section className="detail-hero">
        <div className="detail-hero-top">
          <h1 ref={titleRef}>{project.title}</h1>
          <span className="detail-category">{project.category}</span>
        </div>
        {project.video ? (
          <video
            className="detail-hero-media"
            src={project.video}
            poster={project.cover}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={project.title}
          />
        ) : (
          <img className="detail-hero-media" src={project.cover} alt={project.title} />
        )}
      </section>

      <section className="section detail-copy-section">
        <div className="detail-overview-grid">
          <h2 className="detail-section-label">{project.label ?? "Overview"}</h2>
          <RichText paragraphs={project.body} className="detail-overview-copy" />
        </div>
      </section>

      <section className="section detail-gallery-section">
        <h2 className="detail-section-label detail-gallery-heading">{project.statusHeading}</h2>
        <div className="detail-gallery">
          {project.gallery.map((src, i) => (
            <img key={i} src={src} alt={`${project.title} concept image`} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
