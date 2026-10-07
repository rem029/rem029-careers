"use client";

import React, { CSSProperties } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { fontPrimary, fontSecondary } from "@/app/fonts";
import { Button } from "../button";
import { COLORS_TEXT } from "@/constant-styles";
import {
  BlockCarouselV2,
  CarouselV2MediaWithText,
  CarouselV2Text,
  Media,
} from "@/payload-types";
import { getFontColor } from "@/utils/helpers";
import Image from "next/image";

const renderCarouselCardMedia = (items: CarouselV2MediaWithText) => {
  return items?.map((item, idx) => {
    const img = item?.image as Media;
    const btn = item?.button;

    const { value: dividerColor, custom: dividerCustomColor } = getFontColor(
      item?.divider_props?.color,
    );

    return (
      <SwiperSlide
        key={`carousel_item_${idx}`}
        className="!flex justify-center items-center !w-max mb-8 box-border"
      >
        <div className="flex flex-col border-[1px] border-solid border-gray-100 rounded-2xl shadow-md w-[340px] max-md:w-[240px] max-md:h-[420px] h-[536px] overflow-hidden bg-white">
          <div className="relative w-full h-auto aspect-square">
            {item.type === "image" ? (
              <Image
                className="w-full h-auto"
                src={img?.url || ""}
                alt={img?.alt || ""}
                fill
              />
            ) : (
              <video
                className="w-full h-auto aspect-square object-cover"
                src={img?.url || ""}
                autoPlay
                muted
                loop
              />
            )}
          </div>

          {item?.has_divider && (
            <div
              className={`${dividerColor.replace("text", "bg")}`}
              style={{
                backgroundColor: dividerCustomColor,
                width: "100%",
                minHeight: "4px",
                height: "4px",
              }}
            ></div>
          )}

          <div className="flex flex-col p-4 gap-4 text-left w-full h-full">
            <h6
              className={`text-xl max-md:text-lg text-left ${fontPrimary.className} text-primary`}
            >
              {item.title}
            </h6>
            <p
              className={`flex-1 w-full h-full text-lg max-md:text-sm text-left ${fontSecondary.className} text-base-500`}
            >
              {item.sub_title}
            </p>
            {btn && (
              <>
                <Button
                  block={{
                    blockType: "block-button",
                    title: btn?.title,
                    url: btn?.link || "",
                    buttonId: btn?.buttonId,
                    variant: "secondary",
                  }}
                />
              </>
            )}
          </div>
        </div>
      </SwiperSlide>
    );
  });
};

const renderCarouselCardText = (items: CarouselV2Text) => {
  return items?.map((item, idx) => {
    return (
      <SwiperSlide
        key={`carousel_item_${idx}`}
        className="!flex justify-center items-center !w-max mb-8 box-border"
        style={{ width: "max-content" }}
      >
        <div className="flex flex-col border-[1px] border-solid border-gray-100 rounded-2xl shadow-md w-[340px] max-md:w-[240px] max-md:h-[132px] max-h-fit min-h-[196px] overflow-hidden bg-white">
          <div className="flex flex-col p-4 gap-4 text-left w-full h-full">
            <h6
              className={`text-xl max-md:text-lg text-left ${fontPrimary.className} text-primary`}
            >
              {item.title}
            </h6>
            <p
              className={`flex-1 w-full h-full text-lg max-md:text-sm text-left ${fontSecondary.className} text-base-500`}
            >
              {item.sub_title}
            </p>
          </div>
        </div>
      </SwiperSlide>
    );
  });
};

export interface CarouselV2Props {
  block: BlockCarouselV2;
}

const CarouselV2 = ({ block }: CarouselV2Props) => {
  const { media, text_only, type } = block;
  return (
    <div className="w-full h-full">
      <Swiper
        className="w-full h-full max-w-[1440px]"
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        breakpoints={{
          320: {
            slidesPerView: "auto",
            spaceBetween: 4,
            centeredSlides: true,
          },
          768: {
            slidesPerView: "auto",
            spaceBetween: 4,
          },
          1024: {
            slidesPerView: "auto",
            spaceBetween: 8,
            centeredSlides: false,
          },
          1440: {
            slidesPerView: "auto",
            spaceBetween: 8,
            centeredSlides: false,
          },
        }}
        modules={[Pagination, Autoplay]}
        style={
          {
            "--swiper-theme-color": COLORS_TEXT.primary,
          } as CSSProperties
        }
      >
        {type === "media_with_text" && renderCarouselCardMedia(media?.items || [])}
        {type === "text_only" && renderCarouselCardText(text_only?.items || [])}
      </Swiper>
    </div>
  );
};

export default CarouselV2;
