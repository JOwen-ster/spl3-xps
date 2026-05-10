import type { NextConfig } from "next";


const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  basePath: isProd ? '/spl3-xps' : '',
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
