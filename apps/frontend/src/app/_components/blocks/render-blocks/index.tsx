import Carousel from "@/app/_components/common/carousel";
import { Career, Media } from "@/payload-types";
import { Fragment, Suspense } from "react";
import HeroSection from "../../layouts/hero";
import Section from "../../layouts/section";
import Careers from "@/app/_components/careers";
import CareersJobDetails from "@/app/_components/careers-job-details";
import { BlockTypes } from "@/types";
import Loading from "../../common/loading";
import Image from "next/image";
import Heading from "../heading";
import CategoriesJob from "../categories-job";
import CollectionsFeature from "../collections-feature";
import TextEditor from "../text-editor";
import Container from "../../layouts/container";
import ContainerInner from "../../layouts/container/inner";
import mime from "mime";
import { Button } from "../../common/button";
import { RendererMenuItemsNew } from "../../renderer-menu-items-new";
import CarouselV2 from "../../common/carousel-v2";
import { Link } from "../../common/link";
import CategoriesJobV2 from "../categories-job-v2";
import { BORDER_RADIUS } from "@/constant-styles";

export interface RendererBlocksProps {
  blocks?: BlockTypes | null;
  jobInfo?: Career;
}

export default function RendererBlocks({
  blocks,
  jobInfo,
}: RendererBlocksProps): JSX.Element[] {
  return (
    blocks?.map((b, index) => {
      const key = `render_block_idx_${b?.id || index}`;
      switch (b.blockType) {
        case "block-careers-listing": {
          return (
            <Suspense
              key={key}
              fallback={
                <div className="w-screen h-screen flex items-center justify-center">
                  <Loading />
                </div>
              }
            >
              <Careers />
            </Suspense>
          );
        }
        case "carousel-v2": {
          return <CarouselV2 key={key} block={b} />;
        }
        case "block-nav": {
          return <RendererMenuItemsNew key={key} menuItems={b?.menu} />;
        }
        case "block-categories": {
          return <CategoriesJob key={key} block={b} />;
        }
        case "categories-v2": {
          return <CategoriesJobV2 key={key} />;
        }
        case "block-collections": {
          return <CollectionsFeature key={key} block={b} />;
        }
        case "block-careers-info": {
          return <CareersJobDetails key={key} jobInfo={jobInfo || ({} as Career)} />;
        }
        case "block-image-carousel": {
          return <Carousel key={key} block={b} />;
        }
        case "block-section": {
          return <Section key={key} layout={b} />;
        }
        case "block-hero": {
          return <HeroSection key={key} layout={b} />;
        }
        case "block-spacer": {
          return (
            <div
              style={{
                width: b.full_width ? "100%" : `${b.num_width}px`,
                height: b.full_height ? "100%" : `${b.num_height}px`,
              }}
            ></div>
          );
        }
        case "container": {
          return <Container key={key} layout={b} />;
        }
        case "container-inner": {
          return <ContainerInner key={key} layout={b} />;
        }
        case "block-image": {
          if (!b?.image) return <></>;

          const image = b.image as Media;
          const type = mime.getType(image?.filename || "") || "";
          const objectFit = b?.object_fit || "contain";
          const maxHeight = b?.max_height;
          const radius = BORDER_RADIUS[b?.border_radius?.value || "none"];

          return (
            <div
              key={key}
              className={`relative top-0 left-0 aspect-video flex items-center justify-center w-full overflow-hidden ${radius}`}
              style={{ maxHeight: maxHeight ? `${maxHeight}px` : undefined }}
            >
              {type.includes("video") ? (
                <video
                  className={`aspect-video w-full h-full object-${objectFit}`}
                  src={image?.url || ""}
                  autoPlay
                  loop
                  playsInline
                  controls
                  style={{ objectFit: objectFit }}
                />
              ) : (
                <Image
                  className="w-full h-auto object-cover"
                  src={image?.url || ""}
                  alt={image?.filename || `block_image_id_${image?.id}`}
                  fill
                  placeholder="empty"
                  style={{ objectFit: objectFit }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
                />
              )}
            </div>
          );
        }
        case "block-embed": {
          return (
            <div
              key={key}
              className="w-full h-auto"
              dangerouslySetInnerHTML={{ __html: b.code }}
            />
          );
        }
        case "block-link": {
          return <Link key={key} block={b} />;
        }
        case "block-button": {
          return <Button key={key} block={b} />;
        }
        case "block-text-editor": {
          return <TextEditor key={key} block={b} />;
        }
        case "block-heading": {
          return <Heading block={b} />;
        }
        default: {
          return <Fragment key={`block_idx${index}`}></Fragment>;
        }
      }
    }) || []
  );
}
