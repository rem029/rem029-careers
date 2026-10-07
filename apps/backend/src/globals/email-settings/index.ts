import { GlobalConfig } from "payload/types";
import { User } from "payload/generated-types";
import { _getAccess, _isHidden } from "../../helper/access";
import EmailSettingsTest from "../../components/email-settings-test";
import UpdatedByField from "../../fields/updated-by";
import { setUserCreatedOrUpdatedByHookGlobal } from "../../hooks/before-change/created-or-updated-by";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";

const COLLECTION_NAME = "careers-email-settings";

const EmailSettingsGlobal: GlobalConfig = {
  slug: COLLECTION_NAME,
  label: "Email",
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
  hooks: {
    beforeChange: [setUserCreatedOrUpdatedByHookGlobal],
  },
  fields: [
    {
      type: "text",
      name: "email",
      label: "Email",
      access: {
        update: async ({ req }) =>
          await _getAccess(req, "update", undefined, COLLECTION_NAME),
      },
    },
    {
      type: "text",
      name: "password",
      label: "Password",
      access: {
        update: async ({ req }) =>
          await _getAccess(req, "update", undefined, COLLECTION_NAME),
      },
    },
    {
      type: "text",
      name: "host",
      label: "Host",
      access: {
        update: async ({ req }) =>
          await _getAccess(req, "update", undefined, COLLECTION_NAME),
      },
    },
    {
      type: "text",
      name: "port",
      label: "Port",
      access: {
        update: async ({ req }) =>
          await _getAccess(req, "update", undefined, COLLECTION_NAME),
      },
    },
    {
      type: "text",
      name: "sender_name",
      label: "Sender name",
      access: {
        update: async ({ req }) =>
          await _getAccess(req, "update", undefined, COLLECTION_NAME),
      },
      defaultValue: "Careers",
    },
    {
      type: "array",
      name: "recipients",
      label: "Recipients",
      admin: {
        description: "Email recipient for new applications",
        components: {
          RowLabel: ({ data, index }: RowLabelArgs) => {
            return data?.email || `Recipient ${String(index).padStart(2, "0")}`;
          },
        },
      },
      fields: [
        { type: "text", name: "key", label: "Key" },
        { type: "text", name: "email", label: "Email" },
      ],
      access: {
        update: async ({ req }) =>
          await _getAccess(req, "update", undefined, COLLECTION_NAME),
      },
    },
    {
      name: "email_settings_test",
      label: "Test Settings",
      type: "ui",
      admin: {
        components: {
          Field: EmailSettingsTest,
        },
      },
    },
    UpdatedByField,
  ],
};

export default EmailSettingsGlobal;
