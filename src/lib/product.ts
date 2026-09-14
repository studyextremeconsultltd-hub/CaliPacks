import { Product } from "@/types";

export function isCaliPack(product: Product) {
  return product.categorySlug === "cali-packs";
}

export function productUnit(product: Product) {
  return isCaliPack(product) ? "per pack" : "each";
}

export function productImageClass(product: Product) {
  return isCaliPack(product) ? "pack-fill" : "object-cover object-center";
}
