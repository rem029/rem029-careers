import { Field } from "payload/types";

const SelectColorValue: Field = {
  name: "value",
  type: "select",
  label: "Value",
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
};

const CustomColorText: Field = {
  name: "custom",
  type: "text",
  label: "Custom",
  defaultValue: "000000",
  admin: {
    description: "ex. 000000, FFFFFF, FEFEFE, etc...",
    condition: (_, data) => {
      if (data?.color === "custom") return true;
      if (data?.value === "custom") return true;

      return false;
    },
  },
};

export const SelectColor: Field = {
  type: "group",
  label: "Color",
  name: "color",
  interfaceName: "Color",
  fields: [SelectColorValue, CustomColorText],
};

export const SelectColorWithDBName: Field = {
  type: "group",
  label: "Color",
  name: "color",
  interfaceName: "Color",
  fields: [{ ...SelectColorValue, dbName: "select-color-value" }, CustomColorText],
};
