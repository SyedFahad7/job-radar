import Link from "next/link";
import { formatIsoDate, windowLabel } from "@/lib/format";
import { getJobs, getSweeps } from "@/lib/data";

export const metadata = {
  title: "Sweeps",
  description: "Resurfacing log for the DevRel job radar.",
  openGraph: {
    title: "Sweeps · Job radar · DevRel",
  },
};

export default function SweepsPage() {
  const sweeps = getSweeps();
  const jobs = getJobs();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
        Resurfacing log
      </p>
      <h1 className="mt-2 font-serif text-4xl tracking-tight text-ink">
        Sweeps
      </h1>
      <p className="mt-3 max-w-xl font-mono text-[13px] leading-relaxed text-muted">
        Each sweep is a dated pass over intern-to-mid DevRel listings. New
        sweeps append jobs — they do not rewrite earlier contacts.
      </p>

      <ol className="mt-10 space-y-4">
        {sweeps.map((sweep) => {
          const count = jobs.filter((job) => job.sweepId === sweep.id).length;
          return (
            <li key={sweep.id}>
              <Link
                href={`/sweeps/${sweep.id}`}
                className="block rounded-sm border border-line bg-bg-elev/40 p-5 transition-colors hover:border-accent/40 hover:bg-accent/[0.04]"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-serif text-2xl text-ink">{sweep.label}</h2>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    {count} roles
                  </p>
                </div>
                <p className="mt-2 font-mono text-[12px] text-muted">
                  {formatIsoDate(sweep.surfacedAt)} ·{" "}
                  {windowLabel(sweep.windowStart, sweep.windowEnd)}
                </p>
                <p className="mt-3 font-mono text-[12px] leading-relaxed text-ink/80">
                  {sweep.notes}
                </p>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
