"use client";

export default function MerchTeaser() {
  return (
    <section className="bg-ink py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-blue border-4 border-ink rounded-3xl p-8 md:p-12 overflow-hidden">
          {/* Comb edge top */}
          <div
            className="absolute inset-x-0 top-0 h-8"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 30' preserveAspectRatio='none'%3E%3Cpath d='M0 0 L10 30 L20 0 L30 30 L40 0 L50 30 L60 0 L70 30 L80 0 L90 30 L100 0 Z' fill='%230A0A0F'/%3E%3C/svg%3E\")",
              backgroundRepeat: "repeat-x",
              backgroundSize: "60px 30px"
            }}
          />

          <div className="relative grid md:grid-cols-2 gap-8 items-center pt-8">
            <div>
              <h2
                className="font-black text-bone leading-[0.95] tracking-tight"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                The battle
                <br />
                has just begun.
              </h2>
              <button className="btn-pill mt-6" disabled>
                Coming Soon
              </button>

              <p
                className="mt-10 font-spray text-bone text-6xl md:text-8xl"
                style={{ transform: "rotate(-2deg)", display: "inline-block" }}
              >
                CHIKWEAR
              </p>
            </div>

            <div className="relative aspect-square border-4 border-ink rounded-2xl overflow-hidden bg-ink">
              <img
                src="/art/scenes/merch-preview.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
