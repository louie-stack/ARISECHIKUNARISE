"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CreativeUniverse() {
  return (
    <section className="relative py-32 md:py-48 px-6 md:px-16 bg-ink-900 overflow-hidden">
      {/* Large ambient Ł */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.04 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        className="absolute -right-40 -bottom-40 font-graffiti text-[30rem] text-glow-500 pointer-events-none select-none"
      >
        Ł
      </motion.div>

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="font-mono text-xs tracking-[0.4em] text-glow-500 mb-6">
            ━━ THE ARCHIVE ━━
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-black leading-[0.95] text-bone-100 mb-8">
            Welcome
            <br />
            to the
            <br />
            <span className="italic text-glow-400 glow-text">
              creative universe.
            </span>
          </h2>
          <p className="text-bone-100/70 text-lg leading-relaxed mb-10 max-w-md">
            Every image is a fragment. Every fragment is a clue. The city has
            been waiting to be mapped.
          </p>
          <Link href="/memes" className="spray-btn">
            ENTER THE UNIVERSE →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="grid grid-cols-2 gap-4"
        >
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="relative aspect-square bg-ink-800 border border-ink-600 overflow-hidden group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/art/scenes/universe-0${n}.png`}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
