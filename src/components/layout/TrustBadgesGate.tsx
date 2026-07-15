"use client";

import { usePathname } from "next/navigation";
import { TrustBadges } from "@/components/layout/AnnouncementBar";

/** Shows trust strip under the header on all pages except the homepage (homepage places it below the hero). */
export function TrustBadgesGate() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <TrustBadges />;
}
