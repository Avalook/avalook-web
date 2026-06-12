import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { posts } from "@/data/content";

const TITLE = "Blog | Avalook";
const DESC = "Latest announcements from Avalook.";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Blog,
});

function Blog() {
  return (
    <PageShell bodyClass="blog-page">
      <section className="page-hero compact-hero">
        <h1>Latest Announcements</h1>
      </section>
      <section className="section">
        <div className="blog-grid">
          {posts.map((post) => (
            <article className="blog-card" key={post.slug}>
              <a className="blog-card-media" href={`/post/${post.slug}/`}>
                <img src={post.cover} alt={post.title} />
              </a>
              <div className="blog-card-body">
                <p className="blog-card-meta">
                  {post.date} • {post.readingTime}
                </p>
                <h2 className="blog-card-title">
                  <a href={`/post/${post.slug}/`}>{post.title}</a>
                </h2>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <a className="blog-card-more" href={`/post/${post.slug}/`}>
                  Read more →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
