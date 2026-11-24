import Link from "next/link";
import { slugify } from "@/lib/posts";

export function Tag({ name }: { name: string }) {
  return (
    <Link
      href={`/tags/${slugify(name)}/`}
      className="inline-flex items-center rounded-full border border-rule px-2.5 py-0.5 text-xs font-medium text-ink-soft transition hover:border-accent hover:text-accent dark:border-night-rule dark:text-moon-soft dark:hover:border-ember dark:hover:text-ember"
    >
      {name}
    </Link>
  );
}
