# ART FOLDER

Drop your Chikun art here. Expected structure:

```
art/
├── hero/
│   └── chikun-hero.png              # Homepage hero shot (1920x1080+ recommended)
├── scenes/
│   ├── slide-01.png  →  slide-12.png    # Homepage art sliders (square format, 1200x1200)
│   ├── tale-01.png   →  tale-03.png     # Chikun Tales cards (4:5 vertical format)
│   └── universe-01.png → universe-04.png # Creative Universe grid (square format)
└── memes/
    ├── meme-01.png   →  meme-12.png     # Static memes (square format)
    └── meme-03.gif, meme-05.gif, etc.   # GIF memes (same grid as above)
```

## Notes

- File extensions can be changed — just update the references in the components
- The site lazy-loads images, so high-res is fine
- Keep total page weight reasonable — optimize images before uploading (tinypng.com or squoosh.app)
- For GIFs on the memes page, the type badge will automatically show "GIF" if the file is flagged `type: "gif"` in `app/memes/page.tsx`

## Quick placeholder

If you want to see the layouts before your art is ready, you can use placeholder services. Temporarily replace image `src` paths in the components with:

```
https://picsum.photos/seed/chikun01/1200/1200
```

Changing the `seed` value gives different images.
