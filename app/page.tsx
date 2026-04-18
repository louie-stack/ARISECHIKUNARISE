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
      {/* 1. Hero — nav floats directly over this */}
      <Hero />

      {/* 2. Marquee tape cuts across right after hero */}
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

      {/* 3. Powered by LitVM */}
      <PoweredByLitVM />

      {/* 4. Strongholds */}
      <Strongholds />

      {/* 5. New Era */}
      <NewEra />

      {/* 6. Chikun Tales */}
      <ChikunTales />

      {/* 7. Media */}
      <Media />

      {/* 8. Merch teaser */}
      <MerchTeaser />
    </>
  );
}
