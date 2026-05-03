import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Strongholds from "@/components/sections/Strongholds";
import NewEra from "@/components/sections/NewEra";
import AriseShowcase from "@/components/sections/AriseShowcase";
import Arsenal from "@/components/sections/Arsenal";
import MerchTeaser from "@/components/sections/MerchTeaser";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — nav floats directly over this */}
      <Hero />

      {/* 2. Marquee tape cuts across right after hero */}
      <Marquee
        variant="mint"
        items={["POWERED BY LITECOIN", "BUILT ON LITVM"]}
        speed="fast"
        showSeparators={false}
      />

      {/* 3. Strongholds (ends with tilted film strip that acts as the divider into NewEra) */}
      <Strongholds />

      {/* 4. New Era — tokenomics intent, stats, quote, and "I'll Show You The Truth" */}
      <NewEra />

      {/* 5. ARISE minigame showcase — bento grid spotlighting the /arise flyer */}
      <AriseShowcase />

      {/* 6. The Arsenal — meme/gif/sticker/pfp vault with filter pills */}
      <Arsenal />

      {/* 7. Merch teaser */}
      <MerchTeaser />
    </>
  );
}
