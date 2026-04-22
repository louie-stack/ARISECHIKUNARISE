"use client";

import { useRef } from "react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "X", href: "https://x.com" },
  { label: "Telegram", href: "https://t.me" },
  { label: "TikTok", href: "https://tiktok.com" }
];

export default function Footer() {
  const taglineRef = useRef<HTMLDivElement>(null);
  const taglineState = useRevealOnScroll(taglineRef);

  return (
    <footer className="bg-ink text-bone">
      {/* Big callback heading */}
      <div
        ref={taglineRef}
        data-reveal
        data-reveal-state={taglineState}
        className="px-4 md:px-8 py-20 md:py-28 text-center max-w-6xl mx-auto"
      >
        <h2
          className="font-black text-glow leading-[0.9] tracking-tight animate-neon-pulse"
          style={{ fontSize: "clamp(4rem, 12vw, 11rem)" }}
        >
          ARISE CHIKUN,
          <br />
          ARISE.
        </h2>
        <p className="prose-normal mt-8 md:mt-10 text-lg md:text-xl max-w-2xl mx-auto text-bone font-medium">
          Chant it loud enough and they will hear us from every chain.
        </p>

        <p className="mt-16 font-black text-bone text-xs tracking-[0.3em]">
          FIND THE CHANNELS
        </p>
        <div className="reveal-stagger mt-4 flex flex-wrap gap-3 justify-center" data-reveal-state={taglineState}>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom strip */}
      <div className="bg-ink border-t-2 border-blue/40">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-bone/60 text-[0.65rem] md:text-xs tracking-[0.2em] text-center">
          <p>© 2026 CHIKUN. A LORE PROJECT. NOT AFFILIATED WITH THE LITECOIN FOUNDATION.</p>
          <p className="italic">鶏鳴 / KEIMEI</p>
          <p>GENESIS: OCTOBER 7, 2011</p>
        </div>
      </div>
    </footer>
  );
}
