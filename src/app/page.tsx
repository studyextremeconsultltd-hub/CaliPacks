import { HeroBannerSlider } from "@/components/home/HeroBannerSlider";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { CategorySection } from "@/components/products/ProductGrid";
import { CTASection } from "@/components/home/CTASection";
import { HomepageMap } from "@/components/home/HomepageMap";
import { StorefrontShowcase } from "@/components/home/StorefrontShowcase";
import { TrustBadges } from "@/components/layout/AnnouncementBar";
import { heroBanners } from "@/data/hero-banners";
import { getLatestCaliPacks, getShopDisplayProducts, products } from "@/data/products";

/** All catalogue images for hero tiles — 4 shown at a time, rotating through the full set */
function getHeroProductImages(): string[] {
  return products
    .map((p) => p.image)
    .filter((src, i, arr) => arr.indexOf(src) === i);
}

export default function HomePage() {
  const caliPacks = getLatestCaliPacks(8);
  const shopDisplayProducts = getShopDisplayProducts();
  const productImages = getHeroProductImages();

  return (
    <>
      <HeroBannerSlider banners={heroBanners} productImages={productImages} />
      <TrustBadges />
      <CategorySection
        title="Latest Cali Packs"
        subtitle="Fresh designs with clear studio photography — packs and jars priced for UK shops."
        products={caliPacks}
        viewAllHref="/shop/cali-packs"
        className="py-14 md:py-20"
      />
      <CategorySection
        title="Seen in Our Manchester Shop"
        subtitle="Hookahs, glassware, cases and scales selected from our real store stock."
        products={shopDisplayProducts}
        viewAllHref="/shop"
        className="py-14 md:py-20 bg-gradient-to-b from-brand-50/60 via-white to-brand-50/40"
      />
      <CategoryShowcase />
      <StorefrontShowcase />
      <CTASection />
      <HomepageMap />
    </>
  );
}
