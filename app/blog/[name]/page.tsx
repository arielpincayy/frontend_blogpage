import { evaluate } from "next-mdx-remote-client/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import { mdxComponents } from "@/components/MDXComponents";
import BlogHeader from "@/components/BlogHeader";

type Props = {
  params: { name: string };
};

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL; 

export async function generateMetadata({ params }: Props) {
  const {name} = await params;
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/blog/public/${name}`);
  const post = await res.json();

  const { frontmatter } = await evaluate({
    source: post.content,
    options: { parseFrontmatter: true }
  });

  return {
    title: frontmatter.title,
    description: frontmatter.description || "Artículo del blog",
    keywords: frontmatter.keywords,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description || "",
      url: `http:192.168.0.116:3000/blog/${name}`,
      type: "article"
    },
    alternates: {
      canonical: `http:192.168.0.116:3000/blog/${name}`
    }
  };
}

export default async function BlogPage({ params }: Props) {
  const {name} = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/public/${name}`);
  if (!res.ok) throw new Error("No se pudo cargar el post");

  const post = await res.json();

  const { content, frontmatter, error } = await evaluate({
    source: post.content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex, rehypePrism],
      },
      parseFrontmatter: true,
    },
    components: mdxComponents,
  });

  if (error) return <p className="text-red-500">Error al renderizar el blog</p>;

  return (
    <BlogHeader title={frontmatter.title as string} keywords={frontmatter.keywords as string}>
      {content}
    </BlogHeader>
  );
}
