import { Field } from "payload/types";

export const SelectTextColor: Field = {
  type: "group",
  label: "Text",
  name: "color",
  interfaceName: "TextColor",
  fields: [
    {
      name: "value",
      type: "select",
      label: "Text color",
      options: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
        { label: "Success", value: "success" },
        { label: "Warning", value: "warning" },
        { label: "Information", value: "information" },
        { label: "Error", value: "error" },
        { label: "Accent", value: "accent" },
        { label: "Custom", value: "custom" },
      ],
      defaultValue: "primary",
    },
    {
      name: "custom",
      type: "text",
      label: "Custom color",
      defaultValue: "000000",
      admin: {
        description: "ex. 000000, FFFFFF, FEFEFE, etc...",
        condition: (_, data) => {
          if (data?.color === "custom") return true;
          if (data?.value === "custom") return true;

          return false;
        },
      },
    },
  ],
};
