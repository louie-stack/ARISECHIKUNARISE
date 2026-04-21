/**
 * ARISE — Web Audio synthesis. No hosted sound files.
 * SFX are instant one-shots. Music is a layered loop that unlocks tracks
 * as the player's score climbs (drums → bass → lead → pad).
 */

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let musicBus: GainNode | null = null;
let sfxBus: GainNode | null = null;
let muted = false;

export function setMuted(next: boolean) {
  muted = next;
  if (masterGain) {
    masterGain.gain.setTargetAtTime(next ? 0 : 0.8, ctxOrNull()?.currentTime ?? 0, 0.02);
  }
}
export function isMuted() { return muted; }

function ctxOrNull() { return audioCtx; }

export function ensureAudio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    try {
      const Ctor =
        (window as unknown as { AudioContext?: typeof AudioContext }).AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      audioCtx = new Ctor();
      masterGain = audioCtx.createGain();
      masterGain.gain.value = muted ? 0 : 0.8;
      masterGain.connect(audioCtx.destination);

      musicBus = audioCtx.createGain();
      musicBus.gain.value = 0.55;
      musicBus.connect(masterGain);

      sfxBus = audioCtx.createGain();
      sfxBus.gain.value = 1;
      sfxBus.connect(masterGain);
    } catch {
      return null;
    }
  }
  if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function sfx(): AudioNode | null { return sfxBus; }

// ============================================================
// SFX
// ============================================================
export function sfxFlap() {
  const ctx = ensureAudio();
  const dest = sfx();
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

export function sfxCoin(combo: number) {
  const ctx = ensureAudio();
  const dest = sfx();
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

export function sfxTowerPass() {
  const ctx = ensureAudio();
  const dest = sfx();
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

export function sfxDeath() {
  const ctx = ensureAudio();
  const dest = sfx();
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

// Power-up pickup — quick rising arpeggio.
export function sfxPowerup() {
  const ctx = ensureAudio();
  const dest = sfx();
  if (!ctx || !dest) return;
  const t0 = ctx.currentTime;
  const notes = [660, 880, 1320];
  notes.forEach((f, i) => {
    const o = ctx.createOscillator();
    o.type = "triangle";
    o.frequency.setValueAtTime(f, t0 + i * 0.05);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0 + i * 0.05);
    g.gain.exponentialRampToValueAtTime(0.18, t0 + i * 0.05 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + i * 0.05 + 0.18);
    o.connect(g).connect(dest);
    o.start(t0 + i * 0.05);
    o.stop(t0 + i * 0.05 + 0.22);
  });
}

// Shield hit — low thunk, the shield absorbing a blow.
export function sfxShieldHit() {
  const ctx = ensureAudio();
  const dest = sfx();
  if (!ctx || !dest) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(220, t);
  o.frequency.exponentialRampToValueAtTime(80, t + 0.25);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.35, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
  o.connect(g).connect(dest);
  o.start(t);
  o.stop(t + 0.32);
}

// Short buzzy chord used when entering a new zone.
export function sfxZone() {
  const ctx = ensureAudio();
  const dest = sfx();
  if (!ctx || !dest) return;
  const t = ctx.currentTime;
  const freqs = [330, 415, 494];
  freqs.forEach((f) => {
    const o = ctx.createOscillator();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(f, t);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.08, t + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 1600;
    o.connect(lp).connect(g).connect(dest);
    o.start(t);
    o.stop(t + 0.72);
  });
}

// Boss warning klaxon — alternating tones.
export function sfxBossWarn() {
  const ctx = ensureAudio();
  const dest = sfx();
  if (!ctx || !dest) return;
  const t = ctx.currentTime;
  for (let i = 0; i < 3; i++) {
    const o = ctx.createOscillator();
    o.type = "square";
    o.frequency.setValueAtTime(i % 2 === 0 ? 440 : 330, t + i * 0.14);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t + i * 0.14);
    g.gain.exponentialRampToValueAtTime(0.15, t + i * 0.14 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.14 + 0.12);
    o.connect(g).connect(dest);
    o.start(t + i * 0.14);
    o.stop(t + i * 0.14 + 0.14);
  }
}

// Boss defeat / zone cleared — triumphant rising run.
export function sfxTriumph() {
  const ctx = ensureAudio();
  const dest = sfx();
  if (!ctx || !dest) return;
  const t0 = ctx.currentTime;
  const notes = [523, 659, 784, 1047];
  notes.forEach((f, i) => {
    const o = ctx.createOscillator();
    o.type = "triangle";
    o.frequency.setValueAtTime(f, t0 + i * 0.08);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0 + i * 0.08);
    g.gain.exponentialRampToValueAtTime(0.22, t0 + i * 0.08 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + i * 0.08 + 0.34);
    o.connect(g).connect(dest);
    o.start(t0 + i * 0.08);
    o.stop(t0 + i * 0.08 + 0.4);
  });
}

// Crowd chant swell — filtered noise bed with a rising vowel formant.
export function sfxChant() {
  const ctx = ensureAudio();
  const dest = sfx();
  if (!ctx || !dest) return;
  const t = ctx.currentTime;
  const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 1.4), ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * 0.6;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.Q.value = 4;
  bp.frequency.setValueAtTime(400, t);
  bp.frequency.linearRampToValueAtTime(1100, t + 1.1);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.22, t + 0.3);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
  src.connect(bp).connect(g).connect(dest);
  src.start(t);
}

