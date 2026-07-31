/**
 * Favicon generator for ARKANA.
 *
 * Source images:
 *   - public/logo-3d.png  → large icons (180, 192, 512) — full brand mark
 *   - public/icon.svg     → small icons (16, 32) rasterized via sharp's SVG support
 *
 * Run: node scripts/gen-favicons.mjs
 */

import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dir = path.dirname(fileURLToPath(import.meta.url));
const pub = path.resolve(__dir, "../public");

const svgSrc = readFileSync(path.join(pub, "icon.svg"));
const pngSrc = path.join(pub, "logo-3d.png");

// ── Small icons: use SVG (clean geometry, no text noise at 16–32px) ──────────
async function fromSvg(size, outFile) {
  await sharp(svgSrc)
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(path.join(pub, outFile));
  console.log(`✓ ${outFile} (${size}×${size} from SVG)`);
}

// ── Large icons: use logo-3d.png (full brand mark, readable at 128px+) ───────
async function fromPng(size, outFile, pad = 0) {
  const bg = { r: 7, g: 9, b: 15, alpha: 1 }; // #07090f — matches icon.svg bg
  const inner = size - pad * 2;
  await sharp(pngSrc)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: bg })
    .flatten({ background: bg })
    .png({ compressionLevel: 9 })
    .toFile(path.join(pub, outFile));
  console.log(`✓ ${outFile} (${size}×${size} from PNG, pad=${pad})`);
}

// ── Manifest ─────────────────────────────────────────────────────────────────
function writeManifest() {
  const manifest = {
    name: "ARKANA",
    short_name: "ARKANA",
    description: "IT-аутсорсинг для бизнеса в Ташкенте",
    start_url: "/",
    display: "standalone",
    background_color: "#05080a",
    theme_color: "#4fd18a",
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
  writeFileSync(
    path.join(pub, "site.webmanifest"),
    JSON.stringify(manifest, null, 2) + "\n"
  );
  console.log("✓ site.webmanifest");
}

// ── Run ───────────────────────────────────────────────────────────────────────
await fromSvg(16,  "favicon-16x16.png");
await fromSvg(32,  "favicon-32x32.png");
await fromPng(180, "apple-touch-icon.png",       10);   // iOS: ~94% fill, dark bg
await fromPng(192, "android-chrome-192x192.png",  12);  // Android: slight inset
await fromPng(512, "android-chrome-512x512.png",  32);  // PWA store icon
writeManifest();

console.log("\n✅ All favicon assets generated in /public");
