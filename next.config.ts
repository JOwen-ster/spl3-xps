import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  basePath: '/spl3-xps',
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
