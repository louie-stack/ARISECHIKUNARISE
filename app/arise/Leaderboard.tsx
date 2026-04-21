"use client";

import { useEffect, useState } from "react";
import {
  LEADERBOARD_EVENT,
  loadSave,
  type LeaderboardEntry,
} from "./game/storage";
import { ZONES } from "./game/config";

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[] | null>(null);

  useEffect(() => {
    const refresh = () => setEntries(loadSave().leaderboard ?? []);
    refresh();
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key.startsWith("arise-")) refresh();
    };
    window.addEventListener(LEADERBOARD_EVENT, refresh);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(LEADERBOARD_EVENT, refresh);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  if (entries === null) return null;

  return (
    <div className="w-full max-w-xl mx-auto mt-8 px-3 text-white">
      <div className="flex items-end justify-between mb-3">
        <div>
          <div className="text-[10px] tracking-[0.35em] font-black text-[#00d632]">
            LIVE
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-none">
            LEADERBOARD
          </h2>
        </div>
        <div className="text-[10px] tracking-[0.3em] text-white/60 font-black">
          TOP {entries.length ? Math.min(10, entries.length) : 10}
        </div>
      </div>

      <div className="border-2 border-black bg-[#0a0d12] rounded-xl overflow-hidden shadow-[4px_4px_0_0_#000] sm:shadow-[6px_6px_0_0_#000]">
        <div className="flex items-center gap-2 px-3 py-2 bg-black text-[10px] tracking-[0.25em] text-white/70 font-black">
          <div className="w-6 sm:w-8">#</div>
          <div className="flex-1">NAME</div>
          <div className="w-14 sm:w-16 text-right">SCORE</div>
          <div className="hidden sm:block w-16 text-right">COINS</div>
          <div className="hidden sm:block w-20 text-right">ZONE</div>
        </div>

        {entries.length === 0 ? (
          <div className="px-3 py-8 text-center text-white/50 text-xs sm:text-sm font-black tracking-widest">
            NO ENTRIES YET · BE THE FIRST TO FLY
          </div>
        ) : (
          <div>
            {entries.map((e, i) => {
              const zoneName = ZONES[Math.max(0, Math.min(ZONES.length - 1, e.zone - 1))]?.name ?? "—";
              const isTop = i === 0;
              return (
                <div
                  key={`${e.timestamp}-${i}`}
                  className={`flex items-center gap-2 px-3 py-2 border-t border-white/5 ${
                    isTop ? "bg-[#00d632]/10" : ""
                  }`}
                >
                  <div
                    className={`w-6 sm:w-8 font-black text-sm ${
                      i === 0
                        ? "text-[#ffcf3a]"
                        : i === 1
                        ? "text-white"
                        : i === 2
                        ? "text-[#ff8a2a]"
                        : "text-white/50"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-black tracking-widest text-sm truncate">
                      {e.name}
                    </div>
                    {/* Narrow screens: show coins + zone inline beneath name */}
                    <div className="sm:hidden flex gap-2 text-[9px] tracking-[0.2em] text-white/50 font-black mt-0.5">
                      <span className="text-[#ffcf3a]">Ł {e.coins}</span>
                      <span>·</span>
                      <span className="truncate">{zoneName}</span>
                    </div>
                  </div>
                  <div className="w-14 sm:w-16 text-right font-black">
                    {e.score}
                  </div>
                  <div className="hidden sm:block w-16 text-right text-[#ffcf3a] font-black">
                    {e.coins}
                  </div>
                  <div className="hidden sm:block w-20 text-right text-[10px] tracking-[0.2em] text-white/70 font-black truncate">
                    {zoneName}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-3 text-[10px] tracking-[0.3em] text-white/40 font-black text-center">
        SCORES STORED ON THIS DEVICE
      </div>
    </div>
  );
}
