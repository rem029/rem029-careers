import {
  fetchPageData,
  fetchHomepageData,
  fetchCareersJobInfo,
  fetchPages,
} from "@/lib/api";
import { notFound } from "next/navigation";
import { fontPrimary, fontSecondary } from "../../fonts";
import { BACKEND_URL } from "@/utils/constant";
import { Page as PageType } from "@/payload-types";
import PageTemplateClient from "@/app/_components/page-template-client";

export interface PageProps {
  params: { slug?: string };
}
export const dynamic = "force-dynamic";
export async function generateStaticParams() {
  try {
    const pages = await fetchPages();
    return pages?.map(({ slug }) => slug) || [];
  } catch (error) {
    return [];
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

  return <PageTemplateClient page={pageData} />;
}
