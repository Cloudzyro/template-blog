import type { Metadata } from "next";
import Image from "next/image";
import { Newsletter } from "@/components/Newsletter";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.author.name}, the person behind ${site.name}.`,
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-14 sm:px-8 sm:pt-20">
      <div className="grid gap-10 md:grid-cols-[220px_1fr] md:gap-16">
        <Image src={site.author.avatar} alt={`Illustration representing ${site.author.name}`} width={220} height={220} className="w-40 rounded-full md:w-full" priority />
        <div>
          <p className="text-sm text-accent dark:text-ember">About</p>
          <h1 className="mt-3 font-display text-5xl font-medium tracking-tight sm:text-6xl">{site.author.name}</h1>
          <p className="mt-3 text-ink-soft dark:text-moon-soft">
            {site.author.role}, based in {site.author.location}.
          </p>
          <div className="prose mt-8 max-w-[62ch]">
            {site.author.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ul className="mt-8 flex flex-wrap gap-3">
            {site.author.links.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="inline-flex h-10 items-center rounded-lg border border-rule px-4 text-sm font-medium transition-colors duration-150 hover:border-accent hover:text-accent dark:border-night-rule dark:hover:border-ember dark:hover:text-ember">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-24">
        <Newsletter />
      </div>
    </div>
  );
}
