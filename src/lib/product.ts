import { Product } from "@/types";

export function isCaliPack(product: Product) {
  return product.categorySlug === "cali-packs";
}

export function productUnit(product: Product) {
  return isCaliPack(product) ? "per pack" : "each";
}

const framedPackIds = new Set(["pack-001", "pack-080", "pack-109", "pack-110", "pack-111"]);

export function productImageClass(product: Product) {
  if (isCaliPack(product) && !framedPackIds.has(product.id)) return "pack-fill";
  return "product-fit";
}
