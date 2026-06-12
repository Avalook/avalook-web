import { useEffect } from "react";

/**
 * Adds the given space-separated class names to <body> while a route is
 * mounted, removing them on unmount. Replaces the legacy per-route effect that
 * mutated document.body directly.
 */
export function usePageClass(className?: string) {
  useEffect(() => {
    if (!className) return;
    const classes = className.split(/\s+/).filter(Boolean);
    classes.forEach((c) => document.body.classList.add(c));
    return () => classes.forEach((c) => document.body.classList.remove(c));
  }, [className]);
}
