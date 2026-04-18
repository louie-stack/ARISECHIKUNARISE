"use client";

import Link from "next/link";
import { Instagram, Music2, Send } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-blue text-bone overflow-hidden min-h-screen">
      {/* Main hero composition — starts at top, nav floats over */}
      <div className="relative px-4 md:px-8 pt-24 md:pt-28 pb-40">
        {/* The big CHIKUN letters behind the character */}
        <div className="relative flex items-center justify-center">
          {/* Background giant text — positioned mid-frame */}
          <h1
            aria-hidden
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center font-black text-ink leading-[0.85] select-none pointer-events-none tracking-tighter"
            style={{ fontSize: "clamp(9rem, 24vw, 24rem)" }}
          >
            CHIKUN
          </h1>

          {/* Character image — stands in front of letters at same vertical position */}
          <div className="relative z-10 flex items-end justify-center w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/art/hero/chikun-hero.png"
              alt="Chikun"
              className="relative z-10 h-[55vh] md:h-[70vh] w-auto object-contain drop-shadow-[8px_8px_0_rgba(10,10,15,0.5)]"
            />
          </div>
        </div>
      </div>

      {/* Bottom copy row — absolute positioned corner anchors */}
      <div className="absolute bottom-20 md:bottom-24 left-0 right-0 px-6 md:px-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 items-end z-20 pointer-events-none">
        <div className="font-black text-bone leading-[0.95] tracking-tight col-span-1">
          <p className="text-xl md:text-3xl lg:text-4xl">
            For too long <br />
            Chikun has been
          </p>
          <p className="mt-1 text-2xl md:text-4xl lg:text-5xl">
            <span className="spray-tag">forgotten.</span>
          </p>
        </div>

        <div className="hidden md:flex items-center justify-center col-span-1 pointer-events-auto">
          <Link href="#lore" className="btn-pill btn-pill-glow text-base whitespace-nowrap">
            ↓ The Revolution Has Begun
          </Link>
        </div>

        <div className="font-black text-bone leading-[0.95] tracking-tight text-right col-span-1">
          <p className="text-xl md:text-3xl lg:text-4xl">
            The chant was <br />
            never a cheer.
          </p>
          <p className="mt-1 text-2xl md:text-4xl lg:text-5xl text-glow">It was a summons.</p>
        </div>
      </div>

      {/* Bottom-left: ↓ THE REVOLUTION HAS BEGUN — mobile only */}
      <div className="absolute bottom-4 left-4 flex items-center gap-3 z-20 md:hidden">
        <span className="text-bone text-2xl">↓</span>
        <p className="font-black text-bone text-xs tracking-wider leading-tight">
          THE REVOLUTION <br />
          HAS BEGUN
        </p>
      </div>

      {/* Bottom-right: social icons */}
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
