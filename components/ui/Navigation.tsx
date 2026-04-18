"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import clsx from "clsx";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/memes", label: "Meme With Us" },
  { href: "/community", label: "Community" },
  { href: "/contact", label: "Contact" }
];

const ECOSYSTEM = [
  { label: "LitVM", href: "#" },
  { label: "Litecoin.com", href: "https://litecoin.com" },
  { label: "CoinGecko", href: "#" },
  { label: "CoinMarketCap", href: "#" }
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [ecoOpen, setEcoOpen] = useState(false);

  // Lock body scroll when mobile nav open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4">
        {/* Logo pill */}
        <Link
          href="/"
          className="flex items-center gap-3 bg-bone border-2 border-ink rounded-full pl-2 pr-5 py-1.5 shadow-[4px_4px_0_#0A0A0F] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#0A0A0F] transition-all"
        >
          <div className="w-9 h-9 rounded-full bg-blue border-2 border-ink flex items-center justify-center">
            <span className="font-spray text-bone text-lg leading-none mt-0.5">
              C
            </span>
          </div>
          <span className="font-black text-ink text-base tracking-tight hidden sm:inline">
            ARISE CHIKUN
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Ecosystem dropdown — visible on desktop only */}
          <div
            className="relative hidden md:block"
            onMouseEnter={() => setEcoOpen(true)}
            onMouseLeave={() => setEcoOpen(false)}
          >
            <button className="btn-pill !bg-mint flex items-center gap-2">
              Ecosystem <ChevronDown size={16} strokeWidth={3} />
            </button>
            {ecoOpen && (
              <div className="absolute top-full right-0 pt-2 w-56">
                <ul className="bg-bone border-2 border-ink rounded-2xl shadow-[4px_4px_0_#0A0A0F] p-2 space-y-1">
                  {ECOSYSTEM.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="block px-3 py-2 text-sm font-bold text-ink rounded-lg hover:bg-mint transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Hamburger button — always visible, like Mew */}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="w-12 h-12 rounded-full bg-glow border-2 border-ink flex items-center justify-center shadow-[4px_4px_0_#0A0A0F] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#0A0A0F] transition-all"
          >
            {open ? (
              <X size={22} strokeWidth={3} className="text-ink" />
            ) : (
              <Menu size={22} strokeWidth={3} className="text-ink" />
            )}
          </button>
        </div>
      </nav>

      {/* Full-screen menu overlay */}
      {open && (
        <div className="fixed inset-0 bg-blue border-t-4 border-ink pt-24 px-6 md:px-16 overflow-y-auto">
          <ul className="space-y-4 max-w-4xl">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block font-black text-bone text-5xl md:text-7xl tracking-tight hover:text-glow transition-colors"
                >
                  {item.label.toUpperCase()} →
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-16 pt-8 border-t-2 border-bone/20">
            <p className="font-bold text-bone/60 text-xs tracking-[0.2em] mb-4">
              ECOSYSTEM
            </p>
            <div className="flex flex-wrap gap-3">
              {ECOSYSTEM.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="btn-pill"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
