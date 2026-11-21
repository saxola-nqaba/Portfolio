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
  return getProjects().find((p) => p.slug === slug);
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
  return getProjects().filter((p) => p.tech.includes(techId));
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

/**
 * What a skill's tooltip says. Each project comes with its tagline, so a first-time
 * visitor knows what "GLMS" or "StudyTrack" is:
 *   heading:  "Used in 2 projects:"
 *   projects: [{ title: "GLMS", tagline: "Global logistics management system" }, ...]
 * On a project page (excludeSlug) it lists the *other* projects instead.
 * Skills with no project show where they come from (e.g. "From: MCSA certification").
 */
export function usedInDetails(tech: Technology, excludeSlug?: string) {
  const others = getProjectsUsing(tech.id).filter((p) => p.slug !== excludeSlug);
  const projects = others.map((p) => ({ slug: p.slug, title: p.title, tagline: p.tagline }));
  let heading = "";
  if (others.length > 0) {
    heading = excludeSlug
      ? `Also used in ${plural(others.length, "other project")}:`
      : `Used in ${plural(others.length, "project")}:`;
  } else if (excludeSlug) {
    heading = "Only used in this project";
  } else if (tech.source) {
    heading = `From: ${tech.source}`;
  }
  return { heading, projects };
}

/** The same tooltip as plain text, for screen-reader labels. Empty if there is nothing to say. */
export function usedInText(tech: Technology, excludeSlug?: string): string {
  const { heading, projects } = usedInDetails(tech, excludeSlug);
  return [heading, ...projects.map((p) => `${p.title} – ${p.tagline}`)].join(" ").trim();
}

/** One-line version for search results: "Used in 2 projects: GLMS, StudyTrack". */
export function usedInSummary(tech: Technology): string {
  const projects = getProjectsUsing(tech.id);
  if (projects.length > 0) {
    return `Used in ${plural(projects.length, "project")}: ${projects.map((p) => p.title).join(", ")}`;
  }
  return tech.source ? `From: ${tech.source}` : "";
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
