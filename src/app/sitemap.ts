import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { pageUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-09-10");

  const productUrls = products.map((p) => ({
    url: pageUrl(`/product/${p.slug}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticPages = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/shop", priority: 0.95, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/custom-orders", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/shipping", priority: 0.4, changeFrequency: "monthly" as const },
    { path: "/returns", priority: 0.3, changeFrequency: "yearly" as const },
  ].map((page) => ({
    url: pageUrl(page.path),
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  return [...staticPages, ...productUrls];
}
