"use client";

import Link from "next/link";
import { useRef } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const TALES_IMAGES = [
  "/art/scenes/trollbox-crt.webp",
  "/art/scenes/kick-fight.webp",
  "/art/scenes/neon-alley.webp",
  "/art/scenes/alley-fight.webp"
];

const PLACEHOLDER = (seed: string) =>
  `https://picsum.photos/seed/${seed}/800/600`;

export default function ChikunTales() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollProgress(sectionRef);

  const headingRef = useRef<HTMLDivElement>(null);
  const headingState = useRevealOnScroll(headingRef);

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink text-bone py-24 md:py-36 overflow-hidden"
    >
      {/* Floating corner stamps */}
      <div className="absolute top-8 left-4 md:left-10 z-20 hidden md:block">
        <span className="tape tape-mint">NOW AIRING</span>
      </div>
      <div className="absolute top-8 right-4 md:right-10 z-20 hidden md:block">
        <span className="stamp text-glow">EPISODE 01</span>
      </div>

      <div
        ref={headingRef}
        data-reveal
        data-reveal-state={headingState}
        className="px-4 md:px-8 max-w-6xl mx-auto text-center"
      >
        {/* Small eyebrow */}
        <p className="font-black text-bone/60 text-xs md:text-sm tracking-[0.4em] mb-6">
          ◄ TRANSMISSION 鶏鳴 ►
        </p>

        {/* Big title with spray overlay */}
        <h2
          className="font-black leading-[0.9] tracking-tight text-bone"
          style={{ fontSize: "clamp(3rem, 12vw, 11rem)" }}
        >
          WAR STORIES
          <br />
          <span className="relative inline-block">
            <span className="text-bone">FROM THE BOX.</span>
            <span
              className="absolute inset-0 flex items-center justify-center spray-tag"
              style={{
                transform: "rotate(-4deg)",
                color: "#2EE862",
                fontSize: "0.82em"
              }}
            >
              TROLLBOX
            </span>
          </span>
        </h2>

        <p className="prose-normal mt-8 max-w-3xl mx-auto text-xl md:text-2xl font-medium leading-snug text-bone/90">
          Some of these happened. Some are coming. You&apos;ll know which is which when you see them.
        </p>

        <Link href="/about" className="btn-pill btn-pill-glow mt-10 inline-flex">
          READ ONE →
        </Link>
      </div>

      {/* Tilted tales gallery — black strip on ink bg with bone-framed tiles */}
      <div className="mt-16 md:mt-24 relative">
        <div className="transform -rotate-2 bg-blue border-y-4 border-ink py-8 overflow-hidden">
          <div
            className="flex gap-4 md:gap-6 w-max px-4 will-change-transform"
            style={{
              transform:
                "translate3d(calc(var(--scroll-progress, 0) * -50%), 0, 0)"
            }}
          >
            {[...TALES_IMAGES, ...TALES_IMAGES, ...TALES_IMAGES].map(
              (src, i) => (
                <div
                  key={i}
                  className={`relative w-[280px] md:w-[400px] aspect-[4/3] shrink-0 border-4 border-bone overflow-hidden shadow-[6px_6px_0_#0A0A0F] ${
                    i % 2 === 0 ? "rotate-1" : "-rotate-1"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover bg-ink"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = PLACEHOLDER(
                        `tale-${i}`
                      );
                    }}
                  />
                  {/* Episode number stamp */}
                  <span className="absolute bottom-2 left-2 tape tape-bone text-[0.6rem]">
                    EP · 0{(i % 4) + 1}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
