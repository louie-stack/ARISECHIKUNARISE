"use client";

type MarqueeProps = {
  variant?: "mint" | "blue" | "glow" | "bone";
  items?: string[];
};

const DEFAULT_ITEMS = [
  "ARISE CHIKUN ARISE",
  "THE FORGOTTEN RETURN",
  "LITVM CITY",
  "THE CHANT BECAME A SUMMONS",
  "鶏鳴"
];

export default function Marquee({
  variant = "mint",
  items = DEFAULT_ITEMS
}: MarqueeProps) {
  const bgClass = {
    mint: "bg-mint text-ink",
    blue: "bg-blue text-bone",
    glow: "bg-glow text-ink",
    bone: "bg-bone text-ink"
  }[variant];

  // Duplicate for seamless loop
  const loop = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`${bgClass} border-y-4 border-ink py-3 md:py-4 overflow-hidden relative z-10`}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {loop.map((item, i) => (
          <span
            key={i}
            className="font-black text-xl md:text-3xl tracking-tight px-6 flex items-center gap-6 shrink-0"
          >
            {item}
            <span className="text-ink/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
