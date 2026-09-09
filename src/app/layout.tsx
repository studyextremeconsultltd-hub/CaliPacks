import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrustBadgesGate } from "@/components/layout/TrustBadgesGate";
import { CartProvider } from "@/context/CartContext";
import { JsonLd } from "@/components/seo/JsonLd";
import { contactInfo } from "@/data/social";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/cali-smoke-logo.png",
    apple: "/cali-smoke-logo.png",
  },
  title: {
    default: "Cali Packs — £0.20 per pack | Cali Smoke Manchester",
    template: "%s | Cali Smoke",
  },
  description:
    "Shop 108 HD Cali Packs from Cali Smoke Manchester. £0.20 per pack, minimum 50 pcs. Smell-proof 3.5g designs with UK delivery in 2–3 days.",
  keywords: [
    "cali packs UK",
    "cali packs wholesale",
    "mylar bags Manchester",
    "3.5g cali packs",
    "smoke shop supply UK",
    "Cali Smoke",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Cali Smoke",
    title: "Cali Packs — £0.20 per pack · Min 50 pcs",
    description:
      "108 HD Cali Packs. £0.20 per pack, minimum order 50 pcs. Shop online from our Manchester store.",
    images: [{ url: "/hero-cali-packs.jpg", width: 1920, height: 980 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cali Packs — £0.20 per pack",
    description: "108 HD Cali Packs. Minimum 50 pcs. UK delivery in 2–3 days.",
    images: ["/hero-cali-packs.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Cali Smoke",
            url: SITE_URL,
            image: `${SITE_URL}/hero-cali-packs.jpg`,
            description:
              "Manchester smoke shop supplying wholesale Cali Packs at £0.20 per pack, minimum 50 pcs.",
            priceRange: "£",
            telephone: contactInfo.phone,
            email: contactInfo.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: "5 Sagar Street",
              postalCode: "M8 8EU",
              addressLocality: "Manchester",
              addressCountry: "GB",
            },
          }}
        />
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <TrustBadgesGate />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
