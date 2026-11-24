import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getAllPosts, getAllTags } from "@/lib/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, site.url).toString();
  const posts = getAllPosts();
  return [
    { url: url("/"), lastModified: posts[0]?.date },
    { url: url("/about/") },
    { url: url("/tags/") },
    ...getAllTags().map((t) => ({ url: url(`/tags/${t.slug}/`) })),
    ...posts.map((p) => ({ url: url(`/posts/${p.slug}/`), lastModified: p.date })),
  ];
}
