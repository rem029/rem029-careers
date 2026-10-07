import { Field } from "payload/types";

export const SelectAlignItems: Field = {
  name: "align_items",
  dbName: "s_a_i",
  type: "select",
  label: "Align Items",
  options: [
    {
      label: "Start",
      value: "items-start",
    },
    {
      label: "End",
      value: "items-end",
    },
    {
      label: "Center",
      value: "items-center",
    },
    {
      label: "Baseline",
      value: "items-baseline",
    },
    {
      label: "Stretch",
      value: "items-stretch",
    },
  ],
  required: false,
  defaultValue: "items-start",
};
