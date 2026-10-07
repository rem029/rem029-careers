import { Field } from "payload/types";

export const CheckResponsive: Field = {
  name: "responsive",
  type: "group",
  interfaceName: "CheckResponsive",
  label: "Responsive",
  fields: [
    {
      type: "checkbox",
      name: "show_mobile",
      defaultValue: true,
      label: "Show on mobile?",
    },
    {
      type: "checkbox",
      name: "show_desktop",
      defaultValue: true,
      label: "Show on desktop?",
    },
  ],
};
