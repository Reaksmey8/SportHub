import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { categoriesApi } from "@/services/api/categories";
import { eventsApi } from "@/services/api/events";
import { sportsApi } from "@/services/api/sports";

function getLastModified(value?: string): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const pageUrl = (path: string) => new URL(path, siteUrl.origin).toString();
  const [events, sports, categories] = await Promise.all([
    eventsApi.getEvents(),
    sportsApi.getSports(),
    categoriesApi.getCategories(),
  ]);

  return [
    {
      url: pageUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: pageUrl("/events"),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: pageUrl("/sports"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: pageUrl("/categories"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: pageUrl("/about"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...events
      .filter((event) => event.uuid)
      .map((event) => ({
        url: pageUrl(`/events/${encodeURIComponent(event.uuid)}`),
        lastModified: getLastModified(event.updateAt || event.createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
        ...(event.imageUrls?.length ? { images: event.imageUrls } : {}),
      })),
    ...sports
      .filter((sport) => sport.uuid)
      .map((sport) => ({
        url: pageUrl(`/sports/${encodeURIComponent(sport.uuid)}`),
        lastModified: getLastModified(sport.updateAt || sport.createdAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
        ...(sport.imageUrls?.length ? { images: sport.imageUrls } : {}),
      })),
    ...categories
      .filter((category) => category.uuid)
      .map((category) => ({
        url: pageUrl(`/categories/${encodeURIComponent(category.uuid)}`),
        lastModified: getLastModified(category.updatedAt || category.createdAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
  ];
}
