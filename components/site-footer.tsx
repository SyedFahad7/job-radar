import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 font-mono text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>Job radar · DevRel · maintained by Syed Fahad</p>
        <p>
          Static seed ·{" "}
          <Link href="/sweeps" className="text-ink hover:text-accent">
            sweep history
          </Link>
        </p>
      </div>
    </footer>
  );
}
