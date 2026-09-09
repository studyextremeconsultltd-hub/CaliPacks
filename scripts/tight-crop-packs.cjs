/**
 * Tight-crop unique pack photos so the bag fills a square studio frame.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC = path.join("E:", "Cali Packs", "scripts", "_unique-photos");
const OUT = path.join("E:", "Cali Packs", "public", "products");
const SIZE = 900;
const INNER = 860;
const WORK = 360;
const CONCURRENCY = 3;

function isWhiteish(r, g, b) {
  return r > 208 && g > 208 && b > 208;
}

function similar(data, a, b, thresh) {
  return (
    Math.abs(data[a] - data[b]) < thresh &&
    Math.abs(data[a + 1] - data[b + 1]) < thresh &&
    Math.abs(data[a + 2] - data[b + 2]) < thresh
  );
}

function floodBackground(data, width, height, channels) {
  const total = width * height;
  const bg = new Uint8Array(total);
  const q = new Int32Array(total);
  let head = 0;
  let tail = 0;

  const push = (p) => {
    if (bg[p]) return;
    bg[p] = 1;
    q[tail++] = p;
  };

  for (let x = 0; x < width; x++) {
    push(x);
    push((height - 1) * width + x);
  }
  for (let y = 0; y < height; y++) {
    push(y * width);
    push(y * width + width - 1);
  }

  const neighbors = [-1, 1, -width, width];
  while (head < tail) {
    const p = q[head++];
    const i = p * channels;
    const x = p % width;
    const y = (p / width) | 0;
    for (const d of neighbors) {
      if (d === -1 && x === 0) continue;
      if (d === 1 && x === width - 1) continue;
      const n = p + d;
      if (n < 0 || n >= total || bg[n]) continue;
      const ni = n * channels;
      const ny = (n / width) | 0;
      if (Math.abs(ny - y) > 1) continue;
      if (similar(data, i, ni, 38) || isWhiteish(data[ni], data[ni + 1], data[ni + 2])) {
        push(n);
      }
    }
  }

  // Eat remaining paper that touches background
  head = 0;
  tail = 0;
  for (let p = 0; p < total; p++) {
    if (bg[p]) q[tail++] = p;
  }
  while (head < tail) {
    const p = q[head++];
    const x = p % width;
    for (const d of neighbors) {
      if (d === -1 && x === 0) continue;
      if (d === 1 && x === width - 1) continue;
      const n = p + d;
      if (n < 0 || n >= total || bg[n]) continue;
      const ni = n * channels;
      const ny = (n / width) | 0;
      const y = (p / width) | 0;
      if (Math.abs(ny - y) > 1) continue;
      if (isWhiteish(data[ni], data[ni + 1], data[ni + 2])) push(n);
    }
  }

  return bg;
}

async function contentBox(srcPath) {
  const { data, info } = await sharp(srcPath, { failOn: "none" })
    .rotate()
    .resize(WORK, WORK, { fit: "inside", withoutEnlargement: true })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const bg = floodBackground(data, width, height, channels);

  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  let hits = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (bg[y * width + x]) continue;
      hits += 1;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  const coverage = hits / (width * height);
  if (hits < 60 || coverage > 0.92 || maxX <= minX || maxY <= minY) {
    return null;
  }

  const padX = Math.max(3, Math.round((maxX - minX) * 0.03));
  const padY = Math.max(3, Math.round((maxY - minY) * 0.03));
  minX = Math.max(0, minX - padX);
  minY = Math.max(0, minY - padY);
  maxX = Math.min(width - 1, maxX + padX);
  maxY = Math.min(height - 1, maxY + padY);

  const meta = await sharp(srcPath, { failOn: "none" }).rotate().metadata();
  const sx = (meta.width || width) / width;
  const sy = (meta.height || height) / height;

  return {
    left: Math.round(minX * sx),
    top: Math.round(minY * sy),
    width: Math.round((maxX - minX + 1) * sx),
    height: Math.round((maxY - minY + 1) * sy),
  };
}

async function processOne(srcPath, outPath) {
  const box = await contentBox(srcPath);
  let pipeline = sharp(srcPath, { failOn: "none" }).rotate();

  if (box) {
    const meta = await sharp(srcPath, { failOn: "none" }).rotate().metadata();
    const maxW = meta.width || box.width;
    const maxH = meta.height || box.height;
    pipeline = pipeline.extract({
      left: Math.min(box.left, maxW - 8),
      top: Math.min(box.top, maxH - 8),
      width: Math.min(Math.max(8, box.width), maxW - Math.min(box.left, maxW - 8)),
      height: Math.min(Math.max(8, box.height), maxH - Math.min(box.top, maxH - 8)),
    });
  }

  const fitted = await pipeline
    .resize({
      width: INNER,
      height: INNER,
      fit: "contain",
      background: { r: 255, g: 255, b: 255 },
      kernel: sharp.kernel.lanczos3,
    })
    .sharpen({ sigma: 0.7, m1: 0.8, m2: 0.3 })
    .modulate({ brightness: 1.03, saturation: 1.05 })
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
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(outPath);
}

async function main() {
  const only = process.argv.slice(2);
  const files = (
    only.length
      ? only.map((n) => `pack-${String(n).padStart(3, "0")}.jpg`)
      : fs.readdirSync(SRC).filter((f) => /^pack-\d+\.jpg$/i.test(f))
  ).sort();

  console.log(`Tight-cropping ${files.length} packs...`);
  let i = 0;
  async function worker() {
    while (i < files.length) {
      const file = files[i++];
      const src = path.join(SRC, file);
      if (!fs.existsSync(src)) {
        console.warn("missing", file);
        continue;
      }
      const out = path.join(OUT, file);
      await processOne(src, out);
      const kb = Math.round(fs.statSync(out).size / 1024);
      console.log(`${file} ${kb}KB`);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
