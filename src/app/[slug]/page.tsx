import type { Metadata } from "next";
import { notFound } from "next/navigation";

const pages: Record<string, { title: string; content: string }> = {
  privacy: {
    title: "Privacy Policy",
    content: "Cali Packs is committed to protecting your privacy. We collect only the information necessary to process your orders and improve your experience. We do not sell or share your personal data with third parties except as required to fulfil your orders.",
  },
  terms: {
    title: "Terms of Service",
    content: "By using the Cali Packs website, you agree to these terms. All products are sold subject to availability. Prices are listed in GBP and exclude VAT where applicable. Cali Packs reserves the right to modify prices and product availability without notice.",
  },
  shipping: {
    title: "Shipping Policy",
    content: "We dispatch in-stock orders within 2–3 business days. UK standard delivery takes 1–2 additional business days. Free delivery is available on orders over £150. Tracking information is provided via email once your order ships.",
  },
  returns: {
    title: "Returns Policy",
    content: "Due to the custom nature of our packaging products, we accept returns only for defective or damaged items. Please contact us within 7 days of delivery with photos of the issue. We will arrange a replacement or refund at our discretion.",
  },
};

interface LegalPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) return { title: "Page Not Found" };
  return { title: page.title };
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) notFound();

  return (
    <div className="py-12 md:py-16">
      <div className="container-site max-w-3xl">
        <h1 className="text-3xl font-bold text-surface-900 tracking-tight mb-6">
          {page.title}
        </h1>
        <p className="text-surface-800/70 leading-relaxed">{page.content}</p>
      </div>
    </div>
  );
}
