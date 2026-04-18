import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "ARISE CHIKUN, ARISE",
  description:
    "The forgotten mascot. The chant was a summons. Welcome to LitVM City.",
  openGraph: {
    title: "ARISE CHIKUN, ARISE",
    description: "The forgotten mascot. The chant was a summons.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ink-900 text-bone-100">
        <Navigation />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
