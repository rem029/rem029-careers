import { Field } from "payload/types";

export const SelectVariant: Field = {
  name: "variant",
  type: "select",
  label: "Variant",
  options: [
    { label: "Default", value: "default" },
    { label: "Primary", value: "primary" },
    { label: "Secondary", value: "secondary" },
  ],
  defaultValue: "default",
};
