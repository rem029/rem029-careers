import { Media } from "@/payload-types";
import Link from "next/link";
import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";
import Overlay from "../overlay";
import { fontPrimary } from "@/app/fonts";

export interface CardsWithOverlayContentProps {
  image?: Media;
  link?: string;
  title?: string;
  content?: string | JSX.Element | JSX.Element[];
}

export function CardsWithOverlayContent({
  image,
  link,
  title,
  content,
}: CardsWithOverlayContentProps) {
  return (
    <div className="aspect-square bg-accent min-w-80 h-auto rounded-xl rounded-br-[88px] relative overflow-hidden shadow-lg snap-center">
      {image?.url && (
        <Image
          className="absolute left-0 top-0 aspect-square w-full h-auto object-cover"
          alt={image?.alt || image?.id?.toString() || ""}
          src={image?.url || ""}
          fill
        />
      )}

      <Overlay>
        <div className="w-full h-full flex flex-col bg-accent bg-opacity-25 py-4 px-4">
          <div className="flex-1"></div>
          {link ? (
            <Link
              href={link}
              className={`${fontPrimary.className} w-full text-white text-sm inline-flex gap-1 items-center`}
            >
              {title}
              <FaLongArrowAltRight className="text-white text-xs" />
            </Link>
          ) : (
            <span className="w-full text-primary font-bold text-sm inline-flex gap-1 items-center">
              {title}
            </span>
          )}

          {content}
        </div>
      </Overlay>
    </div>
  );
}
