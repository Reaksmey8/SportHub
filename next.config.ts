import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sport-api.eunglyzhia.com",
      },
      {
        protocol: "https",
        hostname: "www.khmertimeskh.com",
      },
      {
        protocol: "https",
        hostname: "asianews.network",
      },
      {
        protocol: "https",
        hostname: "english.news.cn",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
