import {
  BlockImageCarousel,
  BlockSection,
  BlockHero,
  BlockCareersListing,
  BlockCareersInfo,
  ButtonBlock,
  BlockTextEditor,
  BlockHeading,
  BlockCategories,
  BlockCollections,
  BlockContainer,
  BlockContainerInner,
  BlockCarouselV2,
  BlockSpacer,
  BlockImage,
  BlockEmbed,
  BlockNavigation,
  BlockLink,
  BlockCategoriesV2,
} from "./payload-types";

export interface SectionProps {
  title: string;
  subtitle: string[] | JSX.Element[];
  variant: "default" | "gray";
}

export interface FileWithPayloadID extends File {
  id?: string;
}

export type BlockTypes = (
  | BlockTextEditor
  | BlockHeading
  | BlockImageCarousel
  | BlockSection
  | BlockHero
  | BlockSpacer
  | BlockCareersListing
  | BlockCareersInfo
  | ButtonBlock
  | BlockImage
  | BlockEmbed
  | BlockImageCarousel
  | BlockCategories
  | BlockCategoriesV2
  | BlockCollections
  | BlockContainer
  | BlockContainerInner
  | BlockNavigation
  | BlockCarouselV2
  | BlockLink
)[];
