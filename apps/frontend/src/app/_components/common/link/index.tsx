"use client";

import { ELEMENT_SIZE, FONTS_STYLES, TEXT_ALIGNMENT } from "@/constant-styles";
import { addAnalytics } from "@/lib/api";
import { BlockLink } from "@/payload-types";
import { OPERATOR } from "@/utils/constant";
import { getFontColor } from "@/utils/helpers";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface LinkProps {
  block: BlockLink;
}

export const Link = ({ block }: LinkProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const operator = OPERATOR;

  const { text_font, text_size, text_alignment, font_bold, font_underline } = block;

  useEffect(() => {
    if (block?.url && router) {
      router.prefetch(block.url);
    }
  }, [block.url, router]);

  const handleClick = async () => {
    try {
      await addAnalytics("click", block?.url || "", {
        buttonId: block?.linkId || "",
        title: block?.title || "",
        url: pathname,
      });
    } catch (error) {
      console.error("Failed to track button click:", error);
    }

    if (block?.url && router) {
      router.push(block.url);
    }
  };

  const { value: fontColor, custom: fontCustomColor } = getFontColor(block?.color);
  const font = FONTS_STYLES[text_font || "primary"];
  const fontSize = ELEMENT_SIZE[text_size || "p"];
  const fontBold = font_bold ? "!font-bold" : "";
  const fontUnderline = font_underline ? "underline" : "";
  const textAlignment = TEXT_ALIGNMENT[text_alignment || "center"];

  switch (operator) {
    case "printemps":
      return (
        <NextLink
          href={block?.url || ""}
          className={`w-full ${font.className} ${fontColor} ${fontSize} ${textAlignment} ${fontBold} ${fontUnderline}`}
          onClick={handleClick}
          style={{ color: fontCustomColor }}
        >
          {block?.title}
        </NextLink>
      );
    case "dohaoasis":
      return (
        <NextLink
          href={block?.url || ""}
          className={`w-full ${font.className} ${fontColor} ${fontSize} ${textAlignment} ${fontBold} ${fontUnderline}`}
          onClick={handleClick}
          style={{ color: fontCustomColor }}
        >
          {block?.title}
        </NextLink>
      );
    default:
      return (
        <NextLink
          href={block?.url || ""}
          className={`w-full ${font.className} ${fontColor} ${fontSize} ${textAlignment} ${fontBold} ${fontUnderline}`}
          onClick={handleClick}
          style={{ color: fontCustomColor }}
        >
          {block?.title}
        </NextLink>
      );
  }
};
