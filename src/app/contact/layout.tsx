import type { Metadata } from "next";
import { pageUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Smoke Cali in Manchester for Cali Packs wholesale, stock checks, and UK delivery. Call, WhatsApp or visit 5 Sagar Street.",
  alternates: { canonical: pageUrl("/contact") },
  openGraph: {
    url: pageUrl("/contact"),
    title: "Contact Smoke Cali | Manchester",
    description: "Questions about stock, wholesale or delivery? Get in touch with Smoke Cali.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
