"use client";

import { useRef } from "react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export default function NewEra() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingState = useRevealOnScroll(headingRef);

  const statsRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative bg-bone text-ink -mt-60 md:-mt-80 pt-64 md:pt-80 pb-24 md:pb-36 px-4 md:px-8 overflow-hidden">
      {/* Floating tape stamps at corners — shifted down to clear the Strongholds carousel
          which now straddles this section's top edge */}
      <div className="absolute top-[13rem] md:top-[17rem] left-4 md:left-10 z-10 hidden md:block">
        <span className="tape">TOKENOMICS · V1</span>
      </div>
      <div className="absolute top-[13rem] md:top-[17rem] right-4 md:right-10 z-10 hidden md:block">
        <span className="tape tape-blood">CONFIRMED ON-CHAIN</span>
      </div>

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Headline with spray-paint ARISE */}
        <h2
          ref={headingRef}
          data-reveal
          data-reveal-state={headingState}
          className="font-black leading-[0.85] tracking-tight"
          style={{ fontSize: "clamp(2.25rem, 11vw, 10rem)" }}
        >
          THE CHANT
          <br />
          <span className="relative inline-block">
            <span className="text-ink">IS RETURNING.</span>
            <span
              className="absolute inset-0 flex items-center justify-center spray-tag"
              style={{
                transform: "rotate(-5deg) translateY(-4%)",
                color: "#2EE862"
              }}
            >
              ARISE
            </span>
          </span>
        </h2>

        <p className="prose-normal mt-8 text-lg md:text-xl max-w-2xl mx-auto">
          Your voice is next.
        </p>

        {/* Follow buttons */}
        <div className="mt-12 md:mt-16 flex flex-wrap gap-4 justify-center items-center">
          <a
            href="https://x.com/ChikunLTC"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-pill-glow"
          >
            FOLLOW THE SIGNAL →
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <span
            aria-disabled="true"
            title="Telegram — coming soon"
            className="btn-pill opacity-50 cursor-not-allowed select-none"
          >
            TELEGRAM — SOON
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
            </svg>
          </span>
        </div>

        {/* Stats — wrapped in dashed sticker box */}
        <div
          ref={statsRef}
          className="mt-12 md:mt-28 sticker-box bg-bone/30 relative"
        >
          {/* Corner tape on the box */}
          <span
            className="tape absolute -top-4 left-1/2 -translate-x-1/2"
            style={{ transform: "translateX(-50%) rotate(-2deg)" }}
          >
            $CHIKUN
          </span>

          <div>
            <p className="font-black text-xs md:text-sm tracking-[0.3em] mb-4 flex items-center justify-center gap-4">
              <span className="chain-link" /> TOTAL SUPPLY{" "}
              <span className="chain-link" />
            </p>
            <p
              className="font-black leading-none tracking-tight stat-value"
              style={{ fontSize: "clamp(2.5rem, 9vw, 7rem)" }}
            >
              TBD
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-3 sm:gap-6 md:gap-10 items-start">
            <div>
              <p className="font-black text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
                AIRDROP
              </p>
              <p
                className="font-black leading-none stat-value"
                style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
              >
                TBD
              </p>
            </div>
            <div>
              <p className="font-black text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
                METHOD
              </p>
              <p
                className="font-black leading-none stat-value"
                style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
              >
                TBD
              </p>
            </div>
            <div>
              <p className="font-black text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
                CHAIN
              </p>
              <p
                className="font-black leading-none stat-value"
                style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
              >
                LITVM
              </p>
            </div>
          </div>
        </div>

        {/* $CHIKUN coin — gentle up-and-down bounce */}
        <style jsx>{`
          @keyframes chikunCoinBounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-18px);
            }
          }
          .chikun-coin-spin {
            animation: chikunCoinBounce 3s ease-in-out infinite;
          }
        `}</style>
        <div className="mt-14 md:mt-24 flex justify-center">
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96">
            {/* Coin image — tilt/bounce loop. multiply blend hides the white
                export bg against the bone section. */}
            <picture>
              <source srcSet="/arise/chikun-coin-1.webp" type="image/webp" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/arise/chikun-coin-1.png"
                alt="$CHIKUN coin"
                draggable={false}
                className="chikun-coin-spin absolute inset-0 w-full h-full object-contain select-none"
                style={{ mixBlendMode: "multiply" }}
              />
            </picture>

            {/* Small $CHIKUN tag under the coin */}
            <div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-black text-ink text-xs tracking-[0.35em]"
              aria-hidden
            >
              $CHIKUN
            </div>
          </div>
        </div>

        {/* Quote under the coin */}
        <div className="mt-10 max-w-2xl mx-auto">
          <p className="prose-normal text-xl md:text-2xl italic leading-snug">
            &ldquo;Chikun is the result of some of us who joined together... to create a real alternative.&rdquo;
          </p>
          <p className="prose-normal mt-3 text-xs md:text-sm tracking-[0.2em] opacity-60">
            Fairbrix enthusiast · Chikun announcement
            <br />
            Chikuntalk, October 1, 2011
          </p>
        </div>

        {/* Creative universe CTA */}
        <div className="mt-16 md:mt-24">
          <h3
            className="font-black leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(1.75rem, 4.5vw, 4rem)" }}
          >
            DISCLAIMER.
          </h3>
          <p className="prose-normal mt-8 text-lg md:text-xl max-w-3xl mx-auto">
            $CHIKUN is a cultural movement and memecoin. No team promises, no roadmap,
            no expectation of financial return. Memecoins are extremely volatile and
            speculative. You can lose everything you put in. Nothing on this site is
            financial advice. Do your own research. Only ape in what you can afford to lose.
          </p>
        </div>
      </div>
    </section>
  );
}
