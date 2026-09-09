import { NavItem } from "@/types";

export const mainNav: NavItem[] = [
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "All Cali Packs", href: "/shop", description: "108 HD designs · £0.20 per pack" },
      { label: "Cali Packs", href: "/shop/cali-packs", description: "Smell-proof mylar · min 50 pcs" },
      { label: "New Arrivals", href: "/shop?filter=new", description: "Latest drops in the catalogue" },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "New Arrivals", href: "/shop?filter=new" },
  { label: "Contact Us", href: "/contact" },
];

export const footerNav = [
  { label: "Shop", href: "/shop" },
  { label: "About Us", href: "/about" },
  { label: "New Arrivals", href: "/shop?filter=new" },
  { label: "Contact Us", href: "/contact" },
];

export const footerLinks = {
  shop: [
    { label: "All Cali Packs", href: "/shop" },
    { label: "Cali Packs", href: "/shop/cali-packs" },
    { label: "New Arrivals", href: "/shop?filter=new" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Custom Orders", href: "/custom-orders" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Shipping Policy", href: "/shipping" },
    { label: "Returns", href: "/returns" },
  ],
};
