/**
 * Persistent save state. All ARISE data behind one key so it's easy to wipe.
 */

const KEY = "arise-save-v2";
export const LEADERBOARD_SIZE = 10;
export const LEADERBOARD_EVENT = "arise-leaderboard-update";

export interface LeaderboardEntry {
  name: string;
  score: number;
  coins: number;
  towers: number;
  zone: number;
  timestamp: number;
}

export interface SaveState {
  highScore: number;
  bankedCoins: number;       // spendable currency balance
  lifetimeCoins: number;     // total ever collected (never decreases)
  lifetimeTowers: number;
  lifetimeRuns: number;
  lifetimeFlaps: number;
  lifetimeDeaths: number;
  bestCombo: number;
  maxZoneReached: number;
  ownedSkins: string[];
  equippedSkin: string;
  ownedTrails: string[];
  equippedTrail: string;
  achievements: string[];
  muted: boolean;
  hapticsEnabled: boolean;
  reducedMotion: boolean;
  seenTutorial: boolean;
  lastDailySeed: string | null;
  dailyBestScore: number;
  playerName: string;
  leaderboard: LeaderboardEntry[];
}

export const DEFAULT_STATE: SaveState = {
  highScore: 0,
  bankedCoins: 0,
  lifetimeCoins: 0,
  lifetimeTowers: 0,
  lifetimeRuns: 0,
  lifetimeFlaps: 0,
  lifetimeDeaths: 0,
  bestCombo: 0,
  maxZoneReached: 1,
  ownedSkins: ["default"],
  equippedSkin: "default",
  ownedTrails: ["default"],
  equippedTrail: "default",
  achievements: [],
  muted: false,
  hapticsEnabled: true,
  reducedMotion: false,
  seenTutorial: false,
  lastDailySeed: null,
  dailyBestScore: 0,
  playerName: "",
  leaderboard: [],
};

export function loadSave(): SaveState {
  if (typeof window === "undefined") return { ...DEFAULT_STATE };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      // Migrate from legacy v1 high score key
      const legacy = localStorage.getItem("arise-highscore");
      const legacyMuted = localStorage.getItem("arise-muted") === "1";
      const s: SaveState = {
        ...DEFAULT_STATE,
        highScore: legacy ? parseInt(legacy, 10) || 0 : 0,
        muted: legacyMuted,
      };
      saveState(s);
      return s;
    }
    const parsed = JSON.parse(raw) as Partial<SaveState>;
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function saveState(s: SaveState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {}
}

export function updateSave(patch: Partial<SaveState>): SaveState {
  const cur = loadSave();
  const next = { ...cur, ...patch };
  saveState(next);
  return next;
}

// ============================================================
// LEADERBOARD
// The local leaderboard is the source of truth for `<Leaderboard />`.
// Swap this file out (or wrap these helpers) when a remote backend ships —
// the game code only touches `qualifiesForLeaderboard` and `submitLeaderboardEntry`.
// ============================================================
export function qualifiesForLeaderboard(score: number): boolean {
  if (score <= 0) return false;
  const cur = loadSave();
  if (cur.leaderboard.length < LEADERBOARD_SIZE) return true;
  const cutoff = cur.leaderboard[cur.leaderboard.length - 1]?.score ?? 0;
  return score > cutoff;
}

export function submitLeaderboardEntry(
  entry: Omit<LeaderboardEntry, "timestamp">
): SaveState {
  const cur = loadSave();
  const name = (entry.name || "ANON").slice(0, 12).toUpperCase();
  const e: LeaderboardEntry = { ...entry, name, timestamp: Date.now() };
  const next = [...cur.leaderboard, e]
    .sort((a, b) => b.score - a.score || a.timestamp - b.timestamp)
    .slice(0, LEADERBOARD_SIZE);
  const out = updateSave({
    leaderboard: next,
    playerName: name,
  });
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(LEADERBOARD_EVENT));
  }
  return out;
}

// Today's seed in UTC YYYY-MM-DD form — used for the daily challenge.
export function todaySeed(): string {
  const d = new Date();
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// Deterministic PRNG seeded by a string (used by daily challenge).
export function seededRng(seed: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
