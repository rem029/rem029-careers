import { User } from "payload/generated-types";
import { GlobalConfig } from "payload/types";
import { _getAccess, _isHidden } from "../../helper/access";
import UpdatedByField from "../../fields/updated-by";
import { setUserCreatedOrUpdatedByHookGlobal } from "../../hooks/before-change/created-or-updated-by";

const COLLECTION_NAME = "logos";

const LogoGlobal: GlobalConfig = {
  slug: COLLECTION_NAME,
  label: "Logo's",
  access: {
    read: async ({ req }) =>
      await _getAccess(req, "read", undefined, COLLECTION_NAME),
    update: async ({ req }) =>
      await _getAccess(req, "update", undefined, COLLECTION_NAME),
    readVersions: async ({ req }) =>
      await _getAccess(req, "read", undefined, COLLECTION_NAME),
  },
  admin: {
    hidden: ({ user }) => {
      return _isHidden(user as unknown as User, COLLECTION_NAME);
    },
    group: {
      Contents: "Settings",
    },
  },
  hooks: {
    beforeChange: [setUserCreatedOrUpdatedByHookGlobal],
  },
  fields: [
    {
      type: "upload",
      relationTo: "media",
      name: "logo_primary",
      label: "Primary Logo",
    },
    {
      type: "upload",
      relationTo: "media",
      name: "logo_secondary",
      label: "Secondary Logo",
    },
    {
      type: "upload",
      relationTo: "media",
      name: "favicon",
      label: "Favicon",
    },
    UpdatedByField,
  ],
};

export default LogoGlobal;
