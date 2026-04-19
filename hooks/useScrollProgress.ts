"use client";

import { useEffect, RefObject } from "react";

/**
 * Writes a 0..1 scroll-progress value as a CSS custom property on the ref'd
 * element. Progress is 0 when the element's top meets the viewport bottom,
 * 1 when its bottom meets the viewport top. Updates via rAF; no React re-renders.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement>,
  varName: string = "--scroll-progress"
) {
  useEffect(() => {
    let rafId: number | null = null;

    const update = () => {
      rafId = null;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const total = vh + rect.height;
      if (total <= 0) return;
      const traveled = vh - rect.top;
      const p = Math.max(0, Math.min(1, traveled / total));
      el.style.setProperty(varName, p.toFixed(4));
    };

    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [ref, varName]);
}
