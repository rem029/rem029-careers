import { BlockContainerInner } from "@/payload-types";
import RendererBlocks from "../../../blocks/render-blocks";
import { generateCSSProperties } from "@/utils/helpers";
import { COLORS_BG } from "@/constant-styles";

export interface ContainerInnerProps {
  layout: BlockContainerInner;
}

export default function ContainerInner({ layout }: ContainerInnerProps) {
  const showMobile = layout?.responsive?.show_mobile;
  const showDesktop = layout?.responsive?.show_desktop;

  const displayDesktop = showDesktop ? "!flex" : "!hidden";
  const displayMobile = showMobile ? "max-md:!flex" : "max-md:!hidden";

  const responsiveClassname = `responsive__container__inner-${layout?.id || "0"}-${
    layout?.blockName || "_"
  }`;

  const paddings = generateCSSProperties("padding", {
    desktop: layout?.padding_desktop,
    mobile: layout?.padding_mobile,
  });

  const margin = generateCSSProperties("margin", {
    desktop: layout?.margin_desktop,
    mobile: layout?.margin_mobile,
  });

  return (
    <>
      <style>
        {`
        .${responsiveClassname} {
          ${paddings.desktop.join("\n")}
          ${margin.desktop.join("\n")}
        }

        @media only screen and (max-width: 768px) {
          .${responsiveClassname} {
            ${paddings.mobile.join("\n")}
            ${margin.mobile.join("\n")}
          }
        }
        
        `}
      </style>

      <div
        id={layout?.innerContainerId || undefined}
        className={`${displayDesktop} ${displayMobile} ${responsiveClassname} ${
          layout.direction === "row" ? "flex-row max-md:flex-col" : "flex-col"
        }  ${layout?.align_items || ""} ${layout?.justify_content || ""} ${
          COLORS_BG[layout.bg?.option || ""]
        } flex gap-2 w-full`}
        style={{
          gap: layout?.num_gap || undefined,
          width: (layout?.max_width?.full && "100%") || undefined,
          maxWidth:
            (!layout?.max_width?.full &&
              layout?.max_width?.max &&
              layout?.max_width?.max) ||
            undefined,
          minHeight: (layout?.min_height && layout.min_height) || undefined,
        }}
      >
        <RendererBlocks blocks={layout?.content || []} />
      </div>
    </>
  );
}
