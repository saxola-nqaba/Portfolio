import type { Metadata } from "next";
import Link from "next/link";
import BackLink from "@/components/BackLink";
import { notFound } from "next/navigation";
import ProjectCard from "@/components/ProjectCard";
import { toCardData } from "@/lib/cards";
import {
  categoryLabels,
  getProjectsUsing,
  getRelatedTech,
  getTechnologies,
  getTechnology,
  usedInText,
} from "@/lib/data";

type PageProps = {
  params: Promise<{ id: string }>;
};

/** One page per technology that at least one project used. */
export function generateStaticParams() {
  return getTechnologies()
    .filter((tech) => getProjectsUsing(tech.id).length > 0)
    .map((tech) => ({ id: tech.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const tech = getTechnology(id);
  if (!tech) return {};
  return {
    title: tech.name,
    description: `Projects where Saxola Nqaba used ${tech.name}.`,
  };
}

export default async function TechPage({ params }: PageProps) {
  const { id } = await params;
  const tech = getTechnology(id);
  const projects = tech ? getProjectsUsing(tech.id) : [];
  if (!tech || projects.length === 0) notFound();

  const related = getRelatedTech(tech.id);
  const count = projects.length;

  return (
    <main className="mx-auto max-w-7xl px-6 md:px-12">
      <section className="pb-6 pt-10">
        <BackLink fallback="/#skills" />
        <p className="mb-4 mt-6 inline-block border border-accent px-2.5 py-0.5 font-mono text-xs text-accent">
          technology · {categoryLabels[tech.category].toLowerCase()}
        </p>
        <h1 className="font-display text-5xl font-bold leading-none">{tech.name}</h1>
      </section>

      <div className="grid gap-12 pb-16 pt-4 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <section aria-labelledby="used-in-heading">
          <h2 id="used-in-heading" className="mb-4 font-mono text-xs font-normal text-muted">
            used in {count} {count === 1 ? "project" : "projects"}
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={toCardData(project)} />
              </li>
            ))}
          </ul>
        </section>

        {related.length > 0 && (
          <aside aria-labelledby="related-heading" className="h-fit border border-rule bg-surface p-6">
            <h2 id="related-heading" className="mb-1 font-mono text-xs font-normal text-muted">
              related technologies
            </h2>
            <p className="mb-4 text-xs text-muted">Used together with {tech.name} in the same projects.</p>
            <ul className="flex flex-wrap gap-2">
              {related.map((other) => (
                <li key={other.id}>
                  <Link href={`/tech/${other.id}`} className="skill-tag">
                    {other.name.toLowerCase()}
                    <span className="skill-tip">
                      <span className="sr-only">, </span>
                      {usedInText(other)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </main>
  );
}