// ============================================================
// MUSIC — looping synthwave score.
// Progression: i–VI–III–VII in A minor (Am – F – C – G), a 2-bar loop at
// 114 BPM on a 16th-note grid (32 steps, 8 steps per chord). Four layers
// fade in as the score climbs: drums → bass → arp → pad.
// ============================================================
const SEMI = (base: number, semis: number) => base * Math.pow(2, semis / 12);

// padBase is A2 (110 Hz). Chord definitions are semitone offsets from A2 so
// shifting the key only touches one number.
// Chord "tones" are mid-register voicings used by pad/arp; "root" is the deep
// bass note (one octave below chord tone root).
interface Chord {
  root: number;      // semitones from A2 (bass octave)
  tones: number[];   // chord tones relative to A2 (for pad + arp scale)
}
const PROGRESSION: Chord[] = [
  { root: -12, tones: [0, 3, 7, 12] },    // Am: A2 bass, A3 C4 E4 A4 tones
  { root: -16, tones: [-4, 0, 3, 8] },    // F:  F2 bass, F3 A3 C4 F4
  { root: -21, tones: [3, 7, 10, 15] },   // C:  C2 bass, C4 E4 G4 C5
  { root: -14, tones: [-2, 2, 5, 10] },   // G:  G2 bass, G3 B3 D4 G4
];

class Music {
  private started = false;
  private nodes: GainNode[] = [];
  private step = 0;
  private nextStepAt = 0;
  private bpm = 114;
  private padBase = 110; // A2
  private currentChordForPad = -1;

  private createLayer(): GainNode | null {
    const ctx = ensureAudio();
    if (!ctx || !musicBus) return null;
    const g = ctx.createGain();
    g.gain.value = 0;
    g.connect(musicBus);
    this.nodes.push(g);
    return g;
  }

  start() {
    if (this.started) return;
    const ctx = ensureAudio();
    if (!ctx || !musicBus) return;
    this.started = true;
    // Buses: 0 drums, 1 bass, 2 arp, 3 pad
    for (let i = 0; i < 4; i++) this.createLayer();
    this.step = 0;
    this.currentChordForPad = -1;
    this.nextStepAt = ctx.currentTime + 0.08;
  }

  setLayers(level: number) {
    const ctx = ctxOrNull();
    if (!ctx) return;
    const vols = [0, 0, 0, 0];
    if (level >= 1) vols[0] = 0.55; // drums
    if (level >= 2) vols[1] = 0.42; // bass
    if (level >= 3) vols[2] = 0.28; // arp
    if (level >= 4) vols[3] = 0.22; // pad
    for (let i = 0; i < this.nodes.length; i++) {
      const n = this.nodes[i];
      if (!n) continue;
      n.gain.setTargetAtTime(vols[i], ctx.currentTime, 0.5);
    }
  }

  setKey(accentHz: number) {
    // Anchor the progression to a tonal center; zones can nudge it up a semi or two.
    this.padBase = accentHz;
  }

  tick() {
    if (!this.started) return;
    const ctx = ctxOrNull();
    if (!ctx) return;
    const stepDur = 60 / this.bpm / 4; // 16th notes
    if (this.nextStepAt < ctx.currentTime - 0.5) {
      this.nextStepAt = ctx.currentTime + 0.05;
      this.step = 0;
      this.currentChordForPad = -1;
    }
    while (this.nextStepAt < ctx.currentTime + 0.2) {
      this.scheduleStep(this.nextStepAt, this.step);
      this.step = (this.step + 1) % 32;
      this.nextStepAt += stepDur;
    }
  }

  stop() {
    this.setLayers(0);
  }

