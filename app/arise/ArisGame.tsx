"use client";

/**
 * ARISE — Chikun's flight game.
 * Tap / click / space to flap. Dodge Big Corp towers. Collect silver LTC coins.
 *
 * Juice pass:
 * - Web Audio synthesized sfx (flap, coin with combo pitch, tower pass, death)
 * - Screen shake + hit-stop freeze-frame on death
 * - Squash-and-stretch on flap
 * - Coin magnet + sparkle particles on pickup
 * - Speed-line trail behind Chikun at flight speed
 * - Combo counter resets on death
 */

import { useEffect, useRef, useState, useCallback } from "react";

// ============================================================
// CONFIG
// ============================================================
const CFG = {
  canvas: { w: 1280, h: 720 },
  chikun: {
    x: 280,
    size: 110,
    hitRadius: 30,
  },
  physics: {
    gravity: 0.09,
    flapV: -3.6,
    maxFall: 5,
    deathGravity: 0.55,
  },
  tower: {
    width: 130,
    gap: 320,
    spacing: 640,
    minGapY: 180,
    maxGapY: 540,
    firstTowerXOffset: 80,
  },
  scroll: {
    initial: 2.4,
    max: 3.8,
    rampPerTower: 0.025,
  },
  coin: {
    radius: 20,
    value: 5,
    magnetRadius: 120,
    magnetStrength: 0.22,
  },
  juice: {
    deathShake: 18,
    shakeDecay: 0.86,
    hitStopMs: 110,
    flapSquashMs: 220,
    sparksOnCoin: 10,
    trailLines: 5,
  },
  towerScore: 1,
  flapAnimMs: 180,
  featherOnFlap: 1,
  featherOnDeath: 14,
};

const COLORS = {
  skyTop: "#1a3ec7",
  skyMid: "#2b5ede",
  skyBot: "#4a7aeb",
  ground: "#050607",
  groundEdge: "#00d632",
  black: "#000000",
  towerFill: "#0a0d12",
  towerStroke: "#00d632",
  towerWindow: "#2dff5c",
  neonGreen: "#00d632",
  lime: "#2dff5c",
  red: "#ff3344",
  cream: "#f5f1e8",
  feather: "#ffffff",
  coinBody: "#e0e5ec",
  coinRim: "#6c7380",
};

// ============================================================
// TYPES
// ============================================================
type GameState = "idle" | "playing" | "gameover";

interface Tower {
  x: number;
  gapY: number;
  passed: boolean;
}

interface Coin {
  x: number;
  y: number;
  collected: boolean;
}

interface Feather {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
  life: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
}

// ============================================================
// ASSET LOADING + BACKGROUND REMOVAL
// ============================================================
const BG_INNER = 40;
const BG_OUTER = 95;

