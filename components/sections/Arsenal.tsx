"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ChevronLeft, ChevronRight, Upload, X } from "lucide-react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

type ArsenalType = "meme" | "fiction" | "pfp";

type ArsenalItem = {
  id: string;
  title: string;
  src: string;
  type: ArsenalType;
  format: string;
  /**
   * When true, the slot renders as an empty placeholder tile (no image,
   * no download link). Swap this to `false` and populate `src` when the
   * real artwork lands.
   */
  placeholder?: boolean;
};

// Arsenal-category items ship with a lightweight WebP for display and a
// full-resolution PNG sibling for downloads (so users get a usable file,
// not a 560px carousel thumbnail). This derives the download URL from the
// display URL. Meme items don't have a separate master, so they just
// download at display resolution.
function getDownloadSrc(item: ArsenalItem): string {
  if (item.src.startsWith("/art/arsenal/") && item.src.endsWith(".webp")) {
    return item.src.replace(/\.webp$/, ".png");
  }
  return item.src;
}

// Seeded from existing site assets. Swap paths / add entries as new arsenal
// art lands. Drop a new meme-NN.png into public/art/arsenal/, run
// `node scripts/optimize-arsenal.mjs` to generate the .webp sibling, then
// add an entry below.
const ITEMS: ArsenalItem[] = [
  { id: "meme-01", src: "/art/arsenal/meme-01.webp", type: "meme", format: "MEME", title: "Basketball" },
  { id: "meme-02", src: "/art/arsenal/meme-02.webp", type: "meme", format: "MEME", title: "Tell Me More" },
  { id: "meme-03", src: "/art/arsenal/meme-03.webp", type: "meme", format: "MEME", title: "Find Out" },
  { id: "meme-04", src: "/art/arsenal/meme-04.webp", type: "meme", format: "MEME", title: "Plumber" },
  { id: "meme-05", src: "/art/arsenal/meme-05.webp", type: "meme", format: "MEME", title: "Punch" },
  { id: "meme-06", src: "/art/arsenal/meme-06.webp", type: "meme", format: "MEME", title: "Takeover" },
  { id: "meme-07", src: "/art/arsenal/meme-07.webp", type: "meme", format: "MEME", title: "Jedi" },
  { id: "meme-08", src: "/art/arsenal/meme-08.webp", type: "meme", format: "MEME", title: "Sad" },
  { id: "fiction-01", src: "/art/arsenal/fiction-01.webp", type: "fiction", format: "FAN FICTION", title: "Fan Fiction 01" },
  { id: "fiction-02", src: "/art/arsenal/fiction-02.webp", type: "fiction", format: "FAN FICTION", title: "Fan Fiction 02" },
  { id: "fiction-03", src: "/art/arsenal/fiction-03.webp", type: "fiction", format: "FAN FICTION", title: "Fan Fiction 03" },
  { id: "fiction-04", src: "/art/arsenal/fiction-04.webp", type: "fiction", format: "FAN FICTION", title: "Fan Fiction 04" },
  { id: "fiction-05", src: "/art/arsenal/fiction-05.webp", type: "fiction", format: "FAN FICTION", title: "Fan Fiction 05" },
  { id: "fiction-06", src: "/art/arsenal/fiction-06.webp", type: "fiction", format: "FAN FICTION", title: "Fan Fiction 06" },
  { id: "fiction-07", src: "/art/arsenal/fiction-07.webp", type: "fiction", format: "FAN FICTION", title: "Fan Fiction 07" },
  { id: "fiction-08", src: "/art/arsenal/fiction-08.webp", type: "fiction", format: "FAN FICTION", title: "Fan Fiction 08" },
  { id: "fiction-09", src: "/art/arsenal/fiction-09.webp", type: "fiction", format: "FAN FICTION", title: "Fan Fiction 09" },
  { id: "fiction-10", src: "/art/arsenal/fiction-10.webp", type: "fiction", format: "FAN FICTION", title: "Fan Fiction 10" },
  { id: "fiction-11", src: "/art/arsenal/fiction-11.webp", type: "fiction", format: "FAN FICTION", title: "The Resistance" },
  { id: "fiction-12", src: "/art/arsenal/fiction-12.webp", type: "fiction", format: "FAN FICTION", title: "Painting" },
  { id: "fiction-13", src: "/art/arsenal/fiction-13.webp", type: "fiction", format: "FAN FICTION", title: "Read" },
  { id: "pfp-01", src: "/art/arsenal/pfp-01.webp", type: "pfp", format: "PFP", title: "Chikun PFP 01" },
  { id: "pfp-02", src: "/art/arsenal/pfp-02.webp", type: "pfp", format: "PFP", title: "Chikun PFP 02" },
  { id: "pfp-03", src: "/art/arsenal/pfp-03.webp", type: "pfp", format: "PFP", title: "Chikun PFP 03" },
  { id: "pfp-04", src: "/art/arsenal/pfp-04.webp", type: "pfp", format: "PFP", title: "Chikun PFP 04" },
  { id: "pfp-05", src: "/art/arsenal/pfp-05.webp", type: "pfp", format: "PFP", title: "Chikun PFP 05" },
  { id: "pfp-06", src: "/art/arsenal/pfp-06.webp", type: "pfp", format: "PFP", title: "Chikun PFP 06" },
  { id: "pfp-07", src: "/art/arsenal/pfp-07.webp", type: "pfp", format: "PFP", title: "Chikun PFP 07" },
  { id: "pfp-08", src: "/art/arsenal/pfp-08.webp", type: "pfp", format: "PFP", title: "Chikun PFP 08" },
  { id: "pfp-09", src: "/art/arsenal/pfp-09.webp", type: "pfp", format: "PFP", title: "Chikun PFP 09" },
  { id: "pfp-10", src: "/art/arsenal/pfp-10.webp", type: "pfp", format: "PFP", title: "Chikun PFP 10" },
  { id: "pfp-11", src: "/art/arsenal/pfp-11.webp", type: "pfp", format: "PFP", title: "Chikun PFP 11" },
  { id: "pfp-12", src: "/art/arsenal/pfp-12.webp", type: "pfp", format: "PFP", title: "Chikun PFP 12" }
];

