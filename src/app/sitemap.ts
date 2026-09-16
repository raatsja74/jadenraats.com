import type { MetadataRoute } from "next";
import { GUIDES } from "@/data/guides";
import { SITE_URL, SITEMAP_ROUTES } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = SITEMAP_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const guideArticles = GUIDES.map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...guideArticles];
}
