import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/posts";
import { Tag } from "./Tag";

export function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <ol className="divide-y divide-rule border-y border-rule dark:divide-night-rule dark:border-night-rule">
      {posts.map((post, i) => (
        <li key={post.slug} className="grid gap-3 py-7 sm:grid-cols-[4rem_1fr_auto] sm:gap-6">
          <span className="font-display text-2xl text-accent/80 tabular-nums dark:text-ember/80" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-display text-2xl font-medium leading-snug tracking-tight">
              <Link href={`/posts/${post.slug}/`} className="hover:text-accent dark:hover:text-ember">
                {post.title}
              </Link>
            </h3>
            <p className="mt-2 max-w-2xl text-ink-soft dark:text-moon-soft">{post.description}</p>
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
              {post.tags.map((t) => (
                <Tag key={t} name={t} />
              ))}
            </div>
          </div>
          <p className="text-sm text-ink-soft sm:text-right dark:text-moon-soft">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <br />
            {post.readingMinutes} min read
          </p>
        </li>
      ))}
    </ol>
  );
}
