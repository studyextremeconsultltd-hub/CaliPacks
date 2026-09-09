import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopCatalogue } from "@/components/shop/ShopCatalogue";
import { pageUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cali Packs",
  description:
    "Shop 108 HD Cali Packs at Smoke Cali. One catalogue, £0.20 per pack, minimum 50 pcs. Smell-proof 3.5g designs with UK delivery in 2–3 days.",
  alternates: { canonical: pageUrl("/shop") },
  openGraph: {
    url: pageUrl("/shop"),
    title: "Cali Packs — £0.20 per pack | Smoke Cali",
    description: "108 HD Cali Packs. £0.20 per pack · minimum 50 pcs. Manchester wholesale.",
    images: [{ url: "/hero-cali-packs.jpg", alt: "Smoke Cali Cali Packs catalogue" }],
  },
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container-site py-16 font-semibold text-black/50">Loading shop…</div>}>
      <ShopCatalogue />
    </Suspense>
  );
}
