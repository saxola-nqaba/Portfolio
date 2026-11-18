import {
  categoryLabels,
  getExperience,
  getProjects,
  getProjectTech,
  getProjectsUsing,
  getTechnologies,
  usedInText,
} from "@/lib/data";

export type SearchProject = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  text: string;
};

export type SearchSkill = {
  id: string;
  name: string;
  detail: string;
  hasPage: boolean;
  text: string;
};

export type SearchJob = {
  role: string;
  org: string;
  period: string;
  text: string;
};

export type SearchIndex = {
  projects: SearchProject[];
  skills: SearchSkill[];
  jobs: SearchJob[];
};

/** Everything search can find, each with one lower-case block of text to match against. */
export function buildSearchIndex(): SearchIndex {
  const join = (...parts: string[]) => parts.join(" ").toLowerCase();

  return {
    projects: getProjects().map((p) => ({
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      image: p.image,
      imageAlt: p.imageAlt,
      text: join(
        p.title,
        p.tagline,
        p.summary,
        p.role,
        p.kind,
        p.teamSize === 1 ? "solo" : "team",
        ...getProjectTech(p).map((t) => t.name),
        p.caseStudy?.overview ?? "",
      ),
    })),
    skills: getTechnologies().map((t) => ({
      id: t.id,
      name: t.name,
      detail: usedInText(t),
      hasPage: getProjectsUsing(t.id).length > 0,
      text: join(t.name, t.symbol ?? "", categoryLabels[t.category], t.source ?? ""),
    })),
    jobs: getExperience().map((j) => ({
      role: j.role,
      org: j.org,
      period: j.period,
      text: join(j.role, j.org, j.context, j.summary),
    })),
  };
}
