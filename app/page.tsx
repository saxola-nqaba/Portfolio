import Hero from "@/components/Hero";

// The remaining sections are still placeholders. Steps 6 and 7 fill them in.
const sections = ["projects", "about", "experience", "skills", "contact"];

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-6 md:px-12">
      <Hero />

      {sections.map((id) => (
        <section key={id} id={id} className="min-h-[70vh] border-t border-rule py-16">
          <h2 className="font-display text-3xl font-bold capitalize">{id}</h2>
          <p className="mt-3 text-sm text-muted">Placeholder. The real content arrives in Steps 6 and 7.</p>
        </section>
      ))}
    </main>
  );
}
