import type { MetadataRoute } from "next";
import { getProjects, getTechnologies, getProjectsUsing } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

// Lists every public page so search engines can find them.
// No lastModified: new Date() is not allowed at build time with Cache Components.
export default function sitemap(): MetadataRoute.Sitemap {
  const home = { url: `${SITE_URL}/`, priority: 1 };

  const projects = getProjects().map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    priority: 0.8,
  }));

  const tech = getTechnologies()
    .filter((t) => getProjectsUsing(t.id).length > 0)
    .map((t) => ({ url: `${SITE_URL}/tech/${t.id}`, priority: 0.5 }));

  return [home, ...projects, ...tech];
}
