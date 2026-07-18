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
  icons: {
    icon: "/cali-smoke-logo.png",
    apple: "/cali-smoke-logo.png",
  },
  title: {
    default: "Cali Smoke — Manchester Smoke Shop",
    template: "%s | Cali Smoke",
  },
  description:
    "Cali Smoke — Manchester smoke shop for cali packs, hookahs, glassware, scales and accessories. Shop online or visit us on Sagar Street.",
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
    siteName: "Cali Smoke",
    title: "Cali Smoke — Manchester Smoke Shop",
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
