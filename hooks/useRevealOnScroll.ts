"use client";

import { useEffect, RefObject, useState } from "react";

export type RevealState = "pre" | "in" | undefined;

/**
 * Returns a reveal-state string to apply as `data-reveal-state`.
 * - undefined (initial SSR render): no attr, CSS default = visible (safe fallback).
 * - "pre" (hidden, awaiting observer): applied after mount only if element is well below the fold.
 * - "in" (animated visible): applied either immediately (element near/above fold) or when it intersects.
 *
 * This pattern ensures: (a) SSR/no-JS always shows content, (b) above-fold elements get a smooth
 * page-entrance fade-in, (c) below-fold elements wait for scroll intersection before animating.
 */
export function useRevealOnScroll<T extends HTMLElement>(
  ref: RefObject<T>
): RevealState {
  const [state, setState] = useState<RevealState>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    // Treat anything within 200px of the viewport as "near" — avoids flicker on boundary elements.
    const nearOrInView = rect.top < vh + 200 && rect.bottom > -200;

    if (nearOrInView) {
      setState("in");
      return;
    }

    setState("pre");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setState("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return state;
}
