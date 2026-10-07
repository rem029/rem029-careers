import { fontPrimary, fontSecondary } from "@/app/fonts";
import { Media } from "@/payload-types";
import Image from "next/image";

export interface CarouselCardProps {
  media?: Media;
  title?: string;
  description?: string;
}

export function CarouselCard({ media, title, description }: CarouselCardProps) {
  return (
    <div className="flex flex-col gap-4 max-md:gap-1 max-md:py-1 py-4 items-center justify-center h-full  w-full bg-white border-info border-opacity-10 border-[1px] rounded-md shadow-md">
      {media && (
        <div className="flex flex-1 justify-center items-center">
          <div className="avatar rounded-full overflow-hidden w-52 h-52 max-md:w-24 max-md:h-24 max-sm:w-16 max-sm:h-16 aspect-square">
            <Image
              src={media?.url || ""}
              alt={media?.alt || `carousel_card_img_${media?.id || "image"}`}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col w-full h-full items-center justify-center">
        <h6
          className={`${fontPrimary.className} text-accent font-bold text-lg max-md:text-md max-sm:text-sm`}
        >
          {title || " "}
        </h6>
        <p className={`${fontSecondary.className} text-primary max-md:text-xs`}>
          {description || " "}
        </p>
      </div>
    </div>
  );
}
