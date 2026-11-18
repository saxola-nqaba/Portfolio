import { getProfile } from "@/lib/data";

// Temporary: empty sections so you can test the nav links. Step 5 replaces this page.
const sections = ["projects", "about", "experience", "skills", "contact"];

export default function Home() {
  const profile = getProfile();

  return (
    <main className="mx-auto max-w-7xl px-6 md:px-12">
      <section className="py-24">
        <p className="font-mono text-xs text-muted">step 4 · nav check</p>
        <h1 className="mt-4 font-display text-6xl font-bold leading-none">{profile.name}</h1>
        <p className="mt-4 max-w-prose text-body">{profile.intro}</p>
      </section>

      {sections.map((id) => (
        <section key={id} id={id} className="min-h-[70vh] border-t border-rule py-16">
          <h2 className="font-display text-3xl font-bold capitalize">{id}</h2>
          <p className="mt-3 text-sm text-muted">Placeholder. The real content arrives in Steps 6 and 7.</p>
        </section>
      ))}
    </main>
  );
}
