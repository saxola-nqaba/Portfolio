type SectionHeadingProps = {
  /** id for the h2, so the section can point to it with aria-labelledby */
  id: string;
  label: string;
  title: string;
  intro?: string;
};

export default function SectionHeading({ id, label, title, intro }: SectionHeadingProps) {
  return (
    <div className="mb-8">
      <p className="mb-4 inline-block border border-accent px-2.5 py-0.5 font-mono text-xs text-accent">
        {label}
      </p>
      <h2 id={id} className="font-display text-3xl font-bold sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-3 max-w-[62ch] text-sm text-muted">{intro}</p>}
    </div>
  );
}
