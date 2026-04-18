"use client";

import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useRef } from "react";

type MediaItem = {
  type: "BLOG" | "SHORTS" | "COLLAB" | "NEWS";
  date: string;
  title: string;
  image: string;
  hasPlay?: boolean;
};

const MEDIA: MediaItem[] = [
  {
    type: "BLOG",
    date: "COMING SOON",
    title: "The Return of Chikun: How a 13-Year-Old Meme Got Reborn",
    image: "/art/scenes/media-01.png"
  },
  {
    type: "SHORTS",
    date: "COMING SOON",
    title: "ARISE — Trailer 01",
    image: "/art/scenes/media-02.png",
    hasPlay: true
  },
  {
    type: "COLLAB",
    date: "COMING SOON",
    title: "Chikun x LitVM",
    image: "/art/scenes/media-03.png"
  },
  {
    type: "SHORTS",
    date: "COMING SOON",
    title: "The Tower Watches",
    image: "/art/scenes/media-04.png",
    hasPlay: true
  },
  {
    type: "NEWS",
    date: "COMING SOON",
    title: "Community Voices: Why We Still Chant",
    image: "/art/scenes/media-05.png"
  }
];

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
    <section className="bg-ink text-bone py-20 md:py-28 overflow-hidden relative">
      {/* Scrolling "MEDIA" band */}
      <div className="overflow-hidden border-y-4 border-blood mb-12">
        <div className="flex animate-marquee whitespace-nowrap py-3">
          {Array(8)
            .fill(null)
            .map((_, i) => (
              <span
                key={i}
                className="font-black text-5xl md:text-7xl tracking-tight px-6 flex items-center gap-6 shrink-0"
              >
                MEDIA{" "}
                <span className="spray-tag text-4xl md:text-6xl">M</span>
              </span>
            ))}
        </div>
      </div>

      {/* Scrollable media cards */}
      <div className="relative px-4 md:px-8">
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {MEDIA.map((item, i) => (
            <article
              key={i}
              className="group relative shrink-0 w-[280px] md:w-[360px] snap-start"
            >
              <div className="relative aspect-[5/4] bg-ink-soft border-2 border-bone/20 overflow-hidden rounded-md">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
                {item.hasPlay && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-glow border-2 border-ink flex items-center justify-center shadow-[4px_4px_0_#0A0A0F]">
                      <Play
                        size={24}
                        fill="#0A0A0F"
                        stroke="#0A0A0F"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-blood text-bone font-black text-xs tracking-wider rounded-full border-2 border-bone/20">
                  <span className="w-5 h-5 rounded-full bg-bone text-blood flex items-center justify-center text-[10px] font-black">
                    C
                  </span>
                  {item.type}
                </span>
                <p className="mt-3 font-black text-xs tracking-[0.2em] text-bone/60">
                  {item.date}
                </p>
                <h3 className="mt-2 font-black text-lg leading-tight tracking-tight">
                  {item.title}
                </h3>
              </div>
            </article>
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="mt-8 flex justify-center gap-6 items-center">
          <button
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full bg-glow border-2 border-bone flex items-center justify-center shadow-[4px_4px_0_#F5F3EF] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          >
            <ChevronLeft size={24} strokeWidth={3} className="text-ink" />
          </button>

          <div className="h-[2px] w-24 bg-blood" />

          <button
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full bg-glow border-2 border-bone flex items-center justify-center shadow-[4px_4px_0_#F5F3EF] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          >
            <ChevronRight size={24} strokeWidth={3} className="text-ink" />
          </button>
        </div>
      </div>
    </section>
  );
}
