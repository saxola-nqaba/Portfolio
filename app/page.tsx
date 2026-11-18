import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import type { ProjectCardData } from "@/components/ProjectCard";
import { getProjects, getProjectTech } from "@/lib/data";

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
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
