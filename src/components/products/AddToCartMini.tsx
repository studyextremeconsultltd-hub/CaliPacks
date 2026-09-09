"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

export function AddToCartMini({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const qty = product.minOrder || 1;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
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
          Add {qty > 1 ? `${qty} pcs` : "to Cart"}
        </>
      )}
    </button>
  );
}
