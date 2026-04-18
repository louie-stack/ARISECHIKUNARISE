import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "COMMUNITY — ARISE CHIKUN, ARISE",
  description: "The chant continues. The old heads gather."
};

const GROUPS = [
  {
    name: "X / TWITTER",
    handle: "@chikun",
    description: "Daily fragments. On-chain messages. The signal.",
    href: "https://x.com"
  },
  {
    name: "TELEGRAM",
    handle: "t.me/chikun",
    description: "Where the chant lives. Real-time voices, old heads, new believers.",
    href: "https://t.me"
  },
  {
    name: "DISCORD",
    handle: "discord.gg/chikun",
    description: "The archive. Lore channels, art drops, deep-dive threads.",
    href: "https://discord.gg"
  },
  {
    name: "INSTAGRAM",
    handle: "@chikun",
    description: "Visual fragments from LitVM City. Every post is a frame.",
    href: "https://instagram.com"
  }
];

const PRESS = [
  {
    date: "COMING SOON",
    outlet: "LITECOIN TIMES",
    title: "The Return of the Original Meme",
    href: "#"
  },
  {
    date: "COMING SOON",
    outlet: "CRYPTO NOIR",
    title: "LitVM City: The Mythology Under the Layer 2",
    href: "#"
  },
  {
    date: "COMING SOON",
    outlet: "MEMETIC QUARTERLY",
    title: "Why Thirteen-Year-Old Chants Still Echo",
    href: "#"
  }
];

const EVENTS = [
  {
    date: "TBA",
    title: "THE FIRST CHANT",
    location: "ONLINE / GLOBAL",
    description:
      "Launch night. Coordinated posts across every platform. The signal goes live."
  },
  {
    date: "TBA",
    title: "LITVM CITY / OPEN STUDIO",
    location: "DISCORD LIVE",
    description:
      "Behind-the-scenes look at how Chikun gets made. Prompt-by-prompt, scene-by-scene."
  },
  {
    date: "TBA",
    title: "RISE WEEK",
    location: "COMMUNITY WIDE",
    description:
      "Seven days of fragments. Seven pieces of new art. One coordinated chant."
  }
];

export default function CommunityPage() {
  return (
    <div className="pt-32 pb-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <p className="font-mono text-xs tracking-[0.4em] text-glow-500 mb-6">
            ━━ COMMUNITY / THE CHANT ━━
          </p>
          <h1 className="font-display text-5xl md:text-8xl font-black leading-[0.9] text-bone-100 mb-8">
            The old heads
            <br />
            <span className="glow-text text-glow-400">gather.</span>
          </h1>
          <p className="text-bone-100/70 text-lg max-w-2xl leading-relaxed">
            You typed the chant. You remember the candles. You know what this
            is. Find your people.
          </p>
        </div>

        {/* Groups */}
        <section className="mb-32">
          <p className="font-mono text-xs tracking-[0.4em] text-glow-500 mb-8">
            ━━ GROUPS ━━
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {GROUPS.map((g) => (
              <a
                key={g.name}
                href={g.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-8 bg-ink-800 border border-ink-600 hover:border-glow-500/50 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-graffiti text-2xl text-bone-100 group-hover:text-glow-400 transition-colors tracking-wider">
                    {g.name}
                  </h3>
                  <span className="font-mono text-xs tracking-[0.2em] text-glow-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
                <p className="font-mono text-xs tracking-[0.2em] text-bone-100/50 mb-4">
                  {g.handle}
                </p>
                <p className="text-bone-100/70 text-sm leading-relaxed">
                  {g.description}
                </p>

                {/* Corner accent */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-glow-500/40 group-hover:border-glow-500 transition-colors" />
              </a>
            ))}
          </div>
        </section>

        {/* Events */}
        <section className="mb-32">
          <p className="font-mono text-xs tracking-[0.4em] text-glow-500 mb-8">
            ━━ EVENTS ━━
          </p>
          <div className="space-y-4">
            {EVENTS.map((e, i) => (
              <article
                key={e.title}
                className="group relative grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 p-6 md:p-8 bg-ink-800 border border-ink-600 hover:border-glow-500/50 transition-all"
              >
                <div className="font-mono text-xs tracking-[0.3em] text-glow-500 pt-1">
                  0{i + 1}
                </div>
                <div>
                  <p className="font-mono text-xs tracking-[0.3em] text-bone-100/50 mb-2">
                    {e.date} · {e.location}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-bone-100 group-hover:text-glow-400 transition-colors mb-3">
                    {e.title}
                  </h3>
                  <p className="text-bone-100/70 text-sm leading-relaxed max-w-2xl">
                    {e.description}
                  </p>
                </div>
                <div className="hidden md:flex items-start pt-2 font-mono text-xs tracking-[0.2em] text-bone-100/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  DETAILS →
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Press */}
        <section>
          <p className="font-mono text-xs tracking-[0.4em] text-glow-500 mb-8">
            ━━ PRESS / PR ━━
          </p>
          <div className="space-y-2">
            {PRESS.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="group grid grid-cols-[auto_1fr] md:grid-cols-[120px_200px_1fr_auto] gap-4 md:gap-8 py-6 border-b border-ink-600 hover:border-glow-500/40 transition-colors"
              >
                <span className="font-mono text-xs tracking-[0.2em] text-glow-500 pt-1">
                  {p.date}
                </span>
                <span className="font-mono text-xs tracking-[0.2em] text-bone-100/60 pt-1 hidden md:block">
                  {p.outlet}
                </span>
                <h3 className="font-display text-lg text-bone-100 group-hover:text-glow-400 transition-colors col-span-2 md:col-span-1">
                  {p.title}
                </h3>
                <span className="hidden md:block font-mono text-xs tracking-[0.2em] text-bone-100/40 group-hover:text-glow-500 pt-1 transition-colors">
                  READ →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
