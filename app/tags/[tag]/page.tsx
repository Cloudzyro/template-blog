import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostList } from "@/components/PostList";
import { getAllPosts, getAllTags, slugify, toMeta } from "@/lib/posts";

type Props = { params: Promise<{ tag: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const found = getAllTags().find((t) => t.slug === tag);
  if (!found) return {};
  return {
    title: `Posts about ${found.name}`,
    description: `Every post tagged ${found.name}.`,
    alternates: { canonical: `/tags/${tag}/` },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const found = getAllTags().find((t) => t.slug === tag);
  if (!found) notFound();
  const posts = getAllPosts()
    .filter((p) => p.tags.some((t) => slugify(t) === tag))
    .map(toMeta);

  return (
    <div className="mx-auto max-w-6xl px-5 pt-14 sm:px-8 sm:pt-20">
      <Link href="/tags/" className="text-sm font-semibold text-accent dark:text-ember">
        All topics
      </Link>
      <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-6xl">{found.name}</h1>
      <p className="mb-10 mt-4 text-lg text-ink-soft dark:text-moon-soft">
        {posts.length} {posts.length === 1 ? "post" : "posts"} on this topic.
      </p>
      <PostList posts={posts} />
    </div>
  );
}
