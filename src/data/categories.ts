import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "cali-packs",
    name: "Cali Packs",
    slug: "cali-packs",
    tagline: "Smell-Proof Mylar Bags",
    description: "Premium printed Cali Packs and mylar bags — loud designs, sealed fresh.",
    image: "/products/cali-06.jpg",
    productCount: 8,
  },
  {
    id: "can-jars",
    name: "Can & Jar Packs",
    slug: "can-jars",
    tagline: "Pop-Top Street Designs",
    description: "Novelty can-style jars with vibrant street art graphics.",
    image: "/products/cali-01.jpg",
    productCount: 6,
  },
  {
    id: "glassware",
    name: "Glassware",
    slug: "glassware",
    tagline: "Bubblers & Rigs",
    description: "Clear and coloured glass pieces for the shelf that sell themselves.",
    image: "/products/cali-18.jpg",
    productCount: 6,
  },
  {
    id: "scales",
    name: "Digital Scales",
    slug: "scales",
    tagline: "Precision You Can Trust",
    description: "Pocket and mini digital scales with retail-ready packaging.",
    image: "/products/cali-07.jpg",
    productCount: 3,
  },
  {
    id: "accessories",
    name: "Cases & Accessories",
    slug: "accessories",
    tagline: "Carry, Seal & Display",
    description: "Zip cases, vacuum sealers, novelty displays and extras.",
    image: "/products/cali-13.jpg",
    productCount: 7,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
