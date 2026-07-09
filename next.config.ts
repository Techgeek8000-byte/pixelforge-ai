import type { NextConfig } from "next";

const projectRoot = import.meta.dirname!;

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  turbopack: { root: projectRoot },
};

export default nextConfig;