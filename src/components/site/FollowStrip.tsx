import { FOLLOW_LINKS } from "@/data/site";

/**
 * The scrolling "follow us" marquee shown above the footer on every page.
 * The links are duplicated so the CSS marquee can loop seamlessly.
 */
export function FollowStrip() {
  const items = [...FOLLOW_LINKS, ...FOLLOW_LINKS];
  return (
    <section className="follow-strip" id="follow">
      <div className="marquee">
        <div className="marquee-track">
          {items.map((link, i) => (
            <a
              key={i}
              className="marquee-link"
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
