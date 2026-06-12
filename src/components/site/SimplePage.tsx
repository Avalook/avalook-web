import { PageShell } from "./PageShell";

/** A minimal hero-only page (About / Services / Contact). */
export function SimplePage({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <PageShell bodyClass="simple-page">
      <section className="page-hero compact-hero">
        <span>{label}</span>
        <h1>{title}</h1>
        <p>{body}</p>
      </section>
    </PageShell>
  );
}
