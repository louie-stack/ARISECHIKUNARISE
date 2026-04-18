"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[720px] w-full overflow-hidden bg-ink-900">
      {/* Hero image — replace with your Chikun hero shot */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/art/hero/chikun-hero.png')"
          }}
        />
        {/* Gradient vignette for drama */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-900/40 to-ink-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/60 via-transparent to-ink-900/60" />
      </div>

      {/* Rain overlay */}
      <div className="rain-layer" aria-hidden />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 3px)"
        }}
      />

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-5xl"
        >
          {/* Small tag above title */}
          <p className="font-mono text-xs tracking-[0.4em] text-glow-500 mb-6 animate-flicker">
            鶏鳴 / THE CRY AT DAWN
          </p>

          {/* Main title */}
          <h1 className="font-graffiti text-6xl sm:text-7xl md:text-9xl leading-[0.85] text-bone-100 glow-text">
            ARISE
            <br />
            CHIKUN,
            <br />
            ARISE
          </h1>

          {/* Subtitle */}
          <p className="mt-10 text-bone-100/70 text-base md:text-lg max-w-xl tracking-wide leading-relaxed">
            For thirteen years you chanted his name. You thought it was a meme.
            <br />
            <span className="text-glow-400">He heard every word.</span>
          </p>

          {/* Scroll hint */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-14 font-mono text-xs tracking-[0.3em] text-bone-100/40"
          >
            ↓ SCROLL
          </motion.div>
        </motion.div>
      </div>

      {/* Corner tags */}
      <div className="absolute top-24 right-6 md:right-16 z-10 font-mono text-xs tracking-[0.3em] text-bone-100/40">
        LITVM CITY / CH.01
      </div>
      <div className="absolute bottom-6 right-6 md:right-16 z-10 font-mono text-xs tracking-[0.3em] text-bone-100/40">
        LAT 40.7128° N / LONG 74.0060° W
      </div>
    </section>
  );
}
