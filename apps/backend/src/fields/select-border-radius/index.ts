import { Field } from "payload/types";

export const SelectBorderRadius: Field = {
  name: "border_radius",
  type: "group",
  label: "Border Radius",
  interfaceName: "BorderRadius",
  fields: [
    {
      name: "value",
      type: "select",
      label: "Border Radius",
      dbName: "border-radius-value",
      options: [
        {
          label: "Extra Small",
          value: "xs",
        },
        {
          label: "Small",
          value: "sm",
        },
        {
          label: "Medium",
          value: "md",
        },
        {
          label: "Large",
          value: "lg",
        },
        {
          label: "Extra Large",
          value: "xl",
        },
        {
          label: "2x Extra Large",
          value: "2xl",
        },
        {
          label: "3x Extra Large",
          value: "3xl",
        },
        {
          label: "None",
          value: "none",
        },
        {
          label: "Full",
          value: "full",
        },
      ],
      defaultValue: "none",
    },
  ],
};
