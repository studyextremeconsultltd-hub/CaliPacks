import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About Cali Packs — UK best sellers of cali packs, glassware, scales and accessories.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
