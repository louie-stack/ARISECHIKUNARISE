"use client";

import { useRef } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useTypewriter } from "@/hooks/useTypewriter";

// Two rows of 5 distinct images — no overlap, interleaved so each row has its own rhythm
const STRONGHOLD_IMAGES_ROW1 = [
  "/art/scenes/chikun-05.webp",
  "/art/scenes/chikun-03.webp",
  "/art/scenes/chikun-01.webp",
  "/art/scenes/chikun-07.webp",
  "/art/scenes/chikun-09.webp"
];

const STRONGHOLD_IMAGES_ROW2 = [
  "/art/scenes/chikun-02.webp",
  "/art/scenes/chikun-11.webp",
  "/art/scenes/chikun-08.webp",
  "/art/scenes/chikun-10.webp",
  "/art/scenes/chikun-06.webp"
];

// Fallback placeholders so the section has volume before real art lands
const PLACEHOLDER = (seed: string) =>
  `https://picsum.photos/seed/${seed}/600/600`;

type Seg = { text: string; className?: string };

const LORE_BODY: Seg[][] = [
  [
    { text: "> ", className: "text-glow" },
    { text: "Deep in the shadows of the online forums, a chant was echoed. " },
    { text: "ARISE CHIKUN, ARISE.", className: "text-glow" },
    {
      text: " Three words that pulled the early cypherpunks into one voice and summoned unimaginable power."
    }
  ],
  [
    { text: "> ", className: "text-glow" },
    { text: "But this shining beacon of energy did not go unnoticed, and soon " },
    { text: "The Elite", className: "text-blood-light" },
    {
      text: " came for us. Banking cartels, regulators and custodians all wanted to destroy what the community had found. Freedom. They built "
    },
    { text: "Big Corp", className: "text-blood-light" },
    {
      text: " at the centre of our city, and buried our hope under years of discrimination and regulatory fog."
    }
  ],
  [
    { text: "> ", className: "text-glow" },
    { text: "Yet the darkest hours led to the brightest dawns. Some key pockets of " },
    { text: "resistance", className: "text-glow" },
    { text: " remained against this tyranny. Now their determination and courage have sprouted a new hope. " },
    { text: "LitVM", className: "text-glow" },
    {
      text: " has arrived! Bringing EVM capabilities to our beloved Litecoin. We must capture this moment and rally together."
    }
  ],
  [
    { text: "> ", className: "text-glow" },
    { text: "Join with us and chant:" }
  ]
];

const LORE_FINALE: Seg[] = [
  { text: ">> " },
  { text: "Arise Chikun, Arise." }
];

const LORE_LINES: Seg[][] = [...LORE_BODY, LORE_FINALE];

const LINE_OFFSETS: Array<{ start: number; end: number }> = (() => {
  const arr: Array<{ start: number; end: number }> = [];
  let cursor = 0;
  for (const line of LORE_LINES) {
    const len = line.reduce((s, seg) => s + seg.text.length, 0);
    arr.push({ start: cursor, end: cursor + len });
    cursor += len;
  }
  return arr;
})();

const TOTAL_CHARS = LINE_OFFSETS[LINE_OFFSETS.length - 1].end;

