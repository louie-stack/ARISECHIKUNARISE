"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import clsx from "clsx";
import Marquee from "@/components/sections/Marquee";

type MemeType = "all" | "static" | "gif";

type Meme = {
  src: string;
  title: string;
  type: "static" | "gif";
};

const MEMES: Meme[] = [
  { src: "/art/memes/meme-01.png", title: "ARISE-01", type: "static" },
  { src: "/art/memes/meme-02.png", title: "THE TOWER", type: "static" },
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
    <>
      <div className="pt-20">
        <Marquee
          variant="glow"
          items={["MEME WITH US", "SPREAD THE SIGNAL", "#ARISECHIKUN"]}
        />
      </div>

      {/* Hero */}
      <section className="bg-blue text-bone py-20 md:py-28 px-4 md:px-8 text-center">
        <h1
          className="font-black leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(3rem, 12vw, 10rem)" }}
        >
          Spread the{" "}
          <span className="relative inline-block">
            <span>signal</span>
            <span
              className="absolute inset-0 flex items-center justify-center spray-tag"
              style={{
                transform: "rotate(-3deg)",
                color: "#2EE862",
                fontSize: "inherit"
              }}
            >
              CHANT
            </span>
          </span>
        </h1>
        <p className="prose-normal mt-8 max-w-2xl mx-auto text-lg md:text-xl">
          Every meme is a stone in the wall. Every share is a voice in the
          chant. Download, remix, post.
        </p>
      </section>

      {/* Filters + Grid */}
      <section className="bg-bone text-ink py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-10 justify-center">
            {(["all", "static", "gif"] as MemeType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={clsx(
                  "btn-pill",
                  filter === f && "!bg-glow"
                )}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((meme, i) => (
              <article
                key={meme.src}
                className={`group relative sticker ${
                  i % 2 === 0 ? "" : "sticker-alt"
                }`}
              >
                <div className="relative aspect-square bg-ink overflow-hidden">
                  <img
                    src={meme.src}
                    alt={meme.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-ink/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a
                      href={meme.src}
                      download
                      className="btn-pill btn-pill-glow"
                    >
                      <Download size={16} strokeWidth={3} /> Download
                    </a>
                  </div>

                  {/* Type badge */}
                  <span className="absolute top-2 right-2 font-black text-[10px] tracking-[0.2em] px-2 py-1 bg-glow text-ink border-2 border-ink rounded-full">
                    {meme.type.toUpperCase()}
                  </span>
                </div>
                <div className="p-3 bg-bone border-t-2 border-ink">
                  <p className="font-black text-sm tracking-tight text-ink text-center">
                    {meme.title}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-20 text-center prose-normal text-lg">
            Free to download. Free to remix. Tag{" "}
            <span className="font-black">#arisechikun</span>.
          </p>
        </div>
      </section>
    </>
  );
}
