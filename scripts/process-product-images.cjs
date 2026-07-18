/**
 * Rebuild existing public/products/cali-*.jpg as UHD white-background
 * square frames. Full photo visible (no crop). Preserves filename mapping.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const OUT_DIR = path.join("E:", "Cali Packs", "public", "products");
const SOURCE_DIR = path.join("E:", "Cali Packs", "CaliPacks Photos");
const SIZE = 2400;
const QUALITY = 98;
const TMP = path.join(OUT_DIR, "_tmp_uhd");

async function processOne(srcPath, outPath) {
  const meta = await sharp(srcPath, { failOn: "none" }).rotate().metadata();
  const w = meta.width || SIZE;
  const h = meta.height || SIZE;
  const longest = Math.max(w, h);
  const targetLong = Math.max(SIZE, longest);
  const scale = targetLong / longest;

  const resized = await sharp(srcPath, { failOn: "none" })
    .rotate()
    .resize({
      width: Math.round(w * scale),
      height: Math.round(h * scale),
      fit: "inside",
      kernel: sharp.kernel.lanczos3,
    })
    .sharpen({ sigma: 1.15, m1: 1.05, m2: 0.55 })
    .modulate({ brightness: 1.05, saturation: 1.1 })
    .linear(1.08, -8)
    .toBuffer();

  const fitted = await sharp(resized)
    .resize({
      width: SIZE - 96,
      height: SIZE - 96,
      fit: "inside",
      background: { r: 255, g: 255, b: 255 },
    })
    .toBuffer();

  await sharp({
    create: {
      width: SIZE,
      height: SIZE,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite([{ input: fitted, gravity: "centre" }])
    .jpeg({
      quality: QUALITY,
      mozjpeg: true,
      chromaSubsampling: "4:4:4",
    })
    .toFile(outPath);

  const outMeta = await sharp(outPath).metadata();
  const kb = Math.round(fs.statSync(outPath).size / 1024);
  return `${path.basename(outPath)} ${outMeta.width}x${outMeta.height} ${kb}KB`;
}

async function findBestSource(publicFile) {
  // Prefer matching original from CaliPacks Photos by size (pre-process copies)
  // Fallback: the public file itself
  if (!fs.existsSync(SOURCE_DIR)) return publicFile;
  const pubSize = fs.statSync(publicFile).size;
  const sources = fs
    .readdirSync(SOURCE_DIR)
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .map((f) => path.join(SOURCE_DIR, f));

  const exact = sources.find((s) => fs.statSync(s).size === pubSize);
  if (exact) return exact;

  // If already processed, public differs — use public as source
  return publicFile;
}

async function main() {
  fs.mkdirSync(TMP, { recursive: true });
  const files = fs
    .readdirSync(OUT_DIR)
    .filter((f) => /^cali-\d+\.jpg$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  console.log(`Processing ${files.length} product images to ${SIZE}x${SIZE} white UHD...`);

  for (const name of files) {
    const publicPath = path.join(OUT_DIR, name);
    const src = await findBestSource(publicPath);
    const tmpOut = path.join(TMP, name);
    try {
      const info = await processOne(src, tmpOut);
      fs.copyFileSync(tmpOut, publicPath);
      console.log("OK", info, "<-", path.basename(src));
    } catch (err) {
      console.error("FAIL", name, err.message);
    }
  }

  // Shop image -> shop-hero.jpg if present
  const shopSrc = fs
    .readdirSync(SOURCE_DIR)
    .find((f) => /shop image/i.test(f));
  if (shopSrc) {
    const out = path.join(OUT_DIR, "shop-hero.jpg");
    const info = await processOne(path.join(SOURCE_DIR, shopSrc), out);
    console.log("OK", info);
  }

  // cleanup tmp
  for (const f of fs.readdirSync(TMP)) fs.unlinkSync(path.join(TMP, f));
  fs.rmdirSync(TMP);
  console.log("DONE");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
