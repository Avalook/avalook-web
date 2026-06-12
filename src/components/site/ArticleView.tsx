import { RichText } from "./RichText";
import { posts } from "@/data/content";
import type { Post } from "@/data/content";

/** Current page URL (client only — share actions run on click). */
const pageUrl = () => (typeof window !== "undefined" ? window.location.href : "");

const openPopup = (url: string) =>
  window.open(url, "_blank", "noopener,noreferrer,width=600,height=600");

/**
 * Shared blog-article layout (used by /post and the recruitment alias).
 * Mirrors the original Avalook (Wix) post page: meta line, big mint title,
 * cover, body, share row, "Recent Posts" and a comments placeholder.
 */
export function ArticleView({ post }: { post: Post }) {
  const recent = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const share = (network: "facebook" | "x" | "linkedin") => {
    const u = encodeURIComponent(pageUrl());
    const t = encodeURIComponent(post.title);
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      x: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    };
    openPopup(urls[network]);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl());
    } catch {
      /* clipboard blocked — no-op */
    }
  };

  const nativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: post.title, url: pageUrl() });
        return;
      } catch {
        /* user dismissed the sheet */
      }
    }
    void copyLink();
  };

  return (
    <article className="post-layout">
      <div className="post-meta">
        <span className="post-meta-info">
          {post.date} · {post.readingTime}
        </span>
        <button
          type="button"
          className="post-more"
          aria-label="Share this post"
          onClick={nativeShare}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <circle cx="12" cy="5" r="1.8" />
            <circle cx="12" cy="12" r="1.8" />
            <circle cx="12" cy="19" r="1.8" />
          </svg>
        </button>
      </div>

      <h1 className="post-title">{post.title}</h1>
      {post.updated ? <p className="post-updated">Updated: {post.updated}</p> : null}

      <img className="post-cover" src={post.cover} alt={post.title} />

      <RichText paragraphs={post.body} className="post-body" />

      <div className="post-rule" />

      <div className="post-share">
        <button type="button" aria-label="Share on Facebook" onClick={() => share("facebook")}>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5h1.65V4.7c-.3-.04-1.3-.13-2.45-.13-2.4 0-4.05 1.47-4.05 4.17V11H7.6v3.1h2.6V22h3.3z" />
          </svg>
        </button>
        <button type="button" aria-label="Share on X" onClick={() => share("x")}>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
          </svg>
        </button>
        <button type="button" aria-label="Share on LinkedIn" onClick={() => share("linkedin")}>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.65h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9-1.78 0-2.05 1.38-2.05 2.8V21H9z" />
          </svg>
        </button>
        <button type="button" aria-label="Copy link" onClick={copyLink}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M10 13a5 5 0 007.07 0l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 00-7.07 0l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
          </svg>
        </button>
      </div>

      {recent.length > 0 ? (
        <section className="recent-posts">
          <div className="recent-posts-head">
            <h2 className="recent-posts-title">Recent Posts</h2>
            <a className="recent-posts-all" href="/blog/">
              See All
            </a>
          </div>
          <div className="recent-posts-grid">
            {recent.map((p) => (
              <a className="recent-card" key={p.slug} href={`/post/${p.slug}/`}>
                <span className="recent-card-media">
                  <img src={p.cover} alt={p.title} />
                </span>
                <h3 className="recent-card-title">{p.title}</h3>
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <section className="post-comments">
        <h2 className="post-comments-title">Comments</h2>
        <div className="post-rule" />
        <div className="comment-box">Write a comment...</div>
      </section>
    </article>
  );
}
