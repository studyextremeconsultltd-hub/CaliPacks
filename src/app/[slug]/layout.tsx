import { WithTrustBadges } from "@/components/layout/WithTrustBadges";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <WithTrustBadges>{children}</WithTrustBadges>;
}
