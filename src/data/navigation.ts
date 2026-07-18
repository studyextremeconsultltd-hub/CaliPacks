import { NavItem } from "@/types";

export const mainNav: NavItem[] = [
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "All Products", href: "/shop", description: "Browse the full catalogue" },
      { label: "Cali Packs", href: "/shop/cali-packs", description: "Smell-proof mylar packs" },
      { label: "Can & Jar Packs", href: "/shop/can-jars", description: "Pop-top street designs" },
      { label: "Glassware", href: "/shop/glassware", description: "Bubblers & glass pieces" },
      { label: "Hookahs & Shisha", href: "/shop/hookahs", description: "Premium shop-display hookahs" },
      { label: "Digital Scales", href: "/shop/scales", description: "Precision mini scales" },
      { label: "Cases & Accessories", href: "/shop/accessories", description: "Cases, sealers & more" },
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
    { label: "Cali Packs", href: "/shop/cali-packs" },
    { label: "Can & Jar Packs", href: "/shop/can-jars" },
    { label: "Glassware", href: "/shop/glassware" },
    { label: "Hookahs & Shisha", href: "/shop/hookahs" },
    { label: "Digital Scales", href: "/shop/scales" },
    { label: "Cases & Accessories", href: "/shop/accessories" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "New Arrivals", href: "/shop?filter=new" },
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
