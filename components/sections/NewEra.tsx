"use client";

import Link from "next/link";
import { useRef } from "react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useCountUp } from "@/hooks/useCountUp";

export default function NewEra() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingState = useRevealOnScroll(headingRef);

  const statsRef = useRef<HTMLDivElement>(null);
  const supply = useCountUp(statsRef, 84_000_000, 2000);
  const burned = useCountUp(statsRef, 84, 1400);
  const believers = useCountUp(statsRef, 16, 1400);

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
          style={{ fontSize: "clamp(3rem, 11vw, 10rem)" }}
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
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill"
          >
            FOLLOW THE SIGNAL →
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-pill-glow"
          >
            JOIN THE RESISTANCE →
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
            </svg>
          </a>
        </div>

        {/* Stats — wrapped in dashed sticker box */}
        <div
          ref={statsRef}
          className="mt-20 md:mt-28 sticker-box bg-bone/30 relative"
        >
          {/* Corner tape on the box */}
          <span
            className="tape absolute -top-4 left-1/2 -translate-x-1/2"
            style={{ transform: "translateX(-50%) rotate(-2deg)" }}
          >
            OFFICIAL LEDGER
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
              {supply.toLocaleString("en-US")}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 md:gap-10 items-start">
            <div>
              <p className="font-black text-xs md:text-sm tracking-[0.3em] mb-4">
                BURNED
              </p>
              <p
                className="font-black leading-none stat-value"
                style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
              >
                {burned}%
              </p>
            </div>
            <div>
              <p className="font-black text-xs md:text-sm tracking-[0.3em] mb-4">
                BELIEVERS
              </p>
              <p
                className="font-black leading-none stat-value"
                style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
              >
                {believers}%
              </p>
            </div>
            <div>
              <p className="font-black text-xs md:text-sm tracking-[0.3em] mb-4">
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

        {/* Spinning Ł coin with pulsing glow ring */}
        <div className="mt-24 flex justify-center">
          <div className="relative w-36 h-36 md:w-44 md:h-44">
            {/* Pulsing rings */}
            <span
              aria-hidden
              className="absolute inset-0 rounded-full border-4 border-glow animate-pulse-ring"
            />
            <span
              aria-hidden
              className="absolute inset-0 rounded-full border-4 border-glow animate-pulse-ring"
              style={{ animationDelay: "1.1s" }}
            />
            <div className="absolute inset-0 rounded-full bg-blue border-4 border-ink shadow-[6px_6px_0_#0A0A0F] flex items-center justify-center animate-spin-slow">
              <span
                className="font-black text-bone leading-none"
                style={{ fontSize: "5rem" }}
              >
                Ł
              </span>
            </div>
          </div>
        </div>

        {/* Quote under the coin */}
        <div className="mt-10 max-w-2xl mx-auto">
          <p className="prose-normal text-xl md:text-2xl italic leading-snug">
            &ldquo;Litecoin is the result of some of us who joined together... to create a real alternative.&rdquo;
          </p>
          <p className="prose-normal mt-3 text-xs md:text-sm tracking-[0.2em] opacity-60">
            coblee · Litecoin announcement
            <br />
            Bitcointalk, October 7, 2011
          </p>
        </div>

        {/* Creative universe CTA */}
        <div className="mt-24">
          <h3
            className="font-black leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 10vw, 9rem)" }}
          >
            I&apos;LL SHOW YOU
            <br />
            THE TRUTH.
          </h3>
          <p className="prose-normal mt-10 text-lg md:text-xl max-w-xl mx-auto">
            For fourteen years they told you where to look.
            <br />
            They never told you where to look back.
          </p>
          <Link href="/memes" className="btn-pill mt-10 inline-flex">
            ENTER THE CITY →
          </Link>
        </div>
      </div>
    </section>
  );
}
