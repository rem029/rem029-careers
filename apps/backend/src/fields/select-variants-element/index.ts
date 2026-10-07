import { Field } from "payload/types";

export const SelectVariantElement: Field = {
  name: "variant_element",
  type: "select",
  label: "Variant Element",
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
