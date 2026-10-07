import { fontPrimary, fontSecondary } from "@/app/fonts";
import { Media } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

export interface CardsWithContentProps {
  reverse?: boolean;
  image?: Media;
  slug?: string;
  title?: string;
  description?: string;
}

export function CardsWithContent({
  reverse,
  image,
  slug,
  title,
  description,
}: CardsWithContentProps) {
  return (
    <div
      className={`flex-1 flex !h-[480px] max-lg:items-center  ${
        !reverse ? "flex-row max-lg:flex-col" : "flex-row-reverse max-lg:flex-col"
      }`}
    >
      {image && (
        <div className="aspect-square w-full max-w-[540px] max-lg:max-w-full h-full max-h-[480px] max-md:max-h-[320px] flex justify-center items-center ">
          <Image
            className="flex-1 w-full h-full object-cover rounded-xl rounded-br-[88px] shadow-lg overflow-hidden"
            src={image?.url || ""}
            alt={image?.filename || `block_image_id_${image.id}`}
            width={540}
            height={480}
          />
        </div>
      )}
      <div className="flex-1 flex flex-col w-full h-full gap-4 px-2 py-4 max-lg:gap-2 max-lg:py-4 max-lg:px-1 justify-start">
        <Link
          href={`/${slug}`}
          className={`group/content-item-link ${fontPrimary.className} flex-1 w-full text-secondary text-2xl max-lg:text-xl inline-flex gap-1 items-center`}
        >
          {title}
          <FaLongArrowAltRight className="text-secondary text-sm opacity-0 translate-x-[-10px] group-hover/content-item-link:opacity-80 group-hover/content-item-link:translate-x-0 transition-all" />
        </Link>

        <p
          className={`${fontSecondary.className} flex-1 h-full text-accent text-lg max-lg:text-sm`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
