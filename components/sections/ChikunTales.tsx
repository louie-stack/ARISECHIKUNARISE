"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const TALES = [
  {
    title: "THE NIGHT OF THE FLICKERING SIGN",
    blurb:
      "Chikun finds his old merch shop boarded up. A poster of his younger self, faded and torn.",
    image: "/art/scenes/tale-01.png"
  },
  {
    title: "THE ROOFTOP WATCH",
    blurb:
      "LitVM City spreads below. The tower rises. He counts the windows, one at a time.",
    image: "/art/scenes/tale-02.png"
  },
  {
    title: "THE FIRST FIGHT",
    blurb:
      "An alley. A masked enforcer. The red lining of his coat flares like a cape.",
    image: "/art/scenes/tale-03.png"
  }
];

export default function ChikunTales() {
  return (
    <section className="relative py-32 md:py-48 px-6 md:px-16 bg-ink-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <p className="font-mono text-xs tracking-[0.4em] text-glow-500 mb-6">
              ━━ CHIKUN TALES ━━
            </p>
            <h2 className="font-display text-5xl md:text-7xl font-black leading-[0.9] text-bone-100">
              Fragments
              <br />
              <span className="italic text-bone-100/40 font-normal">
                from the city.
              </span>
            </h2>
          </div>

          <Link
            href="/about"
            className="spray-btn self-start md:self-end"
          >
            READ MORE →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TALES.map((tale, i) => (
            <motion.article
              key={tale.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] bg-ink-800 border border-ink-600 overflow-hidden mb-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tale.image}
                  alt={tale.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />

                {/* Chapter index */}
                <div className="absolute top-4 left-4 font-mono text-xs tracking-[0.3em] text-glow-500">
                  0{i + 1}
                </div>
              </div>

              <h3 className="font-display text-lg font-bold tracking-wide text-bone-100 group-hover:text-glow-400 transition-colors mb-2">
                {tale.title}
              </h3>
              <p className="text-sm text-bone-100/60 leading-relaxed">
                {tale.blurb}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
