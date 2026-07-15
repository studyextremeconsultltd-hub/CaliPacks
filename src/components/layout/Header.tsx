"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { useCart } from "@/context/CartContext";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

export function Header() {
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinkClass =
    "px-4 py-2.5 text-[15px] font-extrabold tracking-wide text-black hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-colors";

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-brand-200 shadow-md shadow-brand-100/50">
      <div className="container-site">
        <div className="flex items-center justify-between h-16 lg:h-[80px]">
          <Link href="/" className="group">
            <Logo size="md" />
          </Link>

          {/* Desktop Nav — Shop → Contact Us */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {mainNav.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setShopOpen(true)}
                  onMouseLeave={() => setShopOpen(false)}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1",
                      navLinkClass,
                      shopOpen && "text-brand-600 bg-brand-50"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn("w-4 h-4 transition-transform", shopOpen && "rotate-180")}
                    />
                  </button>
                  {shopOpen && (
                    <div className="absolute top-full left-0 pt-2 w-72">
                      <div className="bg-white rounded-xl shadow-xl border-2 border-brand-100 p-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-3 rounded-lg hover:bg-brand-50 transition-colors"
                          >
                            <span className="font-extrabold text-sm text-black">{child.label}</span>
                            {child.description && (
                              <span className="block text-xs text-black/45 mt-0.5 font-medium">
                                {child.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.label} href={item.href} className={navLinkClass}>
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 rounded-lg text-black hover:bg-brand-50 hover:text-brand-600 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/account"
              className="hidden sm:flex p-2.5 rounded-lg text-black hover:bg-brand-50 hover:text-brand-600 transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>
            <Link
              href="/cart"
              className="relative p-2.5 rounded-lg text-black hover:bg-brand-50 hover:text-brand-600 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-brand-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-lg text-black hover:bg-brand-50 transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="pb-4">
            <form action="/shop" method="get" className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/35" />
              <input
                type="search"
                name="q"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 bg-surface-100 rounded-xl border border-transparent focus:border-brand-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200 transition-all text-sm font-medium"
                autoFocus
              />
            </form>
          </div>
        )}
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t-2 border-brand-100 bg-white">
          <nav className="container-site py-4 space-y-1">
            {mainNav.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <p className="px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-brand-600">
                    {item.label}
                  </p>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-2.5 text-base font-extrabold text-black hover:text-brand-600 hover:bg-brand-50 rounded-lg"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 text-base font-extrabold text-black hover:text-brand-600 hover:bg-brand-50 rounded-lg"
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href="/account"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5 text-base font-extrabold text-black hover:text-brand-600 hover:bg-brand-50 rounded-lg"
            >
              My Account
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
