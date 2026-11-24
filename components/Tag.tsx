import Link from "next/link";
import { slugify } from "@/lib/posts";

export function Tag({ name }: { name: string }) {
  return (
    <Link
      href={`/tags/${slugify(name)}/`}
      className="text-sm text-ink-soft underline decoration-rule underline-offset-4 transition-colors duration-150 hover:text-accent hover:decoration-current dark:text-moon-soft dark:decoration-night-rule dark:hover:text-ember"
    >
      {name}
    </Link>
  );
}
