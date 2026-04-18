"use client";

const STRONGHOLD_IMAGES = [
  "/art/scenes/stronghold-01.png",
  "/art/scenes/stronghold-02.png",
  "/art/scenes/stronghold-03.png",
  "/art/scenes/stronghold-04.png",
  "/art/scenes/stronghold-05.png",
  "/art/scenes/stronghold-06.png"
];

export default function Strongholds() {
  return (
    <section className="bg-blue text-bone py-16 md:py-24 overflow-hidden">
      {/* Big heading */}
      <div className="px-4 md:px-8 mb-12 md:mb-16 text-center">
        <h2
          className="font-black text-ink leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
        >
          I have identified
          <br />
          the{" "}
          <span className="spray-tag" style={{ fontSize: "inherit" }}>
            strongholds
          </span>
        </h2>
      </div>

      {/* Film strip border */}
      <div className="film-strip mb-4" />

      {/* Scrolling gallery — first row */}
      <div className="overflow-hidden mb-4">
        <div className="flex gap-4 animate-scroll-x w-max">
          {[...STRONGHOLD_IMAGES, ...STRONGHOLD_IMAGES].map((src, i) => (
            <div
              key={`row1-${i}`}
              className={`relative w-[260px] md:w-[360px] aspect-square shrink-0 sticker ${
                i % 2 === 0 ? "" : "sticker-alt"
              }`}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Film strip border */}
      <div className="film-strip" />

      {/* Lore block — first person, hand-rendered feel */}
      <div className="relative px-4 md:px-8 py-20 md:py-32 max-w-4xl mx-auto text-center">
        <p className="font-black text-ink text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
          I don&apos;t really remember what my life was before this…
        </p>

        <p className="font-black text-ink text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mt-8 md:mt-12">
          The one thing I am sure of beyond my sensory perception is that I am
          here to{" "}
          <span className="relative inline-block">
            save you all
            <span
              className="absolute -inset-2 pointer-events-none"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20'%3E%3Cpath d='M2 10 Q 25 2, 50 10 T 98 10' stroke='%232EE862' stroke-width='3' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center bottom",
                backgroundSize: "100% 20px"
              }}
            />
          </span>{" "}
          from this rat race.
        </p>

        <p className="font-black text-ink text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mt-8 md:mt-12">
          The{" "}
          <span className="relative inline-block">
            <span className="opacity-40">creator</span>
            <span className="absolute inset-0 spray-tag flex items-center justify-center transform rotate-[-3deg]">
              FATHER
            </span>
          </span>
          … he ruled for too long… his henchmen… the days of this tyranny will
          soon come to an end… we will wake up and it won&apos;t be easy to
          contain it… the change is happening here and{" "}
          <span className="spray-tag">BAWK</span>.
        </p>

        {/* Spray can icon */}
        <div className="mt-12 flex justify-center">
          <svg
            viewBox="0 0 40 60"
            className="w-10 h-16"
            fill="none"
          >
            <rect
              x="10"
              y="15"
              width="20"
              height="35"
              fill="#F5F3EF"
              stroke="#0A0A0F"
              strokeWidth="2"
            />
            <rect
              x="10"
              y="22"
              width="20"
              height="4"
              fill="#C41E3A"
            />
            <rect
              x="14"
              y="8"
              width="12"
              height="8"
              fill="#0A0A0F"
            />
            <circle cx="20" cy="55" r="3" fill="#2EE862" opacity="0.6" />
          </svg>
        </div>
      </div>

      {/* Film strip border */}
      <div className="film-strip mb-4" />

      {/* Scrolling gallery — second row (reverse direction) */}
      <div className="overflow-hidden">
        <div className="flex gap-4 animate-scroll-x-reverse w-max">
          {[...STRONGHOLD_IMAGES.reverse(), ...STRONGHOLD_IMAGES].map((src, i) => (
            <div
              key={`row2-${i}`}
              className={`relative w-[260px] md:w-[360px] aspect-square shrink-0 sticker ${
                i % 2 === 0 ? "sticker-alt" : ""
              }`}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Film strip border */}
      <div className="film-strip mt-4" />
    </section>
  );
}
