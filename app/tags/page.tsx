import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Topics",
  description: "Browse every post by topic.",
  alternates: { canonical: "/tags/" },
};

export default function TagsPage() {
  const tags = getAllTags();
  return (
    <div className="mx-auto max-w-6xl px-5 pt-14 sm:px-8 sm:pt-20">
      <h1 className="font-display text-5xl font-medium tracking-tight sm:text-6xl">Topics</h1>
      <p className="mt-4 text-lg text-ink-soft dark:text-moon-soft">Every subject I&apos;ve written about, with the number of posts in each.</p>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tags.map((t) => (
          <li key={t.slug}>
            <Link
              href={`/tags/${t.slug}/`}
              className="flex items-baseline justify-between rounded-2xl border border-rule p-6 transition-colors duration-150 hover:border-accent dark:border-night-rule dark:hover:border-ember"
            >
              <span className="font-display text-2xl font-medium">{t.name}</span>
              <span className="text-sm text-ink-soft dark:text-moon-soft">
                {t.count} {t.count === 1 ? "post" : "posts"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
