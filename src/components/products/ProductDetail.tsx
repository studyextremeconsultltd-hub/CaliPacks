"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const min = product.minOrder || 1;
  const [quantity, setQuantity] = useState(min);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-surface-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setQuantity(Math.max(min, quantity - 1))}
            className="p-3 hover:bg-surface-100 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 py-3 font-medium text-sm min-w-[4rem] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-3 hover:bg-surface-100 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-surface-800/60">
          Total:{" "}
          <span className="font-semibold text-surface-900">
            {formatPrice(product.price * quantity)}
          </span>
        </p>
      </div>

      <button
        onClick={handleAdd}
        disabled={!product.inStock}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-brand-200"
      >
        {added ? (
          <>
            <Check className="w-5 h-5" />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingBag className="w-5 h-5" />
            Add to Cart
          </>
        )}
      </button>
    </div>
  );
}

interface ProductGalleryProps {
  product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  const images = product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] sm:aspect-square rounded-2xl overflow-hidden bg-white ring-1 ring-brand-100">
        <Image
          src={images[activeImage]}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 100vw, 480px"
          className="object-contain p-2"
          priority
          quality={85}
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden bg-white border-2 transition-colors ${
                i === activeImage ? "border-brand-600" : "border-brand-100"
              }`}
            >
              <Image src={img} alt="" fill sizes="80px" quality={70} loading="lazy" className="object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
