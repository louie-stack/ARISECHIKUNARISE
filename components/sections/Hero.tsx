"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-blue text-bone pt-24 md:pt-28 pb-0 overflow-hidden">
      {/* Massive CHIKUN background letters */}
      <div className="relative px-4 md:px-8">
        <div className="relative flex items-end justify-center min-h-[70vh] md:min-h-[80vh]">
          {/* Background giant text */}
          <h1
            aria-hidden
            className="absolute inset-0 flex items-center justify-center font-black text-ink leading-none select-none pointer-events-none"
            style={{
              fontSize: "clamp(8rem, 28vw, 28rem)",
              letterSpacing: "-0.05em"
            }}
          >
            CHIKUN
          </h1>

          {/* Character image — sits in front of the letters */}
          <img
            src="/art/hero/chikun-hero.png"
            alt="Chikun"
            className="relative z-10 max-h-[60vh] md:max-h-[75vh] w-auto object-contain drop-shadow-[8px_8px_0_rgba(10,10,15,0.6)]"
          />
        </div>

        {/* Copy row */}
        <div className="relative z-10 pb-12 md:pb-20 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {/* Left copy */}
          <div className="font-black text-bone text-2xl md:text-4xl leading-[0.95] tracking-tight">
            For too long
            <br />
            Chikun has been
            <br />
            <span className="spray-tag text-3xl md:text-5xl inline-block mt-1">
              forgotten.
            </span>
          </div>

          {/* Center CTA */}
          <div className="flex flex-col items-center gap-3">
            <Link href="#lore" className="btn-pill btn-pill-glow text-base md:text-lg">
              ↓ The Revolution Has Begun
            </Link>
          </div>

          {/* Right copy */}
          <div className="font-black text-bone text-2xl md:text-4xl leading-[0.95] tracking-tight md:text-right">
            The chant was
            <br />
            never a cheer.
            <br />
            <span className="text-glow text-3xl md:text-5xl">It was a summons.</span>
          </div>
        </div>
      </div>

      {/* Jagged comb edge transitioning into next section */}
      <div className="relative h-8 bg-blue">
        <div
          className="absolute inset-x-0 bottom-0 h-8"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 30' preserveAspectRatio='none'%3E%3Cpath d='M0 30 L10 0 L20 30 L30 0 L40 30 L50 0 L60 30 L70 0 L80 30 L90 0 L100 30 Z' fill='%230A0A0F'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat-x",
            backgroundSize: "60px 30px"
          }}
        />
      </div>
    </section>
  );
}
