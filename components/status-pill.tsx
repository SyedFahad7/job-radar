import { cn } from "@/lib/utils";
import { statusLabel } from "@/lib/format";
import type { StatusKey } from "@/lib/types";

export function StatusPill({ status }: { status: StatusKey }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em]",
        status === "open" && "border-accent/35 bg-accent/10 text-accent",
        status === "open-stale" && "border-stale/40 bg-stale/10 text-stale",
        status === "closed" && "border-closed/40 bg-closed/10 text-closed",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          status === "open" && "bg-accent",
          status === "open-stale" && "bg-stale",
          status === "closed" && "bg-closed",
        )}
      />
      {statusLabel(status)}
    </span>
  );
}
