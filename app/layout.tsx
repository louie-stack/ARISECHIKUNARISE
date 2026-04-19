import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "ARISE CHIKUN, ARISE",
  description:
    "The first Litecoin meme returns. Born in the trollboxes of the old world. Now stretching his wings on LitVM."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ink">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
