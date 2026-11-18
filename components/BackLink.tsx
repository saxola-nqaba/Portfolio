"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { canGoBack } from "@/lib/history";

type BackLinkProps = {
  /** Where to go when there's no earlier page on this site, e.g. "/#skills" */
  fallback: string;
};

/** Goes back to wherever the visitor came from on this site, or to the fallback. */
export default function BackLink({ fallback }: BackLinkProps) {
  const router = useRouter();

  return (
    <Link
      href={fallback}
      onClick={(event) => {
        if (canGoBack()) {
          event.preventDefault();
          router.back();
        }
      }}
      className="font-mono text-xs text-muted transition-colors hover:text-ink"
    >
      ← back
    </Link>
  );
}
