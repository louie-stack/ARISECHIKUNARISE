import Link from "next/link";

const SOCIALS = [
  { label: "X", href: "https://x.com" },
  { label: "TELEGRAM", href: "https://t.me" },
  { label: "INSTAGRAM", href: "https://instagram.com" },
  { label: "TIKTOK", href: "https://tiktok.com" }
];

const ECOSYSTEM = [
  { label: "LITVM", href: "#" },
  { label: "LITECOIN.COM", href: "https://litecoin.com" },
  { label: "COINGECKO", href: "https://coingecko.com" },
  { label: "COINMARKETCAP", href: "https://coinmarketcap.com" }
];

export default function Footer() {
  return (
    <footer className="relative bg-ink-950 border-t border-ink-600 mt-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-glow-500/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10">
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight text-bone-100 glow-text">
            IT&apos;S THE DAWN OF A NEW ERA
          </h2>
          <p className="mt-6 text-bone-100/60 text-sm md:text-base max-w-2xl mx-auto tracking-wide">
            The chant was a summons. The forgotten have returned.
            <br />
            The dog days are done.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div>
            <h3 className="font-graffiti text-glow-500 text-lg mb-4">
              ARISE
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-bone-100/70 hover:text-glow-500 transition"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/memes"
                  className="text-sm text-bone-100/70 hover:text-glow-500 transition"
                >
                  Meme With Us
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-sm text-bone-100/70 hover:text-glow-500 transition"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-bone-100/70 hover:text-glow-500 transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-graffiti text-glow-500 text-lg mb-4">
              SOCIALS
            </h3>
            <ul className="space-y-2">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-bone-100/70 hover:text-glow-500 transition tracking-wider"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-graffiti text-glow-500 text-lg mb-4">
              ECOSYSTEM
            </h3>
            <ul className="space-y-2">
              {ECOSYSTEM.map((e) => (
                <li key={e.label}>
                  <a
                    href={e.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-bone-100/70 hover:text-glow-500 transition tracking-wider"
                  >
                    {e.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-graffiti text-glow-500 text-lg mb-4">
              POWERED BY
            </h3>
            <p className="text-sm text-bone-100/70 tracking-wider">
              LITVM
              <br />
              <span className="text-bone-100/40 text-xs">
                Litecoin Layer 2
              </span>
            </p>
          </div>
        </div>

        <div className="border-t border-ink-600 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-bone-100/40 tracking-[0.2em]">
            © {new Date().getFullYear()} CHIKUN — A LORE PROJECT
          </p>
          <p className="text-xs text-bone-100/40 tracking-[0.2em] italic">
            鶏鳴 · KEIMEI · THE CRY AT DAWN
          </p>
        </div>
      </div>
    </footer>
  );
}
