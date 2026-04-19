import Marquee from "@/components/sections/Marquee";

export const metadata = {
  title: "COMMUNITY — ARISE CHIKUN, ARISE"
};

const GROUPS = [
  { name: "X / TWITTER", handle: "@chikun", desc: "Posts. Fragments. Occasional screaming.", href: "#" },
  { name: "TELEGRAM", handle: "t.me/chikun", desc: "Live box. If you remember Mintpal, this is your room.", href: "#" },
  { name: "DISCORD", handle: "discord.gg/chikun", desc: "Archive and atrium. Lore channels, art drops, long arguments about block times.", href: "#" },
  { name: "INSTAGRAM", handle: "@chikun", desc: "Frames from the city.", href: "#" }
];

const EVENTS = [
  { date: "TBA", title: "FIRST CHANT", location: "ONLINE / GLOBAL", desc: "Launch night. Coordinated posts across every platform. The signal goes live at the same minute." },
  { date: "TBA", title: "OPEN STUDIO", location: "DISCORD LIVE", desc: "Behind the curtain. How the art gets made. Which prompts got laughed out of the room." },
  { date: "TBA", title: "RISE WEEK", location: "COMMUNITY WIDE", desc: "Seven days. Seven drops. One chant. The rest of crypto gets to watch." }
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
          THE BOX
          <br />
          NEVER{" "}
          <span className="relative inline-block">
            <span>CLOSED.</span>
            <span
              className="absolute inset-0 flex items-center justify-center spray-tag"
              style={{ transform: "rotate(-3deg)", color: "#2EE862", fontSize: "inherit" }}
            >
              OPEN
            </span>
          </span>
        </h1>
        <p className="prose-normal mt-8 max-w-2xl mx-auto text-lg md:text-xl">
          You typed the chant in 2014. You held through the winters. You&apos;re still here. Good.
        </p>
      </section>

      {/* Groups */}
      <section className="bg-bone text-ink py-20 md:py-28 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-center mb-12 leading-none tracking-tight" style={{ fontSize: "clamp(2rem, 7vw, 5rem)" }}>
            WHERE WE TALK
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
            WHEN WE GATHER
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