function removeSpriteBackground(img: HTMLImageElement): HTMLCanvasElement {
  const full = document.createElement("canvas");
  full.width = img.naturalWidth;
  full.height = img.naturalHeight;
  const fctx = full.getContext("2d");
  if (!fctx) return full;
  fctx.drawImage(img, 0, 0);
  const imgData = fctx.getImageData(0, 0, full.width, full.height);
  const d = imgData.data;
  const W = full.width;
  const H = full.height;

  const pts: Array<[number, number]> = [
    [1, 1], [W - 2, 1], [1, H - 2], [W - 2, H - 2],
    [W >> 1, 1], [W >> 1, H - 2], [1, H >> 1], [W - 2, H >> 1],
    [3, 3], [W - 4, 3], [3, H - 4], [W - 4, H - 4],
  ];
  let br = 0, bg = 0, bb = 0;
  for (const [x, y] of pts) {
    const i = (y * W + x) * 4;
    br += d[i];
    bg += d[i + 1];
    bb += d[i + 2];
  }
  br /= pts.length;
  bg /= pts.length;
  bb /= pts.length;

  for (let i = 0; i < d.length; i += 4) {
    const dr = d[i] - br;
    const dgn = d[i + 1] - bg;
    const db = d[i + 2] - bb;
    const dist = Math.sqrt(dr * dr + dgn * dgn + db * db);
    if (dist <= BG_INNER) {
      d[i + 3] = 0;
    } else if (dist < BG_OUTER) {
      d[i + 3] = Math.round(((dist - BG_INNER) / (BG_OUTER - BG_INNER)) * d[i + 3]);
    }
  }
  fctx.putImageData(imgData, 0, 0);

  const alphaMin = 24;
  let minX = W, minY = H, maxX = -1, maxY = -1;
  for (let y = 0; y < H; y++) {
    const row = y * W * 4;
    for (let x = 0; x < W; x++) {
      if (d[row + x * 4 + 3] > alphaMin) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < minX || maxY < minY) return full;

  const pad = 4;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(W - 1, maxX + pad);
  maxY = Math.min(H - 1, maxY + pad);

  const cw = maxX - minX + 1;
  const ch = maxY - minY + 1;
  const cropped = document.createElement("canvas");
  cropped.width = cw;
  cropped.height = ch;
  const cctx = cropped.getContext("2d");
  if (!cctx) return full;
  cctx.drawImage(full, minX, minY, cw, ch, 0, 0, cw, ch);
  return cropped;
}

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

const SPRITE_SRCS: Record<string, { src: string; removeBg: boolean }> = {
  flap: { src: "/arise/chikun-flap.png", removeBg: true },
  coast: { src: "/arise/chikun-coast.png", removeBg: true },
  fall: { src: "/arise/chikun-fall.png", removeBg: true },
  tower: { src: "/arise/bigcorp-tower.png", removeBg: false },
};

type SpriteSource = HTMLImageElement | HTMLCanvasElement;

// ============================================================
// AUDIO — Web Audio API synthesis, no hosted files
// ============================================================
let audioCtx: AudioContext | null = null;
let audioMuted = false;
let masterGain: GainNode | null = null;

function ensureAudio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (audioMuted) return null;
  if (!audioCtx) {
    try {
      const Ctor =
        (window as unknown as { AudioContext?: typeof AudioContext }).AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      audioCtx = new Ctor();
      masterGain = audioCtx.createGain();
      masterGain.gain.value = 0.8;
      masterGain.connect(audioCtx.destination);
    } catch {
      return null;
    }
  }
  if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function audioDest(): AudioNode | null {
  return masterGain;
}

function sfxFlap() {
  const ctx = ensureAudio();
  const dest = audioDest();
  if (!ctx || !dest) return;
  const t = ctx.currentTime;
  const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.18), ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.setValueAtTime(1800, t);
  lp.frequency.exponentialRampToValueAtTime(400, t + 0.14);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.22, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
  src.connect(lp).connect(g).connect(dest);
  src.start(t);
}

function sfxCoin(combo: number) {
  const ctx = ensureAudio();
  const dest = audioDest();
  if (!ctx || !dest) return;
  const t = ctx.currentTime;
  const base = 760 * Math.pow(2, Math.min(combo, 10) / 12);
  const o = ctx.createOscillator();
  o.type = "triangle";
  o.frequency.setValueAtTime(base, t);
  o.frequency.exponentialRampToValueAtTime(base * 1.5, t + 0.06);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.2, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
  o.connect(g).connect(dest);
  o.start(t);
  o.stop(t + 0.25);

  // Sparkle overtone
  const o2 = ctx.createOscillator();
  o2.type = "sine";
  o2.frequency.setValueAtTime(base * 2, t);
  const g2 = ctx.createGain();
  g2.gain.setValueAtTime(0.0001, t);
  g2.gain.exponentialRampToValueAtTime(0.08, t + 0.005);
  g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
  o2.connect(g2).connect(dest);
  o2.start(t);
  o2.stop(t + 0.18);
}

function sfxTowerPass() {
  const ctx = ensureAudio();
  const dest = audioDest();
  if (!ctx || !dest) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  o.type = "square";
  o.frequency.setValueAtTime(540, t);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.05, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
  o.connect(g).connect(dest);
  o.start(t);
  o.stop(t + 0.08);
}

