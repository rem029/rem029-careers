import { Field } from "payload/types";

export const SelectJustifyContent: Field = {
  name: "justify_content",
  dbName: "s_j_c",
  type: "select",
  label: "Justify Content",
  options: [
    {
      label: "Center",
      value: "justify-center",
    },
    {
      label: "Normal",
      value: "justify-normal",
    },
    {
      label: "Start",
      value: "justify-start",
    },
    {
      label: "End",
      value: "justify-end",
    },
    {
      label: "Between",
      value: "justify-between",
    },
    {
      label: "Around",
      value: "justify-around",
    },
    {
      label: "Evenly",
      value: "justify-evenly",
    },
    {
      label: "Stretch",
      value: "justify-stretch",
    },
  ],
  required: false,
  defaultValue: "justify-start",
};
