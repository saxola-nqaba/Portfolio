import Link from "next/link";
import type { CSSProperties } from "react";
import { getProjectsUsing, getTechnology, usedInText } from "@/lib/data";
import type { TechCategory } from "@/lib/types";

const COLUMNS = 6;

// The shape of the table. null leaves a gap, like the top row of the real periodic table.
const layout: (string | null)[] = [
  "csharp", null, null, null, null, "github-actions",
  "javascript", "typescript", "kotlin", "sql", "azure", "docker",
  "aspnet-core", "react", "react-native", "node-express", "linux", "azure-functions",
  "android", "winforms", "wpf", "mongodb", "firebase", "indexeddb",
  "algorithms", "jwt", "xunit", "vitest", "postman", "sonarqube",
];

// These glow gently after the table loads.
const coreIds = new Set(["csharp", "react", "docker", "azure"]);

const legend: { category: TechCategory; label: string }[] = [
  { category: "languages", label: "languages" },
  { category: "frameworks", label: "frameworks" },
  { category: "data", label: "data" },
  { category: "devops", label: "cloud & devops" },
  { category: "quality", label: "quality & security" },
];

export default function PeriodicTable() {
  // Work out each tile's details once, before drawing anything.
  let elementNumber = 0;
  const cells = layout.map((id, index) => {
    if (!id) return null;
    const tech = getTechnology(id);
    if (!tech) throw new Error(`Unknown technology "${id}" in the periodic table`);
    elementNumber += 1;
    const column = index % COLUMNS;
    return {
      tech,
      number: elementNumber,
      count: getProjectsUsing(id).length,
      tooltip: usedInText(tech),
      tipSide: column === 0 ? "pt-tip-left" : column === COLUMNS - 1 ? "pt-tip-right" : "",
      delay: index * 40,
    };
  });

  return (
    <div>
      <div className="mb-3 flex justify-between gap-3 font-mono text-[11px] text-muted">
        <span>the periodic table of my stack</span>
        <span>×n = projects that used it</span>
      </div>

      <ul
        aria-label="Technologies I use, with how many projects used each"
        className="grid grid-cols-6 gap-1.5"
      >
        {cells.map((cell, index) => {
          if (!cell) return <li key={`gap-${index}`} aria-hidden="true" />;
          const { tech } = cell;
          const style = {
            "--cat": `var(--cat-${tech.category})`,
            animationDelay: `${cell.delay}ms`,
          } as CSSProperties;

          return (
            <li key={tech.id}>
              <Link
                href={`/tech/${tech.id}`}
                aria-label={`${tech.name}, ${cell.tooltip}`}
                className={`pt-tile ${coreIds.has(tech.id) ? "pt-core" : ""}`}
                style={style}
              >
                <span className="flex justify-between font-mono text-[9px] text-muted">
                  <span>{cell.number}</span>
                  <span>×{cell.count}</span>
                </span>
                <span className="pt-symbol">{tech.symbol}</span>
                <span className="truncate text-[10px] text-body">{tech.name}</span>
                <span className={`pt-tip ${cell.tipSide}`} aria-hidden="true">
                  {cell.tooltip}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <ul className="mt-3.5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] text-body">
        {legend.map((item) => (
          <li key={item.category} className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5"
              style={{ background: `var(--cat-${item.category})` }}
            />
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
