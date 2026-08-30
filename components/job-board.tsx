"use client";

import { useMemo, useTransition, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { JobRow, JobTableHeader } from "@/components/job-row";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { filterAndSortJobs } from "@/lib/filter";
import { flagLabel, formatIsoDate, levelLabel, statusLabel } from "@/lib/format";
import { parseBoardQuery, serializeBoardQuery } from "@/lib/query";
import type {
  BoardQuery,
  FlagKey,
  Job,
  LevelKey,
  LocationTag,
  SortKey,
  StatusKey,
  Sweep,
} from "@/lib/types";
import { cn } from "@/lib/utils";

const STATUS: StatusKey[] = ["open", "open-stale", "closed"];
const LEVEL: LevelKey[] = ["intern", "junior-entry", "mid"];
const LOCATION: LocationTag[] = ["India", "Remote", "Remote-US", "US"];
const FLAG: FlagKey[] = [
  "core",
  "senior-leaning",
  "stale",
  "marketplace",
  "manager-title",
];

export function JobBoard({
  jobs,
  sweeps,
}: {
  jobs: Job[];
  sweeps: Sweep[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const query = useMemo(
    () => parseBoardQuery(Object.fromEntries(searchParams.entries())),
    [searchParams],
  );

  const visible = useMemo(
    () => filterAndSortJobs(jobs, query),
    [jobs, query],
  );

  const sweepById = useMemo(() => {
    return new Map(sweeps.map((sweep) => [sweep.id, sweep]));
  }, [sweeps]);

  const qs = serializeBoardQuery(query);
  const hasFilters =
    Boolean(query.q) ||
    query.status.length > 0 ||
    query.level.length > 0 ||
    query.location.length > 0 ||
    query.flag.length > 0 ||
    query.sweep.length > 0 ||
    query.sort !== "posted";

  function replaceQuery(next: BoardQuery) {
    const serialized = serializeBoardQuery(next);
    startTransition(() => {
      router.replace(serialized ? `${pathname}?${serialized}` : pathname, {
        scroll: false,
      });
    });
  }

  function toggle<K extends keyof BoardQuery>(
    key: K,
    value: BoardQuery[K] extends (infer I)[] ? I : never,
  ) {
    const current = query[key];
    if (!Array.isArray(current)) return;
    const list = current as unknown as string[];
    const next = list.includes(value as string)
      ? list.filter((item) => item !== value)
      : [...list, value];
    replaceQuery({ ...query, [key]: next });
  }

  return (
    <div>
      <SweepsStrip sweeps={sweeps} jobs={jobs} active={query.sweep} />

      <div className="border-b border-line bg-bg-elev/40 px-3 py-4 sm:px-4">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Search
          </span>
          <Input
            type="search"
            value={query.q}
            onChange={(event) =>
              replaceQuery({ ...query, q: event.target.value })
            }
            placeholder="Company, title, city, source…"
            className="mt-2"
            autoComplete="off"
          />
        </label>

        <div className="mt-4 grid gap-4">
          <FilterGroup label="Status">
            {STATUS.map((value) => (
              <Chip
                key={value}
                active={query.status.includes(value)}
                onClick={() => toggle("status", value)}
              >
                {statusLabel(value)}
              </Chip>
            ))}
          </FilterGroup>
          <FilterGroup label="Level">
            {LEVEL.map((value) => (
              <Chip
                key={value}
                active={query.level.includes(value)}
                onClick={() => toggle("level", value)}
              >
                {levelLabel(value)}
              </Chip>
            ))}
          </FilterGroup>
          <FilterGroup label="Location">
            {LOCATION.map((value) => (
              <Chip
                key={value}
                active={query.location.includes(value)}
                onClick={() => toggle("location", value)}
              >
                {value}
              </Chip>
            ))}
          </FilterGroup>
          <FilterGroup label="Flag">
            {FLAG.map((value) => (
              <Chip
                key={value}
                active={query.flag.includes(value)}
                onClick={() => toggle("flag", value)}
              >
                {flagLabel(value)}
              </Chip>
            ))}
          </FilterGroup>
          <FilterGroup label="Sweep">
            {sweeps.map((sweep) => (
              <Chip
                key={sweep.id}
                active={query.sweep.includes(sweep.id)}
                onClick={() => toggle("sweep", sweep.id)}
              >
                {sweep.label}
              </Chip>
            ))}
          </FilterGroup>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex items-center gap-2 font-mono text-[11px] text-muted">
            <span className="uppercase tracking-[0.16em]">Sort</span>
            <select
              value={query.sort}
              onChange={(event) =>
                replaceQuery({
                  ...query,
                  sort: event.target.value as SortKey,
                })
              }
              className="h-9 rounded-sm border border-line bg-bg px-2 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <option value="posted">Posted date (newest)</option>
              <option value="company">Company</option>
              <option value="salary">Salary INR</option>
              <option value="status">Status</option>
            </select>
          </label>
          {hasFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() =>
                replaceQuery({
                  q: "",
                  status: [],
                  level: [],
                  location: [],
                  flag: [],
                  sweep: [],
                  sort: "posted",
                })
              }
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-3 px-3 py-3 sm:px-4">
        <p className="font-mono text-[12px] text-muted">
          <span className="text-ink">{visible.length}</span> of {jobs.length}{" "}
          roles
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          Row opens detail
        </p>
      </div>

      {visible.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="border-t border-line">
          <JobTableHeader />
          {visible.map((job) => (
            <JobRow
              key={job.slug}
              job={job}
              sweep={sweepById.get(job.sweepId)}
              queryString={qs}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SweepsStrip({
  sweeps,
  jobs,
  active,
}: {
  sweeps: Sweep[];
  jobs: Job[];
  active: string[];
}) {
  return (
    <div className="flex gap-2 overflow-x-auto border-b border-line px-3 py-3 sm:px-4">
      {sweeps.map((sweep) => {
        const count = jobs.filter((job) => job.sweepId === sweep.id).length;
        const isActive = active.includes(sweep.id);
        return (
          <a
            key={sweep.id}
            href={`/sweeps/${sweep.id}`}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-sm border px-3 py-2 font-mono text-[11px] transition-colors",
              isActive
                ? "border-accent bg-accent/10 text-accent"
                : "border-line text-muted hover:border-accent/40 hover:text-ink",
            )}
          >
            <span className="text-ink">{sweep.label}</span>
            <span aria-hidden className="text-line">
              ·
            </span>
            <span>{formatIsoDate(sweep.surfacedAt)}</span>
            <span aria-hidden className="text-line">
              ·
            </span>
            <span>
              {count} {count === 1 ? "role" : "roles"}
            </span>
          </a>
        );
      })}
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        {label}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-sm border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        active
          ? "border-accent bg-accent text-bg"
          : "border-line bg-bg text-muted hover:border-accent/50 hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="mx-3 my-6 rounded-sm border border-dashed border-line px-5 py-14 text-center sm:mx-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
        No contacts
      </p>
      <p className="mt-3 font-serif text-2xl text-ink">
        Nothing on this bearing.
      </p>
      <p className="mx-auto mt-3 max-w-md font-mono text-[12px] leading-relaxed text-muted">
        Clear filters or widen the sweep. Closed roles only appear if a later
        pass marks them that way.
      </p>
    </div>
  );
}
