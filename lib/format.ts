import type { FlagKey, LevelKey, StatusKey } from "./types";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatIsoDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

export function formatPosted(
  postedSort: string | null,
  posted: string,
): { compact: string; full: string } {
  if (!postedSort) {
    return { compact: "Undated", full: posted };
  }
  return { compact: formatIsoDate(postedSort), full: posted };
}

export function statusLabel(key: StatusKey): string {
  if (key === "open") return "Open";
  if (key === "open-stale") return "Open stale";
  return "Closed";
}

export function levelLabel(key: LevelKey): string {
  if (key === "intern") return "Intern";
  if (key === "junior-entry") return "Junior-entry";
  return "Mid";
}

export function flagLabel(key: FlagKey): string {
  if (key === "core") return "core";
  if (key === "senior-leaning") return "senior-leaning";
  if (key === "manager-title") return "manager-title";
  return key;
}

export function windowLabel(
  windowStart: string | null,
  windowEnd: string,
): string {
  if (!windowStart) {
    return `All open listings as of ${formatIsoDate(windowEnd)}`;
  }
  return `${formatIsoDate(windowStart)} → ${formatIsoDate(windowEnd)}`;
}
