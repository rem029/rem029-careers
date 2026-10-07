import { Block } from "payload/types";
import { MaxHeight } from "../../../fields/number-max-height";
import { ObjectFit } from "../../../fields/select-object-fit";
import { SelectBorderRadius } from "../../../fields/select-border-radius";

const ImageBlock: Block = {
  slug: "block-image",
  labels: { plural: "Images", singular: "Image" },
  interfaceName: "BlockImage",
  fields: [
    { name: "image", type: "upload", relationTo: "media", required: true },
    {
      type: "collapsible",
      label: "Styling",
      admin: { initCollapsed: true },
      fields: [MaxHeight, ObjectFit, SelectBorderRadius],
    },
  ],
};

export default ImageBlock;
