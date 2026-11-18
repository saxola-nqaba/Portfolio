import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import type { ProjectCardData } from "@/components/ProjectCard";
import { getProjects, getProjectTech } from "@/lib/data";

// Still placeholders. Step 7 fills these in.
const sections = ["about", "experience", "skills", "contact"];

export default function Home() {
  // Prepare just what the cards need, so the browser isn't sent the full case studies.
  const cards: ProjectCardData[] = getProjects().map((p) => ({
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
  }));

  return (
    <main className="mx-auto max-w-7xl px-6 md:px-12">
      <Hero />
      <ProjectsSection projects={cards} />

      {sections.map((id) => (
        <section key={id} id={id} className="min-h-[70vh] border-t border-rule py-16">
          <h2 className="font-display text-3xl font-bold capitalize">{id}</h2>
          <p className="mt-3 text-sm text-muted">Placeholder. The real content arrives in Step 7.</p>
        </section>
      ))}
    </main>
  );
}
