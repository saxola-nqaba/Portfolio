"use client";

import Image from "next/image";
import Link from "next/link";

/** Only the fields a card needs, prepared on the server in app/page.tsx. */
export type ProjectCardData = {
  slug: string;
  title: string;
  summary: string;
  highlight: string;
  image: string;
  imageAlt: string;
  kind: "academic" | "personal";
  teamSize: number;
  tech: string[];
  /** e.g. "academic · team of 5" */
  meta: string;
  /** The first few technology names, e.g. "React · JavaScript · Vite" */
  techLine: string;
  color: string;
};

/** Tints the background glow with a project's colour, or turns it off. */
function setProjectGlow(color: string | null) {
  const root = document.documentElement;
  if (color) {
    root.style.setProperty("--project-glow", color);
    root.dataset.projectGlow = "on";
  } else {
    delete root.dataset.projectGlow;
  }
}

export default function ProjectCard({ project }: { project: ProjectCardData }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      onMouseEnter={() => setProjectGlow(project.color)}
      onMouseLeave={() => setProjectGlow(null)}
      onFocus={() => setProjectGlow(project.color)}
      onBlur={() => setProjectGlow(null)}
      onClick={() => setProjectGlow(null)}
      className="group block h-full border border-rule bg-surface transition duration-150 hover:-translate-y-0.5 hover:border-accent focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="relative aspect-video overflow-hidden border-b border-rule bg-white">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-left-top"
        />
      </div>

      <div className="p-4">
        <p className="mb-1.5 font-mono text-[11px] text-muted">{project.meta}</p>
        <h3 className="mb-1.5 font-display text-lg font-semibold">{project.title}</h3>
        <p className="text-sm leading-relaxed text-body">{project.summary}</p>
        <p className="mt-2 font-mono text-[11px] text-muted">{project.techLine}</p>

        {/* Always visible on phones; revealed on hover on larger screens */}
        <p className="mt-2.5 font-mono text-[11px] text-accent md:mt-0 md:max-h-0 md:overflow-hidden md:opacity-0 md:transition-all md:duration-200 md:group-hover:mt-2.5 md:group-hover:max-h-10 md:group-hover:opacity-100 md:group-focus-visible:mt-2.5 md:group-focus-visible:max-h-10 md:group-focus-visible:opacity-100">
          → {project.highlight}
        </p>
      </div>
    </Link>
  );
}
