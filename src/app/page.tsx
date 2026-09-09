import { preload } from "react-dom";
import { HeroBannerSlider } from "@/components/home/HeroBannerSlider";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { CategorySection } from "@/components/products/ProductGrid";
import { CTASection } from "@/components/home/CTASection";
import { HomepageMap } from "@/components/home/HomepageMap";
import { StorefrontShowcase } from "@/components/home/StorefrontShowcase";
import { TrustBadges } from "@/components/layout/AnnouncementBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { getHomepageSections } from "@/data/products";
import { SITE_URL } from "@/lib/site";

export default function HomePage() {
  preload("/hero-cali-packs-mobile.webp", { as: "image", fetchPriority: "high" });
  const { latest, more, heroTiles, featured } = getHomepageSections();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Cali Packs wholesale catalogue",
          numberOfItems: 108,
          itemListElement: latest.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${SITE_URL}/product/${product.slug}`,
            name: product.name,
          })),
        }}
      />
      <HeroBannerSlider products={heroTiles} />
      <TrustBadges />
      <CategorySection
        title="Latest Cali Packs"
        subtitle="HD studio photography. £0.20 per pack · minimum 50 pcs."
        products={latest}
        viewAllHref="/shop"
        eagerCount={0}
        showCart={false}
        className="py-14 md:py-20"
      />
      <CategorySection
        title="More Designs"
        subtitle="108 named Cali Packs in the shop — every image is a clear HD studio shot."
        products={more}
        viewAllHref="/shop"
        eagerCount={0}
        showCart={false}
        className="py-14 md:py-20 bg-gradient-to-b from-brand-50/60 via-white to-brand-50/40"
      />
      <CategoryShowcase products={featured} />
      <StorefrontShowcase />
      <CTASection />
      <HomepageMap />
    </>
  );
}
