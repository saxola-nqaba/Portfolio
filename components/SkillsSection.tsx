import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { getProjectsUsing, getTechByCategory, usedInText } from "@/lib/data";

export default function SkillsSection() {
  const groups = getTechByCategory();

  return (
    <section id="skills" aria-labelledby="skills-heading" className="border-t border-rule py-16">
      <SectionHeading
        id="skills-heading"
        label="skills"
        title="What I work with"
        intro="Hover or tab to any tool to see where I've used it."
      />

      <div className="grid gap-x-14 gap-y-9 md:grid-cols-2">
        {groups.map((group) => (
          <div key={group.category}>
            <h3 className="mb-3.5 border-b-2 border-rule pb-2 font-display text-base font-semibold">
              {group.label}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((tech) => {
                const tip = usedInText(tech);
                const content = (
                  <>
                    {tech.name.toLowerCase()}
                    {tip && (
                      <span className="skill-tip">
                        <span className="sr-only">, </span>
                        {tip}
                      </span>
                    )}
                  </>
                );

                // Skills used in a project link to their tech page; the rest just show their source.
                return (
                  <li key={tech.id}>
                    {getProjectsUsing(tech.id).length > 0 ? (
                      <Link href={`/tech/${tech.id}`} className="skill-tag">
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
        ))}
      </div>
    </section>
  );
}
