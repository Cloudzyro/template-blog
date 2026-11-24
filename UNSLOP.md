# Unslop pass

Done with the unslop skill (unslop by Damir Sokolovsky, @heydamir, CC BY 4.0) on November 24, 2026.

## Audit

Light slop: a warm, well chosen paper palette and Fraunces headlines, with a layer of common tells.

- Dotted grain wash over the whole home page: `.grain` in `app/globals.css`, `app/page.tsx`
- Uppercase tracked labels: "A journal by Rowan Ellery", "Featured", "Topics", "Written by", "Older", "Newer", "About"
- 600 to 700 weights on every display heading and the logo letter
- Trailing period on the hero headline ("...written slowly.")
- Greeting headline on About ("Hi, I'm Rowan.")
- Tags as outlined pills everywhere; pill nav, search, buttons and links
- Logo as a red letter tile
- Gradient ball and floating dot in the avatar: `public/avatar.svg`
- Hover zoom on the featured cover; `transition` catch-alls; `hover:brightness-110` on buttons
- Centered stacked header on the post page over a left-aligned article
- Italic pull quotes in prose; 650 weight on strong text

## Direction

- Product: Marginalia, Rowan Ellery's small independent blog about web development, design systems and shipping software that lasts
- Character: unhurried, literate, a little dry
- World: a well-read book: cream pages, pencil notes in the margin, one red pencil
- Moments: the post covers, which carry all the color; the featured post on the home page
- Signature: red-pencil margin notes: the post numerals hanging in the list's margin and the red "Featured" note, nowhere else

## Passes

- Spacing: tag rows at an even 12px gap; post header aligned to the article's text column
- Color: grain removed; red kept for the margin numerals, the featured note, links and the one newsletter button; flat avatar
- Icons: search and theme icons unchanged (one set)
- Copy: no trailing period on the headline; About is titled with Rowan's name instead of a greeting
- Type: display headings at 400 to 500, sentence case labels, no italic pull quotes
- Layout: same sections and order; post header left-aligned over the article
- Details: tags as quiet underlined text links, controls at 8px radius, panels at 16px, logo as the wordmark alone
- Visuals: covers unchanged, avatar flattened
- Motion: cover zoom removed; color-only hovers at 150ms

screenshot-2: Post page (Design tokens that survive a redesign). screenshot-3: Article body with headings and code.
