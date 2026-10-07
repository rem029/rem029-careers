import { Field } from "payload/types";
import { ObjectFit } from "../select-object-fit";
import { SelectOpacity } from "../select-opacity";
import { bgColorsWithImage } from "../../types";
import { GroupBackgroundOverlay } from "./overlay";

export const SelectBackground: Field = {
  type: "group",
  label: "Background",
  name: "bg",
  interfaceName: "BackgroundColor",
  fields: [
    {
      name: "option",
      type: "select",
      defaultValue: "transparent",
      options: bgColorsWithImage,
    },
    {
      ...SelectOpacity,
      admin: {
        condition: (_, data) => {
          return data?.option !== "transparent";
        },
      },
    },
    {
      name: "color",
      type: "text",
      label: "Color",
      defaultValue: "000000",
      admin: {
        description: "ex. 000000, FFFFFF, FEFEFE, etc...",
        condition: (_, data) => {
          return data?.option === "custom";
        },
      },
    },
    {
      name: "img",
      label: "Image",
      type: "upload",
      relationTo: "media",
      admin: {
        condition: (_, data) => {
          return data?.option === "img";
        },
      },
    },
    {
      type: "collapsible",
      label: "Image Styling",
      fields: [ObjectFit],
      admin: {
        condition: (_, data) => {
          return data?.bg?.option === "img";
        },
      },
    },
    {
      name: "overlay",
      label: "Overlay?",
      type: "checkbox",
      defaultValue: false,
    },
    GroupBackgroundOverlay,
  ],
};
