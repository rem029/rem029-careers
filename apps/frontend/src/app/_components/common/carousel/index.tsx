"use client";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./index.css";

import { useMemo, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BlockImageCarousel, Media } from "@/payload-types";
import { CarouselImage } from "../carousel-image";
import { CarouselCard } from "../carousel-card";

export interface CarouselProps {
  block: BlockImageCarousel;
}

const CarouselImages = ({ block }: CarouselProps) => {
  const [showNavigation, setShowNavigation] = useState<boolean>(false);
  const swiperRef = useRef<SwiperRef>(null);

  const onClickNext = () =>
    swiperRef.current && swiperRef.current?.swiper.slideNext();

  const onClickPrev = () =>
    swiperRef.current && swiperRef.current?.swiper.slidePrev();

  const slidesPerView = useMemo(() => {
    let countItems = block?.items?.length || 0 - 1;
    let countSlides = block?.slides_per_view || 1;

    countItems = countItems <= 0 ? 0 : countItems;
    countSlides = countSlides <= 0 ? 0 : countSlides;

    let countReturn = countSlides;

    if (countSlides >= countItems) {
      countReturn = countItems - 2;
    }

    return countReturn;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      onMouseEnter={() => setShowNavigation(true)}
      onMouseLeave={() => setShowNavigation(false)}
      // className={`aspect-video w-full bg-ui-bg-subtle relative min-h-56 ${
      //   block?.variant !== "cards" ? "max-h-[1080px] " : "max-h-[480px]"
      // }`}
      className={`aspect-video w-full relative`}
      style={{
        maxHeight:
          (block?.max_height && block.max_height > 0 && block.max_height) ||
          undefined,
      }}
    >
      {block?.variant === "cards" && (
        <div
          className={`pointer-events-none absolute top-0 left-0 w-full h-full z-99 transition-shadow ${
            showNavigation ? "shadow-inner" : ""
          }`}
        />
      )}

      <button
        className={`absolute left-1 top-[50%] z-[31] translate-y-[50%] transition-opacity ${
          showNavigation ? "opacity-100 translate-x-0" : "opacity-0"
        }`}
        onClick={onClickPrev}
      >
        <FaChevronLeft className="text-lg text-secondary" />
      </button>
      <button
        className={`absolute right-1 top-[50%] z-50 translate-y-[50%] opacity-0 transition-opacity ${
          showNavigation ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClickNext}
      >
        <FaChevronRight className="text-lg text-secondary" />
      </button>
      <Swiper
        className="w-full h-full"
        ref={swiperRef}
        autoplay={
          block?.variant !== "cards" && { delay: 3000, pauseOnMouseEnter: true }
        }
        slidesPerView={slidesPerView}
        spaceBetween={30}
        centeredSlides={block?.variant === "cards" || false}
        loop={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={
          slidesPerView > 1
            ? {
                320: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },

                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },

                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }
            : undefined
        }
        modules={[Pagination, Navigation, Autoplay]}
      >
        {block?.items?.map((item, index) => {
          const image = item.image as Media;

          switch (block?.variant) {
            case "cards": {
              return (
                <SwiperSlide
                  key={`carousel_item_idx_${item?.id || index}`}
                  className={`w-full h-full py-1 px-1 overflow-visible`}
                >
                  <CarouselCard
                    media={image}
                    title={item?.title || undefined}
                    description={item?.description || undefined}
                  />
                </SwiperSlide>
              );
            }
            default:
              return (
                <SwiperSlide
                  key={`carousel_item_idx_${item?.id || index}`}
                  className={`w-full h-full`}
                >
                  <CarouselImage
                    imageSrc={image?.url || ""}
                    imageAlt={image?.alt || ""}
                    description={item?.description || ""}
                    title={item?.title || ""}
                    url={item?.url || ""}
                  />
                </SwiperSlide>
              );
          }
        })}
      </Swiper>
    </div>
  );
};

export default CarouselImages;
