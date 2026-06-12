import { useFitOneLine } from "@/hooks/useFitOneLine";
import type { PortfolioCard as PortfolioCardData } from "@/data/projects";

export function PortfolioCard({ card }: { card: PortfolioCardData }) {
  // Shrink the title font (if needed) so the full name stays on one line.
  const titleRef = useFitOneLine<HTMLHeadingElement>(card.title);

  return (
    <article
      className="portfolio-card"
      style={{ "--accent": card.accent } as React.CSSProperties}
    >
      <a
        href={card.href}
        {...(card.external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {card.video ? (
          <video
            src={card.video}
            poster={card.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={card.title}
          />
        ) : (
          <img src={card.image} alt={card.title} />
        )}
        <div className="portfolio-footer">
          <h3 ref={titleRef}>{card.title}</h3>
          <span>{card.type}</span>
        </div>
      </a>
    </article>
  );
}
