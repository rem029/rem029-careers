"use client";

import { fontPrimary } from "@/app/fonts";
import { addAnalytics } from "@/lib/api";
import { ButtonBlock } from "@/payload-types";
import { OPERATOR } from "@/utils/constant";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface ButtonProps {
  block: ButtonBlock;
  textSize?: "xs" | "sm" | "lg" | "xl" | "2xl" | "4xl";
  btnSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "4xl";
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | number;
}

const textSizes: Record<NonNullable<ButtonProps["textSize"]>, string[]> = {
  "4xl": ["text-4xl", "max-md:text-2xl"],
  "2xl": ["text-2xl", "max-md:text-xl"],
  xl: ["text-xl", "max-md:text-lg"],
  lg: ["text-lg", "max-md:text-sm"],
  sm: ["text-sm", "max-md:text-xs"],
  xs: ["text-xs", "max-md:text-xs"],
};

const btnSizes: Record<NonNullable<ButtonProps["btnSize"]>, string[]> = {
  "4xl": ["btn-4xl", "max-md:btn-2xl"],
  "2xl": ["btn-2xl", "max-md:btn-xl"],
  xl: ["btn-xl", "max-md:btn-lg"],
  lg: ["btn-lg", "max-md:btn-md"],
  md: ["btn-md", "max-md:btn-sm"],
  sm: ["btn-sm", "max-md:btn-xs"],
  xs: ["btn-xs", "max-md:btn-xs"],
};

const maxWidths: Record<NonNullable<ButtonProps["btnSize"]>, string> = {
  "4xl": "max-w-4xl",
  "2xl": "max-w-2xl",
  xl: "max-w-xl",
  lg: "max-w-lg",
  md: "max-w-md",
  sm: "max-w-sm",
  xs: "max-w-xs",
};

const variants: Record<NonNullable<ButtonBlock["variant"]>, string> = {
  default: "btn-secondary",
  primary: "btn-primary",
  secondary: "btn-secondary",
};

export const Button = ({
  block,
  textSize = "lg",
  btnSize = "md",
  maxWidth = "xs",
}: ButtonProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const operator = OPERATOR;

  useEffect(() => {
    if (block?.url && router) {
      router.prefetch(block.url);
    }
  }, [block.url, router]);

  const _textSize = textSize ? textSizes[textSize].join(" ") : "";
  const _btnSize = btnSize ? btnSizes[btnSize].join(" ") : "btn-lg max-md:btn-sm";
  const _variant = block?.variant ? variants[block.variant] : variants.default;
  const _maxWidth = typeof maxWidth === "number" ? `` : maxWidths[maxWidth];
  const _maxWidthNum = typeof maxWidth === "number" ? maxWidth : undefined;

  const handleClick = async () => {
    try {
      await addAnalytics("click", block?.url || "", {
        buttonId: block?.buttonId || "",
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

  switch (operator) {
    case "printemps":
      return (
        <button
          className={`btn w-full ${fontPrimary.className} ${_maxWidth} ${_variant} ${_textSize} ${_btnSize}`}
          onClick={handleClick}
          style={{ maxWidth: _maxWidthNum }}
        >
          {block?.title}
        </button>
      );
    case "dohaoasis":
      return (
        <button
          className={`btn btn-outline border-2 w-full rounded-full ${fontPrimary.className} ${_maxWidth} ${_variant} ${_textSize} ${_btnSize}`}
          onClick={handleClick}
          style={{ maxWidth: _maxWidthNum }}
        >
          {block?.title}
        </button>
      );
    default:
      return (
        <button
          className={`btn w-full ${fontPrimary.className} ${_maxWidth} ${_variant} ${_textSize} ${_btnSize}`}
          onClick={handleClick}
          style={{ maxWidth: _maxWidthNum }}
        >
          {block?.title}
        </button>
      );
  }
};
