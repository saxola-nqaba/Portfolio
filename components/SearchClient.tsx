"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { SearchIndex } from "@/lib/search";

const suggestions = ["react", "docker", "azure", "kotlin", "offline", "tests"];

/**
 * Runs a search. Every word typed must appear somewhere in an item's text.
 * Used for the real results AND the hover previews, so they always agree.
 */
function runSearch(index: SearchIndex, query: string) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const matches = (text: string) => words.length > 0 && words.every((w) => text.includes(w));
  const projects = index.projects.filter((p) => matches(p.text));
  const skills = index.skills.filter((s) => matches(s.text));
  const jobs = index.jobs.filter((j) => matches(j.text));
  return { words, projects, skills, jobs, total: projects.length + skills.length + jobs.length };
}

const count = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

/** Hover preview for a suggestion chip: "finds 4 projects, 2 skills" plus the project names. */
function previewFor(index: SearchIndex, term: string) {
  const r = runSearch(index, term);
  const parts = [
    r.projects.length > 0 && count(r.projects.length, "project", "projects"),
    r.skills.length > 0 && count(r.skills.length, "skill", "skills"),
    r.jobs.length > 0 && count(r.jobs.length, "role", "roles"),
  ].filter(Boolean);
  const sentence = parts.length > 0 ? `Finds ${parts.join(", ")}` : "No results";
  const names = (r.projects.length > 0 ? r.projects.map((p) => p.title) : r.skills.map((s) => s.name)).join(" · ");
  return { sentence, names };
}

export default function SearchClient({ index }: { index: SearchIndex }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  // Keeps the address in sync (e.g. /search?q=react), so a search can be shared or bookmarked.
  const updateQuery = (value: string) => {
    setQuery(value);
    const q = value.trim();
    router.replace(q ? `${pathname}?q=${encodeURIComponent(q)}` : pathname, { scroll: false });
  };

  const { words, projects, skills, jobs, total } = runSearch(index, query);

  const groupHeading = "mb-3 font-display text-base font-semibold text-accent";
  const row = "block border border-rule bg-surface transition-colors hover:border-accent";

  return (
    <div>
      <label htmlFor="search-input" className="mb-2 block font-mono text-xs text-muted">
        search projects, skills and experience
      </label>
      <input
        id="search-input"
        type="search"
        autoFocus
        value={query}
        onChange={(e) => updateQuery(e.target.value)}
        placeholder="Try react, docker or offline"
        className="w-full border border-accent bg-surface px-4 py-3.5 font-mono text-base text-ink placeholder:text-muted focus:outline-2 focus:outline-offset-2 focus:outline-accent"
      />

      {words.length === 0 ? (
        <div className="mt-6">
          <p className="mb-3 font-mono text-xs text-muted">try one of these</p>
          <ul className="flex flex-wrap gap-2">
            {suggestions.map((s) => {
              const preview = previewFor(index, s);
              return (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => updateQuery(s)}
                    aria-describedby={`suggest-tip-${s}`}
                    className="skill-tag has-tip"
                  >
                    {s}
                    {/* Same tooltip style as the skills and project filters */}
                    <span id={`suggest-tip-${s}`} role="tooltip" className="skill-tip tip-under text-left font-sans">
                      <span className="block">{preview.sentence}</span>
                      {preview.names && (
                        <span className="mt-1 block text-[11.5px] text-muted">
                          <span className="sr-only">: </span>
                          {preview.names}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <>
          <p aria-live="polite" className="mb-8 mt-4 font-mono text-xs text-muted">
            {total} {total === 1 ? "result" : "results"} for &ldquo;{query.trim()}&rdquo;
          </p>

          {total === 0 && (
            <p className="border border-dashed border-rule p-8 text-center text-body">
              Nothing matched. Try a technology like &ldquo;azure&rdquo; or a project name.
            </p>
          )}

          {projects.length > 0 && (
            <section aria-labelledby="results-projects" className="mb-9">
              <h2 id="results-projects" className={groupHeading}>
                Projects · {projects.length}
              </h2>
              <ul className="flex flex-col gap-2.5">
                {projects.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/projects/${p.slug}`} className={`${row} flex items-center gap-4 p-3`}>
                      <span className="relative aspect-video w-28 shrink-0 overflow-hidden border border-rule bg-white">
                        <Image src={p.image} alt="" fill sizes="112px" className="object-cover object-left-top" />
                      </span>
                      <span>
                        <span className="block font-display text-[15px] font-semibold">{p.title}</span>
                        <span className="block text-[13px] text-body">{p.summary}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {skills.length > 0 && (
            <section aria-labelledby="results-skills" className="mb-9">
              <h2 id="results-skills" className={groupHeading}>
                Skills · {skills.length}
              </h2>
              <ul className="flex flex-col gap-2.5">
                {skills.map((s) => {
                  const inner = (
                    <>
                      <span className="font-mono text-sm">{s.name.toLowerCase()}</span>
                      {s.detail && <span className="mt-1 block text-[13px] text-body">{s.detail}</span>}
                    </>
                  );
                  return (
                    <li key={s.id}>
                      {s.hasPage ? (
                        <Link href={`/tech/${s.id}`} className={`${row} p-3.5`}>
                          {inner}
                        </Link>
                      ) : (
                        <div className="border border-rule bg-surface p-3.5">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {jobs.length > 0 && (
            <section aria-labelledby="results-experience">
              <h2 id="results-experience" className={groupHeading}>
                Experience · {jobs.length}
              </h2>
              <ul className="flex flex-col gap-2.5">
                {jobs.map((j) => (
                  <li key={j.role}>
                    <Link href="/#experience" className={`${row} p-3.5`}>
                      <span className="block font-display text-[15px] font-semibold">{j.role}</span>
                      <span className="block text-[13px] text-body">
                        {j.org} · {j.period}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  );
}