  private scheduleStep(t: number, step: number) {
    const ctx = ctxOrNull();
    if (!ctx) return;
    const [drumG, bassG, arpG, padG] = this.nodes;

    const chordIdx = Math.floor(step / 8);
    const chord = PROGRESSION[chordIdx];
    const stepInChord = step % 8;

    // ---- DRUMS: 4-on-the-floor kick, backbeat snare+clap, 16th hats ----
    if (drumG) {
      // Kick on every beat (every 4 16ths)
      if (step % 4 === 0) this.kick(t, drumG);
      // Plus ghost kick just before the last beat for groove
      if (step === 30) this.kick(t, drumG, 0.55);

      // Snare + clap on 2 and 4 of each bar
      if (step === 4 || step === 12 || step === 20 || step === 28) {
        this.snare(t, drumG);
        this.clap(t, drumG);
      }

      // Closed hat every 16th with dynamic accents
      const hatVol =
        step % 4 === 0 ? 0.035 : step % 2 === 0 ? 0.022 : 0.04; // accent the "and"s
      this.hat(t, drumG, hatVol);

      // Open hat on every "and of 4" (classic synthwave)
      if (step === 14 || step === 30) this.openHat(t, drumG);
    }

    // ---- BASS: rhythmic root pulse per chord ----
    if (bassG) {
      // 8-step pattern within each chord: root pumps on beat, octave accent on 7
      // Beats:      1   .   .   .   2   .   .   .
      // 16ths: 0   1   2   3   4   5   6   7
      const pattern: Array<number | null> = [
        0,    null, null, null, 0,    null, 12,   null,
      ];
      const off = pattern[stepInChord];
      if (off != null) {
        const hz = SEMI(this.padBase, chord.root + off);
        this.bass(t, bassG, hz);
      }
    }

    // ---- ARP: detuned saw duet climbing/descending chord tones ----
    if (arpG) {
      // Play on every 8th-note (even steps)
      if (step % 2 === 0) {
        // 16-note up-down-up pattern indexing chord.tones [0..3]
        const idx = step / 2;
        const upDown = [0, 1, 2, 3, 2, 1, 0, 1, 2, 1, 2, 3, 2, 3, 2, 1];
        const toneIdx = upDown[idx % 16];
        const semi = chord.tones[toneIdx] + 12; // up an octave from pad voicing
        this.arp(t, arpG, SEMI(this.padBase, semi));
      }
    }

    // ---- PAD: sustained chord re-triggered at each chord change ----
    if (padG && chordIdx !== this.currentChordForPad && stepInChord === 0) {
      this.currentChordForPad = chordIdx;
      for (const semi of chord.tones) {
        this.pad(t, padG, SEMI(this.padBase, semi));
      }
    }
  }

  // ============================================================
  // VOICES
  // ============================================================
  private kick(t: number, bus: GainNode, vel = 1) {
    const ctx = ctxOrNull(); if (!ctx) return;
    // Body: 95 → 42 Hz sine thump
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(95, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.16);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(1.0 * vel, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.24);
    o.connect(g).connect(bus);
    o.start(t); o.stop(t + 0.26);
    // Click transient for attack
    const click = ctx.createOscillator();
    click.type = "triangle";
    click.frequency.setValueAtTime(1800, t);
    click.frequency.exponentialRampToValueAtTime(180, t + 0.02);
    const cg = ctx.createGain();
    cg.gain.setValueAtTime(0.0001, t);
    cg.gain.exponentialRampToValueAtTime(0.35 * vel, t + 0.002);
    cg.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
    click.connect(cg).connect(bus);
    click.start(t); click.stop(t + 0.04);
  }

