import { Field } from "payload/types";

export const MaxWidth: Field = {
  type: "group",
  name: "max_width",
  interfaceName: "MaxWidth",
  label: "Width",
  fields: [
    { name: "full", type: "checkbox", label: "Full (100%)", defaultValue: true },
    {
      name: "max",
      type: "number",
      defaultValue: 720,
      label: "Max Width (px)",
      admin: {
        condition: (_, data) => {
          return !data.full;
        },
      },
    },
  ],
};
