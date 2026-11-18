"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/#projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

type NavbarProps = {
  name: string;
  role: string;
  cvPath: string;
};

export default function Navbar({ name, role, cvPath }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-page/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3 md:px-12">
        <div className="flex items-center gap-10">
          <Link href="/" onClick={closeMenu} className="block">
            <span className="block font-display text-xl font-semibold tracking-wide">{name}</span>
            <span className="hidden text-xs text-muted sm:block">{role}</span>
          </Link>

          {/* Desktop links */}
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex gap-7 text-sm text-muted">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-ink">
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
            download
            className="ml-2 hidden border border-rule px-4 py-2.5 font-mono text-xs transition-colors hover:border-accent hover:text-accent sm:inline-block"
          >
            resume.pdf
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
              <li key={link.href}>
                <Link href={link.href} onClick={closeMenu} className="block py-3 text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={cvPath} download className="block py-3 font-mono text-sm text-accent">
                resume.pdf
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
