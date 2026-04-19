"use client";

import { useRef } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const PLACEHOLDER = "https://picsum.photos/seed/chikun-merch/900/900";

export default function MerchTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollProgress(sectionRef);

  const contentRef = useRef<HTMLDivElement>(null);
  const contentState = useRevealOnScroll(contentRef);

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink py-16 md:py-24 px-4 md:px-8 overflow-hidden"
    >
      {/* Floating spray-can style decoration */}
      <div className="absolute top-6 right-4 md:right-10 z-0 hidden md:block">
        <span className="tape tape-blood animate-float-slow">DROPPING SOON</span>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="relative bg-blue border-4 border-ink rounded-3xl p-8 md:p-12 overflow-hidden shadow-[10px_10px_0_#2EE862]">
          {/* Comb edge top */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-8"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 30' preserveAspectRatio='none'%3E%3Cpath d='M0 0 L10 30 L20 0 L30 30 L40 0 L50 30 L60 0 L70 30 L80 0 L90 30 L100 0 Z' fill='%230A0A0F'/%3E%3C/svg%3E\")",
              backgroundRepeat: "repeat-x",
              backgroundSize: "60px 30px"
            }}
          />

          <div
            ref={contentRef}
            data-reveal-state={contentState}
            className="reveal-stagger relative grid md:grid-cols-2 gap-8 md:gap-12 items-center pt-8"
          >
            <div>
              <p className="font-black text-bone/70 text-xs tracking-[0.3em] mb-4">
                RESISTANCE SUPPLY
              </p>
              <h2
                className="font-black text-bone leading-[0.95] tracking-tight"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                RESISTANCE GEAR
                <br />
                <span className="relative inline-block">
                  <span className="text-bone">LOADING.</span>
                  <span
                    aria-hidden
                    className="absolute -bottom-2 left-0 right-0 h-2 bg-glow"
                    style={{ transform: "rotate(-1deg)" }}
                  />
                </span>
              </h2>

              <p className="prose-normal mt-6 text-base md:text-lg text-bone/80 max-w-md">
                Tees, patches, caps, stickers.
                <br />
                Uniform for the chant.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button type="button" className="btn-pill btn-pill-glow">
                  NOTIFY ME →
                </button>
              </div>

              {/* Chain divider — brand footer */}
              <div className="mt-10 flex items-center gap-3 text-bone/60 text-xs tracking-[0.3em] font-black">
                <span className="chain-link" />
                RESISTANCE SUPPLY · DROP 001
                <span className="chain-link" />
              </div>
            </div>

            {/* Image column — scroll-linked parallax wrapper keeps rotation + float
                animations on the inner elements so transforms don't stomp each other. */}
            <div className="relative">
              {/* Price tag sticker floating over */}
              <div className="absolute -top-4 -right-2 md:-top-6 md:-right-6 z-20 pointer-events-none">
                <span
                  className="tape tape-blood text-sm"
                  style={{ transform: "rotate(6deg)" }}
                >
                  ARRIVING · 2026
                </span>
              </div>

              <div
                className="will-change-transform"
                style={{
                  transform:
                    "translate3d(0, calc((var(--scroll-progress, 0) - 0.5) * -60px), 0)"
                }}
              >
                <div className="relative aspect-square border-4 border-ink rounded-2xl overflow-hidden bg-ink rotate-1 hover:rotate-0 transition-transform shadow-[8px_8px_0_#0A0A0F]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/art/scenes/merch-preview.webp"
                    alt=""
                    className="w-full h-full object-cover animate-float-slow"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = PLACEHOLDER;
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
