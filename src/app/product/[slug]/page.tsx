import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, products } from "@/data/products";
import { getCategoryBySlug } from "@/data/categories";
import { ProductGallery, AddToCartButton } from "@/components/products/ProductDetail";
import { ProductCard } from "@/components/products/ProductCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatPrice } from "@/lib/utils";
import { SITE_NAME, SITE_URL, pageUrl } from "@/lib/site";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} Cali Pack`,
    description: `Buy ${product.name} Cali Pack from Smoke Cali. £0.20 per pack, minimum 50 pcs. HD photo, UK delivery in 2–3 days.`,
    openGraph: {
      type: "website",
      url: pageUrl(`/product/${product.slug}`),
      title: `${product.name} — £0.20 per pack | Smoke Cali`,
      description: product.shortDescription,
      images: [{ url: product.image, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} Cali Pack`,
      description: product.shortDescription,
      images: [product.image],
    },
    alternates: {
      canonical: pageUrl(`/product/${product.slug}`),
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategoryBySlug(product.categorySlug);
  const related = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="py-8 md:py-12">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: `${product.name} Cali Pack`,
            image: `${SITE_URL}${product.image}`,
            description: product.description,
            sku: product.sku,
            brand: { "@type": "Brand", name: SITE_NAME },
            offers: {
              "@type": "Offer",
              url: pageUrl(`/product/${product.slug}`),
              priceCurrency: "GBP",
              price: product.price.toFixed(2),
              availability: product.inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
              priceValidUntil: "2027-12-31",
              seller: { "@type": "Organization", name: SITE_NAME },
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: pageUrl("/"),
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Shop",
                item: pageUrl("/shop"),
              },
              {
                "@type": "ListItem",
                position: 3,
                name: product.name,
                item: pageUrl(`/product/${product.slug}`),
              },
            ],
          },
        ]}
      />
      <div className="container-site">
        <nav className="text-sm text-surface-800/40 mb-8">
          <Link href="/" className="hover:text-brand-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-brand-700">Shop</Link>
          {category && (
            <>
              <span className="mx-2">/</span>
              <Link href={`/shop/${category.slug}`} className="hover:text-brand-700">
                {category.name}
              </Link>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-surface-800 line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <ProductGallery product={product} />

          <div>
            {product.isNew && (
              <span className="inline-block px-2.5 py-1 bg-brand-100 text-brand-700 text-xs font-semibold rounded-full mb-3">
                New Arrival
              </span>
            )}
            <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-3 text-gradient-pink">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-black text-black">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-black/35 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-sm text-brand-600 font-bold">per pack</span>
            </div>

            <p className="text-black/70 leading-relaxed mb-8 font-semibold">
              {product.description}
            </p>

            <div className="border-t border-surface-200 pt-6 mb-6">
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-surface-800/40">SKU</dt>
                  <dd className="font-medium">{product.sku}</dd>
                </div>
                <div>
                  <dt className="text-surface-800/40">Availability</dt>
                  <dd className="font-medium text-brand-700">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </dd>
                </div>
                {category && (
                  <div>
                    <dt className="text-surface-800/40">Category</dt>
                    <dd>
                      <Link href={`/shop/${category.slug}`} className="font-medium text-brand-700 hover:underline">
                        {category.name}
                      </Link>
                    </dd>
                  </div>
                )}
                {product.minOrder && (
                  <div>
                    <dt className="text-surface-800/40">Min. Order</dt>
                    <dd className="font-medium">{product.minOrder} pcs</dd>
                  </div>
                )}
              </dl>
            </div>

            <AddToCartButton product={product} />
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16 pt-12 border-t border-surface-200">
            <h2 className="text-xl font-bold text-surface-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
