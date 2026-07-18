"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-20">
        <div className="container-site text-center">
          <div className="w-16 h-16 rounded-full bg-surface-100 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-8 h-8 text-surface-800/40" />
          </div>
          <h1 className="text-2xl font-bold text-surface-900 mb-2">Your cart is empty</h1>
          <p className="text-surface-800/60 mb-8">
            Browse our products and add items to get started.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-700 text-white font-semibold rounded-xl hover:bg-brand-800 transition-colors"
          >
            Shop Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const shipping = subtotal >= 150 ? 0 : 8.99;
  const total = subtotal + shipping;

  return (
    <div className="py-8 md:py-12">
      <div className="container-site">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-surface-900 tracking-tight">
            Shopping Cart
          </h1>
          <button
            onClick={clearCart}
            className="text-sm text-surface-800/40 hover:text-red-600 transition-colors"
          >
            Clear cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-4 bg-white rounded-xl border border-surface-200"
              >
                <Link
                  href={`/product/${item.product.slug}`}
                  className="relative w-24 h-24 rounded-lg overflow-hidden bg-white flex-shrink-0 ring-1 ring-brand-100"
                >
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="96px"
                    quality={90}
                    className="object-contain p-1"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="font-medium text-sm text-surface-900 hover:text-brand-700 line-clamp-2"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-surface-800/60 mt-1">
                    {formatPrice(item.product.price)} each
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-surface-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-surface-100 transition-colors"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 py-1.5 text-sm font-medium min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-surface-100 transition-colors"
                        aria-label="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-sm">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1.5 text-surface-800/40 hover:text-red-600 transition-colors"
                        aria-label="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-surface-200 p-6 sticky top-24">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-surface-800/60">Subtotal</dt>
                  <dd className="font-medium">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-surface-800/60">Shipping</dt>
                  <dd className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-brand-700">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </dd>
                </div>
                {subtotal < 150 && (
                  <p className="text-xs text-brand-700 bg-brand-50 rounded-lg p-2">
                    Add {formatPrice(150 - subtotal)} more for free UK delivery
                  </p>
                )}
                <div className="border-t border-surface-200 pt-3 flex justify-between">
                  <dt className="font-semibold">Total</dt>
                  <dd className="font-bold text-lg">{formatPrice(total)}</dd>
                </div>
              </dl>
              <Link
                href="/checkout"
                className="w-full mt-6 px-6 py-4 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-500 transition-colors flex items-center justify-center"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/shop"
                className="block text-center text-sm text-brand-700 hover:underline mt-4"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
