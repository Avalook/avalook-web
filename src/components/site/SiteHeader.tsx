import { useEffect, useRef, useState } from "react";
import { SITE, HOME_NAV, PAGE_NAV } from "@/data/site";

/**
 * Site header with the mobile hamburger menu. The open state toggles
 * `body.menu-open`, which the stylesheet uses to slide the nav in/out — this
 * replaces the legacy imperative `initNavToggle` from /js/main.js.
 */
export function SiteHeader({ variant = "page" }: { variant?: "home" | "page" }) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const isHome = variant === "home";
  const nav = isHome ? HOME_NAV : PAGE_NAV;

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  // Publish the live header height to `--header-h` so `scroll-padding-top`
  // (base.css) offsets anchor jumps by the EXACT header height on every
  // viewport — no hard-coded magic number that drifts as the responsive
  // header resizes.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const setHeaderH = () =>
      document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    setHeaderH();
    const ro = new ResizeObserver(setHeaderH);
    ro.observe(el);
    window.addEventListener("resize", setHeaderH);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setHeaderH);
    };
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1180px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (!e.matches) setOpen(false);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="site-header" ref={headerRef}>
      <a
        className="brand"
        href={isHome ? "#home" : "/"}
        aria-label={isHome ? "Back to top" : "Avalook home"}
      >
        <img src={SITE.logo} alt="Avalook logo" />
      </a>
      <button
        className="nav-toggle"
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className="site-nav" aria-label="Primary">
        {nav.map((link) => (
          <a key={link.label} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>
      <a className="contact-pill" href={`mailto:${SITE.email}`}>
        Contact us
      </a>
    </header>
  );
}
