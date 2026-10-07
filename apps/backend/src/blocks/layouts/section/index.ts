import { Block } from "payload/types";
import thumbnail from "../../thumbnails/section.png";
import Collections from "../../collections";
import { NumberGap } from "../../../fields/number-gap";
import { CommonBlocks } from "../../common";
import ContainerBlock from "../container";
import { NumberMargin } from "../../../fields/number-margin";
import { NumberPadding } from "../../../fields/number-padding";
import { MaxWidth } from "../../../fields/number-max-width";
import { SelectBackground } from "../../../fields/select-background";
import { MinHeight } from "../../../fields/number-min-height";
import { CheckResponsive } from "../../../fields/checkbox-responsive";
import CareerCategories from "../../categories";
import CareerCategoriesV2 from "../../categories-v2";

const Section: Block = {
  slug: "block-section",
  imageURL: `${thumbnail}`,
  interfaceName: "BlockSection",
  labels: { plural: "Sections", singular: "Section" },
  fields: [
    { name: "title", type: "text", label: "Title", admin: { hidden: true } },
    {
      name: "sectionId",
      type: "text",
      label: "Section Id",
    },
    {
      type: "collapsible",
      label: "Styling",
      admin: { initCollapsed: true },
      fields: [
        SelectBackground,
        MaxWidth,
        MinHeight,
        NumberGap,
        NumberMargin,
        NumberPadding,
        CheckResponsive,
      ],
    },
    {
      name: "show_sub_title",
      type: "checkbox",
      label: "Has subtitle?",
      admin: { hidden: true },
    },
    {
      name: "sub_title",
      type: "richText",
      label: "Sub title",
      admin: {
        hidden: true,
        condition: (_, currentValue, __) => {
          return currentValue ? currentValue.show_sub_title : false;
        },
      },
    },
    {
      name: "block",
      type: "blocks",
      blocks: [
        ...CommonBlocks,
        CareerCategories,
        CareerCategoriesV2,
        Collections,
        ContainerBlock,
      ],
    },
  ],
};

export default Section;
