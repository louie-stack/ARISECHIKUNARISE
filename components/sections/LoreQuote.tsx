"use client";

import { motion } from "framer-motion";

export default function LoreQuote() {
  return (
    <section className="relative py-40 px-6 md:px-16 bg-ink-950 overflow-hidden">
      {/* Green spray-tag backdrop */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.06, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <span className="font-graffiti text-[20rem] md:text-[32rem] text-glow-500 leading-none">
          Ł
        </span>
      </motion.div>

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-mono text-xs tracking-[0.4em] text-glow-500 mb-12"
        >
          ━━ I HAVE IDENTIFIED THE STRONGHOLDS ━━
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-display text-3xl md:text-5xl leading-tight text-bone-100 italic"
        >
          &ldquo;The tower rises where my workshop used to be. Every window is a
          forgotten promise. Every floor is a name the creator stopped saying.
          <br />
          <br />
          <span className="not-italic text-glow-400 glow-text">
            I am climbing.&rdquo;
          </span>
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 font-graffiti text-2xl text-bone-100/50 tracking-wider"
        >
          — CHIKUN
        </motion.p>
      </div>
    </section>
  );
}
