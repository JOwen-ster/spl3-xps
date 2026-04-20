import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  distDir: "dist",
  basePath: "/spl3-xps",
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
