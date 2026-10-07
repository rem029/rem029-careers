import { Block } from "payload/types";
import thumbnail from "../thumbnails/collections.png";

const COLLECTIONS = { pages: "pages", category: "category" };

const Collections: Block = {
  slug: "block-collections",
  imageURL: `${thumbnail}`,
  interfaceName: "BlockCollections",
  labels: { plural: "Collections", singular: "Collections" },
  fields: [
    {
      type: "select",
      name: "collection",
      options: [
        { label: "Pages", value: COLLECTIONS.pages },
        { label: "Categories", value: COLLECTIONS.category },
      ],
    },
    {
      type: "checkbox",
      name: "collection_select_all",
      label: "Include all items?",
    },
    {
      name: "collection_pages",
      label: "Pages",
      type: "relationship",
      hasMany: true,
      relationTo: COLLECTIONS.pages,
      admin: {
        condition: (_, currentValue, __) => {
          return currentValue
            ? currentValue.collection === COLLECTIONS.pages &&
                !currentValue.collection_select_all
            : false;
        },
      },
    },
    {
      name: "collection_categories",
      label: "Categories",
      type: "relationship",
      hasMany: true,
      relationTo: COLLECTIONS.category,
      admin: {
        condition: (_, currentValue, __) => {
          return currentValue
            ? currentValue.collection === COLLECTIONS.category &&
                !currentValue.collection_select_all
            : false;
        },
      },
    },
  ],
};

export default Collections;
