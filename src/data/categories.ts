import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "cali-packs",
    name: "Cali Packs",
    slug: "cali-packs",
    tagline: "£0.20 per pack · Min 50 pcs",
    description:
      "108 HD-photographed Cali Packs. £0.20 per pack, minimum order 50 pcs. Smell-proof 3.5g designs ready for UK shops.",
    image: "/products/pack-001.webp",
    productCount: 108,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
