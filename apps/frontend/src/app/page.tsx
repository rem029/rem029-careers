import { fetchPageData, fetchHomepageData, fetchSiteSettings } from "@/lib/api";
import { notFound } from "next/navigation";
import PageTemplate from "./_components/page-template";
import { fontPrimary, fontSecondary } from "./fonts";
import { BACKEND_URL } from "@/utils/constant";
import { Media, Page as PageType } from "@/payload-types";
import { Metadata } from "next";
import { defaultMedata } from "@/utils/metaData";

export interface PageProps {
  params: { slug?: string };
}

export const dynamic = "force-static";
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  try {
    let pageData: PageType | null = null;

    // If the slug is not provided (i.e., homepage)
    if (!slug || slug.length === 0) {
      pageData = await fetchHomepageData();
    } else {
      pageData = await fetchPageData(slug);
    }

    const siteSettings = await fetchSiteSettings();
    const prefixTitle = siteSettings?.seo?.prefix_title || "";
    const suffixTitle = siteSettings?.seo?.suffix_title || "";

    const defaultDescription =
      siteSettings?.seo?.default_description ||
      (defaultMedata.description as string) ||
      "";
    const defaultImage = siteSettings?.seo?.default_image
      ? (siteSettings?.seo?.default_image as Media)?.url || ""
      : "";
    const defaultTitle =
      siteSettings?.seo?.default_title || (defaultMedata.title as string) || "";

    if (!pageData) {
      return {
        title: `${prefixTitle}${defaultTitle}${suffixTitle}`,
        description: defaultDescription,
        openGraph: {
          title: `${prefixTitle}${defaultTitle}${suffixTitle}`,
          description: defaultDescription,
          images: defaultImage,
        },
      };
    }

    const ogImage: Media = pageData.meta?.image as Media;
    const title = pageData?.meta?.title ? pageData?.meta?.title : defaultTitle;
    const description = pageData.meta?.description || defaultDescription;

    return {
      title: `${prefixTitle}${title}${suffixTitle}`,
      description: description,
      openGraph: {
        title: title,
        description: description,
        images: ogImage?.url || defaultImage,
      },
    } as Metadata;
  } catch (error) {
    console.log(
      `generateMetadata.error at ${slug || "empty slug"} returning default metadata`,
      error,
    );
    return defaultMedata as Metadata;
  }
}

export default async function Page({ params }: PageProps) {
  let pageData: PageType | null = null;
  const { slug } = params;

  // If the slug is not provided (i.e., homepage)
  if (!slug || slug.length === 0) {
    pageData = await fetchHomepageData();
    if (!pageData) {
      return (
        <main className="w-full min-h-screen flex flex-col items-center justify-center gap-4">
          <h6 className={`${fontPrimary.className} text-accent text-xl`}>
            Homepage not found.
          </h6>
          <span
            className={`${fontSecondary.className} text-accent font-normal text-md`}
          >
            Please configure&nbsp;
            <a href={`${BACKEND_URL}/admin`} className="underline">
              admin panel.
            </a>
          </span>
        </main>
      );
    }
  } else {
    pageData = await fetchPageData(slug);
    if (!pageData) {
      return notFound();
    }
  }

  return <PageTemplate page={pageData} />;
}
