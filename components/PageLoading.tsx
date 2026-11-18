/** Placeholder shown for the moment a page takes to load. */
export default function PageLoading() {
  return (
    <main className="mx-auto max-w-7xl px-6 md:px-12" aria-busy="true">
      <span className="sr-only">Loading…</span>
      <div className="animate-pulse pb-16 pt-10" aria-hidden="true">
        <div className="h-3 w-16 bg-surface-2" />
        <div className="mt-8 h-5 w-40 bg-surface-2" />
        <div className="mt-5 h-12 w-72 max-w-full bg-surface-2" />
        <div className="mt-4 h-4 w-96 max-w-full bg-surface-2" />
        <div className="mt-10 aspect-video max-w-5xl bg-surface-2" />
      </div>
    </main>
  );
}
