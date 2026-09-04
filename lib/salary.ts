/** Convert a seed `salaryInr` string into an annual-INR sort key. Unknown → null. */
export function salarySortValue(salaryInr: string | null | undefined): number | null {
  if (salaryInr == null) return null;
  const text = salaryInr.trim();
  if (!text || /^not listed/i.test(text)) return null;
  if (/^unpaid$/i.test(text)) return 0;

  const match = text.match(
    /₹\s*([\d,.]+)\s*(Cr|LPA|L)?(?:\/(hr|mo))?/i,
  );
  if (!match) return null;

  const amount = Number(match[1].replace(/,/g, ""));
  if (Number.isNaN(amount)) return null;

  const unit = (match[2] ?? "").toLowerCase();
  const period = (match[3] ?? "").toLowerCase();

  let value = amount;
  if (unit === "cr") value *= 10_000_000;
  else if (unit === "l" || unit === "lpa") value *= 100_000;

  if (period === "mo") value *= 12;
  if (period === "hr") value *= 2080;

  return value;
}
