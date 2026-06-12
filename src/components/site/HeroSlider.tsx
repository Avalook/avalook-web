import { useEffect, useRef, useState } from "react";
import { asset } from "@/data/site";

const SLIDE_INTERVAL_MS = 5500;

type Slide = {
  image: string;
  mobileBg: string;
  headline: React.ReactNode;
  dotLabel: string;
};

const slides: Slide[] = [
  {
    image: asset("9a6383_6ce78510f7274de192e054625645ab48~mv2.png"),
    mobileBg: asset("mobile-hero/9a6383_6ce78510f7274de192e054625645ab48~mv2-mobile-bg.png"),
    headline: (
      <>
        From <span>Storylines</span>
        <br />
        to <span>Digital Wonders</span>
      </>
    ),
    dotLabel: "Show Storylines slide",
  },
  {
    image: asset("9a6383_9e1d5464aae84ecaaa81a6c1976e0d04~mv2.png"),
    mobileBg: asset("mobile-hero/9a6383_9e1d5464aae84ecaaa81a6c1976e0d04~mv2-mobile-bg.png"),
    headline: (
      <>
        From <span>Books</span>
        <br />
        to <span>Bytes</span>
      </>
    ),
    dotLabel: "Show Books slide",
  },
  {
    image: asset("5c4f61_4aa2f633dcfb4082b3415f89889e1e8c~mv2.png"),
    mobileBg: asset("mobile-hero/5c4f61_4aa2f633dcfb4082b3415f89889e1e8c~mv2-mobile-bg.png"),
    headline: (
      <>
        From <span>Creative Sparks</span>
        <br />
        to <span>Cutting-Edge IPs</span>
      </>
    ),
    dotLabel: "Show Creative Sparks slide",
  },
];

/**
 * Auto-cycling hero. CSS handles the cross-fade via `.is-active`; this only
 * tracks the active index, autoplays, and pauses on hover / hidden tab — a
 * React port of the legacy `initHeroSlider`.
 */
export function HeroSlider() {
  const [active, setActive] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const timer = useRef<number | null>(null);

  const stop = () => {
    if (timer.current !== null) {
      window.clearInterval(timer.current);
      timer.current = null;
    }
  };
  const start = () => {
    stop();
    timer.current = window.setInterval(() => {
      setActive((p) => (p + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
  };
  const goto = (index: number) => {
    setActive((index + slides.length) % slides.length);
    start();
  };

  useEffect(() => {
    start();
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mirror the active slide's artwork onto the hero for the mobile background.
  useEffect(() => {
    heroRef.current?.style.setProperty(
      "--hero-mobile-image",
      `url('${slides[active].mobileBg}')`,
    );
  }, [active]);

  return (
    <section
      className="hero"
      id="home"
      ref={heroRef}
      onMouseEnter={stop}
      onMouseLeave={start}
    >
      <div className="hero-aura hero-aura-left" />
      <div className="hero-aura hero-aura-right" />
      <div className="planet" />
      <button
        className="hero-arrow hero-arrow-prev"
        type="button"
        aria-label="Previous slide"
        onClick={() => goto(active - 1)}
      >
        <span>‹</span>
      </button>
      <div className="hero-frame">
        {slides.map((slide, i) => (
          <article
            key={i}
            className={`hero-slide${i === active ? " is-active" : ""}`}
            style={
              {
                "--hero-image": `url('${slide.image}')`,
                "--hero-mobile-bg": `url('${slide.mobileBg}')`,
              } as React.CSSProperties
            }
          >
            <div className="hero-copy">
              <h1>{slide.headline}</h1>
              <a className="ghost-button" href="#portfolio">
                Explore our projects
              </a>
            </div>
          </article>
        ))}
      </div>
      <button
        className="hero-arrow hero-arrow-next"
        type="button"
        aria-label="Next slide"
        onClick={() => goto(active + 1)}
      >
        <span>›</span>
      </button>
      <div className="hero-dots" aria-label="Hero slides">
        {slides.map((slide, i) => (
          <button
            key={i}
            className={`hero-dot${i === active ? " is-active" : ""}`}
            type="button"
            aria-label={slide.dotLabel}
            onClick={() => goto(i)}
          />
        ))}
      </div>
    </section>
  );
}
