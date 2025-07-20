"use client";


// Only for visualize drafts and waiting blogs
import { useEffect, useState } from "react";
import { useUser } from "@/components/context/AuthContext";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { mdxComponents } from "@/components/MDXComponents";
import { useParams } from "next/navigation";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";


type PostData = {
  title: string;
  url: string;
};

export default function BlogPost() {
  const { user } = useUser();
  const { id } = useParams();
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult>();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.token) return;

    // Getting post data
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(async res => {
        if (!res.ok) throw new Error("No se pudo cargar el post");
        const data: PostData = await res.json();

        // Getting MDX content from tue URL
        const mdxRes = await fetch(data.url);
        if (!mdxRes.ok) throw new Error("No se pudo cargar el archivo MDX");

        const mdxText = await mdxRes.text();
        const serialized = await serialize(mdxText, {
          mdxOptions:{
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex, rehypePrism]
          }
        });
        setMdxSource(serialized);
      })
      .catch(err => {
        console.error(err);
        setError("Error loading blog.");
      });
  }, [user]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!mdxSource) return <p>Cargando...</p>;

  return (
    <article className="max-w-3xl mx-auto px-6 py-10">
      <MDXRemote {...mdxSource} components={mdxComponents} />
    </article>
  );
}