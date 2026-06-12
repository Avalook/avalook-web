export function SectionHeading({
  children,
  id,
}: {
  children: React.ReactNode;
  /** Optional anchor target. Putting the id on the heading (not the
   * <section>) makes nav-link jumps land snug on the heading text rather
   * than on the section's padded top edge — see html scroll-padding-top. */
  id?: string;
}) {
  return (
    <div className="section-heading" id={id}>
      <h2>{children}</h2>
    </div>
  );
}
