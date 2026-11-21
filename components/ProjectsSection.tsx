"use client";

import { useState } from "react";
import ProjectCard, { type ProjectCardData } from "./ProjectCard";

type TypeFilter = "all" | "academic" | "personal" | "solo" | "team";

// "word" is used in the hover preview: "5 of 10 projects are solo"
const typeFilters: { id: TypeFilter; label: string; word: string }[] = [
  { id: "all", label: "all", word: "" },
  { id: "academic", label: "academic", word: "academic" },
  { id: "personal", label: "personal", word: "personal" },
  { id: "solo", label: "solo", word: "solo" },
  { id: "team", label: "team", word: "team-built" },
];

// Each chip matches any of its technology ids.
// "name" is used in the hover preview: "4 of 10 projects use Docker"
const techFilters: { id: string; label: string; name: string; techIds: string[] }[] = [
  { id: "react", label: "react", name: "React", techIds: ["react", "react-native"] },
  { id: "dotnet", label: "c# / .net", name: "C# / .NET", techIds: ["csharp", "aspnet-core"] },
  { id: "node", label: "node", name: "Node", techIds: ["node-express"] },
  { id: "kotlin", label: "kotlin", name: "Kotlin", techIds: ["kotlin"] },
  { id: "azure", label: "azure", name: "Azure", techIds: ["azure", "azure-functions", "azure-sql"] },
  { id: "docker", label: "docker", name: "Docker", techIds: ["docker"] },
];

type TechFilterDef = (typeof techFilters)[number];

function matchesTech(project: ProjectCardData, tech: TechFilterDef | undefined): boolean {
  return !tech || tech.techIds.some((id) => project.tech.includes(id));
}

function matchesType(project: ProjectCardData, filter: TypeFilter): boolean {
  switch (filter) {
    case "academic":
    case "personal":
      return project.kind === filter;
    case "solo":
      return project.teamSize === 1;
    case "team":
      return project.teamSize > 1;
    default:
      return true;
  }
}

/** Hover preview: a count sentence plus the names of the projects it would show. */
function FilterPreview({ id, sentence, matches }: { id: string; sentence: string; matches: ProjectCardData[] }) {
  return (
    <span id={id} role="tooltip" className="skill-tip text-left font-sans font-normal normal-case">
      <span className="block">{sentence}</span>
      {matches.length > 0 && (
        <span className="mt-1 block text-[11.5px] text-muted">
          <span className="sr-only">: </span>
          {matches.map((m) => m.title).join(" · ")}
        </span>
      )}
    </span>
  );
}

const chipBase = "has-tip border font-mono transition-colors";
const chipOn = "border-accent bg-accent font-semibold text-on-accent";
const chipOff = "border-rule text-muted hover:border-accent hover:text-ink";

export default function ProjectsSection({ projects }: { projects: ProjectCardData[] }) {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [techFilter, setTechFilter] = useState<string | null>(null);

  const activeTech = techFilters.find((t) => t.id === techFilter);
  const activeType = typeFilters.find((t) => t.id === typeFilter)!;
  const visible = projects.filter((p) => matchesType(p, typeFilter) && matchesTech(p, activeTech));

  /*
   * Hover previews: what you would see after clicking, taking the OTHER row's
   * current choice into account. e.g. with "solo" picked, hovering "docker" says
   * "2 of the 5 solo projects use Docker".
   */
  const total = projects.length;
  const verb = (n: number, one: string, many: string) => (n === 1 ? one : many);

  const typePreview = (f: (typeof typeFilters)[number]) => {
    const base = projects.filter((p) => matchesTech(p, activeTech)); // respects the tech row
    const matches = base.filter((p) => matchesType(p, f.id));
    const n = matches.length;
    let sentence: string;
    if (f.id === "all") {
      sentence = activeTech ? `Show all ${base.length} ${activeTech.name} projects` : `Show all ${total} projects`;
    } else if (activeTech) {
      sentence = n === 0
        ? `None of the ${base.length} ${activeTech.name} projects are ${f.word}`
        : `${n} of the ${base.length} ${activeTech.name} projects ${verb(n, "is", "are")} ${f.word}`;
    } else {
      sentence = `${n} of ${total} projects ${verb(n, "is", "are")} ${f.word}`;
    }
    return { sentence, matches };
  };

  const techPreview = (f: TechFilterDef) => {
    const base = projects.filter((p) => matchesType(p, typeFilter)); // respects the type row
    const matches = base.filter((p) => matchesTech(p, f));
    const n = matches.length;
    const group = typeFilter === "all" ? "" : `${activeType.word} `;
    let sentence =
      n === 0
        ? `None of the ${base.length} ${group}projects use ${f.name}`
        : typeFilter === "all"
          ? `${n} of ${total} projects ${verb(n, "uses", "use")} ${f.name}`
          : `${n} of the ${base.length} ${group}projects ${verb(n, "uses", "use")} ${f.name}`;
    if (techFilter === f.id) sentence += " (click again to clear)";
    return { sentence, matches };
  };

  const resetFilters = () => {
    setTypeFilter("all");
    setTechFilter(null);
  };

  return (
    <section id="projects" aria-labelledby="projects-heading" className="border-t border-rule py-20 md:py-24">
      <p className="mb-4 inline-block border border-rule px-2.5 py-0.5 font-mono text-xs text-muted">
        projects
      </p>
      <h2 id="projects-heading" className="font-display text-3xl font-semibold tracking-[0.01em] sm:text-4xl">
        Now Showing
      </h2>

      <div role="group" aria-label="Filter by project type" className="mt-6 flex flex-wrap gap-2">
        {typeFilters.map((f) => {
          const preview = typePreview(f);
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={typeFilter === f.id}
              aria-describedby={`type-tip-${f.id}`}
              onClick={() => setTypeFilter(f.id)}
              className={`${chipBase} px-3.5 py-2 text-[12.5px] ${typeFilter === f.id ? chipOn : chipOff}`}
            >
              {f.id === "all" ? `all ${projects.length}` : f.label}
              <FilterPreview id={`type-tip-${f.id}`} {...preview} />
            </button>
          );
        })}
      </div>

      <div role="group" aria-label="Filter by technology" className="mt-2.5 flex flex-wrap gap-2">
        {techFilters.map((f) => {
          const preview = techPreview(f);
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={techFilter === f.id}
              aria-describedby={`tech-tip-${f.id}`}
              onClick={() => setTechFilter(techFilter === f.id ? null : f.id)}
              className={`${chipBase} px-3 py-1.5 text-[11.5px] ${techFilter === f.id ? chipOn : chipOff}`}
            >
              {f.label}
              <FilterPreview id={`tech-tip-${f.id}`} {...preview} />
            </button>
          );
        })}
      </div>

      {/* Screen readers announce the new count when a filter changes */}
      <p aria-live="polite" className="mt-5 font-mono text-xs text-muted">
        showing {visible.length} of {projects.length}
      </p>

      {visible.length > 0 ? (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 border border-dashed border-rule p-8 text-center">
          <p className="text-body">No projects match both filters.</p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-3 font-mono text-sm text-accent underline-offset-4 hover:underline"
          >
            clear filters
          </button>
        </div>
      )}
    </section>
  );
}
