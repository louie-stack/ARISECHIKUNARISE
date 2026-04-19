"use client";

import { useEffect, RefObject, useState } from "react";

/**
 * Reveals characters one-by-one once the referenced element intersects.
 * Returns the number of characters currently revealed (0..total).
 *
 * SSR-safe: returns `total` when window is undefined, so no-JS renders the full text.
 */
export function useTypewriter<T extends HTMLElement>(
  ref: RefObject<T>,
  total: number,
  opts: { charsPerTick?: number; tickMs?: number; threshold?: number } = {}
): number {
  const { charsPerTick = 2, tickMs = 18, threshold = 0.15 } = opts;
  const [revealed, setRevealed] = useState<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let started = false;
    let timer: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (started) return;
      started = true;
      timer = setInterval(() => {
        setRevealed((r) => {
          const next = r + charsPerTick;
          if (next >= total) {
            if (timer) clearInterval(timer);
            return total;
          }
          return next;
        });
      }, tickMs);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            start();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [ref, total, charsPerTick, tickMs, threshold]);

  return revealed;
}
