import Link from "next/link";
import PeriodicTable from "./PeriodicTable";
import { getProfile } from "@/lib/data";

export default function Hero() {
  const profile = getProfile();

  return (
    <section
      aria-labelledby="hero-name"
      className="grid items-start gap-14 py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]"
    >
      <div>
        <p className="mb-3 font-mono text-sm text-muted">hi, i&apos;m</p>
        <h1 id="hero-name" className="font-display text-6xl font-bold leading-none sm:text-7xl">
          {profile.name}
        </h1>
        <p className="mt-4 font-display text-xl font-medium text-accent sm:text-2xl">{profile.role}</p>
        <p className="mt-5 max-w-[52ch] leading-relaxed text-body">{profile.intro}</p>

        <p className="mt-6 inline-flex items-center gap-2.5 border border-rule bg-surface px-3.5 py-2 font-mono text-xs text-body">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#3fb27f]" />
          {profile.availability.toLowerCase()} · {profile.location.toLowerCase()}
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="#projects"
            className="bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition-opacity hover:opacity-90"
          >
            View projects
          </Link>
          <a
            href={profile.cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-rule px-5 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            View CV<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Link
            href="#contact"
            className="border border-rule px-5 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            Contact me
          </Link>
        </div>
      </div>

      <PeriodicTable />
    </section>
  );
}
