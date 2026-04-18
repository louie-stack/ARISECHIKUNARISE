# ARISE CHIKUN — v2 (Mew-style rebuild)

A Mew.xyz-structured site re-skinned with Chikun's palette and voice.

## What changed from v1

- **Dropped framer-motion** — Mew's site uses pure CSS animations (marquees, wiggle, simple hovers). No scroll-fade-in needed.
- **New palette** — Litecoin blue replaces Mew's red as the dominant section color. Bone white, pure black, and mint/glow accents.
- **Typography is bold sans only** — Hanken Grotesk 900 in all caps. Permanent Marker reserved for occasional spray-paint graffiti overlays on specific words.
- **Sticker-button style** — pill buttons with hard offset shadows, like Mew's pink pills.
- **Zine layout** — sections have hard solid backgrounds, jagged comb-tooth transitions, tilted sticker frames, film-strip gallery borders.

## Tech

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS with custom Chikun palette
- lucide-react for icons
- No heavy animation library — pure CSS keyframes

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy

```bash
git add .
git commit -m "mew-style rebuild"
git push
```

Vercel auto-deploys from your GitHub main branch.

## Asset folders

Drop your art into these paths:

```
public/art/
├── hero/
│   └── chikun-hero.png              # Main hero character (transparent PNG preferred)
├── scenes/
│   ├── stronghold-01.png → stronghold-06.png    # Scrolling galleries
│   ├── tale-01.png → tale-04.png                # Chikun Tales strip
│   ├── media-01.png → media-05.png              # Press cards
│   └── merch-preview.png                        # Merch teaser
└── memes/
    └── meme-01.png → meme-12.(png|gif)          # Memes grid
```

If your filenames differ, update the references in:
- `components/sections/Hero.tsx`
- `components/sections/Strongholds.tsx`
- `components/sections/ChikunTales.tsx`
- `components/sections/Media.tsx`
- `components/sections/MerchTeaser.tsx`
- `app/memes/page.tsx`

## Palette

Edit `tailwind.config.ts`:

- `blue` — primary section background (#2B5FAD)
- `ink` — black sections (#0A0A0F)
- `bone` — off-white sections (#F5F3EF)
- `mint` — pale button color (#C5F5E4)
- `glow` — accent / LTC green (#2EE862)
- `blood` — spray-paint red (#C41E3A)

## Key components explained

### `Marquee.tsx`
Reusable scrolling tape. Pass `variant="mint" | "blue" | "glow" | "bone"` and optional `items` array.

### `Hero.tsx`
Giant CHIKUN background letters with character image in front. Copy blocks on left/right, CTA in center.

### `Strongholds.tsx`
Two horizontally-scrolling image galleries (opposite directions) sandwiching a big first-person lore block.

### `NewEra.tsx`
Tokenomics — Total Supply at top, Burned LP / Community split below, spinning Ł coin, Creative Universe CTA.

### `ChikunTales.tsx`
Tilted gallery strip with TAILS spray-paint overlay on "TALES" text.

### Spray-paint overlay technique
```jsx
<span className="relative inline-block">
  <span>Underlying text</span>
  <span
    className="absolute inset-0 flex items-center justify-center spray-tag"
    style={{ transform: "rotate(-3deg)", color: "#2EE862" }}
  >
    OVERLAY TEXT
  </span>
</span>
```

## Things still stubbed

- Social links in Navigation and Footer point to bare domains
- Tokenomics numbers are borrowed placeholders (88,888,888,888) — adjust for Chikun's real supply
- Press/events are all "COMING SOON" / "TBA"
- Contact form simulates success — wire to Formspree/Resend/serverless to make real

## When your art isn't ready yet

Temporarily replace image `src` paths with:
```
https://picsum.photos/seed/chikun01/1200/1200
```
Different seed strings = different placeholder images.

鶏鳴 · KEIMEI · THE CRY AT DAWN
