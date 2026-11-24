import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { formatDate, getAllPosts, getPost } from "@/lib/posts";

// Builds a 1200x630 PNG social card for the home page (home.png) and each post (<slug>.png).
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: "home.png" }, ...getAllPosts().map((p) => ({ slug: `${p.slug}.png` }))];
}

const size = { width: 1200, height: 630 };

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug.replace(/\.png$/, ""));

  if (!post) {
    return new ImageResponse(
      (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#221f1a", padding: 80, color: "#f7f1e6" }}>
          <div style={{ fontSize: 34, color: "#f0745d", fontWeight: 700 }}>{site.name}</div>
          <div style={{ marginTop: 24, fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1 }}>{site.tagline}</div>
        </div>
      ),
      size,
    );
  }

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f7f1e6", padding: 72, color: "#221f1a" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 700 }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, background: "#c23a26", color: "#fff8ee", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {site.name.charAt(0)}
          </div>
          {site.name}
        </div>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1, maxWidth: 1000 }}>{post.title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#5c554a" }}>
          <span>{site.author.name}</span>
          <span>{`${formatDate(post.date)}, ${post.readingMinutes} min read`}</span>
        </div>
      </div>
    ),
    size,
  );
}
