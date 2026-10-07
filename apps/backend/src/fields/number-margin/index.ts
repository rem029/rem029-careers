import { Field } from "payload/types";

export const NumberMargin: Field = {
  type: "collapsible",
  label: "Margin",
  // admin: { hidden: true },
  fields: [
    {
      type: "group",
      name: "margin_desktop",
      interfaceName: "MarginDesktop",
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
      name: "margin_mobile",
      interfaceName: "MarginMobile",
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
