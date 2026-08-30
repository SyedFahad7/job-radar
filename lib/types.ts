export type LocationTag = "India" | "Remote" | "Remote-US" | "US";

export type RawStatus = "OPEN" | "OPEN (STALE)" | "CLOSED";

export type RawFlag =
  | "ok"
  | "senior-leaning"
  | "stale"
  | "marketplace"
  | "manager-title";

export type StatusKey = "open" | "open-stale" | "closed";
export type LevelKey = "intern" | "junior-entry" | "mid";
export type FlagKey =
  | "core"
  | "senior-leaning"
  | "stale"
  | "marketplace"
  | "manager-title";
export type SortKey = "posted" | "company" | "salary" | "status";

export type Sweep = {
  id: string;
  label: string;
  surfacedAt: string;
  windowStart: string | null;
  windowEnd: string;
  notes: string;
};

export type RawJob = {
  title: string;
  company: string;
  level: string;
  location: string;
  locationTag: LocationTag;
  posted: string;
  postedSort: string | null;
  status: RawStatus;
  source: string;
  applyUrl: string;
  evidence: string;
  flag: RawFlag;
  salaryRaw: string;
  salaryInr: string;
  sweepId: string;
};

export type Catalog = {
  fx: {
    usdInr: number;
    note: string;
    asOf: string;
  };
  lastSweepDate: string;
  sweeps: Sweep[];
  jobs: RawJob[];
};

export type Job = RawJob & {
  slug: string;
  statusKey: StatusKey;
  levelKey: LevelKey;
  flagKey: FlagKey;
  salarySort: number | null;
};

export type BoardQuery = {
  q: string;
  status: StatusKey[];
  level: LevelKey[];
  location: LocationTag[];
  flag: FlagKey[];
  sweep: string[];
  sort: SortKey;
};
