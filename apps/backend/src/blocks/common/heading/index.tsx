import { Block } from "payload/types";
import { SelectTextSize } from "../../../fields/select-text-size";
import { SelectTextAlignment } from "../../../fields/select-text-alignment";
import { CheckFullWidth } from "../../../fields/checkbox-full-width";
import { SelectTextColor } from "../../../fields/select-text-color";
import { CheckFontBold } from "../../../fields/checkbox-bold";
import { SelectVariantElement } from "../../../fields/select-variants-element";

const Heading: Block = {
  slug: "block-heading",
  interfaceName: "BlockHeading",
  //   imageURL: `${thumbnail}`,
  labels: { plural: "Heading", singular: "Heading's" },
  fields: [
    { name: "text", type: "text", label: "Text", defaultValue: "Heading here" },
    {
      type: "collapsible",
      label: "Styling",
      admin: { initCollapsed: true },
      fields: [
        CheckFullWidth,
        CheckFontBold,
        SelectTextAlignment,
        SelectVariantElement,
        SelectTextSize,
        SelectTextColor,
      ],
    },
  ],
};

export default Heading;
