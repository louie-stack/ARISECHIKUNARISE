"use client";

import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useRef } from "react";

type MediaItem = {
  type: "FIELD NOTE" | "TRAILER" | "COLLAB" | "READ";
  date: string;
  title: string;
  image: string;
  hasPlay?: boolean;
};

const MEDIA: MediaItem[] = [
  {
    type: "FIELD NOTE",
    date: "COMING SOON",
    title: "A Short History Of The Chant",
    image: "/art/scenes/trollbox-crt.webp"
  },
  {
    type: "TRAILER",
    date: "COMING SOON",
    title: "BLOCK ZERO",
    image: "/art/scenes/alley-fight.webp",
    hasPlay: true
  },
  {
    type: "COLLAB",
    date: "COMING SOON",
    title: "LitVM x Chikun: A Letter To The Silver Chain",
    image: "/art/scenes/arise-store.webp"
  },
  {
    type: "TRAILER",
    date: "COMING SOON",
    title: "The Tower Watches",
    image: "/art/scenes/rooftop-city.webp",
    hasPlay: true
  },
  {
    type: "READ",
    date: "COMING SOON",
    title: "Before There Was Litecoin, There Was Fairbrix",
    image: "/art/scenes/chikun-portrait.webp"
  }
];

const PLACEHOLDER = (seed: string) =>
  `https://picsum.photos/seed/${seed}/800/640`;

export default function Media() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth"
    });
  };

  return (
    <section className="bg-ink text-bone pt-0 pb-20 md:pb-28 overflow-hidden relative">
      {/* Scrolling "ARISE CHIKUN ARISE" band */}
      <div className="overflow-hidden border-y-4 border-blood mb-12">
        <div className="flex animate-marquee whitespace-nowrap py-3 pause-on-hover">
          {Array(8)
            .fill(null)
            .map((_, i) => (
              <span
                key={i}
                className="font-black text-5xl md:text-7xl tracking-tight px-6 flex items-center gap-6 shrink-0"
              >
                ARISE CHIKUN ARISE{" "}
                <span className="spray-tag text-4xl md:text-6xl">Ł</span>
              </span>
            ))}
        </div>
      </div>

      {/* Corner tape */}
      <div className="px-4 md:px-8 mb-6 flex items-center justify-between">
        <span className="tape tape-blood">TRANSMISSIONS FROM LITVM CITY</span>
        <span className="font-black text-bone/50 text-xs tracking-[0.3em]">
          {MEDIA.length} INCOMING
        </span>
      </div>

      {/* Scrollable media cards */}
      <div className="relative px-4 md:px-8">
        <div
          ref={scrollRef}
          className="flex gap-5 md:gap-7 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {MEDIA.map((item, i) => (
            <article
              key={i}
              className={`media-card group relative shrink-0 w-[280px] md:w-[360px] snap-start ${
                i % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]"
              }`}
            >
              <div className="relative aspect-[5/4] bg-ink-soft border-4 border-bone overflow-hidden rounded-md shadow-[6px_6px_0_#C41E3A] group-hover:shadow-[10px_10px_0_#C41E3A] transition-all">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = PLACEHOLDER(
                      `media-${i}`
                    );
                  }}
                />
                {item.hasPlay && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-glow border-2 border-ink flex items-center justify-center shadow-[4px_4px_0_#0A0A0F] group-hover:scale-110 transition-transform">
                      <Play size={24} fill="#0A0A0F" stroke="#0A0A0F" />
                    </div>
                  </div>
                )}
                {/* Corner tape */}
                <span className="absolute top-2 left-2 tape text-[0.6rem]">
                  {item.type}
                </span>
              </div>
              <div className="mt-4">
                <p className="font-black text-xs tracking-[0.25em] text-bone/60">
                  {item.date}
                </p>
                <h3 className="mt-2 font-black text-lg md:text-xl leading-tight tracking-tight group-hover:text-glow transition-colors">
                  {item.title}
                </h3>
              </div>
            </article>
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="mt-10 flex justify-center gap-6 items-center">
          <button
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full bg-glow border-2 border-bone flex items-center justify-center shadow-[4px_4px_0_#F5F3EF] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#F5F3EF] transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} strokeWidth={3} className="text-ink" />
          </button>

          <div className="h-[2px] w-24 bg-blood" />

          <button
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full bg-glow border-2 border-bone flex items-center justify-center shadow-[4px_4px_0_#F5F3EF] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#F5F3EF] transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} strokeWidth={3} className="text-ink" />
          </button>
        </div>
      </div>
    </section>
  );
}
