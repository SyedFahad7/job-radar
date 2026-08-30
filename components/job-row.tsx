import Link from "next/link";
import { StatusPill } from "@/components/status-pill";
import { SweepBadge } from "@/components/sweep-badge";
import { formatPosted } from "@/lib/format";
import type { Job, Sweep } from "@/lib/types";
import { cn } from "@/lib/utils";

const grid =
  "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.05fr)_88px_92px_108px_minmax(0,0.9fr)_minmax(0,0.75fr)_72px]";

export function JobRow({
  job,
  sweep,
  queryString,
}: {
  job: Job;
  sweep?: Sweep;
  queryString: string;
}) {
  const posted = formatPosted(job.postedSort, job.posted);
  const detailHref = queryString
    ? `/jobs/${job.slug}?${queryString}`
    : `/jobs/${job.slug}`;

  return (
    <article
      className={cn(
        "group relative border-b border-line/80 transition-colors",
        "hover:bg-accent/[0.04] focus-within:bg-accent/[0.04]",
      )}
    >
      <Link
        href={detailHref}
        className="absolute inset-0 z-0"
        aria-label={`${job.title} at ${job.company}`}
      />
      <div className={cn("relative z-10 grid gap-3 px-3 py-3.5 sm:px-4 lg:items-center lg:gap-3", grid)}>
        <div className="min-w-0">
          <p className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-accent/80">
            {job.company}
          </p>
          <h2 className="mt-1 font-serif text-lg leading-snug tracking-tight text-ink sm:text-[1.35rem]">
            {job.title}
          </h2>
          <p className="mt-1 font-mono text-[11px] text-muted lg:hidden">
            {job.level} · {job.locationTag} · {posted.compact}
          </p>
        </div>

        <div className="hidden min-w-0 lg:block">
          <p className="truncate font-mono text-[12px] text-muted">{job.level}</p>
          <p className="mt-1 truncate font-mono text-[11px] text-muted/80">
            {job.location}
          </p>
        </div>
        <p className="hidden font-mono text-[11px] text-muted lg:block">
          {job.locationTag}
        </p>
        <p
          className="hidden font-mono text-[11px] text-muted lg:block"
          title={posted.full}
        >
          {posted.compact}
        </p>
        <div className="hidden lg:block">
          <StatusPill status={job.statusKey} />
        </div>
        <p className="hidden truncate font-mono text-[11px] text-ink/85 lg:block">
          {job.salaryInr}
        </p>
        <div className="hidden lg:block">
          <SweepBadge
            id={job.sweepId}
            label={sweep?.label ?? job.sweepId}
            href={`/sweeps/${job.sweepId}`}
            className="relative z-20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:contents">
          <div className="lg:hidden">
            <StatusPill status={job.statusKey} />
          </div>
          <p className="font-mono text-[11px] text-ink/85 lg:hidden">
            {job.salaryInr}
          </p>
          <div className="lg:hidden">
            <SweepBadge
              id={job.sweepId}
              label={sweep?.label ?? job.sweepId}
              href={`/sweeps/${job.sweepId}`}
              className="relative z-20"
            />
          </div>
          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-20 ml-auto inline-flex h-8 items-center justify-center rounded-sm border border-accent/40 bg-accent/10 px-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent transition-colors hover:bg-accent hover:text-bg lg:ml-0"
          >
            Apply ↗
          </a>
        </div>
      </div>
    </article>
  );
}

export function JobTableHeader() {
  return (
    <div
      className={cn(
        "sticky top-0 z-20 hidden border-b border-line bg-bg/95 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted backdrop-blur-sm lg:grid lg:gap-3",
        grid,
      )}
    >
      <span>Company / role</span>
      <span>Level · location</span>
      <span>Tag</span>
      <span>Posted</span>
      <span>Status</span>
      <span>Salary INR</span>
      <span>Sweep</span>
      <span>Apply</span>
    </div>
  );
}
