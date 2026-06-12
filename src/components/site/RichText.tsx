/**
 * Renders post / detail copy inside a `.rich-copy` block.
 * Content comes from our own data files / the CMS editor (trusted), so HTML is
 * rendered as-is. Two shapes are supported:
 *  - A single block-level HTML blob (from the TipTap editor: headings, lists,
 *    images…) → rendered verbatim into the container.
 *  - An array of bare paragraph strings (legacy data) → each wrapped in a `<p>`.
 */
export function RichText({ paragraphs, className }: { paragraphs: string[]; className?: string }) {
  const cls = className ? `rich-copy ${className}` : "rich-copy";
  const isHtmlBlob =
    paragraphs.length === 1 &&
    /<(p|h[1-6]|ul|ol|li|blockquote|figure|img|video|iframe|hr|table)\b/i.test(paragraphs[0]);

  if (isHtmlBlob) {
    return <div className={cls} dangerouslySetInnerHTML={{ __html: paragraphs[0] }} />;
  }

  return (
    <div className={cls}>
      {paragraphs.map((html, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: html }} />
      ))}
    </div>
  );
}
