import { User } from "payload/generated-types";
import { GlobalConfig } from "payload/types";
import { _getAccess, _isHidden } from "../../helper/access";
import { revalidatePages } from "./hooks/revalidate";

const COLLECTION_NAME = "careers-site-settings";

const SiteSettingsGlobal: GlobalConfig = {
  slug: COLLECTION_NAME,
  label: "Site",
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
    group: "Settings",
  },
  fields: [
    {
      type: "group",
      name: "seo",
      label: "SEO",
      fields: [
        {
          type: "text",
          name: "prefix_title",
          label: "Prefix Meta Title",
          admin: {
            description:
              "The prefix added at the beginning of meta title ex: <prefix> - Title",
          },
        },
        {
          type: "text",
          name: "suffix_title",
          label: "Suffix Meta Title",
          admin: {
            description:
              "The suffix added at the end of meta title ex: Title - <suffix>",
          },
        },
        {
          type: "text",
          name: "default_title",
          label: "Default Title",
          admin: {
            description: "The default meta title if no title is set",
          },
          defaultValue: "Webpage",
        },
        {
          type: "textarea",
          name: "default_description",
          label: "Meta Description",
          admin: { description: "The default meta description" },
          defaultValue: "Setup you SEO via admin panel",
        },
        {
          type: "upload",
          name: "default_image",
          label: "Meta Default Image",
          relationTo: "media",
        },
      ],
    },
  ],
  hooks: { afterChange: [revalidatePages] },
};

export default SiteSettingsGlobal;
