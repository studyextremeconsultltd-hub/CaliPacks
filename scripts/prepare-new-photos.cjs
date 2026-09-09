/**
 * Deduplicate CaliPacks New photos, export numbered originals + review thumbs.
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const sharp = require("sharp");

const SRC = path.join("E:", "Cali Packs", "CaliPacks New photos");
const UNIQUE = path.join("E:", "Cali Packs", "scripts", "_unique-photos");
const REVIEW = path.join("E:", "Cali Packs", "scripts", "_review-thumbs");

function hashFile(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

async function main() {
  fs.mkdirSync(UNIQUE, { recursive: true });
  fs.mkdirSync(REVIEW, { recursive: true });

  const files = fs
    .readdirSync(SRC)
    .filter((f) => /\.jpe?g$/i.test(f))
    .map((f) => path.join(SRC, f))
    .sort((a, b) => path.basename(a).localeCompare(path.basename(b)));

  const seen = new Map();
  const unique = [];

  for (const file of files) {
    const hash = hashFile(file);
    if (seen.has(hash)) continue;
    seen.set(hash, file);
    unique.push(file);
  }

  console.log(`Total: ${files.length}`);
  console.log(`Unique: ${unique.length}`);
  console.log(`Duplicates removed: ${files.length - unique.length}`);

  const manifest = [];

  for (let i = 0; i < unique.length; i++) {
    const n = String(i + 1).padStart(3, "0");
    const src = unique[i];
    const dest = path.join(UNIQUE, `pack-${n}.jpg`);
    const thumb = path.join(REVIEW, `pack-${n}.jpg`);
    fs.copyFileSync(src, dest);

    const meta = await sharp(src, { failOn: "none" }).rotate().metadata();
    await sharp(src, { failOn: "none" })
      .rotate()
      .resize({ width: 720, height: 720, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(thumb);

    manifest.push({
      index: i + 1,
      file: `pack-${n}.jpg`,
      original: path.basename(src),
      width: meta.width,
      height: meta.height,
    });
    console.log(`${n} ${meta.width}x${meta.height} ${path.basename(src)}`);
  }

  fs.writeFileSync(
    path.join("E:", "Cali Packs", "scripts", "new-photos-manifest.json"),
    JSON.stringify(manifest, null, 2)
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
