import type { Metadata } from "next";
import ArisGame from "./ArisGame";
import Leaderboard from "./Leaderboard";

interface SearchParams {
  score?: string;
  coins?: string;
  towers?: string;
  combo?: string;
  zone?: string;
  name?: string;
  rank?: string;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  // Forward only known keys to keep the OG URL clean and avoid arbitrary
  // payloads being baked into the share image.
  const allowed = ["score", "coins", "towers", "combo", "zone", "name", "rank"] as const;
  const qs = new URLSearchParams();
  for (const k of allowed) {
    const v = searchParams[k];
    if (v) qs.set(k, v);
  }
  const ogPath = qs.toString() ? `/api/og?${qs.toString()}` : "/api/og";
  const score = searchParams.score ? parseInt(searchParams.score, 10) : 0;
  const name = (searchParams.name ?? "").slice(0, 12).toUpperCase();
  const tweetTitle =
    score > 0
      ? `${name ? `${name} scored ${score}` : `Scored ${score}`} in CHIKUN'S ESCAPE`
      : "CHIKUN'S ESCAPE";
  const description =
    "The Elite clipped his wings. LitVM gave them back. Tap to flap, dodge Big Corp, reclaim the sky.";

  return {
    title: tweetTitle,
    description,
    openGraph: {
      title: tweetTitle,
      description,
      images: [{ url: ogPath, width: 1200, height: 630, alt: "CHIKUN'S ESCAPE" }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tweetTitle,
      description,
      images: [ogPath],
    },
  };
}

export default function ArisePage() {
  return (
    <section
      className="arise-page min-h-screen flex flex-col items-center pt-14 sm:pt-20 pb-6 sm:pb-12"
      style={{ backgroundColor: "#2b5ede" }}
    >
      <div className="flex items-center justify-center w-full">
        <ArisGame />
      </div>
      <Leaderboard />
    </section>
  );
}
