import { Block } from "payload/types";
import { SelectTextColor } from "../../../fields/select-text-color";
import { CheckFullWidth } from "../../../fields/checkbox-full-width";
import { SelectTextFont } from "../../../fields/select-text-fonts";

const TextEditor: Block = {
  slug: "block-text-editor",
  interfaceName: "BlockTextEditor",
  //   imageURL: `${thumbnail}`,
  labels: { plural: "Text Editor", singular: "Text Editor's" },
  fields: [
    {
      name: "text",
      type: "richText",
      label: "Text",
      defaultValue: [
        { children: [{ text: "Lorem ipsums lorem ipsums " }], textAlign: "center" },
      ],
    },
    {
      type: "collapsible",
      label: "Styling",
      admin: { initCollapsed: true },
      fields: [CheckFullWidth, SelectTextColor, SelectTextFont],
    },
  ],
};

export default TextEditor;
