import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrustBadgesGate } from "@/components/layout/TrustBadgesGate";
import { CartProvider } from "@/context/CartContext";
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
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://calipacks.co.uk"),
  title: {
    default: "Cali Packs — UK Smoke Shop Supply",
    template: "%s | Cali Packs",
  },
  description:
    "Cali Packs — UK’s best sellers of cali packs, can jars, glassware, scales and accessories. Add to cart and get delivery in 2–3 days.",
  keywords: [
    "cali packs UK",
    "mylar bags",
    "smoke shop supply",
    "digital scales",
    "glassware",
    "can packs",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Cali Packs",
    title: "Cali Packs — UK Smoke Shop Supply",
    description:
      "Shop cali packs, glassware, scales and accessories. Online cart. UK delivery in 2–3 days.",
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
