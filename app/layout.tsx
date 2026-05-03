import type { Metadata } from "next";
import { Hanken_Grotesk, Permanent_Marker } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";

// Self-hosted via next/font so the spray-paint headline reliably renders
// on mobile networks where the previous @import from Google Fonts could
// stall and fall back to the OS cursive (looks wrong on iOS).
const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-sans",
  display: "swap"
});

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-spray",
  display: "swap"
});

const DESCRIPTION =
  "The first Litecoin meme returns. Born in the trollboxes of the old world. Now stretching his wings on LitVM.";

export const metadata: Metadata = {
  title: "ARISE CHIKUN, ARISE",
  description: DESCRIPTION,
  openGraph: {
    title: "ARISE CHIKUN, ARISE",
    description: DESCRIPTION,
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "CHIKUN'S ESCAPE" }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "ARISE CHIKUN, ARISE",
    description: DESCRIPTION,
    images: ["/api/og"]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${hankenGrotesk.variable} ${permanentMarker.variable}`}>
      <head>
        {/* Preload the hero WebP so the homepage paints with the image
            already in cache — eliminates the progressive-paint feel on
            slow connections. Next 14 hoists this into <head>. */}
        <link
          rel="preload"
          as="image"
          href="/art/hero/chikun-hero.webp"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body className="min-h-screen bg-ink">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
