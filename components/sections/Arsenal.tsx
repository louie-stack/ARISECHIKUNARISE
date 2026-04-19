"use client";

import { useRef, useState } from "react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

type ArsenalType = "meme" | "gif" | "sticker" | "pfp";

type ArsenalItem = {
  id: string;
  title: string;
  src: string;
  type: ArsenalType;
  format: string;
};

// Seeded from existing site assets. Swap paths / add entries as new arsenal art lands.
const ITEMS: ArsenalItem[] = [
  { id: "1", src: "/art/scenes/chikun-01.webp", type: "meme", format: "MEME", title: "Arise store" },
  { id: "2", src: "/art/scenes/chikun-02.webp", type: "meme", format: "MEME", title: "Alley fight" },
  { id: "3", src: "/art/scenes/chikun-07.webp", type: "meme", format: "MEME", title: "Kick fight" },
  { id: "4", src: "/art/scenes/chikun-03.webp", type: "meme", format: "MEME", title: "Rooftop tower" },
  { id: "5", src: "/art/scenes/chikun-08.webp", type: "meme", format: "MEME", title: "Trollbox CRT" },
  { id: "6", src: "/art/scenes/chikun-04.webp", type: "sticker", format: "STICKER", title: "CHIKUN wordmark" },
  { id: "7", src: "/art/scenes/chikun-05.webp", type: "sticker", format: "STICKER", title: "Chikun portrait" },
  { id: "8", src: "/art/resistance/coblee.webp", type: "pfp", format: "PFP", title: "Coblee PFP" },
  { id: "9", src: "/art/resistance/aztec.webp", type: "pfp", format: "PFP", title: "Aztec PFP" },
  { id: "10", src: "/art/resistance/lester.webp", type: "pfp", format: "PFP", title: "Lester PFP" }
];

const FILTERS = [
  { key: "all", label: "ALL" },
  { key: "meme", label: "MEMES" },
  { key: "gif", label: "GIFS" },
  { key: "sticker", label: "STICKERS" },
  { key: "pfp", label: "PFPS" }
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

export default function Arsenal() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingState = useRevealOnScroll(headingRef);

  const gridRef = useRef<HTMLDivElement>(null);
  const gridState = useRevealOnScroll(gridRef);

  const [filter, setFilter] = useState<FilterKey>("all");

  const tiles =
    filter === "all" ? ITEMS : ITEMS.filter((i) => i.type === filter);

  return (
    <section className="relative bg-ink text-bone pt-16 md:pt-24 pb-20 md:pb-28 px-4 md:px-8 overflow-hidden">
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
            THE ARSENAL
          </span>
        </div>

        <h2
          className="font-black leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
        >
          PICK UP
          <br />
          YOUR WEAPONS.
        </h2>

        <p className="prose-normal mt-6 text-lg md:text-xl max-w-3xl mx-auto text-bone/80">
          Memes, gifs, stickers, profile pics. Take what you need. Spread the chant.
        </p>
      </div>

      {/* Filter pills */}
      <div
        role="tablist"
        aria-label="Filter arsenal by type"
        className="mt-10 md:mt-12 flex flex-wrap justify-center gap-2 md:gap-3"
      >
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f.key)}
              className={`px-4 md:px-5 py-2 rounded-full border-2 font-black text-xs md:text-sm tracking-[0.15em] transition-all ${
                active
                  ? "bg-glow text-ink border-glow shadow-[3px_3px_0_#0A0A0F]"
                  : "bg-transparent text-glow border-glow/40 hover:border-glow hover:bg-glow/10"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Tile grid — stagger-reveal as it scrolls into view */}
      <div
        ref={gridRef}
        data-reveal-state={gridState}
        className="reveal-stagger mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 max-w-6xl mx-auto"
      >
        {tiles.map((item) => (
          <article
            key={item.id}
            className="relative aspect-square group rounded-md overflow-hidden border-2 border-bone/10 bg-gradient-to-br from-ink to-ink-soft transition-colors hover:border-glow"
          >
            {/* Dark-gradient placeholder. Visible while the image is missing; covered
                by the real image as soon as one loads. */}
            <div
              aria-hidden
              className="absolute inset-0 flex items-center justify-center text-bone/20 font-black tracking-[0.3em] text-[0.65rem] md:text-xs select-none"
            >
              {item.format}
            </div>

            {/* Real tile image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />

            {/* Format badge (top-right) */}
            <span className="absolute top-2 right-2 z-10 bg-mint text-ink font-black tracking-[0.15em] text-[0.55rem] md:text-[0.6rem] px-2 py-0.5 rounded-full border border-ink shadow-[2px_2px_0_#0A0A0F]">
              {item.format}
            </span>

            {/* Download overlay — whole area is a download link on hover/focus */}
            <a
              href={item.src}
              download
              aria-label={`Download ${item.title}`}
              className="absolute inset-0 z-20 flex items-center justify-center bg-ink/75 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
            >
              <span className="inline-flex items-center gap-1.5 bg-glow text-ink font-black text-xs md:text-sm tracking-[0.1em] px-4 py-2 rounded-full border-2 border-ink shadow-[3px_3px_0_#0A0A0F]">
                DOWNLOAD ↓
              </span>
            </a>
          </article>
        ))}
      </div>

      {/* Empty-state message (when a filter yields nothing — future-proofing) */}
      {tiles.length === 0 && (
        <p className="prose-normal mt-10 text-center text-bone/50 text-base">
          No {filter === "all" ? "arsenal" : filter + "s"} yet. Check back soon.
        </p>
      )}

      {/* Submit CTA */}
      <div className="mt-12 md:mt-16 flex justify-center">
        <a href="#" className="btn-pill btn-pill-glow">
          SUBMIT YOUR OWN →
        </a>
      </div>
    </section>
  );
}
