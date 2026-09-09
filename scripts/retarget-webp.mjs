import fs from "node:fs";

const files = [
  "src/data/products.ts",
  "src/data/categories.ts",
  "src/data/hero-banners.ts",
  "src/app/about/page.tsx",
  "src/app/contact/page.tsx",
  "src/components/shop/ShopCatalogue.tsx",
];

for (const file of files) {
  const before = fs.readFileSync(file, "utf8");
  const after = before
    .replace(/\/products\/pack-(\d+)\.jpg/g, "/products/pack-$1.webp")
    .replaceAll("/cali-shop-hero.jpg", "/cali-shop-hero.webp")
    .replaceAll("/cali-smoke-storefront.jpg", "/cali-smoke-storefront.webp");
  if (after === before) {
    console.log("unchanged", file);
  } else {
    fs.writeFileSync(file, after);
    console.log("updated", file);
  }
}
