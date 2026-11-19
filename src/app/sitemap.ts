import type { MetadataRoute } from "next";
import { GUIDES } from "@/data/guides";

// Updated by Hark | 2026-11-15: guides in src/data/guides.ts are listed automatically.
// Updated by Hark | 2026-11-19: lastModified is the last real content change, never the
// build time, so search engines trust it. Bump a page's date here when its copy changes.
// Guides use `updated` (or `published`) from src/data/guides.ts.
// /command-center and /resume are noindex and stay out of this file on purpose.

const SITE = "https://jadenraats.com";
const at = (day: string) => new Date(`${day}T00:00:00-07:00`);

const PAGES: { path: string; updated: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "", updated: "2026-11-15", changeFrequency: "monthly", priority: 1 },
  { path: "/guides", updated: "2026-11-15", changeFrequency: "weekly", priority: 0.9 },
  { path: "/systems", updated: "2026-11-15", changeFrequency: "weekly", priority: 0.8 },
  { path: "/prompt-lab", updated: "2026-11-15", changeFrequency: "weekly", priority: 0.8 },
  { path: "/about", updated: "2026-11-15", changeFrequency: "monthly", priority: 0.6 },
  { path: "/daily-note", updated: "2026-11-15", changeFrequency: "monthly", priority: 0.6 },
  { path: "/resources", updated: "2026-11-15", changeFrequency: "monthly", priority: 0.5 },
  { path: "/case-study", updated: "2026-11-15", changeFrequency: "monthly", priority: 0.5 },
  { path: "/capturevault", updated: "2026-11-15", changeFrequency: "monthly", priority: 0.4 },
  { path: "/desk", updated: "2026-11-15", changeFrequency: "daily", priority: 0.4 },
  { path: "/photos", updated: "2026-11-15", changeFrequency: "weekly", priority: 0.4 },
  { path: "/writing", updated: "2026-10-26", changeFrequency: "monthly", priority: 0.6 },
  { path: "/writing/the-singularity-already-started", updated: "2026-11-11", changeFrequency: "monthly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = PAGES.map((page) => ({
    url: `${SITE}${page.path}`,
    lastModified: at(page.updated),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const guides: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: `${SITE}/guides/${guide.slug}`,
    lastModified: at(guide.updated ?? guide.published),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...pages, ...guides];
}
