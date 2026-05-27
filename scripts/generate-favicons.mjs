/**
 * generate-favicons.mjs
 *
 * One-shot script: takes the high-res master at public/logo-icon.png and
 * writes properly-sized SQUARE favicon PNGs to public/favicons/. Each output
 * is generated at its native pixel size, centered, with transparent padding
 * preserving the source aspect ratio.
 *
 * Run with:  node scripts/generate-favicons.mjs
 *
 * The master logo-icon.png is left untouched (we keep it for the PWA
 * manifest and OG image where higher resolution is desirable).
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC = resolve(ROOT, 'public/logo-icon.png');
const OUT_DIR = resolve(ROOT, 'public/favicons');

const TARGETS = [
  { name: 'favicon-32.png', size: 32 },
  { name: 'favicon-64.png', size: 64 },
  { name: 'favicon-128.png', size: 128 },
  { name: 'favicon-192.png', size: 192 },
  { name: 'apple-touch-icon.png', size: 180 },
];

await mkdir(OUT_DIR, { recursive: true });

const meta = await sharp(SRC).metadata();
console.log(`source: ${meta.width}x${meta.height} ${meta.format}`);

for (const { name, size } of TARGETS) {
  const out = resolve(OUT_DIR, name);
  await sharp(SRC)
    .resize(size, size, {
      // fit: 'contain' preserves aspect ratio; the empty space gets the
      // background fill below. Since the master is non-square, this keeps
      // the icon undistorted at every favicon size.
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: 'lanczos3',
    })
    .png({ compressionLevel: 9, palette: false })
    .toFile(out);
  console.log(`  wrote ${name.padEnd(24)} ${size}x${size}`);
}

console.log('done.');
