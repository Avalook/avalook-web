import { SITE } from "@/data/site";
import type { Recruitment } from "@/data/recruitment";

export function RecruitmentDetail({ job }: { job: Recruitment }) {
  return (
    <>
      <section className="detail-hero">
        <div className="detail-hero-grid">
          <div className="detail-title">
            <span>Recruitment</span>
            <h1>{job.title}</h1>
            <p>{job.tagline}</p>
            <a className="ghost-button" href={`mailto:${SITE.email}`}>
              Apply by email
            </a>
          </div>
          <img className="detail-cover" src={job.cover} alt="Avalook recruitment" />
        </div>
      </section>
      <section className="section detail-copy-section">
        <div className="detail-layout">
          <aside className="detail-meta">
            <strong>{job.metaLabel}</strong>
            {job.metaTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </aside>
          <div className="rich-copy">
            {job.intro.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            <ul>
              {job.duties.map((duty, i) => (
                <li key={i}>{duty}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
