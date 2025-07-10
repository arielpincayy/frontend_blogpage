import type { NextConfig } from "next";
import withMDX from "@next/mdx";

const withMDXConfig = withMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // puedes conservar otras configuraciones que ya tengas aquí
};

export default withMDXConfig(nextConfig);