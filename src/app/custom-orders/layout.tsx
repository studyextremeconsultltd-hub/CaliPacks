import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Orders",
  description: "Request bespoke custom packaging designed and produced exclusively for your brand.",
};

export default function CustomOrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
