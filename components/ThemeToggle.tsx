"use client";

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const dark = !root.classList.contains("dark");
    root.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      /* storage can be unavailable; the toggle still works for this visit */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="grid size-10 place-items-center rounded-lg text-ink-soft transition-colors duration-150 hover:bg-paper-2 hover:text-ink dark:text-moon-soft dark:hover:bg-night-2 dark:hover:text-moon"
      aria-label="Toggle dark mode"
    >
      <svg className="size-5 dark:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" strokeLinejoin="round" />
      </svg>
      <svg className="hidden size-5 dark:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
      </svg>
    </button>
  );
}

// Runs before the page paints, so there's no flash of the wrong theme.
export const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}})()`;
