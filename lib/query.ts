import type {
  BoardQuery,
  FlagKey,
  LevelKey,
  LocationTag,
  SortKey,
  StatusKey,
} from "./types";

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
const SORT: SortKey[] = ["posted", "company", "salary", "status"];

function asList(value: string | string[] | undefined): string[] {
  if (!value) return [];
  const raw = Array.isArray(value) ? value.join(",") : value;
  return raw
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function pick<T extends string>(allowed: T[], values: string[]): T[] {
  return values.filter((value): value is T => allowed.includes(value as T));
}

export function parseBoardQuery(
  searchParams: Record<string, string | string[] | undefined>,
): BoardQuery {
  const sortRaw = Array.isArray(searchParams.sort)
    ? searchParams.sort[0]
    : searchParams.sort;
  const qRaw = Array.isArray(searchParams.q)
    ? searchParams.q[0]
    : searchParams.q;

  return {
    q: qRaw?.trim() ?? "",
    status: pick(STATUS, asList(searchParams.status)),
    level: pick(LEVEL, asList(searchParams.level)),
    location: pick(LOCATION, asList(searchParams.location)),
    flag: pick(FLAG, asList(searchParams.flag)),
    sweep: asList(searchParams.sweep),
    sort: SORT.includes(sortRaw as SortKey) ? (sortRaw as SortKey) : "posted",
  };
}

export function serializeBoardQuery(query: BoardQuery): string {
  const params = new URLSearchParams();
  if (query.q) params.set("q", query.q);
  if (query.status.length) params.set("status", query.status.join(","));
  if (query.level.length) params.set("level", query.level.join(","));
  if (query.location.length) params.set("location", query.location.join(","));
  if (query.flag.length) params.set("flag", query.flag.join(","));
  if (query.sweep.length) params.set("sweep", query.sweep.join(","));
  if (query.sort !== "posted") params.set("sort", query.sort);
  return params.toString();
}

export function listHref(query: BoardQuery): string {
  const qs = serializeBoardQuery(query);
  return qs ? `/?${qs}` : "/";
}
