"use client";

import { Menu } from "@/payload-types";
import RendererBlocks from "../blocks/render-blocks";

import {
  BACKEND_LIVE_PREVIEW_URL,
  BACKEND_LIVE_PREVIEW_API_ROUTE,
} from "@/utils/constant";
import { useLivePreview } from "@payloadcms/live-preview-react";

export interface HeaderNewProps {
  menu: Menu;
}

export default function HeaderNew({ menu }: HeaderNewProps) {
  const { data: dataMenu } = useLivePreview({
    initialData: menu,
    serverURL: BACKEND_LIVE_PREVIEW_URL,
    depth: 2,
    apiRoute: BACKEND_LIVE_PREVIEW_API_ROUTE,
  });

  return (
    <header className="relative w-full flex justify-center bg-white shadow-md shadow-neutral">
      <RendererBlocks blocks={dataMenu?.header?.layout} />
    </header>
  );
}
