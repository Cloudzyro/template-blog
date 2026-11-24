import Image from "next/image";
import { site } from "@/content/site";

export function AuthorCard() {
  return (
    <section aria-labelledby="author-card-title" className="flex flex-col gap-5 rounded-2xl border border-rule bg-paper-2/60 p-6 sm:flex-row sm:p-8 dark:border-night-rule dark:bg-night-2">
      <Image src={site.author.avatar} alt={`Illustration representing ${site.author.name}`} width={72} height={72} className="size-18 shrink-0 rounded-full" />
      <div>
        <p className="text-xs font-medium text-ink-soft dark:text-moon-soft">Written by</p>
        <h2 id="author-card-title" className="mt-1 font-display text-2xl font-medium">
          {site.author.name}
        </h2>
        <p className="mt-2 text-ink-soft dark:text-moon-soft">{site.author.bio[0]}</p>
        <ul className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
          {site.author.links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="text-accent hover:underline dark:text-ember">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
