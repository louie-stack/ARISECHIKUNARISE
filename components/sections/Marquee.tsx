"use client";

type MarqueeProps = {
  variant?: "mint" | "blue" | "glow" | "bone" | "blood" | "ink";
  items?: string[];
  speed?: "slow" | "normal" | "fast";
  size?: "sm" | "md" | "lg";
  showSeparators?: boolean;
};

const DEFAULT_ITEMS = [
  "ARISE CHIKUN ARISE",
  "GENESIS 10/07/2011",
  "THE CHANT RETURNS",
  "SCRYPTED IN SILVER",
  "THEY CALLED IT CHICKEN FEED",
  "鶏鳴",
  "BLOCK 0 REMEMBERS"
];

// Rotating separator glyphs for visual variety — mew cycles between stars, dots, icons
const SEPARATORS = ["✦", "Ł", "⚡", "鶏", "✺"];

export default function Marquee({
  variant = "mint",
  items = DEFAULT_ITEMS,
  speed = "normal",
  size = "md",
  showSeparators = true
}: MarqueeProps) {
  const bgClass = {
    mint: "bg-mint text-ink border-ink",
    blue: "bg-blue text-bone border-ink",
    glow: "bg-glow text-ink border-ink",
    bone: "bg-bone text-ink border-ink",
    blood: "bg-blood text-bone border-ink",
    ink: "bg-ink text-bone border-glow"
  }[variant];

  const animClass = {
    slow: "animate-marquee-slow",
    normal: "animate-marquee",
    fast: "animate-marquee-fast"
  }[speed];

  const sizeClass = {
    sm: "text-lg md:text-xl py-2 md:py-2.5",
    md: "text-xl md:text-3xl py-3 md:py-4",
    lg: "text-3xl md:text-5xl py-4 md:py-6"
  }[size];

  const sepOpacity =
    variant === "blue" || variant === "ink" || variant === "blood"
      ? "opacity-60"
      : "opacity-40";

  // Duplicate for seamless loop
  const loop = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`${bgClass} border-y-4 overflow-hidden relative z-10 ${sizeClass.includes("py-") ? "" : "py-3"}`}
    >
      <div className={`flex ${animClass} whitespace-nowrap pause-on-hover`}>
        {loop.map((item, i) => {
          const sep = SEPARATORS[i % SEPARATORS.length];
          return (
            <span
              key={i}
              className={`font-black ${sizeClass} tracking-tight px-5 md:px-6 flex items-center gap-5 md:gap-6 shrink-0`}
            >
              {item}
              {showSeparators && <span className={sepOpacity}>{sep}</span>}
            </span>
          );
        })}
      </div>
    </div>
  );
}
