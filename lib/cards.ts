import type { ProjectCardData } from "@/components/ProjectCard";
import { getProjectTech } from "@/lib/data";
import type { Project } from "@/lib/types";

/** Turns a project into just the fields a card needs, so pages don't send whole case studies to the browser. */
export function toCardData(p: Project): ProjectCardData {
  return {
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    highlight: p.highlight,
    image: p.image,
    imageAlt: p.imageAlt,
    kind: p.kind,
    teamSize: p.teamSize,
    tech: p.tech,
    color: p.color,
    meta: `${p.kind} · ${p.teamSize === 1 ? "solo" : `team of ${p.teamSize}`}`,
    techLine: getProjectTech(p)
      .slice(0, 4)
      .map((t) => t.name)
      .join(" · "),
  };
}
