"use client";

import { motion } from "framer-motion";

const STATS = [
  { label: "TOTAL SUPPLY", value: "88,888,888,888" },
  { label: "BURNED LP", value: "90%" },
  { label: "COMMUNITY", value: "10%" },
  { label: "CHAIN", value: "LITVM" }
];

export default function Tokenomics() {
  return (
    <section className="relative py-32 md:py-48 px-6 md:px-16 bg-ink-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-mono text-xs tracking-[0.4em] text-glow-500 mb-8"
        >
          ━━ CH.02 / THE DAWN ━━
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] text-bone-100 mb-20"
        >
          It&apos;s the dawn
          <br />
          of a <span className="glow-text text-glow-400">new era.</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="relative p-6 md:p-8 bg-ink-800 border border-ink-600 hover:border-glow-500/50 transition-colors group"
            >
              <p className="font-mono text-xs tracking-[0.3em] text-bone-100/50 mb-3">
                {stat.label}
              </p>
              <p className="font-display text-2xl md:text-3xl font-bold text-bone-100 group-hover:text-glow-400 transition-colors">
                {stat.value}
              </p>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-glow-500/40 group-hover:border-glow-500 transition-colors" />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 max-w-2xl text-bone-100/70 text-lg leading-relaxed"
        >
          Let&apos;s come together and put an end to their tyranny. The tower
          does not fall alone. The chant rises with every new voice.
        </motion.p>
      </div>
    </section>
  );
}
