import { TrustBadges } from "@/components/layout/AnnouncementBar";

export function WithTrustBadges({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TrustBadges />
      {children}
    </>
  );
}
