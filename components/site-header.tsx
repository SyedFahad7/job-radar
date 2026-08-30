import Link from "next/link";
import { formatIsoDate } from "@/lib/format";

export function SiteHeader({
  lastSweepDate,
  fxNote,
}: {
  lastSweepDate: string;
  fxNote: string;
}) {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <RadarMark />
            <div>
              <Link href="/" className="group inline-block">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
                  Contact board
                </p>
                <h1 className="font-serif text-3xl leading-none tracking-tight text-ink sm:text-4xl">
                  Job radar
                </h1>
              </Link>
              <p className="mt-2 max-w-xl font-mono text-[12px] leading-relaxed text-muted">
                Syed Fahad · intern / junior / mid DevRel. Public sweep log —
                no login, no invented roles.
              </p>
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em]">
            <Link href="/" className="text-ink hover:text-accent">
              Index
            </Link>
            <Link href="/sweeps" className="text-muted hover:text-accent">
              Sweeps
            </Link>
            <a
              href="https://fahads.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent"
            >
              fahads.dev
            </a>
          </nav>
        </div>
        <div className="grid gap-2 border-t border-line/80 pt-4 font-mono text-[11px] text-muted sm:grid-cols-2">
          <p>
            <span className="text-ink/80">Last sweep</span>{" "}
            {formatIsoDate(lastSweepDate)}
          </p>
          <p className="sm:text-right">{fxNote}</p>
        </div>
      </div>
    </header>
  );
}

function RadarMark() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="mt-1 size-10 shrink-0 text-accent"
      aria-hidden
    >
      <circle
        cx="24"
        cy="24"
        r="22"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="1"
      />
      <circle
        cx="24"
        cy="24"
        r="14"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="1"
      />
      <circle
        cx="24"
        cy="24"
        r="6"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.7"
        strokeWidth="1"
      />
      <path
        d="M24 24 L40 14"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="24" cy="24" r="1.8" fill="currentColor" />
    </svg>
  );
}
