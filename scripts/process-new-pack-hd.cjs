/**
 * HD white-studio frames for unique Cali Packs (web-fast, still sharp).
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC = path.join("E:", "Cali Packs", "scripts", "_unique-photos");
const OUT = path.join("E:", "Cali Packs", "public", "products");
const SIZE = 1600;
const QUALITY = 88;

async function processOne(srcPath, outPath) {
  const fitted = await sharp(srcPath, { failOn: "none" })
    .rotate()
    .resize({
      width: SIZE - 80,
      height: SIZE - 80,
      fit: "inside",
      withoutEnlargement: false,
      kernel: sharp.kernel.lanczos3,
      background: { r: 255, g: 255, b: 255 },
    })
    .sharpen({ sigma: 0.9, m1: 0.9, m2: 0.4 })
    .modulate({ brightness: 1.04, saturation: 1.08 })
    .jpeg({ quality: QUALITY, mozjpeg: true, chromaSubsampling: "4:4:4" })
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
    .jpeg({ quality: QUALITY, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(outPath);
}

async function main() {
  const files = fs
    .readdirSync(SRC)
    .filter((f) => /^pack-\d+\.jpg$/i.test(f))
    .sort();

  console.log(`Processing ${files.length} HD product frames...`);
  for (const file of files) {
    const out = path.join(OUT, file);
    await processOne(path.join(SRC, file), out);
    const kb = Math.round(fs.statSync(out).size / 1024);
    console.log(`${file} ${kb}KB`);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
