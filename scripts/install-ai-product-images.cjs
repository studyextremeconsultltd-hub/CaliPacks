/**
 * Install unique AI studio product photos → public/products/cali-01..32.jpg
 * Also writes optimized hero JPGs (no huge PNGs on the hot path).
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ASSETS = path.join(
  "C:",
  "Users",
  "Nouman Faiz",
  ".cursor",
  "projects",
  "e-Cali-Packs",
  "assets"
);
const PUBLIC = path.join("E:", "Cali Packs", "public");
const PRODUCTS = path.join(PUBLIC, "products");

const PRODUCT_SIZE = 1100;
const PRODUCT_Q = 82;
const HERO_W = 1600;
const HERO_H = 900;
const HERO_Q = 78;

async function toWhiteSquareJpg(srcPng, destJpg) {
  await sharp(srcPng)
    .resize({
      width: PRODUCT_SIZE,
      height: PRODUCT_SIZE,
      fit: "contain",
      background: { r: 255, g: 255, b: 255 },
    })
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .jpeg({ quality: PRODUCT_Q, mozjpeg: true, chromaSubsampling: "4:2:0" })
    .toFile(destJpg);
}

async function toBannerJpg(src, destJpg, { width = HERO_W, height = HERO_H } = {}) {
  await sharp(src)
    .resize({ width, height, fit: "cover", position: "centre" })
    .jpeg({ quality: HERO_Q, mozjpeg: true, chromaSubsampling: "4:2:0" })
    .toFile(destJpg);
}

/** Every cali-NN.jpg gets a distinct AI source (no shared duplicates). */
const map = {
  "cali-01.jpg": "ai-can-jar-01.png",
  "cali-02.jpg": "ai-uniq-vacuum.png",
  "cali-03.jpg": "ai-uniq-jar-green.png",
  "cali-04.jpg": "ai-uniq-jar-amber.png",
  "cali-05.jpg": "ai-cali-pack-04.png",
  "cali-06.jpg": "ai-cali-pack-01.png",
  "cali-07.jpg": "ai-scale-01.png",
  "cali-08.jpg": "ai-uniq-scale-silver.png",
  "cali-09.jpg": "ai-uniq-scale-box.png",
  "cali-10.jpg": "ai-can-jars-set.png",
  "cali-11.jpg": "ai-hookah-01.png",
  "cali-12.jpg": "ai-uniq-hookah-blue.png",
  "cali-13.jpg": "ai-case-01.png",
  "cali-14.jpg": "ai-uniq-case-red.png",
  "cali-15.jpg": "ai-uniq-case-teal.png",
  "cali-16.jpg": "ai-case-02.png",
  "cali-17.jpg": "ai-vacuum-rolls.png",
  "cali-18.jpg": "ai-glass-01.png",
  "cali-19.jpg": "ai-uniq-glass-orange.png",
  "cali-20.jpg": "ai-uniq-glass-mini.png",
  "cali-21.jpg": "ai-uniq-glass-pink.png",
  "cali-22.jpg": "ai-uniq-cans-trio.png",
  "cali-23.jpg": "ai-cali-pack-02.png",
  "cali-24.jpg": "ai-cali-pack-03.png",
  "cali-25.jpg": "ai-jar-uv.png",
  "cali-26.jpg": "ai-uniq-pack-blue.png",
  "cali-27.jpg": "ai-uniq-pack-gold.png",
  "cali-28.jpg": "ai-uniq-pack-lime.png",
  "cali-29.jpg": "ai-uniq-glass-tall.png",
  "cali-30.jpg": "ai-glass-02.png",
  "cali-31.jpg": "ai-uniq-packs-fan-white.png",
  "cali-32.jpg": "ai-uniq-rasta-ashtray.png",
};

async function main() {
  fs.mkdirSync(PRODUCTS, { recursive: true });

  const used = new Set();
  for (const [outName, srcName] of Object.entries(map)) {
    if (used.has(srcName)) {
      throw new Error(`Duplicate AI source mapped: ${srcName}`);
    }
    used.add(srcName);
    const src = path.join(ASSETS, srcName);
    const dest = path.join(PRODUCTS, outName);
    if (!fs.existsSync(src)) {
      console.error("MISSING", srcName);
      continue;
    }
    await toWhiteSquareJpg(src, dest);
    const kb = Math.round(fs.statSync(dest).size / 1024);
    console.log("OK", outName, "<-", srcName, `${kb}KB`);
  }

  // Hero / showcase assets (optimized JPGs used by the site)
  const heroes = [
    ["ai-hero-composition-01.png", "ai-hero-studio.jpg", true],
    ["ai-hero-packs-fan.png", "ai-hero-packs.jpg", true],
    ["ai-hero-banner-01.png", "ai-hero-banner.jpg", true],
  ];

  for (const [srcName, rel, isBanner] of heroes) {
    const src = path.join(ASSETS, srcName);
    const dest = path.join(PUBLIC, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    if (!fs.existsSync(src)) {
      console.error("MISSING", srcName);
      continue;
    }
    if (isBanner) await toBannerJpg(src, dest);
    else await toWhiteSquareJpg(src, dest);
    console.log("OK", rel, `${Math.round(fs.statSync(dest).size / 1024)}KB`);
  }

  // Compress shop photos used as secondary page heroes (PNG → JPG) when sources exist
  const shopPng = path.join(PUBLIC, "cali-shop-hero-refined.png");
  const shopJpg = path.join(PUBLIC, "cali-shop-hero.jpg");
  if (fs.existsSync(shopPng)) {
    await toBannerJpg(shopPng, shopJpg, { width: 1600, height: 1000 });
    console.log("OK cali-shop-hero.jpg");
  }

  const storePng = path.join(PUBLIC, "cali-smoke-storefront.png");
  const storeJpg = path.join(PUBLIC, "cali-smoke-storefront.jpg");
  if (fs.existsSync(storePng)) {
    await toBannerJpg(storePng, storeJpg, { width: 1600, height: 900 });
    console.log("OK cali-smoke-storefront.jpg");
  }

  console.log("DONE — unique sources:", used.size);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
