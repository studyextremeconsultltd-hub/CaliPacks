import { HeroBannerSlider } from "@/components/home/HeroBannerSlider";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { CategorySection } from "@/components/products/ProductGrid";
import { CTASection } from "@/components/home/CTASection";
import { HomepageMap } from "@/components/home/HomepageMap";
import { TrustBadges } from "@/components/layout/AnnouncementBar";
import { heroBanners } from "@/data/hero-banners";
import { getLatestCaliPacks, getNewArrivals } from "@/data/products";

export default function HomePage() {
  const caliPacks = getLatestCaliPacks(8);
  const newArrivals = getNewArrivals(8);

  return (
    <>
      <HeroBannerSlider banners={heroBanners} />
      <TrustBadges />
      <CategorySection
        title="Latest Cali Packs"
        subtitle="Fresh stock from our shelves — printed packs and can jars with UK market pricing."
        products={caliPacks}
        viewAllHref="/shop/cali-packs"
        className="py-14 md:py-20"
      />
      <CategorySection
        title="New Arrivals"
        subtitle="The loudest, most in-demand drops — cases, glass, scales and packs customers love."
        products={newArrivals}
        viewAllHref="/shop?filter=new"
        className="py-14 md:py-20 bg-gradient-to-b from-brand-50/60 via-white to-brand-50/40"
      />
      <CategoryShowcase />
      <CTASection />
      <HomepageMap />
    </>
  );
}
