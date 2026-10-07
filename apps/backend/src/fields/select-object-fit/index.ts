import { Field } from "payload/types";

export const ObjectFit: Field = {
  name: "object_fit",
  type: "select",
  label: "Object Fit",
  options: [
    { label: "Fill", value: "fill" },
    { label: "Contain", value: "contain" },
    { label: "Cover", value: "cover" },
    { label: "None", value: "none" },
    { label: "Scale down", value: "scale-down" },
  ],
};
