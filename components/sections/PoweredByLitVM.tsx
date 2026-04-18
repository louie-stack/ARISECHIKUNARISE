"use client";

export default function PoweredByLitVM() {
  const items = Array(6).fill("POWERED BY LITVM");

  return (
    <div className="bg-ink border-y-4 border-blue py-6 md:py-8 overflow-hidden">
      <div className="flex animate-marquee-slow whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-black text-bone text-3xl md:text-5xl tracking-tight px-8 flex items-center gap-6 shrink-0"
          >
            {item}
            <span className="inline-block w-10 h-10 md:w-14 md:h-14 rounded-full bg-glow border-2 border-bone flex items-center justify-center">
              <span className="font-spray text-ink text-2xl md:text-3xl leading-none">
                Ł
              </span>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
