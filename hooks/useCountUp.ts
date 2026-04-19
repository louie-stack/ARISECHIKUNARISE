"use client";

import { useEffect, RefObject, useState } from "react";

/**
 * Counts from 0 to `target` over `durationMs` when the ref'd element intersects
 * the viewport (fires once). Uses easeOutCubic for a premium-feeling settle.
 */
export function useCountUp(
  triggerRef: RefObject<HTMLElement>,
  target: number,
  durationMs: number = 1800
): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;

    let rafId: number | null = null;
    let startTime: number | null = null;
    let started = false;

    const step = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(Math.round(target * eased));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        rafId = null;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            rafId = requestAnimationFrame(step);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [triggerRef, target, durationMs]);

  return value;
}
