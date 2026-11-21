import Link from "next/link";

// Shown for any unknown URL, and when a page calls notFound().
export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col items-start px-6 py-28 md:px-12">
      <span className="mb-6 border border-rule px-2.5 py-0.5 font-mono text-xs text-muted">
        error 404
      </span>
      <h1 className="font-display text-5xl font-semibold leading-none tracking-[0.01em] sm:text-[3.5rem]">
        This title isn&apos;t available.
      </h1>
      <p className="mt-5 max-w-[52ch] text-body">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Try the projects
        or search instead.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/#projects"
          className="bg-accent px-5 py-3 text-sm font-semibold text-on-accent hover:opacity-90"
        >
          Browse projects
        </Link>
        <Link
          href="/search"
          className="border border-rule px-5 py-3 text-sm text-ink hover:border-accent hover:text-accent"
        >
          Search
        </Link>
      </div>
    </main>
  );
}
