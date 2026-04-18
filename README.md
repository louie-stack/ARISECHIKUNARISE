# ARISE CHIKUN, ARISE

A dark-anime mythology site for Chikun — the forgotten Litecoin mascot. Built in the spirit of mew.xyz, reinterpreted for LitVM City.

## Tech stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** with custom noir palette
- **Framer Motion** for scroll + reveal animations
- **lucide-react** for icons

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Drop your art in

The site expects these folders under `/public/art/`:

```
public/
└── art/
    ├── hero/
    │   └── chikun-hero.png          ← homepage hero shot
    ├── scenes/
    │   ├── slide-01.png  →  slide-12.png   ← homepage art sliders
    │   ├── tale-01.png   →  tale-03.png    ← Chikun Tales cards
    │   └── universe-01.png → universe-04.png ← Creative Universe grid
    └── memes/
        ├── meme-01.png   →  meme-12.(png|gif)  ← Memes page grid
```

Filenames are referenced in:
- `components/sections/Hero.tsx`
- `app/page.tsx` (ArtSlider galleries)
- `components/sections/ChikunTales.tsx`
- `components/sections/CreativeUniverse.tsx`
- `app/memes/page.tsx`

Either match the filenames, or rename yours and update the references.

## Customizing

### Palette

Edit `tailwind.config.ts` — `ink`, `bone`, `glow`, `blood` scales.

### Fonts

Imported from Google Fonts in `app/globals.css`. Currently:
- **Cinzel** (display / headlines)
- **Inter** (body)
- **JetBrains Mono** (technical / tags)
- **Permanent Marker** (graffiti / logo)

Swap any of them by editing the `@import` line and the `--font-*` CSS variables.

### Copy

All lore copy lives directly in the components. Edit in place:
- `components/sections/Intro.tsx` — the "for too long" beat
- `components/sections/LoreQuote.tsx` — the mythic quote
- `components/sections/Tokenomics.tsx` — stats + caption
- `app/about/page.tsx` — full about copy
- `app/community/page.tsx` — groups, events, press
- `app/contact/page.tsx` — form copy

### Contact form

The form in `app/contact/page.tsx` currently simulates a send with a 1.2s delay. To wire it to a real service, replace the `handleSubmit` function. Options:

**Formspree** — easiest. Create a form, get an endpoint, POST to it:
```ts
await fetch("https://formspree.io/f/YOUR_FORM_ID", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form)
});
```

**Resend** — better if you want emails. Requires a serverless API route.

**Vercel serverless function** — create `app/api/contact/route.ts` and POST to it from the form.

## Deploying

### Vercel (recommended)

1. Push this repo to GitHub
2. Import it at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js — just click Deploy
4. Add your custom domain in Vercel settings

### Build locally first to check

```bash
npm run build
```

Fix any TypeScript errors before deploying.

## File structure

```
chikun-site/
├── app/
│   ├── about/page.tsx
│   ├── community/page.tsx
│   ├── contact/page.tsx
│   ├── memes/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              ← homepage (long scroll)
├── components/
│   ├── sections/
│   │   ├── ArtSlider.tsx
│   │   ├── ChikunTales.tsx
│   │   ├── CreativeUniverse.tsx
│   │   ├── Hero.tsx
│   │   ├── Intro.tsx
│   │   ├── LoreQuote.tsx
│   │   ├── Marquee.tsx
│   │   └── Tokenomics.tsx
│   └── ui/
│       ├── Footer.tsx
│       └── Navigation.tsx
├── public/art/               ← drop your images here
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

## What's stubbed

A few things are intentionally placeholder:
- **Social links** in Navigation and Footer point to bare domains (e.g. `https://x.com`). Replace with real handles when you have them.
- **Tokenomics numbers** are borrowed from Mew's pattern — adjust to whatever Chikun's actual supply/distribution is.
- **Press articles** on the Community page are all "COMING SOON" — replace with real coverage when it exists.
- **Event dates** are all TBA.
- **Contact form** simulates success — needs a real backend (see above).

## License

Your project, your call.

鶏鳴 · KEIMEI · THE CRY AT DAWN
