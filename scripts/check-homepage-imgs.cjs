const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join("src", "data", "products.ts"), "utf8");

// Quick parse of image: img(N) with preceding id - already verified unique products
function imgsForIds(ids) {
  const out = [];
  for (const id of ids) {
    const re = new RegExp(`id: "${id}"[\\s\\S]*?image: img\\((\\d+)\\)`);
    const m = src.match(re);
    if (m) out.push(`/products/cali-${m[1].padStart(2, "0")}.jpg`);
  }
  return out;
}

// Simulate getLatestCaliPacks: first 8 with cali-packs or can-jars
const blockRe = /\{[\s\S]*?id: "(p\d+)"[\s\S]*?categorySlug: "([^"]+)"[\s\S]*?image: img\((\d+)\)/g;
const items = [];
let m;
while ((m = blockRe.exec(src))) {
  items.push({ id: m[1], cat: m[2], img: Number(m[3]) });
}
const latest = items
  .filter((x) => x.cat === "cali-packs" || x.cat === "can-jars")
  .slice(0, 8)
  .map((x) => `/products/cali-${String(x.img).padStart(2, "0")}.jpg`);

const shopIds = ["p7", "p13", "p18", "p26", "p31", "p32", "p19", "p14"];
const latestIds = new Set(
  items
    .filter((x) => x.cat === "cali-packs" || x.cat === "can-jars")
    .slice(0, 8)
    .map((x) => x.id)
);
const shop = shopIds
  .filter((id) => !latestIds.has(id))
  .map((id) => {
    const it = items.find((x) => x.id === id);
    return it ? `/products/cali-${String(it.img).padStart(2, "0")}.jpg` : null;
  })
  .filter(Boolean);

const used = new Set([...latest, ...shop]);
const allImgs = items.map((x) => `/products/cali-${String(x.img).padStart(2, "0")}.jpg`);
const hero = [...new Set(allImgs)].filter((s) => !used.has(s)).slice(0, 12);
const combined = [...latest, ...shop, ...hero];
console.log("latest", latest);
console.log("shop", shop);
console.log("hero", hero);
console.log("overlap", latest.filter((x) => shop.includes(x)));
console.log("homepage_unique", combined.length === new Set(combined).size, combined.length);
