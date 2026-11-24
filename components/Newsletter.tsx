"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";

const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

export function Newsletter() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!endpoint) return;
    const data = new FormData(event.currentTarget);
    setState("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <section aria-labelledby="newsletter-title" className="rounded-2xl bg-ink px-6 py-10 text-paper sm:px-10 dark:bg-night-2 dark:text-moon">
      <div className="grid gap-6 md:grid-cols-2 md:items-center">
        <div>
          <h2 id="newsletter-title" className="font-display text-3xl font-medium tracking-tight">
            {site.newsletter.title}
          </h2>
          <p className="mt-2 text-paper/75 dark:text-moon-soft">{site.newsletter.text}</p>
        </div>
        {endpoint ? (
          state === "done" ? (
            <p className="rounded-2xl bg-paper/10 p-4" role="status">
              Thanks for subscribing. Check your inbox to confirm.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="h-12 min-w-0 flex-1 rounded-lg bg-paper px-5 text-ink placeholder:text-ink-soft/70"
              />
              <button
                type="submit"
                disabled={state === "sending"}
                className="h-12 rounded-lg bg-accent px-6 font-medium text-accent-ink transition-colors duration-150 hover:brightness-110 disabled:opacity-60"
              >
                {state === "sending" ? "Subscribing" : "Subscribe"}
              </button>
              {state === "error" && (
                <p className="text-sm text-ember sm:basis-full" role="alert">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )
        ) : (
          <div className="rounded-2xl border border-paper/15 p-5 text-sm text-paper/80 dark:border-night-rule dark:text-moon-soft">
            <p>The sign-up form isn&apos;t connected yet. Until it is, you can ask to be added by email.</p>
            <a
              href={`mailto:${site.author.email}?subject=${encodeURIComponent("Add me to the newsletter")}`}
              className="mt-4 inline-flex h-11 items-center rounded-lg bg-accent px-5 font-medium text-accent-ink transition-colors duration-150 hover:brightness-110"
            >
              Email {site.author.name.split(" ")[0]}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
