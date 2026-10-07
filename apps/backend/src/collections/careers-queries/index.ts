import { User } from "payload/generated-types";
import { CollectionConfig } from "payload/types";
import { _getAccess, _isHidden } from "../../helper/access";
import CareersId from "../../components/careers-id";
import { uuid } from "uuidv4";
import CreatedByField from "../../fields/created-by";
import UpdatedByField from "../../fields/updated-by";
import { setUserCreatedOrUpdatedByHook } from "../../hooks/before-change/created-or-updated-by";

const COLLECTION_NAME = "careers-queries";

const CareersQueries: CollectionConfig = {
  slug: COLLECTION_NAME,
  labels: {
    plural: "Queries",
    singular: "Query",
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
      Questions: "Careers",
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
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
    },
    {
      name: "type",
      label: "Type",
      type: "select",
      options: ["Text", "TextArea", "Number", "Dropdown", "File"],
    },
    {
      name: "options",
      label: "Options",
      type: "array",
      fields: [{ name: "title", type: "text" }],
      admin: {
        condition: (_, currentValue, __) => {
          return currentValue ? currentValue.type === "Dropdown" : false;
        },
      },
    },
    {
      name: "file_max_size",
      label: "File Max Size in MB",
      type: "number",
      defaultValue: 3,
      admin: {
        condition: (_, currentValue, __) => {
          return currentValue ? currentValue.type === "File" : false;
        },
      },
    },
    CreatedByField,
    UpdatedByField,
  ],
};

export default CareersQueries;
