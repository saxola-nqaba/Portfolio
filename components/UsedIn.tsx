import { usedInDetails } from "@/lib/data";
import type { Technology } from "@/lib/types";

/**
 * The inside of a skill tooltip:
 *   Used in 2 projects:
 *   GLMS – Global logistics management system
 *   StudyTrack – Marks and goal tracker
 * Project names are bold so each entry stands out, even when a line wraps.
 */
export default function UsedIn({ tech, excludeSlug }: { tech: Technology; excludeSlug?: string }) {
  const { heading, projects } = usedInDetails(tech, excludeSlug);
  return (
    <>
      <span className="block font-mono text-[11px] text-muted">{heading}</span>
      {projects.map((p) => (
        <span key={p.slug} className="mt-1.5 block leading-snug">
          <span className="font-semibold text-ink">{p.title}</span>
          <span className="text-body"> – {p.tagline}</span>
        </span>
      ))}
    </>
  );
}
