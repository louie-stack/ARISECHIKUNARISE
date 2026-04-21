import type { Metadata } from "next";
import ArisGame from "./ArisGame";

export const metadata: Metadata = {
  title: "ARISE · Chikun",
  description:
    "The Elite clipped his wings. LitVM gave them back. Tap to flap, dodge Big Corp, reclaim the sky.",
};

export default function ArisePage() {
  return (
    <section
      className="min-h-screen flex items-center justify-center px-2 pt-20 pb-6"
      style={{ backgroundColor: "#2b5ede" }}
    >
      <ArisGame />
    </section>
  );
}
