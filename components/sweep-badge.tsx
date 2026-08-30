import Link from "next/link";
import { cn } from "@/lib/utils";

export function SweepBadge({
  id,
  label,
  href,
  className,
}: {
  id: string;
  label: string;
  href?: string;
  className?: string;
}) {
  const content = (
    <>
      <span className="text-accent/70">SW</span>
      <span className="truncate">{label}</span>
    </>
  );

  const classes = cn(
    "inline-flex max-w-full items-center gap-1.5 rounded-sm border border-accent/25 bg-accent/5 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/90",
    href && "transition-colors hover:border-accent/55 hover:text-accent",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} title={id}>
        {content}
      </Link>
    );
  }

  return (
    <span className={classes} title={id}>
      {content}
    </span>
  );
}
