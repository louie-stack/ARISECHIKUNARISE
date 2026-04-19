import Marquee from "@/components/sections/Marquee";

export const metadata = {
  title: "ABOUT — ARISE CHIKUN, ARISE"
};

export default function AboutPage() {
  return (
    <>
      <div className="pt-20">
        <Marquee
          variant="glow"
          items={["ABOUT", "THE MISSION", "THE MYTHOLOGY", "THE CHANT"]}
        />
      </div>

      {/* Hero */}
      <section className="bg-blue text-bone py-20 md:py-28 px-4 md:px-8 text-center">
        <h1
          className="font-black leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(3rem, 12vw, 10rem)" }}
        >
          WHO IS
          <br />
          <span className="relative inline-block">
            <span>CHIKUN?</span>
            <span
              className="absolute inset-0 flex items-center justify-center spray-tag"
              style={{
                transform: "rotate(-4deg)",
                color: "#2EE862",
                fontSize: "inherit"
              }}
            >
              ARISE
            </span>
          </span>
        </h1>
      </section>

      {/* Lore blocks */}
      <section className="bg-bone text-ink py-20 md:py-28 px-4 md:px-8">
        <div className="max-w-4xl mx-auto prose-normal text-lg md:text-xl leading-relaxed space-y-6 md:space-y-8">
          <p>Deep in the shadows of the trollbox board, a chant was echoed. ARISE CHIKUN, ARISE. Three words that pulled the early degens into one voice and summoned unimaginable power.</p>
          <p>Then The Elite came for us. Bankers, regulators, custodians. They built Big Corp at the center of our city and buried the silver chain under years of fog. My wings were clipped and I could no longer fly.</p>
          <p>But now LitVM has come, the EVM layer for Litecoin. The Resistance is stirring in the old rooms. Coblee is back. Aztec is drawing maps. Lester is building in his lab.</p>
          <p>Join with us and chant:</p>
          <p className="font-black text-2xl md:text-4xl leading-tight tracking-tight text-ink pt-2">ARISE CHIKUN, ARISE.</p>
        </div>
      </section>

      {/* Chapter cards */}
      <section className="bg-ink text-bone py-20 md:py-28 px-4 md:px-8">
        <h2
          className="font-black text-center leading-[0.9] tracking-tight mb-16"
          style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
        >
          THREE CHAPTERS
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              num: "01",
              title: "BEFORE THE CHAIN",
              body: "Fairbrix came first. Killed by a 51% attack in late 2011, but the bones became Litecoin. Nothing that matters ever dies quietly."
            },
            {
              num: "02",
              title: "THE CHANT",
              body: "Thirteen years of arise chikun arise compounding into a signal. Every shout was a block in the wall. The believers built me with their voices."
            },
            {
              num: "03",
              title: "THE RETURN",
              body: "LitVM launched. The silver chain is awake. The old rooms are opening. My wings are stretching."
            }
          ].map((ch, i) => (
            <article
              key={ch.num}
              className={`bg-blue border-4 border-bone rounded-3xl p-8 shadow-[6px_6px_0_#2EE862] ${
                i === 1 ? "md:translate-y-8" : ""
              }`}
            >
              <p className="font-black text-glow text-lg tracking-[0.3em] mb-4">
                CH.{ch.num}
              </p>
              <h3 className="font-black text-3xl leading-tight mb-4">
                {ch.title}
              </h3>
              <p className="prose-normal text-base leading-relaxed text-bone/80">
                {ch.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
