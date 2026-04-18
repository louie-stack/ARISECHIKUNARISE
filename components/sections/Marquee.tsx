"use client";

export default function Marquee() {
  const phrases = [
    "ARISE CHIKUN ARISE",
    "鶏鳴",
    "THE FORGOTTEN RETURN",
    "LITVM CITY",
    "ARISE CHIKUN ARISE",
    "鶏鳴",
    "THE DOG DAYS ARE DONE",
    "POWERED BY LITVM"
  ];

  return (
    <div className="marquee-tape border-y-2 border-ink-900">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...phrases, ...phrases].map((phrase, i) => (
          <span
            key={i}
            className="font-graffiti text-xl md:text-2xl tracking-wider px-8 flex items-center gap-8"
          >
            {phrase}
            <span className="text-ink-900/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
