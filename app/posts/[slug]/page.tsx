import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthorCard } from "@/components/AuthorCard";
import { Tag } from "@/components/Tag";
import { site } from "@/content/site";
import { renderMDX } from "@/lib/mdx";
import { formatDate, getAllPosts, getPost } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `/posts/${post.slug}/`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [site.author.name],
      tags: post.tags,
      images: [{ url: `/og/${post.slug}.png`, width: 1200, height: 630, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [`/og/${post.slug}.png`] },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const content = await renderMDX(post.body);
  const all = getAllPosts();
  const index = all.findIndex((p) => p.slug === post.slug);
  const newer = all[index - 1];
  const older = all[index + 1];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: site.author.name },
    url: new URL(`/posts/${post.slug}/`, site.url).toString(),
  };

  return (
    <article className="mx-auto max-w-6xl px-5 sm:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="mx-auto max-w-3xl pb-10 pt-14 text-center sm:pt-20">
        <p className="text-sm text-ink-soft dark:text-moon-soft">
          <time dateTime={post.date}>{formatDate(post.date)}</time> &middot; {post.readingMinutes} min read
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">{post.title}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft dark:text-moon-soft">{post.description}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {post.tags.map((t) => (
            <Tag key={t} name={t} />
          ))}
        </div>
      </header>

      {post.cover && (
        <div className="relative mx-auto aspect-[1200/630] max-w-5xl overflow-hidden rounded-3xl border border-rule dark:border-night-rule">
          <Image src={post.cover} alt={post.coverAlt ?? ""} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
        </div>
      )}

      <div className="prose mx-auto mt-14 max-w-[68ch]">{content}</div>

      <div className="mx-auto mt-16 max-w-3xl space-y-10">
        <AuthorCard />
        <nav aria-label="More posts" className="grid gap-4 sm:grid-cols-2">
          {older ? (
            <Link href={`/posts/${older.slug}/`} className="rounded-2xl border border-rule p-5 transition hover:border-accent dark:border-night-rule dark:hover:border-ember">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft dark:text-moon-soft">Older</span>
              <span className="mt-1 block font-display text-lg font-semibold">{older.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link href={`/posts/${newer.slug}/`} className="rounded-2xl border border-rule p-5 text-right transition hover:border-accent dark:border-night-rule dark:hover:border-ember">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft dark:text-moon-soft">Newer</span>
              <span className="mt-1 block font-display text-lg font-semibold">{newer.title}</span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
