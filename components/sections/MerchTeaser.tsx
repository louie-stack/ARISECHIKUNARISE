"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const PLACEHOLDER = "https://picsum.photos/seed/chikun-merch/900/900";

export default function MerchTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollProgress(sectionRef);

  const contentRef = useRef<HTMLDivElement>(null);
  const contentState = useRevealOnScroll(contentRef);

  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showForm && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showForm]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    // No backend yet — capture locally (dev only). Swap this to an email
    // capture endpoint (MailerLite, Beehiiv, custom) when one is ready.
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.log("[merch:notify]", trimmed);
    }
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink py-16 md:py-24 px-4 md:px-8 overflow-hidden"
    >
      <div className="relative max-w-6xl mx-auto">
        <div className="relative bg-blue border-4 border-ink rounded-3xl p-8 md:p-12 overflow-hidden shadow-[10px_10px_0_#2EE862]">
          {/* Comb edge top */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-8"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 30' preserveAspectRatio='none'%3E%3Cpath d='M0 0 L10 30 L20 0 L30 30 L40 0 L50 30 L60 0 L70 30 L80 0 L90 30 L100 0 Z' fill='%230A0A0F'/%3E%3C/svg%3E\")",
              backgroundRepeat: "repeat-x",
              backgroundSize: "60px 30px"
            }}
          />

          <div
            ref={contentRef}
            data-reveal-state={contentState}
            className="reveal-stagger relative grid md:grid-cols-2 gap-8 md:gap-12 items-center pt-8"
          >
            <div>
              <p className="font-black text-bone/70 text-xs tracking-[0.3em] mb-4">
                RESISTANCE SUPPLY
              </p>
              <h2
                className="font-black text-bone leading-[0.95] tracking-tight"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                BIRDS OF A
                <br />
                <span className="relative inline-block">
                  <span className="text-bone">FEATHER.</span>
                  <span
                    aria-hidden
                    className="absolute -bottom-2 left-0 right-0 h-2 bg-glow"
                    style={{ transform: "rotate(-1deg)" }}
                  />
                </span>
              </h2>

              <p className="prose-normal mt-6 text-base md:text-lg text-bone/80 max-w-md">
                Merch store coming soon.
              </p>

              {/* CTA — either a button that expands the email form, or the
                  form itself, or the "got it" confirmation once submitted. */}
              <div className="mt-6 max-w-md">
                {!showForm && !submitted && (
                  <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="btn-pill btn-pill-glow"
                  >
                    NOTIFY ME →
                  </button>
                )}

                {showForm && !submitted && (
                  <form
                    onSubmit={onSubmit}
                    className="flex flex-col sm:flex-row gap-2"
                  >
                    <input
                      ref={inputRef}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="flex-1 bg-ink/60 border-2 border-ink text-bone placeholder:text-bone/40 font-bold px-4 py-2.5 rounded-full text-base focus:outline-none focus:border-glow transition-colors"
                    />
                    <button
                      type="submit"
                      className="btn-pill btn-pill-glow shrink-0"
                    >
                      SUBMIT →
                    </button>
                  </form>
                )}

                {submitted && (
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="tape tape-mint" style={{ fontSize: "0.7rem" }}>
                      ★ LOCKED IN
                    </span>
                    <p className="font-black text-bone tracking-widest text-sm">
                      YOU&apos;RE ON THE LIST. WE&apos;LL BE IN TOUCH.
                    </p>
                  </div>
                )}
              </div>

              {/* Chain divider — brand footer */}
              <div className="mt-10 flex items-center gap-3 text-bone/60 text-xs tracking-[0.3em] font-black">
                <span className="chain-link" />
                RESISTANCE SUPPLY · DROP 001
                <span className="chain-link" />
              </div>
            </div>

            {/* Image column — scroll-linked parallax wrapper keeps rotation + float
                animations on the inner elements so transforms don't stomp each other. */}
            <div className="relative">
              {/* Price tag sticker floating over */}
              <div className="absolute -top-3 right-2 md:-top-6 md:-right-6 z-20 pointer-events-none">
                <span
                  className="tape tape-blood text-sm"
                  style={{ transform: "rotate(6deg)" }}
                >
                  ARRIVING SOON
                </span>
              </div>

              <div
                className="will-change-transform"
                style={{
                  transform:
                    "translate3d(0, calc((var(--scroll-progress, 0) - 0.5) * -60px), 0)"
                }}
              >
                <div className="relative aspect-square border-4 border-ink rounded-2xl overflow-hidden bg-ink rotate-1 hover:rotate-0 transition-transform shadow-[8px_8px_0_#0A0A0F]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/art/scenes/merch.png"
                    alt="Chikun merch teaser"
                    className="w-full h-full object-cover animate-float-slow"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = PLACEHOLDER;
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
