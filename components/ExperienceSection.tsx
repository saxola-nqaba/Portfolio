import SectionHeading from "./SectionHeading";
import { getExperience } from "@/lib/data";

export default function ExperienceSection() {
  const jobs = getExperience();

  return (
    <section id="experience" aria-labelledby="experience-heading" className="border-t border-rule py-20 md:py-24">
      <SectionHeading id="experience-heading" label="experience" title="Where I've worked" />

      {/* The left border is the timeline line; each dot sits on it */}
      <ol className="max-w-3xl border-l-2 border-rule pl-8">
        {jobs.map((job) => (
          <li key={job.role} className="relative pb-10 last:pb-0">
            <span
              aria-hidden="true"
              className={`absolute -left-[38px] top-1.5 h-2.5 w-2.5 rounded-full ${job.current ? "bg-accent" : "bg-muted"}`}
            />
            <p className={`mb-1.5 font-mono text-xs ${job.current ? "text-accent" : "text-muted"}`}>{job.period}</p>
            <h3 className="font-display text-xl font-semibold">{job.role}</h3>
            <p className="mb-2.5 text-sm text-muted">
              {job.org} · {job.context}
            </p>
            <p className="max-w-[62ch] text-sm leading-relaxed text-body">{job.summary}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
