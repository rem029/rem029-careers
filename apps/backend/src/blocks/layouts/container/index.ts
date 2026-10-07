import { Block } from "payload/types";
import { CommonBlocks } from "../../common";
import { SelectDirection } from "../../../fields/select-direction";
import { SelectAlignItems } from "../../../fields/select-align-items";
import { SelectJustifyContent } from "../../../fields/select-justify-content";
import { NumberMargin } from "../../../fields/number-margin";
import { NumberPadding } from "../../../fields/number-padding";
import { NumberGap } from "../../../fields/number-gap";
import { MaxWidth } from "../../../fields/number-max-width";
import { MinHeight } from "../../../fields/number-min-height";
import { SelectBackground } from "../../../fields/select-background";
import { CheckResponsive } from "../../../fields/checkbox-responsive";
import { SelectBorderRadius } from "../../../fields/select-border-radius";

const InnerContainerBlock: Block = {
  slug: "container-inner",
  interfaceName: "BlockContainerInner",
  labels: { plural: "Inner Containers", singular: "Inner Container" },
  fields: [
    {
      name: "innerContainerId",
      type: "text",
      label: "Inner Container Id",
    },
    {
      type: "collapsible",
      label: "Styling",
      admin: { initCollapsed: true },
      fields: [
        {
          type: "row",
          fields: [SelectDirection, SelectAlignItems, SelectJustifyContent],
        },
        SelectBorderRadius,
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
      name: "content",
      label: "Content Blocks",
      type: "blocks",
      blocks: [...CommonBlocks],
    },
  ],
};

const ContainerBlock: Block = {
  slug: "container",
  interfaceName: "BlockContainer",
  labels: { plural: "Containers", singular: "Container" },
  fields: [
    {
      name: "containerId",
      type: "text",
      label: "Container Id",
    },
    {
      type: "collapsible",
      label: "Styling",
      fields: [
        {
          type: "row",
          fields: [SelectDirection, SelectAlignItems, SelectJustifyContent],
        },
        SelectBorderRadius,
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
      name: "content",
      label: "Content Blocks",
      type: "blocks",
      blocks: [...CommonBlocks, InnerContainerBlock],
    },
  ],
};

export default ContainerBlock;
