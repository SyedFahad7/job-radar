import catalog from "@/data/jobs.json";
import { salarySortValue } from "./salary";
import type {
  Catalog,
  FlagKey,
  Job,
  LevelKey,
  RawJob,
  StatusKey,
  Sweep,
} from "./types";

const data = catalog as Catalog;

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function jobSlug(job: RawJob, used: Set<string>): string {
  const base = `${slugify(job.company)}-${slugify(job.title)}`;
  if (!used.has(base)) return base;
  const loc = slugify(job.location).split("-").slice(0, 3).join("-");
  const fallback = loc ? `${base}-${loc}` : `${base}-alt`;
  if (!used.has(fallback)) return fallback;
  let i = 2;
  while (used.has(`${fallback}-${i}`)) i += 1;
  return `${fallback}-${i}`;
}

function statusKey(status: RawJob["status"]): StatusKey {
  if (status === "CLOSED") return "closed";
  if (status.includes("STALE")) return "open-stale";
  return "open";
}

function levelKey(level: string): LevelKey {
  const normalized = level.toLowerCase();
  if (normalized.startsWith("intern")) return "intern";
  if (normalized.startsWith("junior") || normalized.startsWith("entry")) {
    return "junior-entry";
  }
  return "mid";
}

function flagKey(flag: RawJob["flag"]): FlagKey {
  return flag === "ok" ? "core" : flag;
}

function hydrateJobs(jobs: RawJob[]): Job[] {
  const used = new Set<string>();
  return jobs.map((job) => {
    const slug = jobSlug(job, used);
    used.add(slug);
    return {
      ...job,
      slug,
      statusKey: statusKey(job.status),
      levelKey: levelKey(job.level),
      flagKey: flagKey(job.flag),
      salarySort: salarySortValue(job.salaryInr),
    };
  });
}

const jobs = hydrateJobs(data.jobs);

if (jobs.length !== 50) {
  throw new Error(`Expected 50 seed jobs, found ${jobs.length}`);
}

const slugs = new Set(jobs.map((job) => job.slug));
if (slugs.size !== jobs.length) {
  throw new Error("Job slugs are not unique");
}

export function getCatalog(): Catalog {
  return data;
}

export function getJobs(): Job[] {
  return jobs;
}

export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((job) => job.slug === slug);
}

export function getSweeps(): Sweep[] {
  return data.sweeps;
}

export function getSweep(id: string): Sweep | undefined {
  return data.sweeps.find((sweep) => sweep.id === id);
}

export function jobsForSweep(id: string): Job[] {
  return jobs.filter((job) => job.sweepId === id);
}

export function getFx() {
  return data.fx;
}

export function getLastSweepDate(): string {
  return data.lastSweepDate;
}
