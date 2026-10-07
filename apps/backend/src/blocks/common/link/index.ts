import { Block } from "payload/types";
import { SelectTextSize } from "../../../fields/select-text-size";
import { SelectTextFont } from "../../../fields/select-text-fonts";
import { SelectTextColor } from "../../../fields/select-text-color";
import { CheckFullWidth } from "../../../fields/checkbox-full-width";
import { SelectTextAlignment } from "../../../fields/select-text-alignment";
import { CheckFontBold } from "../../../fields/checkbox-bold";
import { CheckUnderline } from "../../../fields/checkbox-underline";

const Link: Block = {
  slug: "block-link",
  interfaceName: "BlockLink",
  labels: { plural: "Link", singular: "Links" },
  fields: [
    { name: "title", type: "text", label: "Title" },
    { name: "url", type: "text", label: "URL" },
    { name: "linkId", type: "text", label: "Link ID", required: false },
    {
      type: "collapsible",
      label: "Styling",
      admin: { initCollapsed: true },
      fields: [
        SelectTextColor,
        SelectTextSize,
        SelectTextFont,
        SelectTextAlignment,
        CheckFontBold,
        CheckUnderline,
        CheckFullWidth,
      ],
    },
  ],
};

export default Link;
