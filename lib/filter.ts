import type { BoardQuery, Job } from "./types";

export function filterAndSortJobs(jobs: Job[], query: BoardQuery): Job[] {
  const needle = query.q.trim().toLowerCase();

  const filtered = jobs.filter((job) => {
    if (needle) {
      const hay = [
        job.company,
        job.title,
        job.location,
        job.locationTag,
        job.level,
        job.source,
        job.salaryInr,
        job.salaryRaw,
      ]
        .join(" ")
        .toLowerCase();
      if (!hay.includes(needle)) return false;
    }
    if (query.status.length && !query.status.includes(job.statusKey)) {
      return false;
    }
    if (query.level.length && !query.level.includes(job.levelKey)) {
      return false;
    }
    if (query.location.length && !query.location.includes(job.locationTag)) {
      return false;
    }
    if (query.flag.length && !query.flag.includes(job.flagKey)) {
      return false;
    }
    if (query.sweep.length && !query.sweep.includes(job.sweepId)) {
      return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (query.sort === "company") {
      return a.company.localeCompare(b.company, "en", { sensitivity: "base" });
    }
    if (query.sort === "salary") {
      if (a.salarySort === null && b.salarySort === null) return 0;
      if (a.salarySort === null) return 1;
      if (b.salarySort === null) return -1;
      return b.salarySort - a.salarySort;
    }
    if (query.sort === "status") {
      const order = { open: 0, "open-stale": 1, closed: 2 };
      return order[a.statusKey] - order[b.statusKey];
    }
    // posted: newest first, undated last
    if (!a.postedSort && !b.postedSort) return 0;
    if (!a.postedSort) return 1;
    if (!b.postedSort) return -1;
    return b.postedSort.localeCompare(a.postedSort);
  });

  return sorted;
}
