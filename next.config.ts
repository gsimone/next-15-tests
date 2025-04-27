import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // setup raw.githubusercontent.com as a valid domain for next/image
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
};

export default nextConfig;
