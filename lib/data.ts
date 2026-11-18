import { projects } from "@/data/projects";
import { technologies } from "@/data/technologies";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import type { Project, TechCategory, Technology } from "@/lib/types";

export const categoryLabels: Record<TechCategory, string> = {
  languages: "Languages",
  frameworks: "Frameworks",
  data: "Data",
  devops: "Cloud & DevOps",
  quality: "Security & quality",
  infrastructure: "Infrastructure & networking",
};

export function getProfile() {
  return profile;
}

export function getExperience() {
  return experience;
}

export function getProjects(): Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getTechnologies(): Technology[] {
  return technologies;
}

export function getTechnology(id: string): Technology | undefined {
  return technologies.find((t) => t.id === id);
}

/** The technologies a project used. Fails loudly on a typo in a project's tech list. */
export function getProjectTech(project: Project): Technology[] {
  return project.tech.map((id) => {
    const tech = getTechnology(id);
    if (!tech) throw new Error(`Unknown technology "${id}" in project "${project.slug}"`);
    return tech;
  });
}

/** Every project that used a technology. */
export function getProjectsUsing(techId: string): Project[] {
  return projects.filter((p) => p.tech.includes(techId));
}

/** Tooltip text: "used in: The Loop, HustleHub+", or the skill's source. */
export function usedInText(tech: Technology, excludeSlug?: string): string {
  const others = getProjectsUsing(tech.id).filter((p) => p.slug !== excludeSlug);
  if (others.length > 0) {
    return `${excludeSlug ? "also used in" : "used in"}: ${others.map((p) => p.title).join(", ")}`;
  }
  if (excludeSlug) return "only used in this project";
  return tech.source ? `from: ${tech.source}` : "";
}

/** Technologies grouped by category, in the order the Skills section shows them. */
export function getTechByCategory() {
  return (Object.keys(categoryLabels) as TechCategory[]).map((category) => ({
    category,
    label: categoryLabels[category],
    items: technologies.filter((t) => t.category === category),
  }));
}

/** Technologies most often used in the same projects as this one, most frequent first. */
export function getRelatedTech(techId: string, limit = 8): Technology[] {
  const counts = new Map<string, number>();
  for (const project of getProjectsUsing(techId)) {
    for (const id of project.tech) {
      if (id !== techId) counts.set(id, (counts.get(id) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id]) => getTechnology(id))
    .filter((t): t is Technology => t !== undefined);
}