const FILTERS = [
  { key: "meme", label: "MEMES" },
  { key: "fiction", label: "FAN FICTION" },
  { key: "pfp", label: "PFPS" }
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

export default function Arsenal() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingState = useRevealOnScroll(headingRef);

  const [filter, setFilter] = useState<FilterKey>("meme");
  const [showSubmit, setShowSubmit] = useState(false);

  const tiles = ITEMS.filter((i) => i.type === filter);

  return (
    <section className="relative bg-ink text-bone pt-16 md:pt-24 pb-20 md:pb-28 px-4 md:px-8 overflow-hidden">
      {/* Heading block */}
      <div
        ref={headingRef}
        data-reveal
        data-reveal-state={headingState}
        className="relative max-w-4xl mx-auto text-center"
      >
        <div className="flex justify-center mb-8">
          <span
            className="tape tape-mint"
            style={{ fontSize: "1.05rem", padding: "0.65rem 1.4rem" }}
          >
            MEME VAULT
          </span>
        </div>

        <h2
          className="font-black leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
        >
          PICK UP
          <br />
          YOUR WEAPONS.
        </h2>

        <p className="prose-normal mt-6 text-lg md:text-xl max-w-3xl mx-auto text-bone/80">
          Open source propaganda. Take what speaks to you. Put it back into the world.
        </p>
      </div>

      {/* Filter pills */}
      <div
        role="tablist"
        aria-label="Filter arsenal by type"
        className="mt-10 md:mt-12 flex flex-wrap justify-center gap-2 md:gap-3"
      >
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f.key)}
              className={`px-4 md:px-5 py-2 rounded-full border-2 font-black text-xs md:text-sm tracking-[0.15em] transition-all ${
                active
                  ? "bg-glow text-ink border-glow shadow-[3px_3px_0_#0A0A0F]"
                  : "bg-transparent text-glow border-glow/40 hover:border-glow hover:bg-glow/10"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Every category uses the horizontal carousel so the layout stays
          consistent regardless of which filter is active. */}
      <ArsenalCarousel items={tiles} />

      {/* Empty-state message (when a filter yields nothing — future-proofing) */}
      {tiles.length === 0 && (
        <p className="prose-normal mt-10 text-center text-bone/50 text-base">
          No{" "}
          {FILTERS.find((f) => f.key === filter)?.label.toLowerCase() ??
            filter}{" "}
          yet. Check back soon.
        </p>
      )}

      {/* Submit CTA */}
      <div className="mt-12 md:mt-16 flex justify-center">
        <button
          type="button"
          onClick={() => setShowSubmit(true)}
          className="btn-pill btn-pill-glow"
        >
          SUBMIT YOUR OWN →
        </button>
      </div>

      {showSubmit && <SubmitModal onClose={() => setShowSubmit(false)} />}
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */

function TileCard({ item }: { item: ArsenalItem }) {
  // Empty slot — keeps the carousel shape consistent while the category
  // waits for real artwork. No image fetch, no download link.
  if (item.placeholder) {
    return (
      <article
        aria-label={`${item.format} — placeholder slot`}
        className="relative aspect-[3/4] md:aspect-square rounded-md overflow-hidden border-2 border-dashed border-bone/20 bg-ink-soft/40 flex flex-col items-center justify-center gap-2 p-3 select-none"
      >
        <span className="font-black text-bone/40 tracking-[0.3em] text-[0.55rem] md:text-[0.6rem] text-center">
          {item.format}
        </span>
        <span className="font-black text-bone/25 tracking-[0.25em] text-[0.5rem] md:text-[0.55rem]">
          COMING SOON
        </span>
      </article>
    );
  }

  return (
    <article className="relative aspect-[3/4] md:aspect-square group rounded-md overflow-hidden border-2 border-bone/10 bg-gradient-to-br from-ink to-ink-soft transition-colors hover:border-glow">
      {/* Dark-gradient placeholder visible until the real image loads. */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center text-bone/20 font-black tracking-[0.3em] text-[0.65rem] md:text-xs select-none"
      >
        {item.format}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
      {/* Format badge */}
      <span className="absolute top-2 right-2 z-10 bg-mint text-ink font-black tracking-[0.15em] text-[0.55rem] md:text-[0.6rem] px-2 py-0.5 rounded-full border border-ink shadow-[2px_2px_0_#0A0A0F]">
        {item.format}
      </span>
      {/* Download overlay — links to the full-resolution master. */}
      <a
        href={getDownloadSrc(item)}
        download
        aria-label={`Download ${item.title}`}
        className="absolute inset-0 z-20 flex items-center justify-center bg-ink/75 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
      >
        <span className="inline-flex items-center gap-1.5 bg-glow text-ink font-black text-xs md:text-sm tracking-[0.1em] px-4 py-2 rounded-full border-2 border-ink shadow-[3px_3px_0_#0A0A0F]">
          DOWNLOAD ↓
        </span>
      </a>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────── */

function ArsenalCarousel({ items }: { items: ArsenalItem[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // Keep the scroll offset in a ref so the rAF loop doesn't trigger a
  // re-render every frame. We write `transform` directly to the DOM.
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const halfWidthRef = useRef(0);

  useEffect(() => {
    const wrap = wrapperRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const measure = () => {
      // Track renders the items twice; we loop after half the total width
      // so the second copy slides in seamlessly.
      halfWidthRef.current = track.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    let raf = 0;
    let last = performance.now();
    const pxPerSecond = 35;
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current && halfWidthRef.current > 0) {
        let next = offsetRef.current + pxPerSecond * dt;
        if (next >= halfWidthRef.current) next -= halfWidthRef.current;
        offsetRef.current = next;
        track.style.transform = `translate3d(${-next}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Only pause-on-pointer for devices that actually have a hover state
    // (mouse/trackpad). On touch, pointerenter/leave fire on every tap,
    // making the carousel feel jerky — leave it auto-scrolling there and
    // rely on the arrow buttons.
    const hasHover =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(hover: hover)").matches;
    const onEnter = () => {
      pausedRef.current = true;
    };
    const onLeave = () => {
      pausedRef.current = false;
    };
    if (hasHover) {
      wrap.addEventListener("pointerenter", onEnter);
      wrap.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (hasHover) {
        wrap.removeEventListener("pointerenter", onEnter);
        wrap.removeEventListener("pointerleave", onLeave);
      }
    };
  }, []);

  const nudge = (dir: -1 | 1) => {
    const step = 220;
    const hw = halfWidthRef.current;
    if (hw === 0) return;
    // Snap the track instantly by one item; the rAF loop resumes from
    // the new offset so the scroll keeps flowing.
    let next = offsetRef.current + dir * step;
    next = ((next % hw) + hw) % hw;
    offsetRef.current = next;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${-next}px, 0, 0)`;
    }
  };

  // Render items twice so the track can loop without a visible reset.
  const doubled = [...items, ...items];

  return (
    <div
      ref={wrapperRef}
      className="relative mt-10 md:mt-12 max-w-6xl mx-auto"
    >
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-3 md:gap-4"
          style={{ willChange: "transform" }}
        >
          {doubled.map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              className="w-44 md:w-52 shrink-0"
            >
              <TileCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Edge arrows — small pill buttons flanking the carousel. */}
      <button
        type="button"
        onClick={() => nudge(-1)}
        aria-label="Scroll left"
        className="absolute top-1/2 -translate-y-1/2 left-1 md:-left-4 z-20 w-11 h-11 md:w-10 md:h-10 rounded-full bg-bone text-ink border-2 border-ink shadow-[3px_3px_0_#0A0A0F] flex items-center justify-center hover:bg-glow hover:-translate-x-0.5 hover:-translate-y-[calc(50%+2px)] transition-all"
      >
        <ChevronLeft size={18} strokeWidth={3} />
      </button>
      <button
        type="button"
        onClick={() => nudge(1)}
        aria-label="Scroll right"
        className="absolute top-1/2 -translate-y-1/2 right-1 md:-right-4 z-20 w-11 h-11 md:w-10 md:h-10 rounded-full bg-bone text-ink border-2 border-ink shadow-[3px_3px_0_#0A0A0F] flex items-center justify-center hover:bg-glow hover:translate-x-0.5 hover:-translate-y-[calc(50%+2px)] transition-all"
      >
        <ChevronRight size={18} strokeWidth={3} />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */

function SubmitModal({ onClose }: { onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ArsenalType>("meme");
  const [handle, setHandle] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Object URL lifecycle — regenerate when the file changes, revoke on cleanup
  // so the preview doesn't leak blob URLs.
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // Esc closes the modal; lock body scroll while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const canSubmit = Boolean(file) && title.trim().length > 0;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    // No backend yet — log locally (dev only) and swap to the success state.
    // Wire this up to a real endpoint when one exists.
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.log("[meme-vault:submit]", {
        fileName: file?.name,
        fileSize: file?.size,
        title: title.trim(),
        category,
        handle: handle.trim(),
      });
    }
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Submit to the Meme Vault"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md max-h-[calc(100svh-2rem)] bg-ink border-2 border-black rounded-xl shadow-[6px_6px_0_0_#0A0A0F] text-bone overflow-y-auto overflow-x-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-black bg-black/80 px-5 py-3">
          <span
            className="tape tape-mint"
            style={{ fontSize: "0.7rem", padding: "0.35rem 0.85rem" }}
          >
            SUBMIT
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-bone/60 hover:text-bone transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="text-[11px] tracking-[0.35em] font-black text-glow">
              ★ TRANSMISSION RECEIVED ★
            </div>
            <p
              className="prose-normal mt-5 text-bone text-lg md:text-xl leading-snug"
              style={{ textTransform: "none" }}
            >
              Thank you for your contribution.
            </p>
            <div className="mt-6 flex justify-center">
              <span
                className="spray-tag"
                style={{ fontSize: "2.25rem", lineHeight: 1 }}
              >
                chikun
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="btn-pill btn-pill-glow mt-8"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="p-5 space-y-5">
            {/* Image upload + preview */}
            <div>
              <FieldLabel>IMAGE</FieldLabel>
              {preview ? (
                <div className="relative border-2 border-black rounded-lg overflow-hidden aspect-video bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="absolute top-2 right-2 bg-black/70 border border-bone/30 rounded px-2 py-1 text-[10px] tracking-[0.2em] font-black text-bone hover:border-glow/60"
                  >
                    REMOVE
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-bone/25 bg-black/30 rounded-lg py-8 px-4 cursor-pointer transition-colors hover:border-glow/60 hover:bg-black/40">
                  <Upload className="w-6 h-6 text-bone/60" strokeWidth={2.5} />
                  <span className="text-[11px] tracking-[0.3em] font-black text-bone/70">
                    CLICK TO UPLOAD
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      setFile(e.target.files?.[0] ?? null)
                    }
                  />
                </label>
              )}
            </div>

            {/* Title */}
            <div>
              <FieldLabel>TITLE</FieldLabel>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={48}
                placeholder="Big Corp Gets It"
                className="w-full bg-black/60 border-2 border-black text-bone px-3 py-2.5 rounded-lg font-bold text-base placeholder:text-bone/25 focus:outline-none focus:border-glow/70 transition-colors"
              />
            </div>

            {/* Category */}
            <div>
              <FieldLabel>CATEGORY</FieldLabel>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {FILTERS.map((f) => {
                  const active = category === f.key;
                  return (
                    <button
                      key={f.key}
                      type="button"
                      onClick={() => setCategory(f.key)}
                      className={`font-black text-[10px] tracking-[0.2em] px-2 py-2.5 rounded-lg border-2 transition-colors ${
                        active
                          ? "bg-glow text-ink border-black"
                          : "bg-black/50 text-bone/75 border-black hover:border-glow/60"
                      }`}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* X handle */}
            <div>
              <FieldLabel>X HANDLE</FieldLabel>
              <div className="flex items-center bg-black/60 border-2 border-black rounded-lg overflow-hidden focus-within:border-glow/70 transition-colors">
                <span className="pl-3 pr-1 text-bone/40 font-black">@</span>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) =>
                    setHandle(e.target.value.replace(/^@/, ""))
                  }
                  maxLength={30}
                  placeholder="yourhandle"
                  autoCapitalize="none"
                  autoComplete="off"
                  className="flex-1 bg-transparent text-bone px-1 py-2.5 pr-3 font-bold text-base placeholder:text-bone/25 focus:outline-none"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!canSubmit}
              className={`btn-pill btn-pill-glow w-full justify-center ${
                !canSubmit ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              SUBMIT →
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] tracking-[0.3em] font-black text-bone/55 mb-1.5">
      {children}
    </div>
  );
}
