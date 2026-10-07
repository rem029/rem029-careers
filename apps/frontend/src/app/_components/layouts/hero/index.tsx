import { BlockHero } from "@/payload-types";
import RendererBlocks from "../../blocks/render-blocks";

export default function HeroSection({ layout }: HeroSectionProps) {
  return (
    <div
      id={layout?.heroId || undefined}
      className={`w-full h-auto flex flex-col ${
        layout?.title ? "py-28 max-md:py-8" : ""
      } gap-4`}
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
      <RendererBlocks blocks={layout?.block || []} />
    </div>
  );
}

export interface HeroSectionProps {
  layout: BlockHero;
}
