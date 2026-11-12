import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://jadenraats.com/photos", changeFrequency: "weekly", priority: 0.6 },
    {
      url: "https://jadenraats.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://jadenraats.com/writing",
      lastModified: new Date("2026-10-26T00:00:00-07:00"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://jadenraats.com/writing/the-singularity-already-started",
      lastModified: new Date("2026-11-11T00:00:00-08:00"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://jadenraats.com/guides",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://jadenraats.com/systems",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://jadenraats.com/prompt-lab",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://jadenraats.com/daily-note",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://jadenraats.com/resources",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://jadenraats.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://jadenraats.com/case-study",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://jadenraats.com/desk",
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.7,
    },
    {
      url: "https://jadenraats.com/capturevault",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://jadenraats.com/guides/turn-a-messy-note-into-a-next-step",
      lastModified: new Date("2026-11-11T00:00:00-07:00"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://jadenraats.com/guides/noop-whoop-without-subscription",
      lastModified: new Date("2026-10-24T00:00:00-07:00"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://jadenraats.com/guides/write-the-rules-down",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://jadenraats.com/guides/one-front-door",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://jadenraats.com/guides/follow-up-that-survives-monday",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
