"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { notePath, notePopState } from "@/lib/history";

/**
 * Invisible. Runs on every page change and does two jobs:
 * 1. Records page changes so BackLink knows where "back" leads.
 * 2. Opens every new page at the very top.
 *    (Next.js scrolls to where the page content starts, which sits under the
 *    sticky navbar, so the top of the page was hidden.)
 *    Skipped for browser back/forward, so the old position is restored,
 *    and for links to a section like /#about, so they still land on that section.
 */
export default function NavigationTracker() {
  const pathname = usePathname();

  useEffect(() => {
    window.addEventListener("popstate", notePopState);
    return () => window.removeEventListener("popstate", notePopState);
  }, []);

  useEffect(() => {
    const how = notePath(pathname);
    if (how === "link" && !window.location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname]);

  return null;
}
