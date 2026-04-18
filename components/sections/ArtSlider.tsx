"use client";

import clsx from "clsx";

type Slide = {
  src: string;
  caption?: string;
};

interface ArtSliderProps {
  slides: Slide[];
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
}

export default function ArtSlider({
  slides,
  direction = "left",
  speed = "normal"
}: ArtSliderProps) {
  const speedClass = {
    slow: "animate-[scroll-x_80s_linear_infinite]",
    normal: "animate-[scroll-x_60s_linear_infinite]",
    fast: "animate-[scroll-x_40s_linear_infinite]"
  }[speed];

  const directionClass =
    direction === "right"
      ? "animate-[scroll-x-reverse_60s_linear_infinite]"
      : speedClass;

  // Duplicate slides for seamless loop
  const loop = [...slides, ...slides];

  return (
    <div className="relative py-4 overflow-hidden bg-ink-950">
      {/* Film strip top border */}
      <div className="film-strip mb-4" aria-hidden />

      <div className="relative">
        <div className={clsx("flex gap-4 w-max", directionClass)}>
          {loop.map((slide, i) => (
            <figure
              key={i}
              className="relative w-[280px] sm:w-[340px] md:w-[420px] aspect-square shrink-0 group"
            >
              <div className="relative w-full h-full overflow-hidden bg-ink-800 border border-ink-600">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.src}
                  alt={slide.caption || ""}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {slide.caption && (
                  <figcaption className="absolute bottom-4 left-4 right-4 font-mono text-xs tracking-[0.25em] text-bone-100 opacity-0 group-hover:opacity-100 transition-opacity">
                    {slide.caption}
                  </figcaption>
                )}
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* Film strip bottom border */}
      <div className="film-strip mt-4" aria-hidden />
    </div>
  );
}
