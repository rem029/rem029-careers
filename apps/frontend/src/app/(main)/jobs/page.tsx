import {
  fetchCareersInfoSettings,
  fetchCareersJobInfoById,
  fetchCareersListSettings,
  fetchSiteSettings,
} from "@/lib/api";
import { notFound } from "next/navigation";
import PageTemplate from "../../_components/page-template";
import { CareersInfoSetting, CareersListSetting, Media } from "@/payload-types";
import { defaultMedata } from "@/utils/metaData";
import { Metadata } from "next";

export interface PageProps {
  params: { id?: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = params;
  try {
    let metaTitle: string = "";
    let metaDescription: string = "";
    let metaImgUrl: string = "";

    const siteSettings = await fetchSiteSettings();
    const prefixTitle = siteSettings?.seo?.prefix_title || "";
    const suffixTitle = siteSettings?.seo?.suffix_title || "";
    const defaultTitle =
      siteSettings?.seo?.default_title || (defaultMedata.title as string) || "";
    const defaultDescription =
      siteSettings?.seo?.default_description ||
      (defaultMedata.description as string) ||
      "";
    const defaultImage = siteSettings?.seo?.default_image
      ? (siteSettings?.seo?.default_image as Media)?.url || ""
      : "";

    if (!id) {
      const careerListSettings = await fetchCareersListSettings();
      const title = careerListSettings?.meta?.title
        ? careerListSettings?.meta?.title || ""
        : defaultTitle;
      const description =
        careerListSettings?.meta?.description || defaultDescription;

      metaTitle = `${prefixTitle}${title}${suffixTitle}`;
      metaDescription = description;
      metaImgUrl = (careerListSettings?.meta?.image as Media)?.url || defaultImage;
    } else {
      const careerData = await fetchCareersJobInfoById(id || "");

      const title = careerData?.meta?.title
        ? careerData?.meta?.title || ""
        : defaultTitle;
      const description = careerData?.meta?.description || defaultDescription;

      metaTitle = `${prefixTitle}${title}${suffixTitle}`;
      metaDescription = description;
      metaImgUrl = (careerData?.meta?.image as Media)?.url || defaultImage;
    }

    return {
      title: metaTitle,
      description: metaDescription,
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        images: metaImgUrl,
      },
    } as Metadata;
  } catch (error) {
    console.log(
      `generateMetadata.error for jobs at ${
        id || "empty id"
      } returning default metadata`,
      error,
    );
    return defaultMedata as Metadata;
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = params;

  if (id) {
    const pageCareersInfoSettings = await fetchCareersInfoSettings();
    const jobInfo = await fetchCareersJobInfoById(id);
    if (!jobInfo) return notFound();

    return (
      <PageTemplate
        className="flex flex-1 flex-col gap-4"
        page={pageCareersInfoSettings as CareersInfoSetting}
        jobInfo={jobInfo}
      />
    );
  } else {
    const pageCareersListSettings = await fetchCareersListSettings();
    return (
      <PageTemplate
        className="flex flex-1 flex-col gap-4"
        page={pageCareersListSettings as CareersListSetting}
      />
    );
  }
}
