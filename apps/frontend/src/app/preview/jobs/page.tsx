import {
  fetchCareersInfoSettings,
  fetchCareersJobInfoById,
  fetchCareersListSettings,
} from "@/lib/api";
import { notFound } from "next/navigation";
import PageTemplateClient from "@/app/_components/page-template-client";
import { Career, CareersInfoSetting, CareersListSetting } from "@/payload-types";

export interface PageProps {
  params: { id?: string };
}
export const dynamic = "force-dynamic";
export default async function Page({ params }: PageProps) {
  const { id } = params;
  const pageCareersListSettings = await fetchCareersListSettings();

  if (id) {
    let jobInfo: Career | undefined;
    const pageCareersInfoSettings = await fetchCareersInfoSettings();
    if (id === "test-id") {
      jobInfo = {
        category: 1,
        createdAt: "2024-10-22T18:04:31.894Z",
        updatedAt: "2024-10-22T18:04:31.894Z",
        id: id,
        title: "Testing",
        work_type: 1,
        _status: "published",
      };
    } else {
      jobInfo = await fetchCareersJobInfoById(id);
    }

    if (!jobInfo) return notFound();

    return (
      <PageTemplateClient
        className="flex flex-1 flex-col gap-4"
        page={pageCareersInfoSettings as CareersInfoSetting}
        jobInfo={jobInfo}
      />
    );
  }

  return (
    <PageTemplateClient
      className="flex flex-1 flex-col gap-4"
      page={pageCareersListSettings as CareersListSetting}
    />
  );
}