export default function Strongholds() {
  const sectionRef = useRef<HTMLElement>(null);

  const headingRef = useRef<HTMLDivElement>(null);
  const headingState = useRevealOnScroll(headingRef);

  // Per-row scroll progress — each row writes its own --scroll-progress,
  // so motion is tied to the row's viewport window (short & fast) rather
  // than the full section height (long & sluggish).
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  useScrollProgress(row1Ref);
  useScrollProgress(row2Ref);

  const loreRef = useRef<HTMLDivElement>(null);
  const revealed = useTypewriter(loreRef, TOTAL_CHARS, {
    charsPerTick: 2,
    tickMs: 15
  });

  // The line currently being typed (or the last line once fully typed).
  let activeLine = LINE_OFFSETS.length - 1;
  for (let i = 0; i < LINE_OFFSETS.length; i++) {
    if (LINE_OFFSETS[i].end > revealed) {
      activeLine = i;
      break;
    }
  }

  const renderTypedLine = (segments: Seg[], lineIndex: number) => {
    const { start } = LINE_OFFSETS[lineIndex];
    let segCursor = start;
    const fullText = segments.map((s) => s.text).join("");
    const parts: Array<{ key: number; text: string; className?: string }> = [];
    segments.forEach((seg, i) => {
      const segStart = segCursor;
      const segEnd = segStart + seg.text.length;
      segCursor = segEnd;
      let visible = "";
      if (revealed >= segEnd) visible = seg.text;
      else if (revealed > segStart)
        visible = seg.text.slice(0, revealed - segStart);
      if (visible) parts.push({ key: i, text: visible, className: seg.className });
    });
    const showCursor = lineIndex === activeLine;
    return (
      <>
        {/* Ghost reserves the line's layout so the section doesn't jump as text types in */}
        <span aria-hidden className="invisible">
          {fullText}
        </span>
        <span className="absolute inset-0" aria-hidden>
          {parts.map((p) => (
            <span key={p.key} className={p.className}>
              {p.text}
            </span>
          ))}
          {showCursor && (
            <span className="cursor-blink inline-block w-[0.5em] h-[0.85em] ml-0.5 align-[-0.08em] bg-glow-soft" />
          )}
        </span>
      </>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-blue text-bone py-16 md:py-24 overflow-hidden"
    >
      {/* Floating corner stamps — mew-style decoration */}
      <div className="absolute top-6 left-4 md:left-8 z-20 pointer-events-none">
        <span className="tape tape-mint">FIELD REPORT · 001</span>
      </div>
      <div className="absolute top-6 right-4 md:right-8 z-20 pointer-events-none">
        <span className="tape tape-blood">CLASSIFIED</span>
      </div>

      {/* Big heading */}
      <div
        ref={headingRef}
        data-reveal
        data-reveal-state={headingState}
        className="px-4 md:px-8 mb-12 md:mb-16 text-center"
      >
        <p className="font-black text-bone/70 text-xs md:text-sm tracking-[0.4em] mb-6">
          ⟡ DISPATCH FROM THE FRONT ⟡
        </p>
        <h2
          className="font-black text-ink leading-[0.85] tracking-tight"
          style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
        >
          THE RESISTANCE
          <br />
          <span className="relative inline-block">
            <span>IS BUILDING.</span>
            <span
              className="absolute inset-0 flex items-center justify-center spray-tag"
              style={{
                transform: "rotate(-4deg)",
                color: "#2EE862",
                fontSize: "inherit"
              }}
            >
              CHIKUN
            </span>
          </span>
        </h2>
      </div>

      {/* Row 1 — tilted -1° as a unit: film-strip top + scroll-linked flex + film-strip bottom */}
      <div ref={row1Ref} className="overflow-hidden py-10 md:py-12">
        <div
          className="relative w-full"
          style={{ transform: "rotate(-1deg)", transformOrigin: "50% 50%" }}
        >
          <div className="film-strip mb-3" />
          <div
            className="flex gap-4 w-max will-change-transform"
            style={{
              transform:
                "translate3d(calc(var(--scroll-progress, 0) * -25%), 0, 0)"
            }}
          >
            {[
              ...STRONGHOLD_IMAGES_ROW1,
              ...STRONGHOLD_IMAGES_ROW1,
              ...STRONGHOLD_IMAGES_ROW1,
              ...STRONGHOLD_IMAGES_ROW1
            ].map((src, i) => (
              <div
                key={`row1-${i}`}
                className={`relative w-[260px] md:w-[360px] aspect-square shrink-0 sticker hover-wiggle ${
                  i % 2 === 0 ? "" : "sticker-alt"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover bg-ink"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = PLACEHOLDER(
                      `stronghold-r1-${i}`
                    );
                  }}
                />
              </div>
            ))}
          </div>
          <div className="film-strip mt-3" />
        </div>
      </div>

      {/* Lore block — terminal-style dispatch, types in on scroll */}
      <div
        ref={loreRef}
        className="relative px-4 md:px-8 py-20 md:py-28 max-w-5xl mx-auto text-left"
      >
        {/* Session header */}
        <p className="font-mono text-xs md:text-sm tracking-[0.15em] text-bone/60 mb-6 md:mb-8">
          <span className="text-glow">$</span>chikun/trollbox/chant.log
        </p>

        {LORE_BODY.map((line, i) => (
          <p
            key={i}
            className={`relative prose-normal font-mono text-bone text-lg md:text-xl lg:text-2xl leading-[1.7] ${
              i === 0 ? "" : "mt-6 md:mt-8"
            }`}
          >
            {renderTypedLine(line, i)}
          </p>
        ))}

        <p
          className="relative font-mono font-black text-glow-soft text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight mt-10 md:mt-14"
          style={{
            textShadow:
              "0 0 18px rgba(46,232,98,0.55), 0 0 4px rgba(92,255,133,0.85)"
          }}
        >
          {renderTypedLine(LORE_FINALE, LORE_LINES.length - 1)}
        </p>
      </div>

      {/* Row 2 — straddles the Strongholds→NewEra boundary. Raised z-index so it paints over
          NewEra's bone background which overlaps this area via negative margin. */}
      <div
        ref={row2Ref}
        className="relative z-20 overflow-hidden py-10 md:py-12"
      >
        <div
          className="relative w-full"
          style={{ transform: "rotate(1deg)", transformOrigin: "50% 50%" }}
        >
          <div className="film-strip mb-3" />
          <div
            className="flex gap-4 w-max will-change-transform"
            style={{
              transform:
                "translate3d(calc(var(--scroll-progress, 0) * -25%), 0, 0)"
            }}
          >
            {[
              ...STRONGHOLD_IMAGES_ROW2,
              ...STRONGHOLD_IMAGES_ROW2,
              ...STRONGHOLD_IMAGES_ROW2,
              ...STRONGHOLD_IMAGES_ROW2
            ].map((src, i) => (
              <div
                key={`row2-${i}`}
                className={`relative w-[260px] md:w-[360px] aspect-square shrink-0 sticker hover-wiggle ${
                  i % 2 === 0 ? "sticker-alt" : ""
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover bg-ink"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = PLACEHOLDER(
                      `stronghold-r2-${i}`
                    );
                  }}
                />
              </div>
            ))}
          </div>
          <div className="film-strip mt-3" />
        </div>
      </div>
    </section>
  );
}
