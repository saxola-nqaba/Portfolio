import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import { toCardData } from "@/lib/cards";
import { getProjects } from "@/lib/data";

export default function Home() {
  const cards = getProjects().map(toCardData);

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
