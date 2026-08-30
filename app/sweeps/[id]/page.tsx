import Link from "next/link";
import { notFound } from "next/navigation";
import { JobRow, JobTableHeader } from "@/components/job-row";
import { SweepPanel } from "@/components/sweep-panel";
import { getSweep, getSweeps, jobsForSweep } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return getSweeps().map((sweep) => ({ id: sweep.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sweep = getSweep(id);
  if (!sweep) return { title: "Sweep not found" };
  return {
    title: sweep.label,
    description: sweep.notes,
    openGraph: {
      title: `${sweep.label} · Job radar · DevRel`,
    },
  };
}

export default async function SweepDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sweep = getSweep(id);
  if (!sweep) notFound();

  const jobs = jobsForSweep(sweep.id);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <Link
        href="/sweeps"
        className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted hover:text-accent"
      >
        ← All sweeps
      </Link>
      <div className="mt-6">
        <SweepPanel sweep={sweep} jobCount={jobs.length} />
      </div>
      <div className="mt-8 overflow-hidden rounded-sm border border-line">
        <JobTableHeader />
        {jobs.map((job) => (
          <JobRow key={job.slug} job={job} sweep={sweep} queryString="" />
        ))}
      </div>
    </div>
  );
}
