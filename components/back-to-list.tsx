"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { listHref, parseBoardQuery } from "@/lib/query";

export function BackToList({
  href = "/",
  label = "← Back to list",
}: {
  href?: string;
  label?: string;
}) {
  const searchParams = useSearchParams();
  const queryHref = listHref(
    parseBoardQuery(Object.fromEntries(searchParams.entries())),
  );
  const target = searchParams.toString() ? queryHref : href;

  return (
    <Link
      href={target}
      className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted hover:text-accent"
    >
      {label}
    </Link>
  );
}
