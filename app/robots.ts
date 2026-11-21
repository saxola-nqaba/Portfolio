import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Crawlers may index everything except the future /admin area (v4).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/admin" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
