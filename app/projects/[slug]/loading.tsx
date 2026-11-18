import PageLoading from "@/components/PageLoading";

// Shown while this page loads. It also lets Next.js open the page instantly
// and fill it in, which is what the "URL data outside of Suspense" insight asked for.
export default function Loading() {
  return <PageLoading />;
}
