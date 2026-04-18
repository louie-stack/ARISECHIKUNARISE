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
          Who is{" "}
          <span className="relative inline-block">
            <span>Chikun</span>
            <span
              className="absolute inset-0 flex items-center justify-center spray-tag"
              style={{
                transform: "rotate(-4deg)",
                color: "#2EE862",
                fontSize: "inherit"
              }}
            >
              BAWK
            </span>
          </span>
          ?
        </h1>
      </section>

      {/* Lore blocks */}
      <section className="bg-bone text-ink py-20 md:py-28 px-4 md:px-8">
        <div className="max-w-4xl mx-auto prose-normal text-lg md:text-xl leading-relaxed space-y-8">
          <p>
            Chikun was the first Litecoin meme. <strong>&ldquo;Arise Chikun, Arise!&rdquo;</strong>{" "}
            was chanted in the trollboxes of the old exchanges — the warehouses
            of early crypto — as the price climbed and the holders gathered.
            For thirteen years, the chant has echoed.
          </p>
          <p>
            Then the lights dimmed. The creator moved on. The shirts came down
            off the racks. Chikun became a footnote in a meme archive, a dusty
            reference for old heads. He was forgotten. But the chant never
            stopped.
          </p>
          <p className="font-black text-2xl md:text-3xl">
            The chant was never a cheer. It was a summons.
          </p>
          <p>
            This project is the story of Chikun&apos;s return. A dark-anime
            reimagining of the original mascot, set in LitVM City — a cyberpunk
            metropolis built on the Litecoin Layer 2. He walks the alleys. He
            watches the tower. He remembers every voice that called his name.
          </p>
          <p>
            This is narrative. This is art. This is a mythology built on top of
            real community memory. Everyone who ever typed{" "}
            <em>&ldquo;arise chikun arise&rdquo;</em> into a trollbox is, in a
            small way, the reason he&apos;s back.
          </p>
        </div>
      </section>

      {/* Chapter cards */}
      <section className="bg-ink text-bone py-20 md:py-28 px-4 md:px-8">
        <h2
          className="font-black text-center leading-[0.9] tracking-tight mb-16"
          style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
        >
          Three chapters
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              num: "01",
              title: "The Abandonment",
              body: "How the face of Litecoin became a footnote. The warehouse, the workbench, the door that closed."
            },
            {
              num: "02",
              title: "The Summons",
              body: "Thirteen years of trollbox voices compounding into a signal. Chikun wakes in the rain of LitVM City."
            },
            {
              num: "03",
              title: "The Climb",
              body: "The tower rises. The creator sits at the top. Every floor is a fight. Every fight is a memory."
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
