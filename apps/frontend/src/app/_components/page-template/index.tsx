import {
  Career,
  CareersInfoSetting,
  CareersListSetting,
  Page,
} from "@/payload-types";
import RendererBlocks from "../blocks/render-blocks";
import { getBgColor } from "@/utils/helpers";

interface PageTemplateProps {
  page: Page | CareersListSetting | CareersInfoSetting;
  jobInfo?: Career;
  className?: string;
}

export default function PageTemplate({
  page,
  jobInfo,
  className,
}: PageTemplateProps) {
  const bg = page?.bg;
  const { value: bgColor, custom: bgInline, opacity: bgOpacity } = getBgColor(bg);

  return (
    <main
      className={`min-h-screen ${className || ""} ${bgColor || ""} ${bgOpacity}`}
      style={{
        backgroundColor: bgInline,
      }}
    >
      <RendererBlocks blocks={page?.layout || []} jobInfo={jobInfo} />
    </main>
  );
}
