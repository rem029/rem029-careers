import { User } from "payload/generated-types";
import { CollectionConfig } from "payload/types";
import { _getAccess, _isHidden } from "../../helper/access";
import CreatedByField from "../../fields/created-by";
import UpdatedByField from "../../fields/updated-by";
import { setUserCreatedOrUpdatedByHook } from "../../hooks/before-change/created-or-updated-by";
import { ADMIN_SUB_ROUTE } from "../../utils/constant";

const COLLECTION_NAME = "media";

const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticURL: `${ADMIN_SUB_ROUTE}/p/${COLLECTION_NAME}`,
    staticDir: "media",
    adminThumbnail: ({ doc }) => `${doc.filename}`,
  },
  access: {
    // read: async ({ req }) => await _getAccess(req, "read"),
    read: () => true,
    create: async ({ req }) => await _getAccess(req, "create"),
    update: async ({ req }) => await _getAccess(req, "update"),
    admin: async ({ req }) => await _getAccess(req, "admin"),
    delete: async ({ req }) => await _getAccess(req, "delete"),
  },
  admin: {
    hidden: ({ user }) => {
      return _isHidden(user as unknown as User, "media");
    },
  },
  hooks: {
    beforeChange: [setUserCreatedOrUpdatedByHook],
  },
  timestamps: true,
  fields: [
    {
      name: "alt",
      type: "text",
    },
    CreatedByField,
    UpdatedByField,
  ],
};

export default Media;
