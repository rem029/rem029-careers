"use client";

import { fontPrimary, fontSecondary } from "@/app/fonts";
import { fetchCategories } from "@/lib/api";

import { Category, Media, MenuItems, Page } from "@/payload-types";
import { OPERATOR } from "@/utils/constant";
import { titleToSlugFormat } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";

export interface RendererMenuItemsProps {
  menuItems?: MenuItems;
  wrapper?: "li";
  location?: "header" | "footer";
}

export function RendererMenuItems({
  menuItems,
  wrapper,
  location = "header",
}: RendererMenuItemsProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  const handleFetchCategories = async () => {
    const items = await fetchCategories();
    setCategories(items || []);
  };

  useEffect(() => {
    handleFetchCategories();
  }, []);

  const WrapperRendererMenuItems = ({
    children,
  }: {
    children?: JSX.Element | JSX.Element[];
  }) => {
    if (wrapper === "li")
      return <li className="flex flex-row w-full">{children}</li>;
    else return <>{children}</>;
  };

  return menuItems?.map((p, index) => {
    const key = `render-menu-items-idx-${p?.id || index}`;

    switch (p.item.type) {
      case "external": {
        const page = p.item?.externalGroup;
        const img = (p?.item?.icon as Media) || undefined;
        return location === "header" ? (
          <WrapperRendererMenuItems key={key}>
            <Link
              href={page?.url || "#"}
              className={`flex flex-row w-full justify-start max-lg:justify-between items-center gap-2 text-md ${fontPrimary.className}`}
            >
              {page?.url_external_title}
              {OPERATOR === "printemps" && (
                <FaChevronRight className="text-xs hidden max-lg:block" />
              )}
            </Link>
          </WrapperRendererMenuItems>
        ) : (
          <WrapperRendererMenuItems key={key}>
            <Link
              href={page?.url || "#"}
              className={`flex flex-row justify-start max-lg:justify-between items-center gap-1 text-xs text-white  ${fontSecondary.className}`}
            >
              {img && (
                <Image
                  alt={img?.alt || "#"}
                  src={img?.url || "#"}
                  width={48}
                  height={48}
                  className="w-6 h-6 aspect-square"
                />
              )}
              {page?.url_external_title}

              {!img && OPERATOR === "printemps" && (
                <FaChevronRight className="text-sm text-white hidden max-lg:block" />
              )}
            </Link>
          </WrapperRendererMenuItems>
        );
      }
      case "internal": {
        const page = p.item?.internalGroup?.page as Page;
        return location === "header" ? (
          <WrapperRendererMenuItems key={key}>
            <Link
              prefetch
              href={"/" + page?.slug || ""}
              className={`flex flex-row justify-start max-lg:justify-between items-center gap-2 text-md ${fontPrimary.className}`}
            >
              {page?.title || ""}
              <FaChevronRight className="text-xs hidden max-lg:block" />
            </Link>
          </WrapperRendererMenuItems>
        ) : (
          <WrapperRendererMenuItems key={key}>
            <Link
              prefetch
              href={"/" + page?.slug || ""}
              className={`flex flex-row justify-start max-lg:justify-between items-center gap-2 text-xs text-white  ${fontSecondary.className}`}
            >
              {page?.title || ""}
              <FaChevronRight className="text-xs text-primary hidden max-lg:block" />
            </Link>
          </WrapperRendererMenuItems>
        );
      }
      case "button": {
        const button = p.item?.buttonGroup;
        return (
          <WrapperRendererMenuItems key={key}>
            <Link
              href={"/jobs"}
              className={`${fontPrimary.className} ${button?.button_style}`}
            >
              {button?.button_text}
            </Link>
          </WrapperRendererMenuItems>
        );
      }
      case "dropdown": {
        return <WrapperRendererMenuItems key={key}></WrapperRendererMenuItems>;
      }
      case "career categories": {
        return categories?.map((c) => (
          <Link
            key={`key-career categories-idx-${c.id}`}
            href={`/jobs?category=${titleToSlugFormat(c?.title || "")}`}
            className={`flex flex-row justify-start max-lg:justify-between items-center gap-2 text-xs text-white  ${fontSecondary.className}`}
          >
            {c?.title || ""}
          </Link>
        ));
      }
      default: {
        return <WrapperRendererMenuItems key={key}></WrapperRendererMenuItems>;
      }
    }
  });
}
