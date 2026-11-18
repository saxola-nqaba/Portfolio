import type { Metadata } from "next";
import { Suspense } from "react";
import SearchClient from "@/components/SearchClient";
import { buildSearchIndex } from "@/lib/search";

export const metadata: Metadata = {
  title: "Search | Saxola Nqaba",
  description: "Search Saxola Nqaba's projects, skills and experience.",
};

export default function SearchPage() {
  // Built on the server once, then searched instantly in the browser.
  const index = buildSearchIndex();

  return (
    <main className="mx-auto max-w-4xl px-6 pb-16 pt-10 md:px-12">
      <h1 className="mb-6 font-display text-4xl font-bold">Search</h1>
      {/* The search box reads ?q= from the address, which Next.js wants inside Suspense */}
      <Suspense fallback={<div className="h-14 border border-rule bg-surface" aria-hidden="true" />}>
        <SearchClient index={index} />
      </Suspense>
    </main>
  );
}
