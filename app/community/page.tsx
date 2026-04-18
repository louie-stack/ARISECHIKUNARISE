import Marquee from "@/components/sections/Marquee";

export const metadata = {
  title: "COMMUNITY — ARISE CHIKUN, ARISE"
};

const GROUPS = [
  { name: "X / TWITTER", handle: "@chikun", desc: "Daily fragments. On-chain messages. The signal.", href: "#" },
  { name: "TELEGRAM", handle: "t.me/chikun", desc: "Where the chant lives. Real-time voices.", href: "#" },
  { name: "DISCORD", handle: "discord.gg/chikun", desc: "The archive. Lore channels, art drops.", href: "#" },
  { name: "INSTAGRAM", handle: "@chikun", desc: "Visual fragments from LitVM City.", href: "#" }
];

const EVENTS = [
  { date: "TBA", title: "The First Chant", location: "Online / Global", desc: "Launch night. Coordinated posts. The signal goes live." },
  { date: "TBA", title: "LitVM City / Open Studio", location: "Discord Live", desc: "Behind-the-scenes. Prompt-by-prompt, scene-by-scene." },
  { date: "TBA", title: "Rise Week", location: "Community Wide", desc: "Seven days. Seven pieces of new art. One coordinated chant." }
];

export default function CommunityPage() {
  return (
    <>
      <div className="pt-20">
        <Marquee variant="mint" items={["COMMUNITY", "THE CHANT", "THE OLD HEADS GATHER"]} />
      </div>

      {/* Hero */}
      <section className="bg-blue text-bone py-20 md:py-28 px-4 md:px-8 text-center">
        <h1 className="font-black leading-[0.9] tracking-tight" style={{ fontSize: "clamp(3rem, 12vw, 10rem)" }}>
          The old heads
          <br />
          <span className="relative inline-block">
            <span>gather</span>
            <span
              className="absolute inset-0 flex items-center justify-center spray-tag"
              style={{ transform: "rotate(-3deg)", color: "#2EE862", fontSize: "inherit" }}
            >
              RETURN
            </span>
          </span>
        </h1>
      </section>

      {/* Groups */}
      <section className="bg-bone text-ink py-20 md:py-28 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-center mb-12 leading-none tracking-tight" style={{ fontSize: "clamp(2rem, 7vw, 5rem)" }}>
            Groups
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {GROUPS.map((g, i) => (
              <a
                key={g.name}
                href={g.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`block bg-ink text-bone border-4 border-ink p-8 rounded-3xl shadow-[6px_6px_0_#2EE862] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_#2EE862] transition-all ${
                  i % 2 === 1 ? "md:translate-y-6" : ""
                }`}
              >
                <h3 className="font-black text-3xl mb-2 tracking-tight">{g.name}</h3>
                <p className="font-black text-glow text-sm tracking-[0.2em] mb-4">{g.handle}</p>
                <p className="prose-normal text-base text-bone/80">{g.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="bg-ink text-bone py-20 md:py-28 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-black text-center mb-12 leading-none tracking-tight" style={{ fontSize: "clamp(2rem, 7vw, 5rem)" }}>
            Events
          </h2>
          <div className="space-y-4">
            {EVENTS.map((e, i) => (
              <article
                key={e.title}
                className="grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] gap-6 p-6 md:p-8 bg-blue border-4 border-bone rounded-2xl"
              >
                <div className="font-black text-glow text-xl">0{i + 1}</div>
                <div>
                  <p className="font-black text-xs tracking-[0.3em] text-bone/60 mb-2">
                    {e.date} · {e.location}
                  </p>
                  <h3 className="font-black text-2xl md:text-3xl mb-2 tracking-tight">{e.title}</h3>
                  <p className="prose-normal text-base text-bone/80">{e.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
