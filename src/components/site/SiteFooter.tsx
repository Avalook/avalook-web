import { SITE } from "@/data/site";

const HOME_LINKS: [string, string][] = [
  ["Home", "#home"],
  ["Portfolio", "#portfolio"],
  ["Partners", "#partners"],
  ["Team", "#team"],
];

const PAGE_LINKS: [string, string][] = [
  ["Home", "/"],
  ["Portfolio", "/#portfolio"],
  ["Partners", "/#partners"],
  ["Team", "/#team"],
];

export function SiteFooter({ variant = "page" }: { variant?: "home" | "page" }) {
  const isHome = variant === "home";
  const links = isHome ? HOME_LINKS : PAGE_LINKS;

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <a
            className="footer-logo-link"
            href={isHome ? "#home" : "/"}
            aria-label={isHome ? "Back to top" : "Back to home"}
          >
            <img className="footer-logo" src={SITE.logo} alt="Avalook" />
          </a>
          <p className="footer-copyright">© 2024 Avalook. All Right Reserved.</p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          {links.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="footer-cta">
          <h3 className="footer-cta-title">Get in touch</h3>
          <a className="footer-contact-btn" href={`mailto:${SITE.email}`}>
            Contact us
          </a>
          <div className="footer-social" aria-label="Social links">
            <a
              className="footer-social-btn"
              href={SITE.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z" />
              </svg>
            </a>
            <a
              className="footer-social-btn"
              href={SITE.social.x}
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              className="footer-social-btn"
              href={SITE.social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
