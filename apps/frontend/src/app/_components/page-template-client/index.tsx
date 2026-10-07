"use client";

import {
  Career,
  CareersInfoSetting,
  CareersListSetting,
  Page,
} from "@/payload-types";
import {
  BACKEND_LIVE_PREVIEW_API_ROUTE,
  BACKEND_LIVE_PREVIEW_URL,
} from "@/utils/constant";
import { useLivePreview } from "@payloadcms/live-preview-react";
import RendererBlocks from "../blocks/render-blocks";
import { getBgColor } from "@/utils/helpers";

interface PageTemplateProps {
  page: Page | CareersListSetting | CareersInfoSetting;
  jobInfo?: Career;
  className?: string;
}

export default function PageTemplateClient({
  page,
  jobInfo,
  className,
}: PageTemplateProps) {
  const { data: dataPage } = useLivePreview({
    initialData: page,
    serverURL: BACKEND_LIVE_PREVIEW_URL,
    depth: 2,
    apiRoute: BACKEND_LIVE_PREVIEW_API_ROUTE,
  });

  const { data: dataJob } = useLivePreview({
    initialData: jobInfo,
    serverURL: BACKEND_LIVE_PREVIEW_URL,
    depth: 2,
    apiRoute: BACKEND_LIVE_PREVIEW_API_ROUTE,
  });

  const bg = page.bg;
  const { value: bgColor, custom: bgInline, opacity: bgOpacity } = getBgColor(bg);

  return (
    <main
      className={`min-h-screen ${className || ""} ${bgColor || ""} ${bgOpacity}`}
      style={{
        backgroundColor: bgInline,
      }}
    >
      <RendererBlocks blocks={dataPage?.layout || []} jobInfo={dataJob} />
    </main>
  );
}
