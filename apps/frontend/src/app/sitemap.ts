import {
  fetchCareersJobInfo,
  fetchCareersListSettings,
  fetchPages,
} from "@/lib/api";
import { FRONTEND_URL } from "@/utils/constant";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await fetchPages();
  const careers = await fetchCareersJobInfo();
  const careersList = await fetchCareersListSettings();

  const pagesMeta: MetadataRoute.Sitemap = pages
    ? pages?.map((p) => ({
        url: FRONTEND_URL + "/" + p.slug,
        lastModified: p.updatedAt,
      }))
    : [];

  const careersMeta: MetadataRoute.Sitemap = careers
    ? careers?.map((c) => ({
        url: FRONTEND_URL + "/jobs/" + c.id,
        lastModified: c.updatedAt,
      }))
    : [];

  return [
    ...pagesMeta,
    {
      url: FRONTEND_URL + "/jobs",
      lastModified: careersList?.updatedAt || undefined,
    },
    ...careersMeta,
  ];
}
