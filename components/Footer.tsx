import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-rule dark:border-night-rule">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between sm:px-8 dark:text-moon-soft">
        <p>
          &copy; {new Date().getFullYear()} {site.author.name}. {site.tagline}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          <li>
            <a href="/rss.xml" className="hover:text-ink dark:hover:text-moon">
              RSS
            </a>
          </li>
          {site.author.links.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="hover:text-ink dark:hover:text-moon">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
