import { Analytics, User } from "payload/generated-types";
import { CollectionConfig } from "payload/types";
import { _getAccess, _isHidden } from "../../helper/access";

const COLLECTION_NAME = `analytics`;

const Analytics: CollectionConfig = {
  slug: COLLECTION_NAME,
  labels: {
    plural: `Analytics`,
    singular: `Analytic`,
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
    useAsTitle: "eventType",
    hidden: ({ user }) => {
      return _isHidden(user as unknown as User, COLLECTION_NAME);
    },
    group: {
      Analytics: "Admin",
    },
    listSearchableFields: ["eventType", "path", "referrer", "ipAddress"],
  },
  hooks: {
    beforeOperation: [
      async ({ operation, req, args }) => {
        if (operation === "create") {
          const newEntry: Analytics = args.data;

          const ipAddress =
            req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
            req.connection?.remoteAddress ||
            req.ip;

          newEntry.ipAddress = ipAddress;

          args.data = { ...newEntry };
        }

        return args;
      },
    ],
  },
  fields: [
    {
      name: "eventType",
      label: "Event Type",
      type: "select",
      options: [
        { label: "Page View", value: "page_view" },
        { label: "Click", value: "click" },
        { label: "Form Submission", value: "form_submission" }, // Added option
        { label: "Error", value: "error" }, // Added option
      ],
      required: true,
    },
    {
      name: "path",
      label: "Page Path",
      type: "text",
      required: true,
    },
    {
      name: "referrer",
      label: "Referrer",
      type: "text",
    },
    {
      name: "ipAddress",
      label: "IP Address",
      type: "text",
    },
    {
      name: "userAgent",
      label: "User Agent",
      type: "textarea",
      admin: {
        description: "Information about the user's browser and operating system.",
      },
    },
    {
      name: "additionalData",
      label: "Additional Data",
      type: "json",
      admin: {
        description: "Optional extra details related to the event.",
      },
    },
  ],
};

export default Analytics;
