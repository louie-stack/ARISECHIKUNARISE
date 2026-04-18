"use client";

import Link from "next/link";

export default function NewEra() {
  return (
    <section className="bg-bone text-ink py-24 md:py-36 px-4 md:px-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* Headline with spray-paint NEW */}
        <h2
          className="font-black leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(3rem, 11vw, 10rem)" }}
        >
          It&apos;s the dawn
          <br />
          of a{" "}
          <span className="relative inline-block">
            <span className="text-ink">NEW</span>
            <span
              className="absolute inset-0 flex items-center justify-center spray-tag"
              style={{
                transform: "rotate(-5deg) translateY(-4%)",
                color: "#2EE862"
              }}
            >
              ARISE
            </span>
          </span>{" "}
          era
        </h2>

        {/* Follow buttons */}
        <div className="mt-12 md:mt-16 flex flex-wrap gap-4 justify-center items-center">
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill"
          >
            Follow me
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill"
          >
            Follow me
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
            </svg>
          </a>
        </div>

        {/* Stats grid */}
        <div className="mt-20 md:mt-28">
          <p className="font-black text-xs md:text-sm tracking-[0.3em] mb-4 flex items-center justify-center gap-4">
            <span className="chain-link" /> TOTAL SUPPLY{" "}
            <span className="chain-link" />
          </p>
          <p
            className="font-black leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
          >
            88,888,888,888
          </p>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-8 md:gap-16 items-start">
          <div>
            <p className="font-black text-xs md:text-sm tracking-[0.3em] mb-4 flex items-center justify-end gap-4">
              BURNED LP <span className="chain-link max-w-[60px]" />
            </p>
            <p
              className="font-black leading-none text-right"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
            >
              90%
            </p>
          </div>
          <div>
            <p className="font-black text-xs md:text-sm tracking-[0.3em] mb-4 flex items-center justify-start gap-4">
              <span className="chain-link max-w-[60px]" /> COMMUNITY
            </p>
            <p
              className="font-black leading-none text-left"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
            >
              10%
            </p>
          </div>
        </div>

        {/* Coin spacer */}
        <div className="mt-24 flex justify-center">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <div className="absolute inset-0 rounded-full bg-blue border-4 border-ink shadow-[6px_6px_0_#0A0A0F] flex items-center justify-center animate-spin-slow">
              <span
                className="font-black text-bone leading-none"
                style={{ fontSize: "5rem" }}
              >
                Ł
              </span>
            </div>
          </div>
        </div>

        {/* Creative universe CTA */}
        <div className="mt-24">
          <p className="font-black text-2xl md:text-3xl mb-2 tracking-tight">
            Welcome to the
          </p>
          <h3
            className="font-black leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(3rem, 12vw, 11rem)" }}
          >
            <span className="relative inline-block">
              Creative
              <span
                className="absolute inset-0 flex items-center justify-center spray-tag"
                style={{
                  transform: "rotate(-3deg)",
                  color: "#C41E3A",
                  fontSize: "inherit"
                }}
              >
                CHIKUN
              </span>
            </span>
            <br />
            Universe
          </h3>
          <p className="prose-normal mt-10 text-lg md:text-xl max-w-xl mx-auto">
            One day I&apos;ll wake up from this forgotten dream.
          </p>
          <Link href="/memes" className="btn-pill mt-10 inline-flex">
            Visit the Creative Universe →
          </Link>
        </div>
      </div>
    </section>
  );
}
