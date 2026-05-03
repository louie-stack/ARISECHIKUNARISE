import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";

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
    <html lang="en">
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
