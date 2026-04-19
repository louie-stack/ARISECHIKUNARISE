"use client";

import { Instagram, Music2, Send } from "lucide-react";
import { useRef } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const HERO_SRC = "/art/hero/chikun-hero.png";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollProgress(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative bg-blue text-bone overflow-hidden min-h-screen flex flex-col"
    >
      <h1 className="sr-only">CHIKUN</h1>
      {/* Composition area — hero banner with CHIKUN wordmark baked into the artwork */}
      <div className="relative flex-1 flex items-center justify-center px-2 md:px-4 pt-20 md:pt-24 pb-16 md:pb-20">
        <div className="relative w-full flex items-center justify-center">
          <div
            className="will-change-transform"
            style={{
              transform:
                "translate3d(0, calc(var(--scroll-progress, 0) * -80px), 0)"
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={HERO_SRC}
              alt="Chikun standing triumphant over fallen henchmen, CHIKUN wordmark behind"
              className="relative z-10 h-[75vh] md:h-[90vh] max-w-full w-auto object-contain animate-float-slow"
            />
          </div>
        </div>
      </div>

      {/* Mobile-only cue */}
      <div className="absolute bottom-4 left-4 flex items-center gap-3 z-20 md:hidden">
        <span className="text-bone text-2xl">↓</span>
        <p className="font-black text-bone text-xs tracking-wider leading-tight">
          THE CHANT <br />
          RETURNS
        </p>
      </div>

      {/* Social icons */}
      <div className="absolute bottom-4 right-4 md:right-8 flex items-center gap-3 z-20">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-bone hover:text-glow transition-colors"
        >
          <Instagram size={20} strokeWidth={2.5} />
        </a>
        <a
          href="https://tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
          className="text-bone hover:text-glow transition-colors"
        >
          <Music2 size={20} strokeWidth={2.5} />
        </a>
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X"
          className="text-bone hover:text-glow transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <a
          href="https://t.me"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
          className="text-bone hover:text-glow transition-colors"
        >
          <Send size={20} strokeWidth={2.5} />
        </a>
      </div>

      {/* Jagged black comb teeth transitioning to next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-8 z-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 30' preserveAspectRatio='none'%3E%3Cpath d='M0 30 L10 0 L20 30 L30 0 L40 30 L50 0 L60 30 L70 0 L80 30 L90 0 L100 30 Z' fill='%230A0A0F'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat-x",
          backgroundSize: "60px 30px"
        }}
      />
    </section>
  );
}
