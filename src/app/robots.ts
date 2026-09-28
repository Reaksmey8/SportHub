import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/auth", "/favorites", "/search"],
    },
    sitemap: new URL("/sitemap.xml", siteUrl.origin).toString(),
  };
}
