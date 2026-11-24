"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

export type SearchItem = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
};

export function Search({ items }: { items: SearchItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    const words = q.split(/\s+/);
    return items.filter((item) => {
      const haystack = `${item.title} ${item.tags.join(" ")} ${item.description}`.toLowerCase();
      return words.every((w) => haystack.includes(w));
    });
  }, [items, query]);

  function open() {
    dialogRef.current?.showModal();
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function close() {
    dialogRef.current?.close();
    setQuery("");
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      const typing = target.closest("input, textarea, [contenteditable=true]");
      if ((event.key === "k" && (event.metaKey || event.ctrlKey)) || (event.key === "/" && !typing)) {
        event.preventDefault();
        open();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="flex h-10 items-center gap-2 rounded-full border border-rule px-3 text-sm text-ink-soft transition hover:border-ink-soft hover:text-ink sm:pr-2 dark:border-night-rule dark:text-moon-soft dark:hover:text-moon"
        aria-label="Search posts"
      >
        <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden rounded-md bg-paper-2 px-1.5 py-0.5 font-mono text-[11px] sm:inline dark:bg-night-2">/</kbd>
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setQuery("")}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="m-auto mt-[12vh] w-[min(640px,calc(100vw-2rem))] rounded-2xl border border-rule bg-paper p-0 text-ink shadow-2xl backdrop:bg-ink/40 backdrop:backdrop-blur-sm dark:border-night-rule dark:bg-night-2 dark:text-moon"
        aria-label="Search posts"
      >
        <div className="flex items-center gap-3 border-b-2 border-rule px-4 focus-within:border-accent dark:border-night-rule dark:focus-within:border-ember">
          <svg className="size-5 shrink-0 text-ink-soft dark:text-moon-soft" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <label htmlFor="search-input" className="sr-only">
            Search by title or topic
          </label>
          <input
            id="search-input"
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or topic"
            className="h-14 w-full bg-transparent text-base outline-none focus-visible:outline-none placeholder:text-ink-soft/70 dark:placeholder:text-moon-soft/70"
            autoComplete="off"
          />
          <button type="button" onClick={close} className="rounded-md px-2 py-1 text-xs text-ink-soft hover:text-ink dark:text-moon-soft dark:hover:text-moon">
            Esc
          </button>
        </div>
        <ul className="max-h-[50vh] overflow-y-auto p-2" aria-live="polite">
          {results.length === 0 && <li className="px-3 py-8 text-center text-sm text-ink-soft dark:text-moon-soft">No posts match &ldquo;{query}&rdquo;.</li>}
          {results.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/posts/${item.slug}/`}
                onClick={close}
                className="block rounded-xl px-3 py-3 transition hover:bg-paper-2 focus-visible:bg-paper-2 dark:hover:bg-night dark:focus-visible:bg-night"
              >
                <span className="block font-display text-lg font-semibold leading-snug">{item.title}</span>
                <span className="mt-1 block text-xs text-ink-soft dark:text-moon-soft">
                  {item.date} &middot; {item.tags.join(", ")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </dialog>
    </>
  );
}
