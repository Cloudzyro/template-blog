// Everything about the blog itself lives here: name, author, menu and links.
// Posts live in content/posts as .mdx files.

export const site = {
  name: "Marginalia",
  tagline: "Notes on building for the web, written slowly.",
  description:
    "A small, independent blog about web development, design systems and the craft of shipping software that lasts.",
  // Set this to your real address before you deploy. It's used for RSS, the sitemap and social cards.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  locale: "en-US",
  author: {
    name: "Rowan Ellery",
    role: "Front-end engineer and occasional typesetter",
    location: "Portland, Oregon",
    email: "hello@example.com",
    avatar: "/avatar.svg",
    bio: [
      "I'm a front-end engineer who has spent twelve years building interfaces for small teams, mostly in the space between design and code.",
      "Marginalia is where I write down what I learn: patterns that held up, tools that earned their place, and the occasional mistake worth sharing. New posts arrive roughly once a month.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/" },
      { label: "Mastodon", href: "https://mastodon.social/" },
      { label: "Email", href: "mailto:hello@example.com" },
    ],
  },
  nav: [
    { label: "Writing", href: "/" },
    { label: "Topics", href: "/tags/" },
    { label: "About", href: "/about/" },
  ],
  newsletter: {
    title: "Get new posts by email",
    text: "One email when a new essay is published. No tracking, and you can leave any time.",
  },
};

export type Site = typeof site;
