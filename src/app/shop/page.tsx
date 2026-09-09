import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopCatalogue } from "@/components/shop/ShopCatalogue";

export const metadata: Metadata = {
  title: "Shop Cali Packs",
  description:
    "Shop 108 HD Cali Packs. £0.20 per pack, minimum order 50 pcs. Smell-proof 3.5g designs with UK delivery in 2–3 days.",
  openGraph: {
    title: "Shop Cali Packs — £0.20 per pack",
    description: "108 HD Cali Packs. £0.20 per pack · minimum 50 pcs.",
    images: [{ url: "/hero-cali-packs.jpg" }],
  },
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container-site py-16 font-semibold text-black/50">Loading shop…</div>}>
      <ShopCatalogue />
    </Suspense>
  );
}
