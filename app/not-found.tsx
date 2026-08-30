import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
        404
      </p>
      <h1 className="mt-3 font-serif text-4xl text-ink">Off the scope.</h1>
      <p className="mt-3 font-mono text-[13px] text-muted">
        That role or sweep is not in this seed. It may belong to a later pass.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-sm bg-accent px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-bg"
      >
        Return to index
      </Link>
    </div>
  );
}
