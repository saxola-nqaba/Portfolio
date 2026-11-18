"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

type NavbarProps = {
  name: string;
  role: string;
  cvPath: string;
};

/** Watches the Home sections and reports which one is in the middle of the screen. */
function useSectionInView(enabled: boolean) {
  const [inView, setInView] = useState<string | null>(null);
  const visible = useRef(new Set<string>());

  useEffect(() => {
    if (!enabled) return;
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.current.add(entry.target.id);
          else visible.current.delete(entry.target.id);
        }
        // The first section, in page order, that crosses the middle band of the screen
        const current = links.find((link) => visible.current.has(link.id));
        setInView(current ? current.id : null);
      },
      // Only a thin band in the middle of the screen counts as "here"
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    const seen = visible.current;
    return () => {
      observer.disconnect();
      seen.clear();
    };
  }, [enabled]);

  return enabled ? inView : null;
}

export default function Navbar({ name, role, cvPath }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const pathname = usePathname();
  const sectionInView = useSectionInView(pathname === "/");

  // On Home, highlight the section on screen. Elsewhere, highlight the section the page belongs to.
  const active = pathname.startsWith("/projects/")
    ? "projects"
    : pathname.startsWith("/tech/")
      ? "skills"
      : sectionInView;

  const linkClass = (id: string) =>
    id === active
      ? "border-b-2 border-accent pb-1 text-ink"
      : "border-b-2 border-transparent pb-1 transition-colors hover:text-ink";

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-page/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3 md:px-12">
        <div className="flex items-center gap-10">
          {/* Points at the top of Home, so it also scrolls up when you are already on Home */}
          <Link href="/#top" onClick={closeMenu} className="block">
            <span className="block font-display text-xl font-semibold tracking-wide">{name}</span>
            <span className="hidden text-xs text-muted sm:block">{role}</span>
          </Link>

          {/* Desktop links */}
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex gap-7 text-sm text-muted">
              {links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={`/#${link.id}`}
                    aria-current={link.id === active ? "true" : undefined}
                    className={linkClass(link.id)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/search"
            aria-label="Search"
            className="flex h-11 w-11 items-center justify-center text-muted transition-colors hover:text-ink"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" />
            </svg>
          </Link>

          <ThemeToggle />

          <a
            href={cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 hidden border border-rule px-4 py-2.5 font-mono text-xs transition-colors hover:border-accent hover:text-accent sm:inline-block"
          >
            resume.pdf<span className="sr-only"> (opens in a new tab)</span>
          </a>

          {/* Menu button, phones only */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center text-muted transition-colors hover:text-ink md:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Phone menu */}
      {menuOpen && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-rule md:hidden">
          <ul className="flex flex-col px-6 py-2">
            {links.map((link) => (
              <li key={link.id}>
                <Link
                  href={`/#${link.id}`}
                  onClick={closeMenu}
                  aria-current={link.id === active ? "true" : undefined}
                  className={`block py-3 ${link.id === active ? "text-accent" : "text-ink"}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={cvPath} target="_blank" rel="noopener noreferrer" className="block py-3 font-mono text-sm text-accent">
                resume.pdf<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
