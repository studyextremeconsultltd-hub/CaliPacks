import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About Cali Smoke — Manchester smoke shop for wholesale Cali Packs at £0.20 per pack, minimum 50 pcs.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
