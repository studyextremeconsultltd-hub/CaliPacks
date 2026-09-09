import { WithTrustBadges } from "@/components/layout/WithTrustBadges";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <WithTrustBadges>{children}</WithTrustBadges>;
}
