"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const NAV_ITEMS = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/memes", label: "MEME WITH US" },
  { href: "/community", label: "COMMUNITY" },
  { href: "/contact", label: "CONTACT" }
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-ink-900/85 backdrop-blur-md border-b border-ink-600"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative">
            <span
              className="font-graffiti text-2xl tracking-wider text-glow-500 animate-glow-pulse"
              style={{ textShadow: "0 0 20px rgba(92,255,133,0.8)" }}
            >
              CHIKUN
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-xs tracking-[0.25em] font-medium text-bone-100/70 hover:text-glow-500 transition-colors duration-200"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile trigger */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="md:hidden text-bone-100 hover:text-glow-500 transition"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-ink-900 border-t border-ink-600">
          <ul className="px-6 py-8 space-y-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-sm tracking-[0.25em] text-bone-100 hover:text-glow-500 transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
