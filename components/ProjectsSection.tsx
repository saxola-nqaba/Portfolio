"use client";

import { useState } from "react";
import ProjectCard, { type ProjectCardData } from "./ProjectCard";

type TypeFilter = "all" | "academic" | "personal" | "solo" | "team";

const typeFilters: { id: TypeFilter; label: string }[] = [
  { id: "all", label: "all" },
  { id: "academic", label: "academic" },
  { id: "personal", label: "personal" },
  { id: "solo", label: "solo" },
  { id: "team", label: "team" },
];

// Each chip matches any of its technology ids.
const techFilters: { id: string; label: string; techIds: string[] }[] = [
  { id: "react", label: "react", techIds: ["react", "react-native"] },
  { id: "dotnet", label: "c# / .net", techIds: ["csharp", "aspnet-core"] },
  { id: "node", label: "node", techIds: ["node-express"] },
  { id: "kotlin", label: "kotlin", techIds: ["kotlin"] },
  { id: "azure", label: "azure", techIds: ["azure", "azure-functions", "azure-sql"] },
  { id: "docker", label: "docker", techIds: ["docker"] },
];

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

const chipBase = "border font-mono transition-colors";
const chipOn = "border-accent bg-accent font-semibold text-on-accent";
const chipOff = "border-rule text-muted hover:border-accent hover:text-ink";

export default function ProjectsSection({ projects }: { projects: ProjectCardData[] }) {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [techFilter, setTechFilter] = useState<string | null>(null);

  const activeTech = techFilters.find((t) => t.id === techFilter);
  const visible = projects.filter(
    (p) =>
      matchesType(p, typeFilter) &&
      (!activeTech || activeTech.techIds.some((id) => p.tech.includes(id))),
  );

  const resetFilters = () => {
    setTypeFilter("all");
    setTechFilter(null);
  };

  return (
    <section id="projects" aria-labelledby="projects-heading" className="border-t border-rule py-16">
      <p className="mb-4 inline-block border border-accent px-2.5 py-0.5 font-mono text-xs text-accent">
        projects
      </p>
      <h2 id="projects-heading" className="font-display text-3xl font-bold sm:text-4xl">
        Now Showing
      </h2>

      <div role="group" aria-label="Filter by project type" className="mt-6 flex flex-wrap gap-2">
        {typeFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={typeFilter === f.id}
            onClick={() => setTypeFilter(f.id)}
            className={`${chipBase} px-3.5 py-2 text-[12.5px] ${typeFilter === f.id ? chipOn : chipOff}`}
          >
            {f.id === "all" ? `all ${projects.length}` : f.label}
          </button>
        ))}
      </div>

      <div role="group" aria-label="Filter by technology" className="mt-2.5 flex flex-wrap gap-2">
        {techFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={techFilter === f.id}
            onClick={() => setTechFilter(techFilter === f.id ? null : f.id)}
            className={`${chipBase} px-3 py-1.5 text-[11.5px] ${techFilter === f.id ? chipOn : chipOff}`}
          >
            {f.label}
          </button>
        ))}
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
