import { Field } from "payload/types";
import { bgColors } from "../../types";

export const GroupBackgroundOverlay: Field = {
  type: "group",
  label: "Overlay",
  name: "ov",
  admin: {
    condition: (_, data) => {
      return data?.overlay;
    },
  },
  interfaceName: "BackgroundOverlay",
  fields: [
    {
      name: "option",
      type: "select",
      dbName: "opt",
      defaultValue: "solid",
      options: [
        { label: "Solid", value: "solid" },
        { label: "Gradient", value: "gradient" },
      ],
    },
    {
      type: "row",
      admin: {
        condition: (_, data) => {
          return data?.ov?.option === "solid";
        },
      },
      fields: [
        {
          name: "solid_option",
          label: "Color",
          type: "select",
          dbName: "opt_sld",
          defaultValue: "transparent",
          options: bgColors,
        },
        {
          name: "solid_custom",
          type: "text",
          label: "Color (custom)",
          defaultValue: "000000",
          admin: {
            description: "ex. 000000, FFFFFF, FEFEFE, etc...",
            condition: (_, data) => {
              return data?.solid_option === "custom";
            },
          },
        },
        {
          name: "solid_opacity",
          type: "number",
          label: "Opacity",
          defaultValue: 50,
          min: 0,
          max: 100,
        },
      ],
    },
    {
      type: "row",
      admin: {
        condition: (_, data) => {
          return data?.ov?.option === "gradient";
        },
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "gradient_degrees",
              type: "number",
              label: "Degrees",
              defaultValue: 60,
            },
            {
              name: "gradient_from_opacity",
              type: "number",
              label: "Opacity (From) ",
              defaultValue: 0,
              min: 0,
              max: 100,
            },
            {
              name: "gradient_to_opacity",
              type: "number",
              label: "Opacity (To) ",
              defaultValue: 100,
              min: 0,
              max: 100,
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "gradient_from",
              label: "From",
              type: "select",
              dbName: "grdnt_frm",
              defaultValue: "transparent",
              options: bgColors,
            },
            {
              name: "gradient_from_custom",
              type: "text",
              label: "From Color (custom)",
              defaultValue: "000000",
              admin: {
                description: "ex. 000000, FFFFFF, FEFEFE, etc...",
                condition: (_, data) => {
                  return data?.gradient_from === "custom";
                },
              },
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "gradient_to",
              label: "To",
              type: "select",
              dbName: "grdnt_to",
              defaultValue: "transparent",
              options: bgColors,
            },
            {
              name: "gradient_to_custom",
              type: "text",
              label: "To Color (custom)",
              defaultValue: "000000",
              admin: {
                description: "ex. 000000, FFFFFF, FEFEFE, etc...",
                condition: (_, data) => {
                  return data?.gradient_to === "custom";
                },
              },
            },
          ],
        },
      ],
    },
  ],
};
