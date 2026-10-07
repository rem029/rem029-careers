import { Block } from "payload/types";
import thumbnail from "../../thumbnails/image-carousel.png";
import { MaxHeight } from "../../../fields/number-max-height";

const ImageCarousel: Block = {
  slug: "block-image-carousel",
  labels: { plural: "Image Carousels", singular: "Image Carousel" },
  interfaceName: "BlockImageCarousel",
  imageURL: `${thumbnail}`,
  fields: [
    {
      name: "variant",
      label: "Variant",
      type: "select",
      options: [
        { label: "Images", value: "images" },
        { label: "Custom", value: "cards" },
        { label: "Videos", value: "videos" },
      ],
      defaultValue: "images",
    },
    MaxHeight,
    {
      name: "slides_per_view",
      label: "Slides per view",
      type: "number",
      defaultValue: 1,
    },
    {
      name: "items",
      type: "array",
      interfaceName: "BlockImageCarouselItems",
      labels: { plural: "Items", singular: "Item" },
      fields: [
        { name: "image", type: "upload", relationTo: "media" },
        { name: "title", type: "text", label: "Title" },
        {
          name: "description",
          type: "textarea",
          label: "Description",
        },
        { name: "url", type: "text", label: "URL" },
      ],
    },
  ],
};

export default ImageCarousel;
