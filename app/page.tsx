import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Intro from "@/components/sections/Intro";
import ArtSlider from "@/components/sections/ArtSlider";
import LoreQuote from "@/components/sections/LoreQuote";
import Tokenomics from "@/components/sections/Tokenomics";
import ChikunTales from "@/components/sections/ChikunTales";
import CreativeUniverse from "@/components/sections/CreativeUniverse";

// Art slides — replace src paths with your actual generated art
const GALLERY_ONE = [
  { src: "/art/scenes/slide-01.png", caption: "THE ALLEY / RAIN" },
  { src: "/art/scenes/slide-02.png", caption: "THE ROOFTOP" },
  { src: "/art/scenes/slide-03.png", caption: "THE STOREFRONT" },
  { src: "/art/scenes/slide-04.png", caption: "THE TOWER" },
  { src: "/art/scenes/slide-05.png", caption: "THE WORKBENCH" },
  { src: "/art/scenes/slide-06.png", caption: "THE LEAP" }
];

const GALLERY_TWO = [
  { src: "/art/scenes/slide-07.png", caption: "NEON / Ł" },
  { src: "/art/scenes/slide-08.png", caption: "THE CHANT" },
  { src: "/art/scenes/slide-09.png", caption: "THE FLICKER" },
  { src: "/art/scenes/slide-10.png", caption: "THE MIRROR" },
  { src: "/art/scenes/slide-11.png", caption: "THE CLIMB" },
  { src: "/art/scenes/slide-12.png", caption: "THE CROWN" }
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Intro />
      <ArtSlider slides={GALLERY_ONE} direction="left" speed="slow" />
      <LoreQuote />
      <ArtSlider slides={GALLERY_TWO} direction="right" speed="normal" />
      <Tokenomics />
      <ChikunTales />
      <CreativeUniverse />
    </>
  );
}
