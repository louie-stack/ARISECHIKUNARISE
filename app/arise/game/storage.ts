/**
 * Persistent save state. All ARISE data behind one key so it's easy to wipe.
 */
import { getSupabase, supabaseConfigured } from "./supabase";

const KEY = "arise-save-v2";
export const LEADERBOARD_SIZE = 20;
export const LEADERBOARD_EVENT = "arise-leaderboard-update";
export const LEADERBOARD_TABLE = "leaderboard";

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
// Source of truth is the Supabase `leaderboard` table when configured.
// `loadSave().leaderboard` is a local cache populated by `fetchLeaderboard`
// so the UI can render instantly while a fresh fetch is in flight.
// If Supabase isn't configured, everything falls back to local-only.
// The game code only touches `qualifiesForLeaderboard`, `submitLeaderboardEntry`,
// and `fetchLeaderboard`.
// ============================================================
export function qualifiesForLeaderboard(score: number): boolean {
  // We always attempt to submit non-zero scores; the server holds the real
  // top-N and trims naturally via ordering. Local cache is just an optimistic
  // gate to skip definitely-unqualifying writes.
  if (score <= 0) return false;
  const cur = loadSave();
  if (cur.leaderboard.length < LEADERBOARD_SIZE) return true;
  const cutoff = cur.leaderboard[cur.leaderboard.length - 1]?.score ?? 0;
  return score > cutoff;
}

interface RemoteRow {
  name: string;
  score: number;
  coins: number;
  towers: number;
  zone: number;
  created_at: string;
}

function rowToEntry(r: RemoteRow): LeaderboardEntry {
  return {
    name: r.name,
    score: r.score,
    coins: r.coins,
    towers: r.towers,
    zone: r.zone,
    timestamp: new Date(r.created_at).getTime(),
  };
}

export async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  const sb = getSupabase();
  if (!sb) return loadSave().leaderboard;
  const { data, error } = await sb
    .from(LEADERBOARD_TABLE)
    .select("name,score,coins,towers,zone,created_at")
    .order("score", { ascending: false })
    .order("created_at", { ascending: true })
    .limit(LEADERBOARD_SIZE);
  if (error || !data) return loadSave().leaderboard;
  const entries = (data as RemoteRow[]).map(rowToEntry);
  updateSave({ leaderboard: entries });
  return entries;
}

export async function submitLeaderboardEntry(
  entry: Omit<LeaderboardEntry, "timestamp">
): Promise<SaveState> {
  const name = (entry.name || "ANON").slice(0, 12).toUpperCase();
  const sb = getSupabase();
  if (sb) {
    await sb.from(LEADERBOARD_TABLE).insert({
      name,
      score: entry.score,
      coins: entry.coins,
      towers: entry.towers,
      zone: entry.zone,
    });
    const fresh = await fetchLeaderboard();
    const out = updateSave({ leaderboard: fresh, playerName: name });
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(LEADERBOARD_EVENT));
    }
    return out;
  }
  // Local-only fallback when Supabase env vars aren't set.
  const cur = loadSave();
  const e: LeaderboardEntry = { ...entry, name, timestamp: Date.now() };
  const next = [...cur.leaderboard, e]
    .sort((a, b) => b.score - a.score || a.timestamp - b.timestamp)
    .slice(0, LEADERBOARD_SIZE);
  const out = updateSave({ leaderboard: next, playerName: name });
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(LEADERBOARD_EVENT));
  }
  return out;
}

export const isLeaderboardRemote = supabaseConfigured;

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
