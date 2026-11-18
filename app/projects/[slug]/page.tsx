import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjects, getProjectTech, getProjectsUsing, usedInText } from "@/lib/data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Builds one page per project ahead of time, when the site is built. */
export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Saxola Nqaba`,
    description: project.tagline,
  };
}

const sectionOrder = [
  { key: "overview", label: "overview" },
  { key: "challenge", label: "the challenge" },
  { key: "solution", label: "what i built" },
  { key: "learned", label: "what i learned" },
] as const;

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const tech = getProjectTech(project);
  const study = project.caseStudy;
  const team = project.teamSize === 1 ? "solo" : `team of ${project.teamSize}`;

  // The project after this one, looping back to the first
  const all = getProjects();
  const next = all[(all.findIndex((p) => p.slug === slug) + 1) % all.length];

  const buttons = [
    project.links.demo && { label: "Watch demo", href: project.links.demo, primary: true },
    project.links.github && { label: "GitHub", href: project.links.github, primary: false },
    project.links.live && { label: "Live app", href: project.links.live, primary: false },
  ].filter((b): b is { label: string; href: string; primary: boolean } => Boolean(b));

  return (
    <main className="mx-auto max-w-7xl px-6 md:px-12">
      {/* Title */}
      <section className="border-b border-rule pb-8 pt-10">
        <Link href="/#projects" className="font-mono text-xs text-muted transition-colors hover:text-ink">
          ← all projects
        </Link>
        <p className="mb-4 mt-6 inline-block border border-accent px-2.5 py-0.5 font-mono text-xs text-accent">
          {project.kind} · {team}
        </p>
        <h1 className="font-display text-5xl font-bold leading-none sm:text-6xl">{project.title}</h1>
        <p className="mt-3 text-muted">{project.tagline}</p>

        {buttons.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {buttons.map((button) => (
              <a
                key={button.label}
                href={button.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  button.primary
                    ? "bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-opacity hover:opacity-90"
                    : "border border-rule px-5 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent"
                }
              >
                {button.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Main screenshot */}
      <div className="relative mt-10 aspect-video max-w-5xl overflow-hidden border border-rule bg-white">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1100px) 1024px, 100vw"
          className="object-contain"
        />
      </div>

      {/* Story and sidebar */}
      <div className="grid gap-12 py-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div>
          {study &&
            sectionOrder.map(({ key, label }) =>
              study[key] ? (
                <section key={key} className="mb-9">
                  <h2 className="mb-2.5 font-mono text-xs font-normal text-accent">{label}</h2>
                  <p className="max-w-[65ch] leading-relaxed text-body">{study[key]}</p>
                </section>
              ) : null,
            )}

          {study?.architecture && (
            <section className="mb-9">
              <h2 className="mb-2.5 font-mono text-xs font-normal text-accent">architecture</h2>
              <p className="max-w-[65ch] border border-rule bg-surface p-5 font-mono text-[13px] leading-relaxed text-body">
                {study.architecture}
              </p>
            </section>
          )}
        </div>

        <aside className="flex flex-col gap-4">
          <div className="border-t-[3px] border-accent bg-surface p-6">
            <h2 className="mb-2.5 font-mono text-xs font-normal text-muted">my part</h2>
            <p className="text-sm leading-relaxed text-body">{project.role}</p>
          </div>

          <div className="border border-rule bg-surface p-6">
            <h2 className="mb-3 font-mono text-xs font-normal text-muted">tech stack</h2>
            <ul className="flex flex-wrap gap-2">
              {tech.map((t) => {
                const tip = usedInText(t, project.slug);
                const content = (
                  <>
                    {t.name.toLowerCase()}
                    <span className="skill-tip">
                      <span className="sr-only">, </span>
                      {tip}
                    </span>
                  </>
                );
                return (
                  <li key={t.id}>
                    {getProjectsUsing(t.id).length > 1 ? (
                      <Link href={`/tech/${t.id}`} className="skill-tag">
                        {content}
                      </Link>
                    ) : (
                      <span tabIndex={0} className="skill-tag">
                        {content}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {study?.stats && (
            <div className="border border-rule bg-surface p-6">
              <h2 className="mb-3 font-mono text-xs font-normal text-muted">by the numbers</h2>
              <dl className="grid grid-cols-2 gap-4">
                {study.stats.map((stat) => (
                  <div key={stat.label}>
                    <dd className="font-display text-2xl font-bold">{stat.value}</dd>
                    <dt className="text-xs text-muted">{stat.label}</dt>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </aside>
      </div>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section aria-labelledby="gallery-heading" className="pb-12">
          <h2 id="gallery-heading" className="mb-4 font-display text-xl font-semibold">
            Screenshots
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((shot) => (
              <li key={shot.src}>
                <figure className="border border-rule bg-surface">
                  <div className="relative aspect-video overflow-hidden bg-white">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-left-top"
                    />
                  </div>
                  <figcaption className="px-3.5 py-2.5 font-mono text-[11px] text-muted">{shot.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Next project */}
      <nav aria-label="Next project" className="flex justify-end border-t border-rule py-8">
        <Link href={`/projects/${next.slug}`} className="group text-right">
          <span className="block font-mono text-xs text-muted">next project</span>
          <span className="font-display text-2xl font-semibold transition-colors group-hover:text-accent">
            {next.title} →
          </span>
        </Link>
      </nav>
    </main>
  );
}
