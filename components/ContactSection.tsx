import SectionHeading from "./SectionHeading";
import { getProfile } from "@/lib/data";

type ContactItem = { label: string; value: string; href: string; newTab: boolean };

export default function ContactSection() {
  const profile = getProfile();
  const { contact } = profile;

  const items: ContactItem[] = [
    { label: "email", value: contact.email, href: `mailto:${contact.email}`, newTab: false },
    { label: "github", value: contact.github.replace("https://", ""), href: contact.github, newTab: true },
    ...(contact.linkedin
      ? [{ label: "linkedin", value: contact.linkedin.replace(/^https:\/\/(www\.)?/, ""), href: contact.linkedin, newTab: true }]
      : []),
    { label: "cv", value: "View my CV", href: profile.cvPath, newTab: true },
  ];

  return (
    // Last section: tall enough (screen height minus the footer) that clicking "Contact"
    // can scroll it right up under the navbar, like every other section
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="min-h-[calc(100svh-7.8rem)] border-t border-rule py-20 md:min-h-[calc(100svh-5.3rem)] md:py-24"
    >
      <SectionHeading
        id="contact-heading"
        label="contact"
        title="Let's talk"
        intro={`Based in ${profile.location} and ${profile.availability.toLowerCase()}. The quickest way to reach me is email.`}
      />

      <ul className="grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              {...(item.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="block h-full border border-rule bg-surface p-5 transition-colors duration-200 hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span className="mb-1.5 block font-mono text-[11px] text-muted">{item.label}</span>
              <span className="block break-words text-sm">{item.value}</span>
              {item.newTab && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
