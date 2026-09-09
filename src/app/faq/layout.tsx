import { WithTrustBadges } from "@/components/layout/WithTrustBadges";

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <WithTrustBadges>{children}</WithTrustBadges>;
}
