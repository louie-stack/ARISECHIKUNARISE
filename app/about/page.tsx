import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ABOUT — ARISE CHIKUN, ARISE",
  description: "The mission. The mythology. The chant."
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-xs tracking-[0.4em] text-glow-500 mb-6">
          ━━ ABOUT / THE MISSION ━━
        </p>

        <h1 className="font-display text-5xl md:text-8xl font-black leading-[0.9] text-bone-100 mb-16">
          Who is
          <br />
          <span className="glow-text text-glow-400">Chikun?</span>
        </h1>

        <div className="space-y-8 text-lg text-bone-100/75 leading-relaxed max-w-3xl">
          <p>
            Chikun was the first Litecoin meme. &ldquo;Arise Chikun, Arise!&rdquo;
            was chanted in the trollboxes of the old exchanges — the warehouses
            of early crypto — as the price climbed and the holders gathered. For
            thirteen years, the chant has echoed.
          </p>

          <p>
            Then the lights dimmed. The creator moved on. The shirts came down
            off the racks. Chikun became a footnote in a meme archive, a dusty
            reference for old heads. He was forgotten. But the chant never
            stopped.
          </p>

          <p className="text-glow-400 font-medium">
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
            real community memory. Everyone who ever typed &ldquo;arise chikun
            arise&rdquo; into a trollbox is, in a small way, the reason he&apos;s
            back.
          </p>
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="border-l-2 border-glow-500/40 pl-6">
            <p className="font-mono text-xs tracking-[0.3em] text-glow-500 mb-3">
              CHAPTER ONE
            </p>
            <h3 className="font-display text-xl font-bold text-bone-100 mb-2">
              The Abandonment
            </h3>
            <p className="text-bone-100/60 text-sm leading-relaxed">
              How the face of Litecoin became a footnote. The warehouse, the
              workbench, the door that closed.
            </p>
          </div>

          <div className="border-l-2 border-glow-500/40 pl-6">
            <p className="font-mono text-xs tracking-[0.3em] text-glow-500 mb-3">
              CHAPTER TWO
            </p>
            <h3 className="font-display text-xl font-bold text-bone-100 mb-2">
              The Summons
            </h3>
            <p className="text-bone-100/60 text-sm leading-relaxed">
              Thirteen years of trollbox voices compounding into a signal.
              Chikun wakes in the rain of LitVM City.
            </p>
          </div>

          <div className="border-l-2 border-glow-500/40 pl-6">
            <p className="font-mono text-xs tracking-[0.3em] text-glow-500 mb-3">
              CHAPTER THREE
            </p>
            <h3 className="font-display text-xl font-bold text-bone-100 mb-2">
              The Climb
            </h3>
            <p className="text-bone-100/60 text-sm leading-relaxed">
              The tower rises. The creator sits at the top. Every floor is a
              fight. Every fight is a memory.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
