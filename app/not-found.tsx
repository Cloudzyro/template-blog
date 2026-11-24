import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-28 text-center sm:px-8">
      <p className="font-display text-7xl font-semibold text-accent dark:text-ember">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold">This page wandered off</h1>
      <p className="mt-3 text-ink-soft dark:text-moon-soft">The link may be old, or the post may have moved.</p>
      <Link href="/" className="mt-8 inline-flex h-11 items-center rounded-full bg-accent px-6 font-semibold text-accent-ink">
        Back to all writing
      </Link>
    </div>
  );
}
