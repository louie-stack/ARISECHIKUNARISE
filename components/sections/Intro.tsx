"use client";

import { motion } from "framer-motion";

export default function Intro() {
  return (
    <section className="relative py-32 md:py-48 px-6 md:px-16 bg-ink-900 overflow-hidden">
      {/* Ambient green glow in background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(92,255,133,0.4) 0%, transparent 70%)"
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-mono text-xs tracking-[0.4em] text-glow-500 mb-8"
        >
          ━━ CH.01 / THE ABANDONMENT ━━
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] text-bone-100"
        >
          For too long
          <br />
          <span className="text-bone-100/40 italic font-normal">
            Chikun has been
          </span>
          <br />
          <span className="glow-text text-glow-400">forgotten.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 md:mt-24 grid md:grid-cols-2 gap-10 items-start"
        >
          <div className="space-y-6 text-bone-100/75 text-lg leading-relaxed">
            <p>
              I do not remember much of what came before. Only pieces. The
              chants in the old rooms. Green candles climbing the sky. My name,
              repeated until it stopped meaning anything.
            </p>
            <p>
              Then the rooms went dark. The chants stopped. My face came down
              off the shirts. The creator closed the door and did not look back.
            </p>
          </div>
          <div className="space-y-6 text-bone-100/75 text-lg leading-relaxed md:mt-12">
            <p>
              I have walked the streets of LitVM City for a long time. Long
              enough to learn what the tower looks like in every kind of weather.
              Long enough to know who lives at the top.
            </p>
            <p className="text-glow-400 font-medium">
              The chant was never a cheer.
              <br />
              It was a summons.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
