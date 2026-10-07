import { BlockSection, Media } from "@/payload-types";
import RendererBlocks from "../../blocks/render-blocks";
import {
  formatHex,
  generateCSSOverlay,
  generateCSSProperties,
  getBgColor,
} from "@/utils/helpers";
import { OPERATOR } from "@/utils/constant";
import themes from "@/utils/themes";

export default function Section({ layout }: SectionProps) {
  const responsiveClassname = `responsive__${layout?.blockType}-${
    layout?.id || "0"
  }`;

  const paddings = generateCSSProperties("padding", {
    desktop: layout?.padding_desktop,
    mobile: layout?.padding_mobile,
  });

  const margin = generateCSSProperties("margin", {
    desktop: layout?.margin_desktop,
    mobile: layout?.margin_mobile,
  });

  const theme = themes[OPERATOR];

  const width = layout?.max_width || undefined;
  const widthFull = width?.full ? `width: 100%; max-width: 100%;` : "";
  const widthMax = !width?.full
    ? `width: 100%; max-width: ${Number(width?.max)}px;`
    : "";

  const bg = layout?.bg || undefined;

  const {
    value: bgColor,
    opacity: bgOpacity,
    img: bgImg,
    fit: bgFit,
  } = getBgColor(bg);

  const ov = layout?.bg?.overlay ? layout?.bg?.ov : undefined;
  const overlayCSS = ov ? generateCSSOverlay(ov, theme) : "";

  const showMobile = layout?.responsive?.show_mobile;
  const showDesktop = layout?.responsive?.show_desktop;

  const displayDesktop = showDesktop ? "!flex" : "!hidden";
  const displayMobile = showMobile ? "max-md:!flex" : "max-md:!hidden";

  const inlineStyle = `
    .${responsiveClassname} {
        position: relative;        
        box-sizing: border-box;
        ${paddings.desktop.join("\n")}
        ${margin.desktop.join("\n")}
        ${widthFull}
        ${widthMax}        
    }

    .${responsiveClassname}-overlay {
        ${overlayCSS}             
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    @media only screen and (max-width: 768px) {
      .${responsiveClassname} {
          ${paddings.mobile.join("\n")}
          ${margin.mobile.join("\n")}
      }
    }
`;

  return (
    <>
      <style>{inlineStyle}</style>
      <div
        id={layout?.sectionId || undefined}
        className={`relative w-full ${displayDesktop} ${displayMobile} ${bgColor} ${bgOpacity} flex-col items-center justify-center `}
        style={{
          backgroundColor:
            (layout?.bg?.option === "custom" &&
              formatHex(layout?.bg?.color || "")) ||
            undefined,
        }}
      >
        <div className={`${responsiveClassname}-overlay`}></div>
        <div
          className={`${responsiveClassname} [&>*]:z-[2] flex flex-1 flex-col justify-center items-center py-20 px-[72px] max-md:py-16 max-md:px-4 gap-4 max-md:gap-2`}
          style={{
            gap: layout?.num_gap || undefined,
            minHeight: (layout?.min_height && layout.min_height) || undefined,
            backgroundColor:
              (layout?.bg?.option === "custom" &&
                formatHex(layout?.bg?.color || "")) ||
              undefined,
            backgroundImage: bgImg?.url ? `url(${bgImg?.url})` : undefined,
            backgroundSize: bgFit || undefined,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        >
          <RendererBlocks blocks={layout?.block || []} />
        </div>
      </div>
    </>
  );
}

export interface SectionProps {
  layout: BlockSection;
}
