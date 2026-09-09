import type { Metadata } from "next";
import { WithTrustBadges } from "@/components/layout/WithTrustBadges";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <WithTrustBadges>{children}</WithTrustBadges>;
}
