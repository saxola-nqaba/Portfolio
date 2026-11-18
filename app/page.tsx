import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <div className="mb-10 flex items-center justify-between">
        <span className="font-mono text-xs text-muted">step 2 · design system check</span>
        <ThemeToggle />
      </div>

      <p className="font-mono text-sm text-muted">hi, i&apos;m</p>
      <h1 className="font-display text-6xl font-bold leading-none">Saxola Nqaba</h1>
      <p className="mt-4 font-display text-xl font-medium text-accent">
        Application developer · full-stack, cloud &amp; DevOps
      </p>
      <p className="mt-5 max-w-prose leading-relaxed text-body">
        I build web, mobile and cloud applications end to end, and ship them with Docker,
        CI/CD pipelines and Azure.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href="#" className="bg-accent px-5 py-3 text-sm font-semibold text-on-accent">
          View projects
        </a>
        <a href="#" className="border border-rule px-5 py-3 text-sm">
          Download CV
        </a>
      </div>

      <div className="mt-12 border border-rule bg-surface p-6">
        <p className="font-mono text-xs text-muted">surface card</p>
        <p className="mt-2 font-display text-lg font-semibold">The Loop</p>
        <p className="mt-1 text-sm text-body">Offline-first outreach platform.</p>
      </div>
    </main>
  );
}