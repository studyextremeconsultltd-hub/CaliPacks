import { HeroBannerSlider } from "@/components/home/HeroBannerSlider";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { CategorySection } from "@/components/products/ProductGrid";
import { CTASection } from "@/components/home/CTASection";
import { HomepageMap } from "@/components/home/HomepageMap";
import { StorefrontShowcase } from "@/components/home/StorefrontShowcase";
import { TrustBadges } from "@/components/layout/AnnouncementBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { heroBanners } from "@/data/hero-banners";
import { getFeaturedProducts, getLatestCaliPacks, getShopDisplayProducts } from "@/data/products";
import { SITE_URL } from "@/lib/site";

export default function HomePage() {
  const caliPacks = getLatestCaliPacks(8);
  const morePacks = getShopDisplayProducts(8);
  const productImages = getFeaturedProducts()
    .slice(0, 12)
    .map((p) => p.image);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Cali Packs wholesale catalogue",
          numberOfItems: 108,
          itemListElement: caliPacks.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${SITE_URL}/product/${product.slug}`,
            name: product.name,
          })),
        }}
      />
      <HeroBannerSlider banners={heroBanners} productImages={productImages} />
      <TrustBadges />
      <CategorySection
        title="Latest Cali Packs"
        subtitle="HD studio photography. £0.20 per pack · minimum 50 pcs."
        products={caliPacks}
        viewAllHref="/shop/cali-packs"
        className="py-14 md:py-20"
      />
      <CategorySection
        title="More Designs"
        subtitle="108 named Cali Packs in the shop — every image is a clear HD studio shot."
        products={morePacks}
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
