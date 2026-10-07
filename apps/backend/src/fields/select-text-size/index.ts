import { Field } from "payload/types";

export const SelectTextSize: Field = {
  name: "text_size",
  type: "select",
  label: "Text Size",
  options: [
    { label: "H1", value: "h1" },
    { label: "H2", value: "h2" },
    { label: "H3", value: "h3" },
    { label: "H4", value: "h4" },
    { label: "H5", value: "h5" },
    { label: "H6", value: "h6" },
    { label: "paragraph", value: "p" },
  ],
  defaultValue: "p",
};
