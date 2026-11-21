import SectionHeading from "./SectionHeading";
import { getProfile } from "@/lib/data";

export default function AboutSection() {
  const profile = getProfile();
  const firstName = profile.name.split(" ")[0];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="grid gap-12 border-t border-rule py-20 md:py-24 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]"
    >
      <div>
        <SectionHeading id="about-heading" label="about" title={`Hi, I'm ${firstName}.`} />
        {profile.about.map((paragraph) => (
          <p key={paragraph} className="mb-4 max-w-[62ch] leading-relaxed text-body">
            {paragraph}
          </p>
        ))}

        <p className="mb-3 mt-8 font-mono text-xs text-muted">my list · up next</p>
        <ul className="flex flex-wrap gap-2">
          {profile.myList.map((item) => (
            <li key={item} className="border border-rule bg-surface px-3 py-2 font-mono text-xs">
              {item.toLowerCase()}
            </li>
          ))}
        </ul>
      </div>

      <aside aria-label="Education and certifications" className="h-fit border-t-[3px] border-accent bg-surface p-7">
        <h3 className="mb-4 font-mono text-xs font-normal text-muted">education</h3>
        <ul className="space-y-4">
          {profile.education.map((item) => (
            <li key={item.qualification}>
              <p className="font-display text-[15px] font-semibold">{item.qualification}</p>
              <p className="mt-1 text-xs text-body">{item.detail}</p>
            </li>
          ))}
        </ul>

        <div className="my-6 h-px bg-rule" />

        <h3 className="mb-3 font-mono text-xs font-normal text-muted">certifications</h3>
        <ul className="space-y-1.5 text-sm text-body">
          {profile.certifications.map((cert) => (
            <li key={cert}>{cert}</li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
