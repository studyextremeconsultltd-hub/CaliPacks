import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About Cali Smoke — Manchester smoke shop for cali packs, glassware, scales and accessories.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
