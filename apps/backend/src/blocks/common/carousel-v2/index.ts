import { Block, Field } from "payload/types";
import { SelectColorWithDBName } from "../../../fields/select-color";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";

const CarouselV2MediaWithText: Field = {
  type: "group",
  name: "media",
  label: "Media with Text",
  admin: {
    condition: (_, data) => {
      return data?.type === "media_with_text";
    },
  },
  fields: [
    {
      type: "array",
      name: "items",
      label: "Items",
      interfaceName: "CarouselV2MediaWithText",
      admin: {
        components: {
          RowLabel: ({ data, index }: RowLabelArgs) => {
            return data?.title || `Item ${String(index).padStart(2, "0")}`;
          },
        },
      },
      fields: [
        {
          type: "select",
          name: "type",
          dbName: "carousel-v2-media-type",
          options: [
            { label: "Image", value: "image" },
            { label: "Video", value: "video" },
            { label: "HTML", value: "html" },
          ],
          defaultValue: "image",
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          admin: {
            condition: (_, data) => {
              return data?.type !== "html";
            },
          },
        },
        {
          name: "html",
          label: "HTML",
          type: "code",
          admin: {
            condition: (_, data) => {
              return data?.type === "html";
            },
          },
        },
        { type: "text", name: "title", label: "Title" },
        { type: "textarea", name: "sub_title", label: "Sub Title" },
        {
          type: "group",
          name: "button",
          fields: [
            { type: "text", name: "title" },
            { type: "text", name: "link" },
            { type: "text", name: "buttonId" },
          ],
        },
        { type: "checkbox", name: "has_divider", label: "Has divider?" },
        {
          type: "group",
          name: "divider_props",
          label: "Divider Styling",
          fields: [SelectColorWithDBName],
          admin: {
            condition: (_, data) => {
              return data?.has_divider;
            },
          },
        },
      ],
    },
  ],
};

const CarouselV2Text: Field = {
  type: "group",
  name: "text_only",
  label: "Text Only",
  admin: {
    condition: (_, data) => {
      return data?.type === "text_only";
    },
  },
  fields: [
    {
      type: "array",
      name: "items",
      label: "Items",
      interfaceName: "CarouselV2Text",
      admin: {
        components: {
          RowLabel: ({ data, index }: RowLabelArgs) => {
            return data?.title || `Item ${String(index).padStart(2, "0")}`;
          },
        },
      },
      fields: [
        { type: "text", name: "title", label: "Title" },
        { type: "textarea", name: "sub_title", label: "Sub Title" },
      ],
    },
  ],
};

const CarouselV2: Block = {
  slug: "carousel-v2",
  labels: { plural: "Carousel V2s", singular: "Carousel V2" },
  interfaceName: "BlockCarouselV2",
  fields: [
    {
      type: "select",
      name: "type",
      dbName: "carousel-v2-type",
      options: [
        { label: "Media with text", value: "media_with_text" },
        { label: "Text only", value: "text_only" },
      ],
    },
    CarouselV2MediaWithText,
    CarouselV2Text,
  ],
};

export default CarouselV2;
