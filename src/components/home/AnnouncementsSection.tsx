import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { posts, type Post } from "@/data/content";

const PAGE_SIZE = 4;

const pages: Post[][] = [];
for (let i = 0; i < posts.length; i += PAGE_SIZE) {
  pages.push(posts.slice(i, i + PAGE_SIZE));
}

function LikeButton() {
  const [liked, setLiked] = useState(false);
  return (
    <button
      className={`announcement-like${liked ? " is-liked" : ""}`}
      type="button"
      aria-label="Like"
      onClick={(e) => {
        e.preventDefault();
        setLiked((v) => !v);
      }}
    >
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l8.84 8.84 8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}

function AnnouncementCard({ post }: { post: Post }) {
  return (
    <article className="announcement-card">
      <a href={`/post/${post.slug}/`}>
        <img src={post.cover} alt={post.title} />
        <div className="announcement-body">
          <p className="announcement-date">
            {post.date} • {post.readingTime}
          </p>
          <h3>{post.title}</h3>
          <LikeButton />
        </div>
      </a>
    </article>
  );
}

export function AnnouncementsSection() {
  const [page, setPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);
  const [viewportHeight, setViewportHeight] = useState<number | undefined>(undefined);

  // Collapse the viewport to the ACTIVE page's height so a page with fewer
  // cards doesn't leave empty space below it — the pagination moves up and the
  // height animates in step with the horizontal slide. Re-measured on page
  // change, on resize, and when card images finish loading (ResizeObserver).
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const measure = () => {
      const active = grid.children[page - 1] as HTMLElement | undefined;
      if (active) setViewportHeight(active.offsetHeight);
    };

    measure();
    window.addEventListener("resize", measure);

    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(measure);
      Array.from(grid.children).forEach((child) => observer!.observe(child));
    }

    return () => {
      window.removeEventListener("resize", measure);
      observer?.disconnect();
    };
  }, [page]);

  return (
    <section className="section announcements">
      <SectionHeading id="announcements">Latest announcements</SectionHeading>
      <div className="announcement-viewport" style={{ height: viewportHeight }}>
        <div
          ref={gridRef}
          className="announcement-grid"
          data-page={page}
          style={{ "--announcement-page": String(page - 1) } as React.CSSProperties}
        >
          {pages.map((group, gi) => (
            <div className="announcement-page" data-page={gi + 1} key={gi}>
              {group.map((post) => (
                <AnnouncementCard key={post.slug} post={post} />
              ))}
            </div>
          ))}
        </div>
      </div>
      {pages.length > 1 && (
        <nav className="pagination" aria-label="Announcements pages">
          <button
            className="pagination-arrow pagination-prev"
            type="button"
            aria-label="Previous page"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            ‹
          </button>
          {pages.map((_, i) => (
            <button
              key={i}
              className={`pagination-page${page === i + 1 ? " is-active" : ""}`}
              type="button"
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="pagination-arrow pagination-next"
            type="button"
            aria-label="Next page"
            disabled={page === pages.length}
            onClick={() => setPage((p) => Math.min(pages.length, p + 1))}
          >
            ›
          </button>
        </nav>
      )}
    </section>
  );
}
