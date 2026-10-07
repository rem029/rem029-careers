import { Field } from "payload/types";

export const SelectDirection: Field = {
  name: "direction",
  type: "select",
  label: "Direction",
  options: [
    {
      label: "Row",
      value: "row",
    },
    {
      label: "Column",
      value: "column",
    },
  ],
  required: true,
  defaultValue: "column",
};
