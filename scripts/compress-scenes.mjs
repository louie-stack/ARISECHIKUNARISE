import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

const DIR = "public/art/scenes";
const MAX_DIM = 1200;
const QUALITY = 82;

const files = (await readdir(DIR)).filter((f) => f.endsWith(".png"));

for (const name of files) {
  const src = join(DIR, name);
  const out = join(DIR, name.replace(/\.png$/, ".webp"));
  const before = (await stat(src)).size;
  await sharp(src)
    .resize({ width: MAX_DIM, height: MAX_DIM, fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 5 })
    .toFile(out);
  const after = (await stat(out)).size;
  console.log(
    `${name.padEnd(24)} ${(before / 1024 / 1024).toFixed(1)}M → ${(after / 1024).toFixed(0)}K (${out.replace(/\\/g, "/")})`
  );
}
