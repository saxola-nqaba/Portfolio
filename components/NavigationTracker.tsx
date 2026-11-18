"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { notePath, notePopState } from "@/lib/history";

/** Invisible. Records page changes so BackLink knows where "back" leads. */
export default function NavigationTracker() {
  const pathname = usePathname();

  useEffect(() => {
    window.addEventListener("popstate", notePopState);
    return () => window.removeEventListener("popstate", notePopState);
  }, []);

  useEffect(() => {
    notePath(pathname);
  }, [pathname]);

  return null;
}
