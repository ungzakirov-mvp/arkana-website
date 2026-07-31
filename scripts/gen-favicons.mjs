/**
 * ARKANA — Favicon Generator
 *
 * ─────────────────────────────────────────────────────────────────────────
 * PLACEHOLDER: Currently using public/icon.svg as the brand source.
 *
 * When the final brand logo is provided:
 *   1. Place the file at: public/brand-logo.svg  (or brand-logo.png)
 *   2. Update BRAND_SOURCE below to point to the new file
 *   3. Run: node scripts/gen-favicons.mjs
 *   All PNG variants regenerate automatically from a single source.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Generated outputs (all in /public):
 *   favicon-16x16.png        — browser tab, address bar (small)
 *   favicon-32x32.png        — browser tab, bookmarks, Win taskbar
 *   apple-touch-icon.png     — iOS Home Screen (180×180)
 *   android-chrome-192x192.png — Android Home Screen (192×192)
 *   android-chrome-512x512.png — PWA splash screen, Play Store (512×512)
 *   site.webmanifest         — PWA manifest
 *
 * Run: node scripts/gen-favicons.mjs
 */

import sharp from "sharp";
import { readFileSync, existsSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dir = path.dirname(fileURLToPath(import.meta.url));
const pub = path.resolve(__dir, "../public");

// ── Brand source ──────────────────────────────────────────────────────────────
// PLACEHOLDER: replace with the final brand logo file once provided.
// Supported formats: .svg, .png (transparent background preferred)
const BRAND_SOURCE = "icon.svg"; // TODO: replace with "brand-logo.svg" (or .png)

const srcPath = path.join(pub, BRAND_SOURCE);
if (!existsSync(srcPath)) {
  console.error(`✗ Brand source not found: ${srcPath}`);
  process.exit(1);
}

const isSvg = BRAND_SOURCE.endsWith(".svg");
// sharp accepts both SVG buffers and PNG file paths
const src = isSvg ? readFileSync(srcPath) : srcPath;

console.log(`Source: ${BRAND_SOURCE}${BRAND_SOURCE === "icon.svg" ? " (placeholder — awaiting final brand logo)" : ""}\n`);

// Brand background — matches icon.svg dark base, used on all icons
const BG = { r: 7, g: 9, b: 15, alpha: 1 }; // #07090f

/**
 * Resize brand source to `size×size` with optional padding,
 * composite onto dark background, write PNG.
 */
async function generate(size, outFile, pad = 0) {
  const inner = size - pad * 2;
  await sharp(src)
    .resize(inner, inner, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: BG })
    .flatten({ background: BG })
    .png({ compressionLevel: 9 })
    .toFile(path.join(pub, outFile));
  console.log(`✓ ${outFile.padEnd(32)} ${size}×${size}px  pad=${pad}`);
}

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

// ── Generate all sizes ────────────────────────────────────────────────────────
//                         size   file                          pad
await generate(            16,   "favicon-16x16.png",           1);
await generate(            32,   "favicon-32x32.png",           2);
await generate(           180,   "apple-touch-icon.png",       10);
await generate(           192,   "android-chrome-192x192.png", 12);
await generate(           512,   "android-chrome-512x512.png", 32);
writeManifest();

console.log("\n✅ All favicon assets generated in /public");
if (BRAND_SOURCE === "icon.svg") {
  console.log("   ⚠  Using placeholder source (icon.svg).");
  console.log("   Replace BRAND_SOURCE with the final logo file and rerun.");
}
