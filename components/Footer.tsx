import { getProfile } from "@/lib/data";

export default function Footer() {
  const { name, contact } = getProfile();

  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-6 font-mono text-xs text-muted md:px-12">
        <span>© 2026 {name}</span>
        <div className="flex gap-6">
          <a href={`mailto:${contact.email}`} className="transition-colors hover:text-ink">
            email
          </a>
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
            github
          </a>
          {contact.linkedin && (
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
              linkedin
            </a>
          )}
          <a href="#top" className="transition-colors hover:text-ink">
            back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
