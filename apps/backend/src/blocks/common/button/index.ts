import { Block } from "payload/types";
import { SelectVariant } from "../../../fields/select-variants";
import thumbnail from "../../thumbnails/buttons.png";

const Button: Block = {
  slug: "block-button",
  interfaceName: "ButtonBlock",
  imageURL: `${thumbnail}`,
  labels: { plural: "Button", singular: "Buttons" },
  fields: [
    { name: "title", type: "text", label: "Title" },
    { name: "url", type: "text", label: "URL" },
    { name: "buttonId", type: "text", label: "Button ID", required: false },
    {
      type: "collapsible",
      label: "Styling",
      admin: { initCollapsed: true },
      fields: [SelectVariant],
    },
  ],
};

export default Button;
