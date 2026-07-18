"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Check } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  accentIndex?: number;
}

const cornerPairs = [
  { a: "#ec4899", b: "#f9a8d4" },
  { a: "#db2777", b: "#f472b6" },
  { a: "#be185d", b: "#fbcfe8" },
  { a: "#f472b6", b: "#ec4899" },
];

export function ProductCard({ product, accentIndex = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const corners = cornerPairs[accentIndex % cornerPairs.length];

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.minOrder || 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article
      className="group relative card-corners rounded-2xl bg-white border border-brand-100 shadow-sm hover:shadow-xl hover:shadow-brand-100/70 transition-all duration-300 p-3"
      style={
        {
          "--corner-a": corners.a,
          "--corner-b": corners.b,
        } as React.CSSProperties
      }
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] sm:aspect-square rounded-xl overflow-hidden bg-gradient-to-b from-white to-brand-50/40 mb-3 ring-1 ring-brand-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
            quality={75}
            loading="lazy"
            className="object-contain p-1.5 group-hover:scale-105 transition-transform duration-300"
          />
          {product.isNew && (
            <span className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-brand-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md">
              New
            </span>
          )}
          {product.originalPrice && (
            <span className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-white text-brand-700 text-[10px] font-bold uppercase tracking-wider rounded-full ring-1 ring-brand-200">
              Sale
            </span>
          )}
        </div>
        <h3 className="font-black text-sm sm:text-[15px] text-gradient-pink shine-text line-clamp-2 leading-snug min-h-[2.5rem] tracking-tight">
          {product.name}
        </h3>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="font-black text-base text-black">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-surface-800/40 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </Link>

      <button
        type="button"
        onClick={handleAdd}
        className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 shadow-md shadow-brand-200/80 transition-all active:scale-[0.98]"
      >
        {added ? (
          <>
            <Check className="w-4 h-4" />
            Added
          </>
        ) : (
          <>
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </>
        )}
      </button>
    </article>
  );
}
