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
    id: "hero-pink",
    image: "/products/cali-06.jpg",
    imageAlt: "Cali Packs can jars on retail display",
    mood: "pink",
    headline: "Cali Packs That Steal the Shelf",
    subline: "Loud designs. Smell-proof finish. The packs UK shops reorder every week.",
    ctaLabel: "Shop Cali Packs",
    ctaHref: "/shop/cali-packs",
    floatingImages: [
      "/products/cali-01.jpg",
      "/products/cali-03.jpg",
      "/products/cali-04.jpg",
      "/products/cali-05.jpg",
      "/products/cali-10.jpg",
      "/products/cali-24.jpg",
    ],
  },
  {
    id: "hero-purple",
    image: "/products/cali-18.jpg",
    imageAlt: "Glassware and branded cases on shop shelves",
    mood: "purple",
    headline: "Glass, Cases & Hot Drops",
    subline: "From character bubblers to Cookies-style cases — stock what customers stop to buy.",
    ctaLabel: "Browse New Arrivals",
    ctaHref: "/shop?filter=new",
    floatingImages: [
      "/products/cali-13.jpg",
      "/products/cali-14.jpg",
      "/products/cali-15.jpg",
      "/products/cali-18.jpg",
      "/products/cali-19.jpg",
      "/products/cali-26.jpg",
    ],
  },
  {
    id: "hero-teal",
    image: "/products/cali-07.jpg",
    imageAlt: "ON BALANCE digital mini scale packaging",
    mood: "teal",
    headline: "Scales, Sealers & Shop Essentials",
    subline: "Precision scales and accessories — add to cart and get delivery in 2–3 days.",
    ctaLabel: "Shop All Products",
    ctaHref: "/shop",
    floatingImages: [
      "/products/cali-07.jpg",
      "/products/cali-08.jpg",
      "/products/cali-02.jpg",
      "/products/cali-11.jpg",
      "/products/cali-12.jpg",
      "/products/cali-28.jpg",
    ],
  },
];
