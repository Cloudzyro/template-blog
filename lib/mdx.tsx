import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/CodeBlock";

export async function renderMDX(source: string) {
  const { content } = await compileMDX({
    source,
    components: { pre: CodeBlock },
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: { light: "github-light", dark: "github-dark-dimmed" },
              keepBackground: false,
              defaultLang: "plaintext",
            },
          ],
        ],
      },
    },
  });
  return content;
}
