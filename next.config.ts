import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },
  async rewrites() {
    return [
      {
        source: "/portfolio/:path*",
        destination: "https://jadenraats-portfolio.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
