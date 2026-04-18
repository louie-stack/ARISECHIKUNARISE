"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import clsx from "clsx";

type MemeType = "all" | "static" | "gif";

type Meme = {
  src: string;
  title: string;
  type: "static" | "gif";
};

// Replace with your actual files dropped into /public/art/memes/
const MEMES: Meme[] = [
  { src: "/art/memes/meme-01.png", title: "ARISE-01", type: "static" },
  { src: "/art/memes/meme-02.png", title: "THE TOWER WATCHES", type: "static" },
  { src: "/art/memes/meme-03.gif", title: "RAIN LOOP", type: "gif" },
  { src: "/art/memes/meme-04.png", title: "GREEN EYES", type: "static" },
  { src: "/art/memes/meme-05.gif", title: "THE CHANT", type: "gif" },
  { src: "/art/memes/meme-06.png", title: "LITVM CITY", type: "static" },
  { src: "/art/memes/meme-07.png", title: "THE ALLEY", type: "static" },
  { src: "/art/memes/meme-08.gif", title: "COAT FLARE", type: "gif" },
  { src: "/art/memes/meme-09.png", title: "FORGOTTEN", type: "static" },
  { src: "/art/memes/meme-10.png", title: "Ł SIGNAL", type: "static" },
  { src: "/art/memes/meme-11.gif", title: "FLICKER", type: "gif" },
  { src: "/art/memes/meme-12.png", title: "DAWN", type: "static" }
];

export default function MemesPage() {
  const [filter, setFilter] = useState<MemeType>("all");

  const filtered = MEMES.filter(
    (m) => filter === "all" || m.type === filter
  );

  return (
    <div className="pt-32 pb-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-xs tracking-[0.4em] text-glow-500 mb-6">
            ━━ MEME WITH US ━━
          </p>
          <h1 className="font-display text-5xl md:text-8xl font-black leading-[0.9] text-bone-100 mb-8">
            Spread
            <br />
            <span className="italic text-bone-100/40 font-normal">
              the
            </span>{" "}
            <span className="glow-text text-glow-400">signal.</span>
          </h1>
          <p className="text-bone-100/70 text-lg max-w-2xl leading-relaxed">
            Every meme is a stone in the wall. Every share is a voice in the
            chant. Download, remix, post. The signal travels on your shoulders.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-10 border-b border-ink-600 pb-6">
          {(["all", "static", "gif"] as MemeType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={clsx(
                "font-mono text-xs tracking-[0.3em] px-5 py-2.5 border transition-all",
                filter === f
                  ? "border-glow-500 text-glow-500 bg-glow-500/10"
                  : "border-ink-600 text-bone-100/50 hover:border-bone-100/40 hover:text-bone-100"
              )}
            >
              {f.toUpperCase()}
            </button>
          ))}
          <span className="ml-auto font-mono text-xs tracking-[0.3em] text-bone-100/40 self-center">
            {filtered.length} FILES
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((meme, i) => (
            <motion.article
              key={meme.src}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (i % 8) * 0.05 }}
              className="group relative bg-ink-800 border border-ink-600 hover:border-glow-500/50 transition-all overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={meme.src}
                  alt={meme.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-ink-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a
                    href={meme.src}
                    download
                    className="spray-btn"
                    aria-label={`Download ${meme.title}`}
                  >
                    <Download size={16} />
                    DOWNLOAD
                  </a>
                </div>

                {/* Type badge */}
                <span
                  className={clsx(
                    "absolute top-3 right-3 font-mono text-[10px] tracking-[0.2em] px-2 py-1 border",
                    meme.type === "gif"
                      ? "border-glow-500 text-glow-500 bg-ink-900/70"
                      : "border-bone-100/30 text-bone-100/60 bg-ink-900/70"
                  )}
                >
                  {meme.type.toUpperCase()}
                </span>
              </div>

              <div className="p-4 border-t border-ink-600">
                <p className="font-graffiti text-sm tracking-wider text-bone-100">
                  {meme.title}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-24 text-center max-w-2xl mx-auto">
          <p className="font-mono text-xs tracking-[0.3em] text-glow-500 mb-4">
            ━━ THE SIGNAL IS OPEN ━━
          </p>
          <p className="text-bone-100/60 text-sm leading-relaxed">
            Free to download, free to remix. Tag{" "}
            <span className="text-glow-400">#arisechikun</span> and the old
            heads will find you.
          </p>
        </div>
      </div>
    </div>
  );
}
