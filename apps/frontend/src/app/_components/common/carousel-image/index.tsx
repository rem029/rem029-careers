import { fontPrimary } from "@/app/fonts";
import Overlay from "../overlay";
import Image from "next/image";
import mime from "mime";

export interface CarouselImageProps {
  imageSrc: string;
  imageAlt: string;
  title?: string;
  description?: string;
  url?: string | null;
}

export function CarouselImage({
  imageSrc,
  imageAlt,
  title,
  description,
  url,
}: CarouselImageProps) {
  let hasCta = false;
  const type = mime.getType(imageSrc) || "image";

  if (title || description || url) hasCta = true;

  return (
    <div className="w-full !h-[100%] relative">
      {type?.includes("video") ? (
        <>
          <video
            className="object-cover w-full h-full shadow-inner-image"
            src={imageSrc}
            width={720}
            height={720}
            autoPlay
            loop
            playsInline
          />
          {hasCta && (
            <Overlay opacityStart="50">
              <div className="w-full h-full flex flex-col gap-2 z-51 px-16 max-md:justify-end max-md:px-4 pb-24 max-md:pb-7">
                <div className="flex-1 max-md:hidden"></div>
                <h6
                  className={`text-secondary max-w-md text-xl max-md:text-lg ${fontPrimary.className}`}
                >
                  {description}
                </h6>
                {title && (
                  <a
                    className="btn btn-primary max-w-md max-md:btn-sm max-md:max-w-[190px]"
                    href={url || "#"}
                  >
                    {title}
                  </a>
                )}
              </div>
            </Overlay>
          )}
        </>
      ) : (
        <>
          <Image
            className="object-cover w-full h-full shadow-inner-image"
            src={imageSrc}
            alt={imageAlt}
            placeholder="empty"
            fill
            loading="eager"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
          />
          {hasCta && (
            <Overlay opacityStart="50">
              <div className="w-full h-full flex flex-col gap-2 z-51 px-16 max-md:justify-end max-md:px-4 pb-24 max-md:pb-7">
                <div className="flex-1 max-md:hidden"></div>
                <h6
                  className={`text-secondary max-w-md text-xl max-md:text-lg ${fontPrimary.className}`}
                >
                  {description}
                </h6>
                {title && (
                  <a
                    className="btn btn-primary max-w-md max-md:btn-sm max-md:max-w-[190px]"
                    href={url || "#"}
                  >
                    {title}
                  </a>
                )}
              </div>
            </Overlay>
          )}
        </>
      )}
    </div>
  );
}
