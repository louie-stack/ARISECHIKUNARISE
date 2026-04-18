"use client";

import Link from "next/link";

const TALES_IMAGES = [
  "/art/scenes/tale-01.png",
  "/art/scenes/tale-02.png",
  "/art/scenes/tale-03.png",
  "/art/scenes/tale-04.png"
];

export default function ChikunTales() {
  return (
    <section className="bg-bone text-ink py-24 md:py-36 overflow-hidden">
      <div className="px-4 md:px-8 max-w-6xl mx-auto text-center">
        {/* Big title with spray overlay */}
        <h2
          className="font-black leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(3rem, 12vw, 11rem)" }}
        >
          CHIKUN{" "}
          <span className="relative inline-block">
            <span className="text-ink">TALES</span>
            <span
              className="absolute inset-0 flex items-center justify-center spray-tag"
              style={{
                transform: "rotate(-4deg)",
                color: "#C41E3A",
                fontSize: "inherit"
              }}
            >
              TAILS
            </span>
          </span>
        </h2>

        <p className="prose-normal mt-8 max-w-3xl mx-auto text-xl md:text-2xl font-medium leading-snug">
          Nothing&apos;s perfect… the world&apos;s not perfect… but it&apos;s
          there for us, trying the best it can… that&apos;s what makes it so
          beautiful…
        </p>

        <Link href="/about" className="btn-pill mt-10 inline-flex">
          Check out more Chikun Tales →
        </Link>
      </div>

      {/* Tilted tales gallery */}
      <div className="mt-16 md:mt-24 relative">
        <div className="transform -rotate-2 bg-ink border-y-4 border-ink py-8">
          <div className="flex gap-4 md:gap-6 animate-scroll-x w-max px-4">
            {[...TALES_IMAGES, ...TALES_IMAGES, ...TALES_IMAGES].map(
              (src, i) => (
                <div
                  key={i}
                  className="relative w-[280px] md:w-[400px] aspect-[4/3] shrink-0 border-4 border-bone overflow-hidden"
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
