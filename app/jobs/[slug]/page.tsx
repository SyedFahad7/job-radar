import { Suspense } from "react";
import { notFound } from "next/navigation";
import { BackToList } from "@/components/back-to-list";
import { StatusPill } from "@/components/status-pill";
import { SweepBadge } from "@/components/sweep-badge";
import { SweepPanel } from "@/components/sweep-panel";
import { getJobBySlug, getJobs, getSweep, jobsForSweep } from "@/lib/data";
import {
  flagLabel,
  formatIsoDate,
  formatPosted,
  levelLabel,
} from "@/lib/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return getJobs().map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) return { title: "Role not found" };
  return {
    title: `${job.title} · ${job.company}`,
    description: `${job.level} DevRel role at ${job.company}. ${job.location}`,
    openGraph: {
      title: `${job.title} · ${job.company}`,
      description: "Job radar · DevRel",
    },
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) notFound();

  const sweep = getSweep(job.sweepId);
  const posted = formatPosted(job.postedSort, job.posted);

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <Suspense
        fallback={
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            ← Back to list
          </span>
        }
      >
        <BackToList />
      </Suspense>

      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
        {job.company}
      </p>
      <h1 className="mt-2 font-serif text-3xl tracking-tight text-ink sm:text-5xl">
        {job.title}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <StatusPill status={job.statusKey} />
        {sweep && (
          <SweepBadge
            id={sweep.id}
            label={sweep.label}
            href={`/sweeps/${sweep.id}`}
          />
        )}
        <span className="rounded-sm border border-line px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          {flagLabel(job.flagKey)}
        </span>
      </div>

      <dl className="mt-8 grid gap-4 border-y border-line py-6 sm:grid-cols-2">
        <Fact label="Level" value={job.level} hint={levelLabel(job.levelKey)} />
        <Fact label="Location" value={job.location} hint={job.locationTag} />
        <Fact label="Posted" value={posted.compact} hint={posted.full} />
        <Fact label="Source" value={job.source} />
        <Fact label="Salary (raw)" value={job.salaryRaw} />
        <Fact label="Salary (INR)" value={job.salaryInr} />
      </dl>

      <section className="mt-8">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
          Authenticity evidence
        </h2>
        <p className="mt-3 font-mono text-[13px] leading-relaxed text-ink/90">
          {job.evidence}
        </p>
      </section>

      {sweep && (
        <div className="mt-8">
          <SweepPanel
            sweep={sweep}
            jobCount={jobsForSweep(sweep.id).length}
          />
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={job.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center rounded-sm bg-accent px-5 font-mono text-[12px] uppercase tracking-[0.16em] text-bg transition-colors hover:bg-accent/90"
        >
          Apply on {job.source} ↗
        </a>
        <p className="font-mono text-[11px] text-muted">
          Sweep {formatIsoDate(sweep?.surfacedAt)} · opens in a new tab
        </p>
      </div>
    </article>
  );
}

function Fact({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | null;
  hint?: string;
}) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
        {label}
      </dt>
      <dd className="mt-1 text-[15px] leading-snug text-ink">{value ?? "—"}</dd>
      {hint && hint !== value && (
        <p className="mt-1 font-mono text-[11px] text-muted">{hint}</p>
      )}
    </div>
  );
}
