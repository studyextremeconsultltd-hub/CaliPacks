import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { JsonLd } from "@/components/seo/JsonLd";
import { contactInfo, socialLinks } from "@/data/social";
import { SITE_LOGO, SITE_NAME, SITE_URL, pageUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#ec4899",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "shopping",
  icons: {
    icon: [{ url: SITE_LOGO, type: "image/svg+xml" }],
    shortcut: SITE_LOGO,
    apple: SITE_LOGO,
  },
  title: {
    default: `Smoke Cali | Cali Packs £0.20 · Manchester`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Smoke Cali is a Manchester smoke shop for wholesale Cali Packs. 108 HD designs, £0.20 per pack, minimum 50 pcs, UK delivery in 2–3 days.",
  keywords: [
    "Smoke Cali",
    "Cali Packs UK",
    "Cali Packs wholesale",
    "Cali Packs Manchester",
    "3.5g mylar bags UK",
    "smoke shop Manchester",
    "wholesale cali packs",
  ],
  alternates: {
    canonical: pageUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: pageUrl("/"),
    siteName: SITE_NAME,
    title: "Smoke Cali | Cali Packs £0.20 · Manchester",
    description:
      "108 HD Cali Packs from Smoke Cali Manchester. £0.20 per pack, minimum 50 pcs. Shop online or visit Sagar Street.",
    images: [
      {
        url: "/hero-cali-packs.jpg",
        width: 1920,
        height: 980,
        alt: "Smoke Cali Cali Packs wholesale wall",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smoke Cali | Cali Packs £0.20",
    description: "108 HD Cali Packs. £0.20 per pack, min 50 pcs. Manchester smoke shop.",
    images: ["/hero-cali-packs.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <body className="antialiased">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": `${SITE_URL}/#organization`,
                name: SITE_NAME,
                url: SITE_URL,
                logo: `${SITE_URL}${SITE_LOGO}`,
                email: contactInfo.email,
                telephone: contactInfo.phone,
                sameAs: [
                  socialLinks.facebook.href,
                  socialLinks.tiktok.href,
                  socialLinks.youtube.href,
                ],
              },
              {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                url: SITE_URL,
                name: SITE_NAME,
                publisher: { "@id": `${SITE_URL}/#organization` },
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: `${SITE_URL}/shop/?q={search_term_string}`,
                  },
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@type": ["LocalBusiness", "Store"],
                "@id": `${SITE_URL}/#local`,
                name: SITE_NAME,
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
                areaServed: "GB",
              },
            ],
          }}
        />
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