function sfxDeath() {
  const ctx = ensureAudio();
  const dest = audioDest();
  if (!ctx || !dest) return;
  const t = ctx.currentTime;
  const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.45), ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.setValueAtTime(2200, t);
  lp.frequency.exponentialRampToValueAtTime(300, t + 0.4);
  const g1 = ctx.createGain();
  g1.gain.setValueAtTime(0.3, t);
  g1.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
  src.connect(lp).connect(g1).connect(dest);
  src.start(t);

  const o = ctx.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(190, t);
  o.frequency.exponentialRampToValueAtTime(38, t + 0.55);
  const g2 = ctx.createGain();
  g2.gain.setValueAtTime(0.35, t);
  g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
  o.connect(g2).connect(dest);
  o.start(t);
  o.stop(t + 0.65);
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function ArisGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const imagesRef = useRef<Record<string, SpriteSource | null>>({});
  const [assetsReady, setAssetsReady] = useState(false);

  const stateRef = useRef<GameState>("idle");
  const chikunRef = useRef({ y: CFG.canvas.h / 2, vy: 0, lastFlap: 0 });
  const towersRef = useRef<Tower[]>([]);
  const coinsRef = useRef<Coin[]>([]);
  const feathersRef = useRef<Feather[]>([]);
  const sparksRef = useRef<Spark[]>([]);
  const scoreRef = useRef(0);
  const coinCountRef = useRef(0);
  const comboRef = useRef(0);
  const scrollSpeedRef = useRef(CFG.scroll.initial);
  const worldXRef = useRef(0);

  // Juice refs
  const shakeRef = useRef(0);
  const hitStopUntilRef = useRef(0);
  const flapScaleTRef = useRef(0);
  const trailRef = useRef<Array<{ x: number; y: number }>>([]);

  const [uiState, setUiState] = useState<GameState>("idle");
  const [lastScore, setLastScore] = useState(0);
  const [lastCoins, setLastCoins] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [muted, setMuted] = useState(false);

  // ---- Load assets ----
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const entries = await Promise.all(
        Object.entries(SPRITE_SRCS).map(async ([k, { src, removeBg }]) => {
          const img = await loadImage(src);
          if (!img) return [k, null] as const;
          const processed = removeBg ? removeSpriteBackground(img) : img;
          return [k, processed] as const;
        })
      );
      if (cancelled) return;
      imagesRef.current = Object.fromEntries(entries);
      setAssetsReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("arise-highscore");
      if (stored) setHighScore(parseInt(stored, 10) || 0);
      const m = localStorage.getItem("arise-muted");
      if (m === "1") {
        audioMuted = true;
        setMuted(true);
      }
    } catch {}
  }, []);

  const saveHighScore = useCallback((score: number) => {
    try {
      localStorage.setItem("arise-highscore", String(score));
    } catch {}
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      audioMuted = next;
      try {
        localStorage.setItem("arise-muted", next ? "1" : "0");
      } catch {}
      return next;
    });
  }, []);

  // ============================================================
  // GAME ACTIONS
  // ============================================================
  const resetGame = useCallback(() => {
    chikunRef.current = { y: CFG.canvas.h / 2, vy: 0, lastFlap: 0 };
    towersRef.current = [];
    coinsRef.current = [];
    feathersRef.current = [];
    sparksRef.current = [];
    trailRef.current = [];
    scoreRef.current = 0;
    coinCountRef.current = 0;
    comboRef.current = 0;
    scrollSpeedRef.current = CFG.scroll.initial;
    shakeRef.current = 0;
    hitStopUntilRef.current = 0;
    flapScaleTRef.current = 0;
  }, []);

  const spawnFirstTower = () => {
    towersRef.current.push({
      x: CFG.canvas.w + CFG.tower.firstTowerXOffset,
      gapY: CFG.canvas.h / 2,
      passed: false,
    });
    coinsRef.current.push({
      x: CFG.canvas.w + CFG.tower.firstTowerXOffset,
      y: CFG.canvas.h / 2,
      collected: false,
    });
  };

  const startGame = useCallback(() => {
    resetGame();
    chikunRef.current.vy = CFG.physics.flapV;
    chikunRef.current.lastFlap = performance.now();
    flapScaleTRef.current = 1;
    spawnFirstTower();
    sfxFlap();
    stateRef.current = "playing";
    setUiState("playing");
  }, [resetGame]);

  const endGame = useCallback(() => {
    stateRef.current = "gameover";
    const finalScore = scoreRef.current;
    const finalCoins = coinCountRef.current;
    setLastScore(finalScore);
    setLastCoins(finalCoins);
    if (finalScore > highScore) {
      setHighScore(finalScore);
      saveHighScore(finalScore);
    }
    const c = chikunRef.current;
    for (let i = 0; i < CFG.featherOnDeath; i++) {
      feathersRef.current.push(spawnFeather(CFG.chikun.x, c.y, 3.5));
    }
    // Spark burst on death too
    for (let i = 0; i < 14; i++) {
      sparksRef.current.push(spawnSpark(CFG.chikun.x, c.y, 4.5));
    }
    shakeRef.current = CFG.juice.deathShake;
    hitStopUntilRef.current = performance.now() + CFG.juice.hitStopMs;
    comboRef.current = 0;
    sfxDeath();
    setUiState("gameover");
  }, [highScore, saveHighScore]);

  const flap = useCallback(() => {
    const st = stateRef.current;
    if (st === "idle" || st === "gameover") {
      startGame();
      return;
    }
    chikunRef.current.vy = CFG.physics.flapV;
    chikunRef.current.lastFlap = performance.now();
    flapScaleTRef.current = 1;
    for (let i = 0; i < CFG.featherOnFlap; i++) {
      feathersRef.current.push(spawnFeather(CFG.chikun.x, chikunRef.current.y, 1.8));
    }
    sfxFlap();
  }, [startGame]);

  // ============================================================
  // INPUT
  // ============================================================
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
        if (e.repeat) return;
        e.preventDefault();
        flap();
      } else if (e.code === "KeyM") {
        toggleMute();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flap, toggleMute]);

  const handlePointer = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      flap();
    },
    [flap]
  );

  // ============================================================
  // GAME LOOP
  // ============================================================
  useEffect(() => {
    if (!assetsReady) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = CFG.canvas.w * dpr;
    canvas.height = CFG.canvas.h * dpr;

    let lastTime = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(33, now - lastTime);
      lastTime = now;
      update(dt, now);
      render(ctx, dpr);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [assetsReady]);

  // ---- UPDATE ----
  const update = (dt: number, now: number) => {
    const state = stateRef.current;

    // Decay juice state every frame regardless of freeze
    flapScaleTRef.current = Math.max(
      0,
      flapScaleTRef.current - dt / CFG.juice.flapSquashMs
    );
    shakeRef.current *= CFG.juice.shakeDecay;
    if (shakeRef.current < 0.2) shakeRef.current = 0;

    updateFeathers();
    updateSparks();

    // Hit-stop: freeze all motion briefly on death
    if (now < hitStopUntilRef.current) return;

    worldXRef.current += state === "playing" ? scrollSpeedRef.current : 0.8;

    if (state === "idle") {
      const t = performance.now() / 500;
      chikunRef.current.y = CFG.canvas.h / 2 + Math.sin(t) * 14;
      return;
    }

    if (state === "gameover") {
      const c = chikunRef.current;
      c.vy = Math.min(c.vy + CFG.physics.deathGravity, CFG.physics.maxFall);
      c.y += c.vy;
      return;
    }

    const c = chikunRef.current;
    c.vy = Math.min(c.vy + CFG.physics.gravity, CFG.physics.maxFall);
    c.y += c.vy;

    // Update trail history
    trailRef.current.push({ x: CFG.chikun.x, y: c.y });
    if (trailRef.current.length > CFG.juice.trailLines + 2) trailRef.current.shift();

    const speed = scrollSpeedRef.current;
    for (const t of towersRef.current) {
      t.x -= speed;
      if (!t.passed && t.x + CFG.tower.width / 2 < CFG.chikun.x) {
        t.passed = true;
        scoreRef.current += CFG.towerScore;
        scrollSpeedRef.current = Math.min(
          CFG.scroll.max,
          scrollSpeedRef.current + CFG.scroll.rampPerTower
        );
        sfxTowerPass();
      }
    }

    // Coin motion + magnet toward Chikun when close
    for (const coin of coinsRef.current) {
      coin.x -= speed;
      if (coin.collected) continue;
      const dx = CFG.chikun.x - coin.x;
      const dy = c.y - coin.y;
      const distSq = dx * dx + dy * dy;
      if (distSq < CFG.coin.magnetRadius * CFG.coin.magnetRadius) {
        const dist = Math.sqrt(distSq);
        const pull = (1 - dist / CFG.coin.magnetRadius) * CFG.coin.magnetStrength;
        coin.x += dx * pull;
        coin.y += dy * pull;
      }
    }

    towersRef.current = towersRef.current.filter(
      (t) => t.x + CFG.tower.width > -20
    );
    coinsRef.current = coinsRef.current.filter(
      (co) => co.x > -40 && !co.collected
    );
    const last = towersRef.current[towersRef.current.length - 1];
    if (last && CFG.canvas.w - last.x >= CFG.tower.spacing) {
      spawnTower(last.x + CFG.tower.spacing);
    }

    for (const coin of coinsRef.current) {
      if (coin.collected) continue;
      const dx = coin.x - CFG.chikun.x;
      const dy = coin.y - c.y;
      if (dx * dx + dy * dy < (CFG.coin.radius + CFG.chikun.hitRadius) ** 2) {
        coin.collected = true;
        coinCountRef.current += 1;
        comboRef.current += 1;
        scoreRef.current += CFG.coin.value;
        sfxCoin(comboRef.current);
        for (let i = 0; i < CFG.juice.sparksOnCoin; i++) {
          sparksRef.current.push(spawnSpark(coin.x, coin.y, 3.2));
        }
      }
    }

    if (c.y - CFG.chikun.hitRadius <= 0) {
      c.y = CFG.chikun.hitRadius;
      c.vy = 0;
    }
    if (c.y + CFG.chikun.hitRadius >= CFG.canvas.h - 40) {
      endGame();
      return;
    }

    for (const t of towersRef.current) {
      const inTowerX =
        CFG.chikun.x + CFG.chikun.hitRadius > t.x - CFG.tower.width / 2 &&
        CFG.chikun.x - CFG.chikun.hitRadius < t.x + CFG.tower.width / 2;
      if (!inTowerX) continue;
      const topEdge = t.gapY - CFG.tower.gap / 2;
      const bottomEdge = t.gapY + CFG.tower.gap / 2;
      if (c.y - CFG.chikun.hitRadius < topEdge || c.y + CFG.chikun.hitRadius > bottomEdge) {
        endGame();
        return;
      }
    }
  };

  const spawnTower = (x: number) => {
    const gapY =
      CFG.tower.minGapY +
      Math.random() * (CFG.tower.maxGapY - CFG.tower.minGapY);
    towersRef.current.push({ x, gapY, passed: false });
    coinsRef.current.push({ x, y: gapY, collected: false });
  };

  const updateFeathers = () => {
    for (const f of feathersRef.current) {
      f.x += f.vx;
      f.y += f.vy;
      f.vy += 0.05;
      f.vx *= 0.99;
      f.rot += f.vrot;
      f.life -= 0.008;
    }
    feathersRef.current = feathersRef.current.filter((f) => f.life > 0);
  };

  const updateSparks = () => {
    for (const s of sparksRef.current) {
      s.x += s.vx;
      s.y += s.vy;
      s.vx *= 0.9;
      s.vy *= 0.9;
      s.vy += 0.1;
      s.life -= 0.035;
    }
    sparksRef.current = sparksRef.current.filter((s) => s.life > 0);
  };

  // ---- RENDER ----
  const render = (ctx: CanvasRenderingContext2D, dpr: number) => {
    const { w, h } = CFG.canvas;

    // Reset transform each frame so shake can be applied fresh
    const shake = shakeRef.current;
    const shakeX = shake > 0 ? (Math.random() - 0.5) * shake : 0;
    const shakeY = shake > 0 ? (Math.random() - 0.5) * shake : 0;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.translate(shakeX, shakeY);

    // Sky gradient
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, COLORS.skyTop);
    grad.addColorStop(0.55, COLORS.skyMid);
    grad.addColorStop(1, COLORS.skyBot);
    ctx.fillStyle = grad;
    ctx.fillRect(-shake, -shake, w + shake * 2, h + shake * 2);

    drawCitySilhouette(ctx, worldXRef.current * 0.15, h - 210, 190, "rgba(5, 8, 14, 0.55)", 95);
    drawCitySilhouette(ctx, worldXRef.current * 0.35, h - 130, 130, "rgba(5, 8, 14, 0.85)", 70);

    ctx.fillStyle = COLORS.ground;
    ctx.fillRect(0, h - 40, w, 40);
    ctx.strokeStyle = COLORS.groundEdge;
    ctx.lineWidth = 3;
    ctx.shadowColor = COLORS.groundEdge;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(0, h - 40);
    ctx.lineTo(w, h - 40);
    ctx.stroke();
    ctx.shadowBlur = 0;

    for (const t of towersRef.current) drawTower(ctx, t);
    for (const coin of coinsRef.current) {
      if (!coin.collected) drawCoin(ctx, coin.x, coin.y);
    }

    // Speed-line trail behind Chikun while playing
    if (stateRef.current === "playing") {
      drawSpeedLines(ctx, chikunRef.current.y);
    }

    for (const f of feathersRef.current) drawFeather(ctx, f);
    for (const s of sparksRef.current) drawSpark(ctx, s);
    drawChikun(ctx);

    // HUD: score
    if (stateRef.current === "playing") {
      ctx.font = "900 64px system-ui, -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.fillText(String(scoreRef.current), w / 2 + 3, 30 + 3);
      ctx.fillStyle = "#ffffff";
      ctx.fillText(String(scoreRef.current), w / 2, 30);

      // Combo indicator when 2+
      if (comboRef.current >= 2) {
        ctx.font = "900 28px system-ui, -apple-system, sans-serif";
        ctx.fillStyle = COLORS.lime;
        ctx.shadowColor = "rgba(0,0,0,0.8)";
        ctx.shadowBlur = 6;
        ctx.fillText(`×${comboRef.current}`, w / 2, 100);
        ctx.shadowBlur = 0;
      }
    }
  };

  const drawChikun = (ctx: CanvasRenderingContext2D) => {
    const c = chikunRef.current;
    const imgs = imagesRef.current;
    const now = performance.now();

    let spriteKey: "flap" | "coast" | "fall";
    if (stateRef.current === "gameover") {
      spriteKey = "fall";
    } else if (now - c.lastFlap < CFG.flapAnimMs) {
      spriteKey = "flap";
    } else {
      spriteKey = "coast";
    }
    const img = imgs[spriteKey];

    let rot = 0;
    if (stateRef.current === "playing") {
      rot = Math.max(-0.35, Math.min(0.9, c.vy / 14));
    } else if (stateRef.current === "gameover") {
      rot = 1.0;
    }

    // Squash-and-stretch: on flap, briefly stretch vertically and compress horizontally
    const sq = flapScaleTRef.current;
    const scaleY = 1 + 0.18 * sq;
    const scaleX = 1 - 0.08 * sq;

    ctx.save();
    ctx.translate(CFG.chikun.x, c.y);
    ctx.rotate(rot);
    ctx.scale(scaleX, scaleY);
    if (img) {
      const naturalW =
        (img as HTMLImageElement).naturalWidth || (img as HTMLCanvasElement).width;
      const naturalH =
        (img as HTMLImageElement).naturalHeight || (img as HTMLCanvasElement).height;
      const aspect = naturalH > 0 ? naturalW / naturalH : 1;
      const h = CFG.chikun.size;
      const w = h * aspect;
      ctx.drawImage(img, -w / 2, -h / 2, w, h);
    } else {
      ctx.fillStyle = COLORS.red;
      ctx.beginPath();
      ctx.arc(0, 0, CFG.chikun.hitRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = COLORS.neonGreen;
      ctx.fillRect(4, -8, 10, 4);
    }
    ctx.restore();
  };

  const drawTower = (ctx: CanvasRenderingContext2D, t: Tower) => {
    const img = imagesRef.current.tower;
    const topH = t.gapY - CFG.tower.gap / 2;
    const bottomY = t.gapY + CFG.tower.gap / 2;
    const bottomH = CFG.canvas.h - 40 - bottomY;
    const x = t.x - CFG.tower.width / 2;

    const srcW = img
      ? (img as HTMLImageElement).naturalWidth || (img as HTMLCanvasElement).width
      : 0;
    const srcH = img
      ? (img as HTMLImageElement).naturalHeight || (img as HTMLCanvasElement).height
      : 0;

    if (img && srcW > 0 && srcH > 0) {
      const topSrcH = Math.min(srcH, topH * (srcW / CFG.tower.width));
      ctx.drawImage(
        img as CanvasImageSource,
        0, srcH - topSrcH,
        srcW, topSrcH,
        x, 0,
        CFG.tower.width, topH
      );
      const botSrcH = Math.min(srcH, bottomH * (srcW / CFG.tower.width));
      ctx.drawImage(
        img as CanvasImageSource,
        0, 0,
        srcW, botSrcH,
        x, bottomY,
        CFG.tower.width, bottomH
      );
    } else {
      ctx.fillStyle = COLORS.towerFill;
      ctx.fillRect(x, 0, CFG.tower.width, topH);
      ctx.fillRect(x, bottomY, CFG.tower.width, bottomH);
      ctx.fillStyle = COLORS.towerWindow;
      for (let wy = 20; wy < topH - 10; wy += 22) {
        for (let wx = x + 10; wx < x + CFG.tower.width - 10; wx += 18) {
          if ((wx + wy) % 3 !== 0) ctx.fillRect(wx, wy, 6, 10);
        }
      }
      for (let wy = bottomY + 10; wy < bottomY + bottomH - 10; wy += 22) {
        for (let wx = x + 10; wx < x + CFG.tower.width - 10; wx += 18) {
          if ((wx + wy) % 3 !== 0) ctx.fillRect(wx, wy, 6, 10);
        }
      }
    }

    ctx.strokeStyle = COLORS.towerStroke;
    ctx.lineWidth = 3;
    ctx.shadowColor = COLORS.towerStroke;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(x - 2, topH);
    ctx.lineTo(x + CFG.tower.width + 2, topH);
    ctx.moveTo(x - 2, bottomY);
    ctx.lineTo(x + CFG.tower.width + 2, bottomY);
    ctx.stroke();
    ctx.shadowBlur = 0;
  };

  const drawCoin = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const r = CFG.coin.radius;
    const t = performance.now() / 180;
    const squish = Math.abs(Math.sin(t));
    const rx = r * (0.3 + 0.7 * squish);
    ctx.save();
    ctx.translate(x, y);
    const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 2);
    glow.addColorStop(0, "rgba(0, 214, 50, 0.45)");
    glow.addColorStop(1, "rgba(0, 214, 50, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(0, 0, r * 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = COLORS.coinBody;
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, r, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = COLORS.coinRim;
    ctx.lineWidth = 2;
    ctx.stroke();
    if (squish > 0.35) {
      ctx.fillStyle = "#1a1d24";
      ctx.font = `900 ${Math.round(r * 1.6)}px system-ui, -apple-system, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Ł", 0, 2);
    }
    ctx.restore();
  };

  const drawFeather = (ctx: CanvasRenderingContext2D, f: Feather) => {
    ctx.save();
    ctx.translate(f.x, f.y);
    ctx.rotate(f.rot);
    ctx.globalAlpha = Math.max(0, f.life);
    ctx.fillStyle = COLORS.feather;
    ctx.beginPath();
    ctx.ellipse(0, 0, 10, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.25)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  };

  const drawSpark = (ctx: CanvasRenderingContext2D, s: Spark) => {
    ctx.save();
    ctx.globalAlpha = Math.max(0, s.life);
    ctx.fillStyle = COLORS.lime;
    ctx.shadowColor = COLORS.neonGreen;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();
  };

  const drawSpeedLines = (ctx: CanvasRenderingContext2D, chikunY: number) => {
    const speed = scrollSpeedRef.current;
    const intensity = Math.min(1, (speed - CFG.scroll.initial) / (CFG.scroll.max - CFG.scroll.initial));
    const lines = CFG.juice.trailLines;
    for (let i = 0; i < lines; i++) {
      const t = i / lines;
      const alpha = (0.18 + 0.22 * intensity) * (1 - t);
      const lineLen = 26 + 30 * intensity + i * 6;
      const offsetX = 36 + i * 22;
      const jitterY = (Math.random() - 0.5) * 10;
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(CFG.chikun.x - offsetX, chikunY + jitterY);
      ctx.lineTo(CFG.chikun.x - offsetX - lineLen, chikunY + jitterY);
      ctx.stroke();
    }
  };

  const drawCitySilhouette = (
    ctx: CanvasRenderingContext2D,
    offset: number,
    y: number,
    height: number,
    color: string,
    segment: number
  ) => {
    ctx.fillStyle = color;
    const start = Math.floor(offset / segment) * segment;
    for (let i = 0; i < Math.ceil(CFG.canvas.w / segment) + 2; i++) {
      const bx = i * segment + start - offset;
      const seed = Math.floor((start + i * segment) / segment);
      const h = height * (0.55 + ((seed * 9301 + 49297) % 233280) / 233280 * 0.45);
      ctx.fillRect(bx, y + (height - h), segment - 4, h);
    }
  };

  // ============================================================
  // RENDER (React)
  // ============================================================
  return (
    <div className="relative mx-auto flex w-full flex-col items-center select-none">
      <div
        className="relative overflow-hidden border-[3px] border-black rounded-[20px] shadow-[8px_8px_0_0_#000]"
        style={{
          aspectRatio: `${CFG.canvas.w} / ${CFG.canvas.h}`,
          width: `min(100%, calc(86vh * ${CFG.canvas.w} / ${CFG.canvas.h}))`,
          maxHeight: "86vh",
          backgroundColor: COLORS.skyMid,
        }}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointer}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            touchAction: "none",
            cursor: "pointer",
          }}
        />

        {/* Mute toggle */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
          className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white text-sm font-black flex items-center justify-center border-2 border-white/20"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? "OFF" : "ON"}
        </button>

        {/* LOADING */}
        {!assetsReady && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: COLORS.skyMid }}
          >
            <div className="font-black tracking-[0.3em] text-black text-sm">
              LOADING THE CHANT...
            </div>
          </div>
        )}

        {/* IDLE / START */}
        {assetsReady && uiState === "idle" && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between py-8 px-6 text-center">
            <div className="flex flex-col items-center gap-2 mt-4">
              <div className="inline-block bg-black text-white font-black text-[10px] tracking-[0.35em] px-3 py-1 rounded-full">
                CHAPTER ONE · FLIGHT
              </div>
              <h1
                className="text-black font-black leading-[0.85] tracking-tight mt-2"
                style={{ fontSize: "clamp(80px, 18vw, 160px)" }}
              >
                ARISE
              </h1>
              <div
                className="font-black leading-[0.9] tracking-tight -mt-1"
                style={{
                  fontSize: "clamp(28px, 6vw, 48px)",
                  color: COLORS.lime,
                  transform: "rotate(-3deg)",
                }}
              >
                CHIKUN
              </div>
              <div className="mt-4 text-black/80 text-sm font-semibold max-w-[320px] leading-snug">
                The Elite clipped your wings. LitVM gave them back. Reclaim the sky.
              </div>
            </div>
            <div className="flex flex-col items-center gap-3 mb-2">
              <div className="px-7 py-3 bg-black text-white font-black tracking-[0.15em] text-lg rounded-full shadow-[4px_4px_0_0_rgba(0,0,0,0.25)]">
                TAP TO ARISE
              </div>
              <div className="text-[10px] tracking-[0.3em] text-black/60 font-bold">
                SPACE · CLICK · TAP · M TO MUTE
              </div>
              {highScore > 0 && (
                <div className="mt-2 inline-block bg-[#f5f1e8] text-black font-black text-[11px] tracking-[0.25em] px-3 py-1 rounded-full border-2 border-black">
                  BEST · {highScore}
                </div>
              )}
            </div>
          </div>
        )}

        {/* GAME OVER */}
        {assetsReady && uiState === "gameover" && (
          <div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center"
            style={{ background: "rgba(43, 94, 222, 0.78)" }}
          >
            <div className="inline-block bg-[#ff3344] text-white font-black text-[10px] tracking-[0.35em] px-3 py-1 rounded-[4px] border-2 border-black -rotate-2 shadow-[3px_3px_0_0_#000]">
              CLASSIFIED · INCIDENT REPORT
            </div>
            <div
              className="text-black font-black leading-[0.9] tracking-tight"
              style={{ fontSize: "clamp(26px, 5.5vw, 44px)" }}
            >
              THE ELITE CLIPPED
              <br />YOUR WINGS.
            </div>
            <div
              className="text-white font-black leading-none"
              style={{
                fontSize: "clamp(80px, 18vw, 140px)",
                textShadow: "4px 4px 0 #000",
              }}
            >
              {lastScore}
            </div>
            <div className="flex gap-3">
              <div className="bg-[#f5f1e8] text-black font-black text-[11px] tracking-[0.25em] px-3 py-1 rounded-full border-2 border-black">
                COINS · {lastCoins}
              </div>
              <div className="bg-black text-white font-black text-[11px] tracking-[0.25em] px-3 py-1 rounded-full border-2 border-black">
                BEST · {highScore}
              </div>
            </div>
            <div className="mt-3 px-7 py-3 bg-[#00d632] text-black font-black tracking-[0.15em] text-lg rounded-full border-2 border-black shadow-[4px_4px_0_0_#000]">
              TAP TO ARISE AGAIN
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// HELPERS
// ============================================================
function spawnFeather(x: number, y: number, energy: number): Feather {
  return {
    x,
    y,
    vx: (Math.random() - 0.5) * 2 * energy,
    vy: (Math.random() - 1) * energy,
    rot: Math.random() * Math.PI * 2,
    vrot: (Math.random() - 0.5) * 0.2,
    life: 1,
  };
}

function spawnSpark(x: number, y: number, energy: number): Spark {
  const angle = Math.random() * Math.PI * 2;
  const speed = energy * (0.4 + Math.random() * 0.8);
  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - 1,
    life: 1,
    size: 3 + Math.random() * 3,
  };
}
