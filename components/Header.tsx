import Link from "next/link";
import { site } from "@/content/site";
import { Search, type SearchItem } from "./Search";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ searchItems }: { searchItems: SearchItem[] }) {
  return (
    <header className="border-b border-rule dark:border-night-rule">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4 sm:px-8">
        <Link href="/" className="font-display text-xl font-medium tracking-tight">
          {site.name}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 sm:flex">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors duration-150 hover:text-ink dark:text-moon-soft dark:hover:text-moon"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Search items={searchItems} />
          <ThemeToggle />
        </nav>
      </div>
      <nav aria-label="Main (mobile)" className="border-t border-rule sm:hidden dark:border-night-rule">
        <ul className="flex justify-center gap-1 px-4 py-1.5">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="block rounded-lg px-3 py-1.5 text-sm font-medium text-ink-soft dark:text-moon-soft">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
