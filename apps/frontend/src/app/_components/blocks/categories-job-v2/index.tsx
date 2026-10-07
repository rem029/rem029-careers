"use client";

import { Category, Media } from "@/payload-types";
import { useEffect } from "react";
import { useFetch } from "@/app/_hooks/use-fetch";
import { AUTH_HEADER } from "@/lib/api";
import { BACKEND_URL } from "@/utils/constant";
import { fontPrimary } from "@/app/fonts";
import Image from "next/image";
import Link from "next/link";
import Overlay from "../../common/overlay";
import { TEXT_SIZES } from "@/constant-styles";

export default function CategoriesJobV2() {
  const {
    data: categories,
    loading: categoriesLoading,
    refetch: categoriesRefetch,
  } = useFetch<{ docs: Category[] }>(
    `${BACKEND_URL}/api/category?limit=0&sort=-orderBy`,
    {
      method: "GET",
      headers: { ...AUTH_HEADER },
    },
  );

  useEffect(() => {
    categoriesRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center gap-12">
      {categoriesLoading && (
        <span className="loading loading-dots max-md:loading-sm loading-lg text-info"></span>
      )}
      {!categoriesLoading && (
        <>
          <div className="w-full grid grid-cols-3 gap-4 max-lg:grid-cols-1">
            {categories?.docs?.map((c, idx) => {
              const img = c.image as Media;
              const link = encodeURI(`/jobs?category=${c.title.toLowerCase()}`);
              const title = c?.title;
              const key = `categories_${c?.id || idx}`;

              const hasImg = img !== undefined;
              const bgColor = hasImg ? "" : "bg-[#E9E6DB]";
              const opacityStart = hasImg ? "70" : "0";
              const textSize = TEXT_SIZES["xl"].join(" ");
              const aspectRatio = hasImg ? "aspect-[2/1]" : "aspect-[4/1]";
              const layout = hasImg
                ? "items-end justify-end"
                : "items-center justify-center text-center";

              return (
                <div
                  key={key}
                  className={`${aspectRatio} min-w-60 h-auto rounded-lg overflow-hidden relative shadow-lg ${bgColor}`}
                >
                  {hasImg && (
                    <Image
                      className="absolute left-0 top-0 w-full h-auto object-cover"
                      alt={img?.alt || img?.id?.toString() || ""}
                      src={img?.url || ""}
                      fill
                    />
                  )}

                  <Overlay color="black" opacityStart={opacityStart} opacityEnd="0">
                    <div
                      className={`w-full h-full flex flex-col ${layout} py-4 px-4 box-border`}
                    >
                      {/* {hasImg && <div className="flex-1" />} */}
                      {link ? (
                        <Link
                          href={link}
                          className={`${fontPrimary.className} ${textSize} w-full text-secondary text-lg max-md:text-sm`}
                        >
                          {title}
                        </Link>
                      ) : (
                        <span
                          className={`${fontPrimary.className} ${textSize} w-full text-secondary text-lg max-md:text-sm`}
                        >
                          {title}
                        </span>
                      )}
                    </div>
                  </Overlay>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
