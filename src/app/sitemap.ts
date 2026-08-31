import type { MetadataRoute } from "next";
import { questions } from "@/data/questions";
import { SITE_URL, questionUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/today`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/reminders`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ...questions.map((question) => ({
      url: questionUrl(question.id),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: question.featured ? 0.9 : 0.7,
    })),
  ];
  return pages;
}
