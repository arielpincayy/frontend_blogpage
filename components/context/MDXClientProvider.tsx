"use client";

import { MDXProvider } from "@mdx-js/react";

const components = {
  h1: (props: any) => <h1 className="text-4xl font-bold my-4 text-center" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-semibold my-3 text-red-600 text-center" {...props} />,
  p: (props: any) => <p className="text-base leading-7 my-2 text-gray-800" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-5 my-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-5 my-2" {...props} />,
  li: (props: any) => <li className="mb-1" {...props} />,
  img: (props: any) => <img className="rounded shadow-md my-4" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4" {...props} />
  ),
  code: (props: any) => <code className="bg-gray-100 px-1 py-0.5 rounded" {...props} />,
};

export function MDXClientProvider({ children }: { children: React.ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}