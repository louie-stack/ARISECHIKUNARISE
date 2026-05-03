import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "T&Cs · Chikun",
  description:
    "Terms and conditions for the $CHIKUN cultural movement and website.",
};

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "1. NATURE OF $CHIKUN",
    body: [
      "$CHIKUN is a cultural movement and memecoin. It has no intrinsic value, no utility, no team promises, no roadmap, and no expectation of financial return. Participation is purely for the culture.",
      "This website, the CHIKUN'S ESCAPE arcade minigame, and any associated art, copy, or media are creative expressions of that cultural movement. Nothing on this site constitutes a prospectus, offer, or solicitation of any kind.",
    ],
  },
  {
    heading: "2. NOT FINANCIAL ADVICE",
    body: [
      "Nothing on this website is financial, investment, legal, accounting, or tax advice. We are not registered advisors, and no content here should be treated as a recommendation to buy, sell, hold, or transact in any digital asset.",
      "You are solely responsible for your own decisions. Do your own research. Consult a qualified professional before acting on anything you read here.",
    ],
  },
  {
    heading: "3. RISKS",
    body: [
      "Memecoins are extremely volatile and speculative. You can lose the entire value of any position, quickly and without recourse. Smart contract bugs, wallet compromises, exchange failures, rug pulls, and regulatory action can all result in total loss.",
      "Only interact with what you can afford to lose. Verify contract addresses from official channels only. Never share your seed phrase or private keys with anyone.",
    ],
  },
  {
    heading: "4. NO GUARANTEES",
    body: [
      "This site and all content are provided on an \"as is\" and \"as available\" basis, without warranties of any kind, express or implied. We make no guarantees about accuracy, availability, uptime, or that the site will be free of errors or interruptions.",
      "Links to third-party sites, tools, or services are provided for convenience. We do not endorse and are not responsible for their content, policies, or practices.",
    ],
  },
  {
    heading: "5. LIMITATION OF LIABILITY",
    body: [
      "To the maximum extent permitted by law, no person associated with the $CHIKUN project, this website, or the CHIKUN'S ESCAPE minigame accepts liability for any direct, indirect, incidental, consequential, or punitive damages arising from your use of this site or any token or service connected to it.",
    ],
  },
  {
    heading: "6. USER RESPONSIBILITY",
    body: [
      "You agree to use this site only in ways that comply with applicable laws in your jurisdiction, including any laws regulating digital assets, gambling, or securities in the country where you reside.",
      "If memecoins, crypto trading, or related activity is restricted or prohibited where you live, do not participate.",
    ],
  },
  {
    heading: "7. INTELLECTUAL PROPERTY",
    body: [
      "Original art, copy, and code on this site are provided for the enjoyment of the community. Memes, fan art, and derivative works are encouraged in the spirit of the movement.",
      "Third-party names, logos, and trademarks referenced on this site remain the property of their respective owners. Reference does not imply endorsement or affiliation.",
    ],
  },
  {
    heading: "8. NOT AFFILIATED",
    body: [
      "$CHIKUN is a community project. It is not affiliated with, endorsed by, or operated by the Litecoin Foundation, LitVM, or any other organisation referenced on this site.",
    ],
  },
  {
    heading: "9. CHANGES TO THESE TERMS",
    body: [
      "We may update these terms at any time, without prior notice. Continued use of the site after an update constitutes acceptance of the revised terms. The date below reflects the most recent revision.",
    ],
  },
];

export default function TermsPage() {
  return (
    <section className="relative bg-ink text-bone pt-28 md:pt-36 pb-24 md:pb-32 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex justify-center mb-6">
            <span
              className="tape tape-mint"
              style={{ fontSize: "0.85rem", padding: "0.5rem 1.1rem" }}
            >
              THE FINE PRINT
            </span>
          </div>
          <h1
            className="font-black leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
          >
            TERMS &amp;
            <br />
            CONDITIONS.
          </h1>
          <p className="prose-normal mt-6 text-base md:text-lg text-bone/70 max-w-xl mx-auto">
            Read this before you ape, flap, or chant. Nothing here is advice —
            just the ground rules for being in the coop.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {SECTIONS.map((s) => (
            <article
              key={s.heading}
              className="border-l-2 border-glow/40 pl-5 md:pl-6"
            >
              <h2 className="font-black text-bone tracking-tight text-xl md:text-2xl">
                {s.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {s.body.map((p, i) => (
                  <p
                    key={i}
                    className="prose-normal text-bone/75 text-base md:text-lg leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-bone/15 text-center">
          <p className="font-black text-bone/50 text-xs tracking-[0.3em]">
            LAST UPDATED · APRIL 22, 2026
          </p>
          <p className="prose-normal text-bone/40 text-xs md:text-sm mt-3 italic">
            Arise Chikun, Arise.
          </p>
        </div>
      </div>
    </section>
  );
}
