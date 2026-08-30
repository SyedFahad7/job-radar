import { Suspense } from "react";
import { JobBoard } from "@/components/job-board";
import { getJobs, getSweeps } from "@/lib/data";

export default function HomePage() {
  const jobs = getJobs();
  const sweeps = getSweeps();

  return (
    <div className="mx-auto w-full max-w-6xl">
      <Suspense
        fallback={
          <p className="px-4 py-10 font-mono text-[12px] text-muted">
            Loading contacts…
          </p>
        }
      >
        <JobBoard jobs={jobs} sweeps={sweeps} />
      </Suspense>
    </div>
  );
}
