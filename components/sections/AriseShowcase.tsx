"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Shield, Magnet, Zap, Play, Pause } from "lucide-react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import {
  registerSoundtrack,
  unregisterSoundtrack,
  pauseOtherSoundtracks,
} from "@/app/arise/game/audio";

const POWERUPS = [
  {
    icon: Shield,
    label: "SHIELD",
    desc: "Soak a hit. Keep soaring.",
    color: "#2EE862",
  },
  {
    icon: Magnet,
    label: "MAGNET",
    desc: "Drag every coin to your wings.",
    color: "#31e0ff",
  },
  {
    icon: Zap,
    label: "SURGE",
    desc: "Slow the sky to a crawl.",
    color: "#ffcf3a",
  },
];

const LEADERBOARD = [
  { rank: "01", name: "KAPIBARA", score: "1,247" },
  { rank: "02", name: "COBLEE_47", score: "982" },
  { rank: "03", name: "LSTR_LAB", score: "847" },
];

export default function AriseShowcase() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingState = useRevealOnScroll(headingRef);

  const gridRef = useRef<HTMLDivElement>(null);
  const gridState = useRevealOnScroll(gridRef);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // Reuse a single element stored on window so HMR doesn't leave the old
    // one playing in the background next to the new one.
    const w = window as unknown as {
      __ariseHomeMusicEl?: HTMLAudioElement;
    };
    let el = w.__ariseHomeMusicEl;
    if (!el) {
      el = new Audio("/arise/soundtrack.mp3");
      el.loop = true;
      el.preload = "none";
      el.volume = 0.65;
      w.__ariseHomeMusicEl = el;
    } else {
      try {
        el.pause();
      } catch {}
    }
    audioRef.current = el;
    registerSoundtrack(el);

    const onEnd = () => setPlaying(false);
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    el.addEventListener("ended", onEnd);
    el.addEventListener("pause", onPause);
    el.addEventListener("play", onPlay);
    // Sync state in case the element was already playing from a previous mount.
    setPlaying(!el.paused);

    return () => {
      el!.pause();
      el!.removeEventListener("ended", onEnd);
      el!.removeEventListener("pause", onPause);
      el!.removeEventListener("play", onPlay);
      unregisterSoundtrack(el!);
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      // Silence anything else before we start so we can never double up.
      pauseOtherSoundtracks(el);
      el.play().catch(() => setPlaying(false));
    } else {
      el.pause();
    }
  };

  return (
    <section className="relative bg-ink text-bone pt-20 md:pt-28 pb-24 md:pb-32 px-4 md:px-8 overflow-hidden">
      {/* Local keyframes for the soundtrack tile's equalizer bars. */}
      <style jsx>{`
        @keyframes ariseEq {
          0%, 100% { transform: scaleY(0.35); }
          50% { transform: scaleY(1); }
        }
        .arise-eq-bar {
          transform-origin: bottom;
          animation: ariseEq 1.1s ease-in-out infinite;
        }
      `}</style>

      {/* Heading block */}
      <div
        ref={headingRef}
        data-reveal
        data-reveal-state={headingState}
        className="relative max-w-5xl mx-auto text-center"
      >
        <div className="flex justify-center mb-8">
          <span
            className="tape"
            style={{ fontSize: "1.05rem", padding: "0.65rem 1.4rem" }}
          >
            NOW PLAYING
          </span>
        </div>

        <h2
          className="font-black leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(2.75rem, 8vw, 7rem)" }}
        >
          ARISE ARCADE
        </h2>

        <p className="prose-normal mt-6 text-base md:text-lg max-w-4xl mx-auto text-bone/80 md:whitespace-nowrap">
          Tap to flap. Dodge Big Corp. Rise through four chapters.
        </p>
      </div>

      {/* Bento grid */}
      <div
        ref={gridRef}
        data-reveal-state={gridState}
        className="reveal-stagger relative mt-16 md:mt-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
      >
        {/* ─────── Tile 1 — Headline + CTA (spans 2 cols on desktop) ─────── */}
        <div className="md:col-span-2 relative rounded-2xl border-2 border-bone/15 bg-gradient-to-br from-blue/25 via-ink to-ink p-8 md:p-10 overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-glow/10 blur-3xl pointer-events-none" />
          <span className="font-black text-glow text-xs tracking-[0.35em]">
            MINIGAME · ARISE
          </span>
          <h3
            className="mt-4 font-black leading-[0.85] tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)" }}
          >
            FREE CHIKUN FROM
            <br />
            THE <span className="text-[#ff3037]">GLOBAL ELITES</span>.
          </h3>
          <p className="prose-normal mt-5 text-base md:text-lg text-bone/75 max-w-md">
            Flap past Big Corp&apos;s towers, climb four zones, and top the
            global leaderboard.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/arise" className="btn-pill btn-pill-glow">
              PLAY NOW →
            </Link>
            <span className="font-black text-bone/40 text-xs tracking-[0.3em]">
              FREE · IN-BROWSER · MOBILE-READY
            </span>
          </div>
        </div>

        {/* ─────── Tile 2 — Hero gameplay video ─────── */}
        <div
          className="relative rounded-2xl border-2 border-bone/15 overflow-hidden aspect-square md:aspect-auto min-h-[280px] bg-ink"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/arise/chikun-flap.png"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              // Slight zoom anchored toward the lower-right so the upper sky
              // strip is cropped without shrinking the gameplay too much.
              transform: "scale(1.18) translateX(2%)",
              transformOrigin: "center 72%",
            }}
            aria-hidden
          >
            <source src="/arise/gameplay.mp4" type="video/mp4" />
          </video>

          {/* Subtle bottom gradient so the caption tape stays legible over
              bright gameplay frames. */}
          <div
            aria-hidden
            className="absolute bottom-0 inset-x-0 h-1/4 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(10,10,15,0.75) 100%)",
            }}
          />

          {/* Caption tape */}
          <span
            className="tape absolute bottom-4 left-1/2 -translate-x-1/2"
            style={{ fontSize: "0.7rem" }}
          >
            LIVE GAMEPLAY
          </span>
        </div>

        {/* ─────── Tile 3 — Bosses (Big Corp) ─────── */}
        <div className="relative rounded-2xl border-2 border-bone/15 bg-gradient-to-br from-blood/30 via-ink to-ink p-6 overflow-hidden min-h-[320px] flex flex-col">
          <span className="tape tape-blood self-start" style={{ fontSize: "0.65rem" }}>
            FACE BIG CORP
          </span>
          <div className="flex-1 flex items-center justify-center my-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/arise/big-corp.png"
              alt=""
              className="max-h-48 w-auto drop-shadow-[4px_4px_0_rgba(196,30,58,0.4)]"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div>
            <p className="font-black tracking-tight text-xl">BOSSES</p>
            <p className="prose-normal text-sm text-bone/70 mt-1">
              Tower regiments patrol every chapter. Slip past, or get swatted.
            </p>
          </div>
        </div>

        {/* ─────── Tile 5 — Arsenal / Powerups ─────── */}
        <div className="relative rounded-2xl border-2 border-bone/15 bg-ink-soft/30 p-6 min-h-[320px] flex flex-col overflow-hidden">
          {/* Ambient glow accent */}
          <div
            aria-hidden
            className="absolute -top-16 -right-12 w-44 h-44 rounded-full bg-glow/10 blur-3xl pointer-events-none"
          />

          <div className="flex items-center justify-between mb-3">
            <span className="tape" style={{ fontSize: "0.65rem" }}>
              ARSENAL
            </span>
            <span className="font-black text-[0.6rem] tracking-[0.3em] text-bone/40">
              ×3 DROPS
            </span>
          </div>

          <ul className="flex-1 flex flex-col justify-center gap-1.5 my-1">
            {POWERUPS.map((p) => {
              const Icon = p.icon;
              return (
                <li
                  key={p.label}
                  className="group relative flex items-center gap-2.5 rounded-lg border border-bone/10 bg-ink/60 py-2 pl-3 pr-3 overflow-hidden transition-colors hover:border-bone/30"
                >
                  {/* Colored left accent bar */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 bottom-0 w-[3px]"
                    style={{
                      background: p.color,
                      boxShadow: `0 0 10px ${p.color}`,
                    }}
                  />
                  {/* Icon badge with color-matched glow */}
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 border-ink ml-1 transition-transform group-hover:scale-110"
                    style={{
                      background: p.color,
                      boxShadow: `0 0 12px ${p.color}55, 2px 2px 0 #0A0A0F`,
                    }}
                  >
                    <Icon className="w-4 h-4 text-ink" strokeWidth={3} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-black text-xs tracking-[0.15em] leading-none"
                      style={{ color: p.color }}
                    >
                      {p.label}
                    </p>
                    <p className="text-bone/70 text-[0.7rem] leading-snug mt-0.5">
                      {p.desc}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-2">
            <p className="font-black tracking-tight text-xl">THREE TOOLS</p>
            <p className="prose-normal text-sm text-bone/70 mt-1">
              Random drops in the flight path. Pick them up to bend the run
              your way.
            </p>
          </div>
        </div>

        {/* ─────── Tile 6 — Leaderboard ─────── */}
        <div className="relative rounded-2xl border-2 border-bone/15 bg-gradient-to-br from-glow/10 via-ink to-ink p-6 min-h-[320px] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="tape tape-mint" style={{ fontSize: "0.65rem" }}>
              GLOBAL
            </span>
            <span className="font-black text-[0.6rem] tracking-[0.3em] text-bone/40">
              LIVE
            </span>
          </div>
          <ul className="flex-1 flex flex-col justify-center gap-2 my-2">
            {LEADERBOARD.map((r) => (
              <li
                key={r.rank}
                className="flex items-center gap-4 border-b border-bone/10 pb-2 last:border-0"
              >
                <span className="font-black text-glow text-lg tracking-tight w-8">
                  {r.rank}
                </span>
                <span className="font-black text-bone flex-1 truncate">
                  {r.name}
                </span>
                <span className="font-black text-bone/80 tabular-nums">
                  {r.score}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-2">
            <p className="font-black tracking-tight text-xl">LEADERBOARD</p>
            <p className="prose-normal text-sm text-bone/70 mt-1">
              Scores post on clear. Your handle, your score, the whole feed
              watching.
            </p>
          </div>
        </div>

        {/* ─────── Tile 7 — Soundtrack (spans 3) ─────── */}
        <div className="md:col-span-3 relative rounded-2xl border-2 border-bone/15 bg-gradient-to-r from-ink via-blue/20 to-ink p-6 md:p-8 overflow-hidden flex flex-col md:flex-row items-center md:items-stretch gap-6">
          {/* Equalizer */}
          <div
            aria-hidden
            className="flex items-end gap-1.5 h-20 md:h-24 shrink-0"
            data-playing={playing ? "true" : "false"}
          >
            {[0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 0.55, 0.2, 0.4, 0.7, 0.1].map(
              (delay, i) => (
                <span
                  key={i}
                  className="arise-eq-bar block w-2 md:w-2.5 h-full rounded-full bg-glow"
                  style={{
                    animationDelay: `${delay}s`,
                    animationPlayState: playing ? "running" : "paused",
                    transform: playing ? undefined : "scaleY(0.2)",
                    transformOrigin: "bottom",
                    opacity: playing ? 1 : 0.4,
                    transition: "opacity 300ms ease, transform 300ms ease",
                  }}
                />
              )
            )}
          </div>
          <div className="flex-1">
            <span className="font-black text-glow text-xs tracking-[0.35em]">
              SOUNDTRACK
            </span>
            <p
              className="mt-2 font-black leading-[0.9] tracking-tight"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
            >
              SYNTHWAVE NIGHTS.
            </p>
            <p className="prose-normal mt-2 text-bone/75 text-base md:text-lg">
              The same cyberpunk score that plays in the game. Headphones on.
              Sound up.
            </p>
          </div>
          <div className="md:self-center">
            <button
              type="button"
              onClick={toggle}
              className="btn-pill btn-pill-blue inline-flex items-center gap-2"
              aria-pressed={playing}
              aria-label={playing ? "Pause soundtrack" : "Play soundtrack"}
            >
              {playing ? (
                <>
                  <Pause className="w-4 h-4" strokeWidth={3} fill="currentColor" />
                  PAUSE
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" strokeWidth={3} fill="currentColor" />
                  TUNE IN
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
