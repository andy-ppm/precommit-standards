import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  compress: true,
  poweredByHeader: false,
  reactStrictMode: false,
};

export default nextConfig;
