export interface HeroBanner {
  id: string;
  image: string;
  imageAlt: string;
  mood: "pink" | "purple" | "teal";
  headline: string;
  subline: string;
  ctaLabel: string;
  ctaHref: string;
  floatingImages: string[];
}

export const heroBanners: HeroBanner[] = [
  {
    id: "hero-wall",
    image: "/hero-cali-packs.jpg",
    imageAlt: "Cali Packs wholesale wall — 108 HD designs",
    mood: "pink",
    headline: "108 Cali Packs. Studio HD.",
    subline:
      "£0.20 per pack · Minimum 50 pcs. Smell-proof 3.5g designs photographed for the web.",
    ctaLabel: "Shop Cali Packs",
    ctaHref: "/shop",
    floatingImages: [],
  },
  {
    id: "hero-rainbow",
    image: "/products/pack-027.jpg",
    imageAlt: "Rainbow Nerds Handbag Cali Pack",
    mood: "purple",
    headline: "Packs That Stop the Scroll.",
    subline:
      "Loud die-cut Cali Packs from £0.20 each. Wholesale minimum 50 pcs — UK dispatch in 2–3 days.",
    ctaLabel: "Browse the Catalogue",
    ctaHref: "/shop/cali-packs",
    floatingImages: [],
  },
  {
    id: "hero-gelato",
    image: "/products/pack-008.jpg",
    imageAlt: "Blue Guava Gelato Cali Pack",
    mood: "teal",
    headline: "Wholesale Ready. £0.20 a Pack.",
    subline:
      "Every design is named, priced and photographed in HD. Order 50+ pcs and we ship across the UK.",
    ctaLabel: "View All 108 Packs",
    ctaHref: "/shop",
    floatingImages: [],
  },
];
