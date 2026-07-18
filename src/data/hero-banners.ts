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

/** AI studio shots first — fast JPG heroes for the top of the homepage */
export const heroBanners: HeroBanner[] = [
  {
    id: "hero-ai-studio",
    image: "/ai-hero-studio.jpg",
    imageAlt: "Cali Packs AI studio product collection on white",
    mood: "pink",
    headline: "Studio-Clear Product Photos.",
    subline:
      "Cali packs, glass, scales and jars shot for the web — shop online with fast UK delivery.",
    ctaLabel: "Shop Now",
    ctaHref: "/shop",
    floatingImages: [],
  },
  {
    id: "hero-ai-packs",
    image: "/ai-hero-packs.jpg",
    imageAlt: "Premium Cali Packs fanned studio hero",
    mood: "purple",
    headline: "Packs That Stop the Scroll.",
    subline: "Bold designs, smell-proof finish — wholesale-ready for UK smoke shops.",
    ctaLabel: "Browse Packs",
    ctaHref: "/shop/cali-packs",
    floatingImages: [],
  },
  {
    id: "hero-ai-essentials",
    image: "/ai-hero-banner.jpg",
    imageAlt: "Premium Cali Packs tools and essentials studio banner",
    mood: "teal",
    headline: "Scales, Sealers & Essentials",
    subline: "Counter-ready tools and packaging — add to cart for 2–3 day UK delivery.",
    ctaLabel: "View All Products",
    ctaHref: "/shop",
    floatingImages: [],
  },
];
