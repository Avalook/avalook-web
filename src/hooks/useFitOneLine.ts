import { useEffect, useRef } from "react";

/**
 * Keeps an element's text on a SINGLE line by shrinking its font-size until the
 * text fits its box. The CSS font-size is used as the upper bound (short titles
 * stay large), so only overly-long titles are scaled down — on every viewport.
 *
 * Re-runs on mount, on resize, when the container resizes, and once web fonts
 * have loaded (text width depends on the final font).
 */
export function useFitOneLine<T extends HTMLElement>(text: string) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      // Reset to the CSS-defined size, then shrink only if it overflows.
      el.style.fontSize = "";
      // A `white-space: nowrap` title inflates its own box (and can inflate
      // ancestors that shrink-to-fit) past the real content width, which would
      // make a naive measurement think it already fits. Measure against the
      // NARROWEST of: the element's box, its parent, the page's <main>
      // container (which has a definite width), and the viewport.
      const widths = [
        el.clientWidth,
        el.parentElement?.clientWidth,
        el.closest("main")?.clientWidth,
        document.documentElement.clientWidth,
      ].filter((w): w is number => typeof w === "number" && w > 0);
      const avail = Math.min(...widths);
      let size = parseFloat(getComputedStyle(el).fontSize) || 20;
      let guard = 0;
      while (el.scrollWidth > avail + 0.5 && size > 8 && guard < 200) {
        size -= 0.5;
        el.style.fontSize = `${size}px`;
        guard += 1;
      }
    };

    fit();
    window.addEventListener("resize", fit);

    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined" && el.parentElement) {
      observer = new ResizeObserver(fit);
      observer.observe(el.parentElement);
    }

    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (fonts?.ready) fonts.ready.then(fit).catch(() => {});

    return () => {
      window.removeEventListener("resize", fit);
      observer?.disconnect();
    };
  }, [text]);

  return ref;
}
