import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");

async function toWebp(input, output, { width, quality }) {
  await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(output);
  const before = fs.statSync(input).size;
  const after = fs.statSync(output).size;
  console.log(
    `${path.relative(root, output)}: ${(before / 1024).toFixed(1)}KB -> ${(after / 1024).toFixed(1)}KB`
  );
}

await toWebp(
  path.join(root, "public/hero-cali-packs.jpg"),
  path.join(root, "public/hero-cali-packs-mobile.webp"),
  { width: 800, quality: 68 }
);
await toWebp(
  path.join(root, "public/hero-cali-packs.jpg"),
  path.join(root, "public/hero-cali-packs.webp"),
  { width: 1280, quality: 72 }
);
await toWebp(
  path.join(root, "public/cali-smoke-storefront.jpg"),
  path.join(root, "public/cali-smoke-storefront.webp"),
  { width: 1100, quality: 68 }
);
await toWebp(
  path.join(root, "public/cali-shop-hero.jpg"),
  path.join(root, "public/cali-shop-hero.webp"),
  { width: 1100, quality: 68 }
);

const packDir = path.join(root, "public/products");
const packs = fs.readdirSync(packDir).filter((file) => /^pack-\d+\.jpg$/i.test(file));
for (const file of packs) {
  await toWebp(path.join(packDir, file), path.join(packDir, file.replace(/\.jpg$/i, ".webp")), {
    width: 720,
    quality: 70,
  });
}
