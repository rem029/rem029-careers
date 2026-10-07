import { Block } from "payload/types";
import { NumberGap } from "../../../fields/number-gap";
import { CommonBlocks } from "../../common";
import { MaxWidth } from "../../../fields/number-max-width";
import { MinHeight } from "../../../fields/number-min-height";

const Hero: Block = {
  slug: "block-hero",
  interfaceName: "BlockHero",
  labels: { plural: "Hero", singular: "Hero" },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      admin: { hidden: true },
      required: false,
    },
    {
      name: "heroId",
      type: "text",
      label: "Hero Id",
    },
    {
      name: "show_sub_title",
      type: "checkbox",
      label: "Has subtitle?",
      admin: { hidden: true },
      required: false,
    },
    {
      name: "sub_title",
      type: "richText",
      label: "Sub title",
      required: false,

      admin: {
        hidden: true,
        condition: (_, currentValue, __) => {
          return currentValue ? currentValue.show_sub_title : false;
        },
      },
    },
    MaxWidth,
    MinHeight,
    NumberGap,
    {
      name: "block",
      type: "blocks",
      blocks: [...CommonBlocks],
    },
  ],
};

export default Hero;
