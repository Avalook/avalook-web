/**
 * Renders an array of HTML paragraph strings inside a `.rich-copy` block.
 * Content comes from our own data files (trusted), so inline links such as the
 * ghost-button CTAs are rendered as-is.
 */
export function RichText({
  paragraphs,
  className,
}: {
  paragraphs: string[];
  className?: string;
}) {
  return (
    <div className={className ? `rich-copy ${className}` : "rich-copy"}>
      {paragraphs.map((html, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: html }} />
      ))}
    </div>
  );
}
