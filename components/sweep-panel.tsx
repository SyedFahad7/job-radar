import Link from "next/link";
import { formatIsoDate, windowLabel } from "@/lib/format";
import type { Sweep } from "@/lib/types";

export function SweepPanel({
  sweep,
  jobCount,
}: {
  sweep: Sweep;
  jobCount?: number;
}) {
  return (
    <section
      aria-labelledby="sweep-heading"
      className="relative overflow-hidden rounded-sm border border-accent/30 bg-accent/[0.06]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full border border-accent/15"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full border border-accent/20"
      />
      <div className="relative grid gap-5 p-5 sm:grid-cols-[1fr_auto] sm:p-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
            Sweep / resurfacing
          </p>
          <h2
            id="sweep-heading"
            className="mt-2 font-serif text-2xl tracking-tight text-ink sm:text-3xl"
          >
            {sweep.label}
          </h2>
          <dl className="mt-4 grid gap-3 font-mono text-[12px] text-muted sm:grid-cols-2">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.16em] text-ink/70">
                Surfaced
              </dt>
              <dd className="mt-1 text-ink">{formatIsoDate(sweep.surfacedAt)}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.16em] text-ink/70">
                Search window
              </dt>
              <dd className="mt-1 text-ink">
                {windowLabel(sweep.windowStart, sweep.windowEnd)}
              </dd>
            </div>
          </dl>
          <p className="mt-4 max-w-2xl font-mono text-[12px] leading-relaxed text-muted">
            {sweep.notes}
          </p>
        </div>
        <div className="flex flex-col items-start justify-between gap-3 sm:items-end">
          {typeof jobCount === "number" && (
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              {jobCount} {jobCount === 1 ? "role" : "roles"}
            </p>
          )}
          <Link
            href={`/sweeps/${sweep.id}`}
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink underline-offset-4 hover:text-accent hover:underline"
          >
            Open sweep log →
          </Link>
        </div>
      </div>
    </section>
  );
}
