import { User } from "payload/generated-types";
import { CollectionConfig } from "payload/types";
import { _getAccess, _isHidden } from "../../helper/access";
import { uuid } from "uuidv4";
import { setUserCreatedOrUpdatedByHook } from "../../hooks/before-change/created-or-updated-by";
import CreatedByField from "../../fields/created-by";
import UpdatedByField from "../../fields/updated-by";

const COLLECTION_NAME = "category";

const CareersCategory: CollectionConfig = {
  slug: COLLECTION_NAME,
  labels: {
    plural: "Categories",
    singular: "Category",
  },
  access: {
    read: async ({ req }) => await _getAccess(req, "read"),
    create: async ({ req }) => await _getAccess(req, "create"),
    update: async ({ req }) => await _getAccess(req, "update"),
    admin: async ({ req }) => await _getAccess(req, "admin"),
    delete: async ({ req }) => await _getAccess(req, "delete"),
  },
  timestamps: true,
  admin: {
    useAsTitle: "title",
    hidden: ({ user }) => {
      return _isHidden(user as unknown as User, COLLECTION_NAME);
    },
    group: {
      Categories: "Careers",
    },
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data?.id) {
          const customID = uuid();
          return { ...data, id: customID };
        }
        return data;
      },
    ],
    beforeChange: [setUserCreatedOrUpdatedByHook],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
      admin: { description: "Special characters are not allowed here." },
      validate: (value) => {
        const invalidCharacters = /^[a-zA-Z0-9 ]*$/;
        if (!invalidCharacters.test(value)) {
          return "The text contains invalid characters.";
        }
        return true;
      },
    },
    {
      name: "subtitle",
      label: "Sub Title",
      type: "textarea",
    },
    {
      name: "image",
      label: "Image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "orderBy",
      label: "Order By",
      type: "number",
      min: 1,
      defaultValue: 1,
      admin: {
        description: "This will be the order in which the categories are displayed.",
      },
    },
    CreatedByField,
    UpdatedByField,
  ],
};

export default CareersCategory;
