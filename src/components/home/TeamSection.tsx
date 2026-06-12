import { useEffect, useRef } from "react";
import { SectionHeading } from "@/components/site/SectionHeading";
import {
  founders,
  contributors,
  advisors,
  achievementsFeatured,
  achievementsCompact,
  type Person,
} from "@/data/content";

function PersonCard({ person, linked = true }: { person: Person; linked?: boolean }) {
  // `linked` people have a profile page → card is a link with a "Read more"
  // pill. Contributors have no sub-page → render a non-clickable card, no pill.
  return (
    <article className="person-card">
      <a href={linked ? person.href : undefined}>
        <img src={person.image} alt={person.name} />
        <div>
          <small>{person.role}</small>
          <h3>{person.name}</h3>
          {linked ? <span>Read more</span> : null}
        </div>
      </a>
    </article>
  );
}

function AdvisorCard({ person }: { person: Person }) {
  return (
    <article className="advisor-card">
      <a href={person.href}>
        <img src={person.image} alt={person.name} />
        <div>
          <small>{person.role}</small>
          <strong>{person.name}</strong>
          <span>Read more</span>
        </div>
      </a>
    </article>
  );
}

/**
 * Wraps a people grid with prev/next arrows and, on mobile, scales the card
 * nearest the viewport centre. Ported from the legacy `initMobileTeamCarousel`
 * but the wrapper/arrows are rendered in JSX so React keeps ownership of the
 * DOM (the effect only measures and sets inline styles).
 */
function TeamCarousel({
  gridClassName,
  children,
}: {
  gridClassName: string;
  children: React.ReactNode;
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const mobileQuery = window.matchMedia("(max-width: 780px)");
    let frame = 0;

    const update = () => {
      const cards = Array.from(grid.children) as HTMLElement[];
      if (!mobileQuery.matches) {
        cards.forEach((card) => card.style.removeProperty("--team-card-scale"));
      } else {
        const rect = grid.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        cards.forEach((card) => {
          const r = card.getBoundingClientRect();
          const cardCenter = r.left + r.width / 2;
          const distance = Math.min(Math.abs(center - cardCenter), r.width);
          const progress = 1 - distance / r.width;
          const scale = 0.94 + Math.max(0, progress) * 0.06;
          card.style.setProperty("--team-card-scale", scale.toFixed(3));
        });
      }
      const maxScroll = grid.scrollWidth - grid.clientWidth - 2;
      if (prevRef.current) prevRef.current.disabled = !mobileQuery.matches || grid.scrollLeft <= 2;
      if (nextRef.current) nextRef.current.disabled = !mobileQuery.matches || grid.scrollLeft >= maxScroll;
    };

    const schedule = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    grid.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    mobileQuery.addEventListener("change", schedule);
    update();

    return () => {
      window.cancelAnimationFrame(frame);
      grid.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mobileQuery.removeEventListener("change", schedule);
    };
  }, []);

  const scrollBy = (direction: number) => {
    const grid = gridRef.current;
    if (grid) grid.scrollBy({ left: direction * grid.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="team-carousel">
      <div ref={gridRef} className={gridClassName}>
        {children}
      </div>
      <button
        ref={prevRef}
        className="team-carousel-arrow team-carousel-prev"
        type="button"
        aria-label="Previous team member"
        onClick={() => scrollBy(-1)}
      >
        ‹
      </button>
      <button
        ref={nextRef}
        className="team-carousel-arrow team-carousel-next"
        type="button"
        aria-label="Next team member"
        onClick={() => scrollBy(1)}
      >
        ›
      </button>
    </div>
  );
}

/** Two opposite-scrolling marquee rows of achievement images. */
function AchievementRow({
  images,
  variant,
  reverse,
  duration,
}: {
  images: string[];
  variant: string;
  reverse?: boolean;
  duration: number;
}) {
  // Duplicate the set so the CSS loop can translate -50% seamlessly.
  const loop = [...images, ...images];
  const cardClass =
    variant === "featured" ? "achievement-card achievement-card-featured" : "achievement-card";
  return (
    <div
      className={`achievement-grid achievement-grid-${variant} marquee${reverse ? " is-reverse" : ""}`}
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    >
      <div className="marquee-track">
        {loop.map((src, i) => (
          <div className={cardClass} key={i}>
            <img src={src} alt="Achievement" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TeamSection() {
  return (
    <section className="section team">
      <SectionHeading id="team">Meet the team</SectionHeading>

      <TeamCarousel gridClassName="people-grid founders-grid">
        {founders.map((person) => (
          <PersonCard key={person.name} person={person} />
        ))}
      </TeamCarousel>

      <TeamCarousel gridClassName="people-grid contributors-grid">
        {contributors.map((person) => (
          <PersonCard key={person.name} person={person} linked={false} />
        ))}
      </TeamCarousel>

      <div className="subsection advisors-section">
        <h3 className="subheading">Advisors</h3>
        <TeamCarousel gridClassName="people-grid advisors-grid">
          {advisors.map((person) => (
            <AdvisorCard key={person.name} person={person} />
          ))}
        </TeamCarousel>
      </div>

      <div className="subsection achievements-section">
        <h3 className="subheading">Founder achievements</h3>
        <AchievementRow images={achievementsFeatured} variant="featured" duration={40} />
        <AchievementRow images={achievementsCompact} variant="compact" reverse duration={55} />
      </div>
    </section>
  );
}
