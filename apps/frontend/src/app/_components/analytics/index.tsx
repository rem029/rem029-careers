"use client";

import { addAnalytics } from "@/lib/api";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname && !pathname.includes("preview"))
      addAnalytics("page_view", pathname);
  }, [pathname]);

  return null; // No visible UI; purely functional
}
