import { Block } from "payload/types";
import thumbnail from "../thumbnails/categories.png";

const CareerCategories: Block = {
  slug: "block-categories",
  imageURL: `${thumbnail}`,
  interfaceName: "BlockCategories",
  labels: { plural: "Career Categories", singular: "Career Category" },
  fields: [
    {
      name: "show_search",
      type: "checkbox",
      label: "Show search button?",
      admin: { hidden: true },
    },
    {
      name: "show_job_count",
      type: "checkbox",
      label: "Show Job Count?",
      admin: { hidden: true },
    },
  ],
};

export default CareerCategories;
