import { User } from "payload/generated-types";
import { GlobalConfig } from "payload/types";
import { _getAccess, _isHidden } from "../../helper/access";
import { FRONTEND_URL_PREVIEW } from "../../utils/constant";
import Hero from "../../blocks/layouts/hero";
import Section from "../../blocks/layouts/section";
import CareersInfo from "../../blocks/careers-info";
import UpdatedByField from "../../fields/updated-by";
import { setUserCreatedOrUpdatedByHookGlobal } from "../../hooks/before-change/created-or-updated-by";
import { revalidatePage } from "./hooks/revalidatePage";
import { SelectBackground } from "../../fields/select-background";

const COLLECTION_NAME = "careers-info-settings";

const CareersInfoSettings: GlobalConfig = {
  slug: COLLECTION_NAME,
  label: "Careers Info Page",
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
    livePreview: {
      url: `${FRONTEND_URL_PREVIEW}/jobs/test-id`,
    },
  },
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [setUserCreatedOrUpdatedByHookGlobal],
  },
  fields: [
    { type: "text", name: "title", label: "Title", admin: { hidden: true } },
    {
      type: "textarea",
      name: "description",
      label: "Description",
      admin: { hidden: true },
    },
    {
      type: "number",
      name: "resume_max_size",
      label: "Resume Max File Size (MB)",
      defaultValue: 3,
    },
    {
      type: "checkbox",
      name: "has_featured_image",
      label: "Has featured image",
      defaultValue: false,
    },
    {
      name: "featured_image",
      type: "upload",
      relationTo: "media",
      admin: {
        condition: (_, currentValue, __) => {
          return currentValue ? currentValue.has_featured_image : false;
        },
      },
    },
    SelectBackground,
    {
      name: "layout",
      label: "Layout",
      type: "blocks",
      blocks: [Section, Hero, CareersInfo],
    },
    UpdatedByField,
  ],
};

export default CareersInfoSettings;
