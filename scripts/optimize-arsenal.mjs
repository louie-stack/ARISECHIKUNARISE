// Converts every .png in public/art/arsenal/ to a .webp sibling at a sensible
// display size. The Arsenal carousel renders tiles at ~200px wide, so even a
// 2x-retina target of 440px is plenty; larger PNGs are pure waste.
//
// Run: node scripts/optimize-arsenal.mjs
import { readdir, stat } from "node:fs/promises";
import { join, extname, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// Resolve relative to this script so it works regardless of cwd.
const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = join(__dirname, "..", "public", "art", "arsenal");
const TARGET_WIDTH = 560; // 2x the carousel display size
const QUALITY = 82;

const files = await readdir(SRC_DIR);
const pngs = files.filter((f) => extname(f).toLowerCase() === ".png");

if (pngs.length === 0) {
  console.log("No PNGs found in", SRC_DIR);
  process.exit(0);
}

let totalBefore = 0;
let totalAfter = 0;

for (const file of pngs) {
  const inputPath = join(SRC_DIR, file);
  const outputPath = join(SRC_DIR, basename(file, ".png") + ".webp");

  const beforeStat = await stat(inputPath);
  totalBefore += beforeStat.size;

  await sharp(inputPath)
    .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 5 })
    .toFile(outputPath);

  const afterStat = await stat(outputPath);
  totalAfter += afterStat.size;

  const beforeKB = (beforeStat.size / 1024).toFixed(0);
  const afterKB = (afterStat.size / 1024).toFixed(0);
  console.log(`${file}: ${beforeKB}KB → ${afterKB}KB`);
}

const mbBefore = (totalBefore / 1024 / 1024).toFixed(2);
const mbAfter = (totalAfter / 1024 / 1024).toFixed(2);
const ratio = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
console.log(
  `\nTotal: ${mbBefore}MB → ${mbAfter}MB  (${ratio}% smaller, ${pngs.length} files)`
);
