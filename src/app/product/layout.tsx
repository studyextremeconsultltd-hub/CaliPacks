import { WithTrustBadges } from "@/components/layout/WithTrustBadges";

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <WithTrustBadges>{children}</WithTrustBadges>;
}
