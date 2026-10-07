import { Field } from "payload/types";

export const SelectTextFont: Field = {
  name: "text_font",
  dbName: "t_f",
  type: "select",
  label: "Text Font",
  options: [
    { label: "Default", value: "default" },
    { label: "Primary", value: "primary" },
    { label: "Secondary", value: "secondary" },
  ],
  defaultValue: "default",
};
