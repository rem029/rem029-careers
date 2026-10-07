import { BeforeDuplicate, CollectionConfig } from "payload/types";
import { _getAccess, _isHidden } from "../../helper/access";
import { User, UserAccess } from "payload/generated-types";
import payloadConfig from "../../payload.config";
import { DEFAULT_ACCESS } from "../../utils/variables";
import CreatedByField from "../../fields/created-by";
import UpdatedByField from "../../fields/updated-by";
import { setUserCreatedOrUpdatedByHook } from "../../hooks/before-change/created-or-updated-by";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";

const beforeDuplicate: BeforeDuplicate<UserAccess> = ({ data }) => {
  return {
    ...data,
    name: `${data.name} Copy`,
  };
};

const UserAccess: CollectionConfig = {
  slug: "user-access",
  labels: {
    plural: "Access",
    singular: "Access",
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
    useAsTitle: "name",
    hidden: ({ user }) => {
      return _isHidden(user as unknown as User, "user-access");
    },
    group: "Admin",
    hooks: { beforeDuplicate },
  },
  timestamps: true,
  hooks: {
    beforeChange: [setUserCreatedOrUpdatedByHook],
  },
  fields: [
    { name: "name", label: "Name", type: "text", unique: true },
    {
      type: "array",
      name: "access",
      label: "Access",
      admin: {
        components: {
          RowLabel: ({ data, index }: RowLabelArgs) => {
            return data?.name || `Access ${String(index).padStart(2, "0")}`;
          },
        },
      },
      defaultValue: async () => {
        try {
          const collections = (await payloadConfig).collections.map((c) => {
            const config = DEFAULT_ACCESS[c.slug] ? DEFAULT_ACCESS[c.slug] : {};
            return {
              name: c.slug,
              hidden: true,
              ...config,
            };
          });

          const globals = (await payloadConfig).globals.map((g) => {
            const config = DEFAULT_ACCESS[g.slug] ? DEFAULT_ACCESS[g.slug] : {};
            return {
              name: g.slug,
              hidden: true,
              ...config,
            };
          });

          return [...collections, ...globals];
        } catch {
          return undefined;
        }
      },
      fields: [
        { name: "name", label: "Collection name", type: "text" },
        {
          type: "row",
          fields: [
            { type: "checkbox", name: "hidden" },
            { type: "checkbox", name: "read" },
            { type: "checkbox", name: "create" },
            { type: "checkbox", name: "update" },
            { type: "checkbox", name: "admin" },
            { type: "checkbox", name: "delete" },
            { type: "checkbox", name: "access", label: "API Access" },
          ],
        },
      ],
    },
    CreatedByField,
    UpdatedByField,
  ],
};

export default UserAccess;
