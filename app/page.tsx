import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import PoweredByLitVM from "@/components/sections/PoweredByLitVM";
import Strongholds from "@/components/sections/Strongholds";
import NewEra from "@/components/sections/NewEra";
import ChikunTales from "@/components/sections/ChikunTales";
import Media from "@/components/sections/Media";
import MerchTeaser from "@/components/sections/MerchTeaser";

export default function HomePage() {
  return (
    <>
      {/* 1. Top marquee */}
      <div className="pt-20">
        <Marquee
          variant="mint"
          items={[
            "ARISE CHIKUN ARISE",
            "THE FORGOTTEN RETURN",
            "THE CHANT WAS A SUMMONS",
            "LITVM CITY",
            "鶏鳴"
          ]}
        />
      </div>

      {/* 2. Hero */}
      <Hero />

      {/* 3. Powered by LitVM tape */}
      <PoweredByLitVM />

      {/* 4. Strongholds — big text, galleries, first-person lore */}
      <Strongholds />

      {/* 5. New Era tokenomics */}
      <NewEra />

      {/* 6. Chikun Tales */}
      <ChikunTales />

      {/* 7. Media / press */}
      <Media />

      {/* 8. Merch teaser */}
      <MerchTeaser />
    </>
  );
}
