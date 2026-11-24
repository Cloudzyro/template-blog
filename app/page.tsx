import Image from "next/image";
import Link from "next/link";
import { Newsletter } from "@/components/Newsletter";
import { PostList } from "@/components/PostList";
import { Tag } from "@/components/Tag";
import { site } from "@/content/site";
import { formatDate, getAllPosts, getAllTags, toMeta } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts().map(toMeta);
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const recent = posts.filter((p) => p.slug !== featured?.slug);
  const tags = getAllTags();

  return (
    <div>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <section className="pb-12 pt-14 sm:pt-20">
          <p className="text-sm text-accent dark:text-ember">A journal by {site.author.name}</p>
          <h1 className="mt-4 max-w-4xl font-display text-[2.6rem] font-normal leading-[1.05] tracking-[-0.025em] sm:text-6xl lg:text-7xl">
            {site.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-soft dark:text-moon-soft">{site.description}</p>
        </section>

        {featured && (
          <section aria-labelledby="featured-title" className="mb-20">
            <h2 id="featured-title" className="sr-only">
              Featured post
            </h2>
            <article className="group grid overflow-hidden rounded-2xl border border-rule bg-paper shadow-[0_1px_0_rgba(0,0,0,0.04)] md:grid-cols-[1.15fr_1fr] dark:border-night-rule dark:bg-night-2">
              {featured.cover && (
                <Link href={`/posts/${featured.slug}/`} className="relative block aspect-[1200/630] overflow-hidden md:aspect-auto md:min-h-[360px]" tabIndex={-1}>
                  <Image
                    src={featured.cover}
                    alt={featured.coverAlt ?? ""}
                    fill
                    priority
                    sizes="(min-width: 768px) 55vw, 100vw"
                    className="object-cover"
                  />
                </Link>
              )}
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <p className="text-sm text-ink-soft dark:text-moon-soft">
                  <span className="text-accent dark:text-ember">Featured</span> &middot; <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                </p>
                <h3 className="mt-3 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
                  <Link href={`/posts/${featured.slug}/`} className="hover:text-accent dark:hover:text-ember">
                    {featured.title}
                  </Link>
                </h3>
                <p className="mt-4 text-ink-soft dark:text-moon-soft">{featured.description}</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
                  {featured.tags.map((t) => (
                    <Tag key={t} name={t} />
                  ))}
                  <span className="text-sm text-ink-soft dark:text-moon-soft">{featured.readingMinutes} min read</span>
                </div>
              </div>
            </article>
          </section>
        )}

        <div className="grid gap-14 lg:grid-cols-[1fr_260px]">
          <section aria-labelledby="recent-title">
            <h2 id="recent-title" className="mb-6 font-display text-3xl font-medium tracking-tight">
              Recent writing
            </h2>
            <PostList posts={recent} />
          </section>
          <aside className="space-y-10">
            <section aria-labelledby="topics-title">
              <h2 id="topics-title" className="text-sm text-ink-soft dark:text-moon-soft">
                Topics
              </h2>
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                {tags.map((t) => (
                  <Tag key={t.slug} name={t.name} />
                ))}
              </div>
            </section>
            <section aria-labelledby="author-title" className="rounded-2xl border border-rule p-5 dark:border-night-rule">
              <h2 id="author-title" className="sr-only">
                About the author
              </h2>
              <Image src={site.author.avatar} alt={`Illustration representing ${site.author.name}`} width={56} height={56} className="rounded-full" />
              <p className="mt-3 font-display text-lg font-medium">{site.author.name}</p>
              <p className="text-sm text-ink-soft dark:text-moon-soft">{site.author.role}</p>
              <Link href="/about/" className="mt-3 inline-block text-sm font-medium text-accent dark:text-ember">
                More about me
              </Link>
            </section>
          </aside>
        </div>

        <div className="mt-24">
          <Newsletter />
        </div>
      </div>
    </div>
  );
}
