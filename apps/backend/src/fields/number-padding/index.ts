import { Field } from "payload/types";

export const NumberPadding: Field = {
  type: "collapsible",
  label: "Padding",
  // admin: { hidden: true },
  fields: [
    {
      type: "group",
      name: "padding_desktop",
      interfaceName: "PaddingDesktop",
      label: "Desktop",
      fields: [
        {
          type: "row",
          fields: [
            {
              type: "number",
              name: "left",
              label: "Left",

              admin: { description: "px" },
            },
            {
              type: "number",
              name: "top",
              label: "Top",

              admin: { description: "px" },
            },
            {
              type: "number",
              name: "right",
              label: "Right",

              admin: { description: "px" },
            },
            {
              type: "number",
              name: "bottom",
              label: "Bottom",

              admin: { description: "px" },
            },
          ],
        },
      ],
    },
    {
      type: "group",
      name: "padding_mobile",
      interfaceName: "PaddingMobile",
      label: "Mobile",
      fields: [
        {
          type: "row",
          fields: [
            {
              type: "number",
              name: "left",
              label: "Left",

              admin: { description: "px" },
            },
            {
              type: "number",
              name: "top",
              label: "Top",

              admin: { description: "px" },
            },
            {
              type: "number",
              name: "right",
              label: "Right",

              admin: { description: "px" },
            },
            {
              type: "number",
              name: "bottom",
              label: "Bottom",

              admin: { description: "px" },
            },
          ],
        },
      ],
    },
  ],
};
