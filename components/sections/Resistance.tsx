"use client";

import { useRef } from "react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

type Character = {
  key: "coblee" | "aztec" | "lester";
  name: string;
  codename: string;
  description: string;
  rotation: string;
};

const CHARACTERS: Character[] = [
  {
    key: "coblee",
    name: "COBLEE",
    codename: "THE ENGINEER",
    description:
      "He built the chain and stepped away. Thirteen years of silence. Now he's back at the workbench.",
    rotation: "-rotate-1"
  },
  {
    key: "aztec",
    name: "AZTEC",
    codename: "THE STRATEGIST",
    description:
      "Architect of LitVM. He sees what they hide. He draws the maps.",
    rotation: "rotate-1"
  },
  {
    key: "lester",
    name: "LESTER",
    codename: "THE SCIENTIST",
    description:
      "Runs Lester Labs. Brews what the Agents can't contain.",
    rotation: "-rotate-1"
  }
];

export default function Resistance() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingState = useRevealOnScroll(headingRef);

  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsState = useRevealOnScroll(cardsRef);

  return (
    <section className="relative bg-ink text-bone pt-16 md:pt-24 pb-12 md:pb-16 px-4 md:px-8 overflow-hidden">
      {/* Heading block */}
      <div
        ref={headingRef}
        data-reveal
        data-reveal-state={headingState}
        className="relative max-w-4xl mx-auto text-center"
      >
        <div className="flex justify-center mb-8">
          <span
            className="tape tape-mint"
            style={{ fontSize: "1.05rem", padding: "0.65rem 1.4rem" }}
          >
            THE RESISTANCE
          </span>
        </div>

        <h2
          className="font-black leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
        >
          YOU ARE
          <br />
          NOT ALONE.
        </h2>

        <p className="prose-normal mt-6 text-lg md:text-xl max-w-3xl mx-auto text-bone/80">
          Pockets of resistance across LitVM City. Some you know. Some you&apos;ll meet.
        </p>
      </div>

      {/* Character cards — stagger-reveal on scroll. Rotation lives on an inner wrapper so
          reveal-stagger's translateY doesn't fight the card's rotate transform. */}
      <div
        ref={cardsRef}
        data-reveal-state={cardsState}
        className="reveal-stagger relative mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 max-w-6xl mx-auto"
      >
        {CHARACTERS.map((c) => (
          <article key={c.key} className="relative group">
            <div
              className={`${c.rotation} transition-transform duration-300 hover:rotate-0 hover:-translate-y-1`}
            >
              <div className="relative aspect-square border-2 border-bone/15 rounded-md overflow-hidden bg-gradient-to-br from-ink to-ink-soft transition-all group-hover:border-glow shadow-[6px_6px_0_rgba(46,232,98,0.12)] group-hover:shadow-[10px_10px_0_rgba(46,232,98,0.4)]">
                {/* Placeholder layer */}
                <div
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-center text-bone/25 font-black tracking-[0.4em] text-lg md:text-2xl select-none"
                >
                  {c.name}
                </div>
                {/* Glow-green accent line at bottom */}
                <div
                  aria-hidden
                  className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-glow to-transparent opacity-50"
                />
                {/* Real image — hides itself on 404 */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/art/resistance/${c.key}.webp`}
                  alt=""
                  loading="eager"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                    if (typeof window !== "undefined") {
                      console.warn(
                        `[Resistance] Missing image: /art/resistance/${c.key}.webp`
                      );
                    }
                  }}
                />
              </div>

              <p className="mt-5 font-black text-glow text-xs md:text-sm tracking-[0.3em]">
                {c.codename}
              </p>

              <h3
                className="mt-2 font-black leading-none tracking-tight"
                style={{ fontSize: "clamp(2.25rem, 5.5vw, 3.75rem)" }}
              >
                {c.name}
              </h3>

              <p className="prose-normal mt-3 text-base md:text-lg leading-snug text-bone/75 min-h-[5.5rem]">
                {c.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
