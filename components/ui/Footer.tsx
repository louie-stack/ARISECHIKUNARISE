import Link from "next/link";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "X", href: "https://x.com" },
  { label: "Telegram", href: "https://t.me" },
  { label: "TikTok", href: "https://tiktok.com" }
];

const ECOSYSTEM = [
  { label: "CoinGecko", href: "#" },
  { label: "CoinMarketCap", href: "#" },
  { label: "LitVM", href: "#" },
  { label: "DexScreener", href: "#" }
];

export default function Footer() {
  return (
    <footer className="bg-ink text-bone border-t-4 border-blue">
      {/* Big callback heading */}
      <div className="px-4 md:px-8 py-20 md:py-28 text-center max-w-6xl mx-auto">
        <h2
          className="font-black leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
        >
          It&apos;s the dawn
          <br />
          of a new era
        </h2>
        <p className="prose-normal mt-8 text-lg md:text-xl max-w-2xl mx-auto">
          Let&apos;s come together and put an end to this silence. The forgotten
          days are done.
        </p>

        <div className="mt-12 flex flex-wrap gap-3 justify-center">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* Ecosystem links on blue band */}
      <div className="bg-blue border-t-4 border-ink">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 flex flex-wrap gap-3 justify-center items-center">
          <span className="font-black text-bone text-xs tracking-[0.3em]">
            ECOSYSTEM →
          </span>
          {ECOSYSTEM.map((e) => (
            <a
              key={e.label}
              href={e.href}
              className="btn-pill text-sm"
            >
              {e.label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom strip */}
      <div className="bg-ink border-t-2 border-blue/40">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-bone/60 text-xs tracking-[0.2em]">
          <p>© {new Date().getFullYear()} CHIKUN — A LORE PROJECT</p>
          <p className="italic">鶏鳴 / THE CRY AT DAWN</p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-glow transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-glow transition">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
