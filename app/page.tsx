import ThemeToggle from "@/components/ThemeToggle";
import { getProfile, getProjects, getProjectTech, getTechnology, usedInText } from "@/lib/data";

export default function Home() {
  const profile = getProfile();
  const projects = getProjects();
  const docker = getTechnology("docker");

  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <div className="mb-10 flex items-center justify-between">
        <span className="font-mono text-xs text-muted">step 3 · data check</span>
        <ThemeToggle />
      </div>

      <h1 className="font-display text-5xl font-bold">{profile.name}</h1>
      <p className="mt-3 text-body">{profile.intro}</p>

      <p className="mt-8 font-mono text-xs text-muted">
        docker → {docker ? usedInText(docker) : "missing"}
      </p>

      <ul className="mt-6 space-y-3">
        {projects.map((project) => (
          <li key={project.slug} className="border border-rule bg-surface p-4">
            <p className="font-display text-lg font-semibold">{project.title}</p>
            <p className="text-sm text-body">{project.summary}</p>
            <p className="mt-2 font-mono text-xs text-muted">
              {getProjectTech(project).map((t) => t.name).join(" · ")}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
