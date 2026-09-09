import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { AddToCartMini } from "./AddToCartMini";

interface ProductCardProps {
  product: Product;
  accentIndex?: number;
  priority?: boolean;
}

const cornerPairs = [
  { a: "#ec4899", b: "#f9a8d4" },
  { a: "#db2777", b: "#f472b6" },
  { a: "#be185d", b: "#fbcfe8" },
  { a: "#f472b6", b: "#ec4899" },
];

export function ProductCard({ product, accentIndex = 0, priority = false }: ProductCardProps) {
  const corners = cornerPairs[accentIndex % cornerPairs.length];

  return (
    <article
      className="product-card group relative card-corners rounded-2xl bg-white border border-brand-100 shadow-sm hover:shadow-xl hover:shadow-brand-100/70 transition-shadow duration-300 p-2.5 sm:p-3"
      style={
        {
          "--corner-a": corners.a,
          "--corner-b": corners.b,
        } as React.CSSProperties
      }
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square rounded-xl overflow-hidden bg-white mb-2.5 ring-1 ring-brand-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 260px"
            quality={75}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            className="object-contain object-center scale-[1.12] group-hover:scale-[1.18] transition-transform duration-300"
          />
          {product.isNew && (
            <span className="absolute top-2 left-2 px-2 py-0.5 bg-brand-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md z-10">
              New
            </span>
          )}
        </div>
        <h3 className="font-black text-sm sm:text-[15px] text-black line-clamp-2 leading-snug min-h-[2.5rem] tracking-tight">
          {product.name}
        </h3>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="font-black text-base text-black">
            {formatPrice(product.price)}
          </span>
          <span className="text-[11px] font-bold text-black/45">per pack</span>
        </div>
        {product.minOrder ? (
          <p className="mt-1 text-[11px] font-extrabold uppercase tracking-wide text-brand-700">
            Min. {product.minOrder} pcs
          </p>
        ) : null}
      </Link>
      <AddToCartMini product={product} />
    </article>
  );
}
