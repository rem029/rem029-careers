import { Field } from "payload/types";

export const SelectTextAlignment: Field = {
  name: "text_alignment",
  type: "select",
  label: "Text alignment",
  options: [
    { label: "Left", value: "left" },
    { label: "Center", value: "center" },
    { label: "Right", value: "right" },
  ],
  defaultValue: "center",
};