  private snare(t: number, bus: GainNode) {
    const ctx = ctxOrNull(); if (!ctx) return;
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.2), ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 2400;
    bp.Q.value = 0.8;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.5, t + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
    src.connect(bp).connect(g).connect(bus);
    src.start(t);
    // Tonal layer adds body
    const o = ctx.createOscillator();
    o.type = "triangle";
    o.frequency.setValueAtTime(240, t);
    o.frequency.exponentialRampToValueAtTime(110, t + 0.08);
    const og = ctx.createGain();
    og.gain.setValueAtTime(0.0001, t);
    og.gain.exponentialRampToValueAtTime(0.18, t + 0.004);
    og.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
    o.connect(og).connect(bus);
    o.start(t); o.stop(t + 0.14);
  }

  private clap(t: number, bus: GainNode) {
    const ctx = ctxOrNull(); if (!ctx) return;
    // Three filtered noise bursts, slightly spaced — that handclap spread.
    for (let i = 0; i < 3; i++) {
      const bt = t + i * 0.012;
      const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.05), ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let j = 0; j < d.length; j++) d[j] = (Math.random() * 2 - 1) * (1 - j / d.length);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 1600;
      bp.Q.value = 1.2;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, bt);
      g.gain.exponentialRampToValueAtTime(0.22, bt + 0.003);
      g.gain.exponentialRampToValueAtTime(0.0001, bt + 0.06);
      src.connect(bp).connect(g).connect(bus);
      src.start(bt);
    }
  }

  private hat(t: number, bus: GainNode, vol: number) {
    const ctx = ctxOrNull(); if (!ctx) return;
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.04), ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 8200;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.001);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
    src.connect(hp).connect(g).connect(bus);
    src.start(t);
  }

  private openHat(t: number, bus: GainNode) {
    const ctx = ctxOrNull(); if (!ctx) return;
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.22), ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 6500;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.06, t + 0.002);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
    src.connect(hp).connect(g).connect(bus);
    src.start(t);
  }

  private bass(t: number, bus: GainNode, hz: number) {
    const ctx = ctxOrNull(); if (!ctx) return;
    // Two saws detuned slightly for thickness, into a lowpass envelope.
    const mkOsc = (detune: number) => {
      const o = ctx.createOscillator();
      o.type = "sawtooth";
      o.frequency.setValueAtTime(hz, t);
      o.detune.value = detune;
      return o;
    };
    const o1 = mkOsc(-8);
    const o2 = mkOsc(8);
    // Sub sine for weight
    const sub = ctx.createOscillator();
    sub.type = "sine";
    sub.frequency.setValueAtTime(hz / 2, t);

    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.Q.value = 6;
    lp.frequency.setValueAtTime(900, t);
    lp.frequency.exponentialRampToValueAtTime(180, t + 0.28);

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.7, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.34);

    const subG = ctx.createGain();
    subG.gain.setValueAtTime(0.0001, t);
    subG.gain.exponentialRampToValueAtTime(0.4, t + 0.01);
    subG.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);

    o1.connect(lp); o2.connect(lp);
    lp.connect(g).connect(bus);
    sub.connect(subG).connect(bus);
    o1.start(t); o2.start(t); sub.start(t);
    o1.stop(t + 0.36); o2.stop(t + 0.36); sub.stop(t + 0.32);
  }

  private arp(t: number, bus: GainNode, hz: number) {
    const ctx = ctxOrNull(); if (!ctx) return;
    // Detuned saw pair — supersaw-lite — with a short resonant sweep.
    const mkOsc = (detune: number) => {
      const o = ctx.createOscillator();
      o.type = "sawtooth";
      o.frequency.setValueAtTime(hz, t);
      o.detune.value = detune;
      return o;
    };
    const o1 = mkOsc(-12);
    const o2 = mkOsc(12);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.Q.value = 3;
    lp.frequency.setValueAtTime(3600, t);
    lp.frequency.exponentialRampToValueAtTime(900, t + 0.24);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.22, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
    o1.connect(lp); o2.connect(lp);
    lp.connect(g).connect(bus);
    o1.start(t); o2.start(t);
    o1.stop(t + 0.28); o2.stop(t + 0.28);

    // Delay-like repeat, half volume, 3/16th later
    const rt = t + (60 / this.bpm / 4) * 3;
    const d1 = mkOsc(-12);
    const d2 = mkOsc(12);
    d1.frequency.setValueAtTime(hz, rt);
    d2.frequency.setValueAtTime(hz, rt);
    const dlp = ctx.createBiquadFilter();
    dlp.type = "lowpass";
    dlp.frequency.value = 1600;
    const dg = ctx.createGain();
    dg.gain.setValueAtTime(0.0001, rt);
    dg.gain.exponentialRampToValueAtTime(0.09, rt + 0.006);
    dg.gain.exponentialRampToValueAtTime(0.0001, rt + 0.22);
    d1.connect(dlp); d2.connect(dlp);
    dlp.connect(dg).connect(bus);
    d1.start(rt); d2.start(rt);
    d1.stop(rt + 0.24); d2.stop(rt + 0.24);
  }

  private pad(t: number, bus: GainNode, hz: number) {
    const ctx = ctxOrNull(); if (!ctx) return;
    // Two slightly detuned squares + sine for body; long bell-curve envelope
    // so the chord swells and breathes over the 8 steps of each chord slot.
    const dur = (60 / this.bpm / 4) * 8; // 8 16ths = 1 chord slot
    const mk = (type: OscillatorType, detune: number, mul: number) => {
      const o = ctx.createOscillator();
      o.type = type;
      o.frequency.setValueAtTime(hz * mul, t);
      o.detune.value = detune;
      return o;
    };
    const o1 = mk("square", -10, 1);
    const o2 = mk("square", 10, 1);
    const o3 = mk("sine", 0, 1);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 1600;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.18, t + dur * 0.35);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur * 1.05);
    o1.connect(lp); o2.connect(lp); o3.connect(lp);
    lp.connect(g).connect(bus);
    o1.start(t); o2.start(t); o3.start(t);
    o1.stop(t + dur * 1.1); o2.stop(t + dur * 1.1); o3.stop(t + dur * 1.1);
  }
}

export const music = new Music();
