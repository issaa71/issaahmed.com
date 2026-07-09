import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // TODO: switch to https://issaahmed.com once the custom domain is wired up
  const base = "https://issaahmed-com.vercel.app";
  const projects = [
    "reclaim",
    "assistive-wheelchair",
    "nba-shot-selection",
    "rideguide",
    "tha-pain-prediction",
    "glenoid-classifier",
    "no-fly-list-kids",
  ];
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...projects.map((slug) => ({
      url: `${base}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
