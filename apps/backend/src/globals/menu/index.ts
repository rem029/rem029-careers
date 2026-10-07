import { User } from "payload/generated-types";
import { GlobalConfig } from "payload/types";
import { _getAccess, _isHidden } from "../../helper/access";
import MenuFields from "./fields";
import UpdatedByField from "../../fields/updated-by";
import { setUserCreatedOrUpdatedByHookGlobal } from "../../hooks/before-change/created-or-updated-by";
import { revalidatePage } from "./hooks/revalidatePage";
import { NumberGap } from "../../fields/number-gap";
import { NumberMargin } from "../../fields/number-margin";
import { MaxWidth } from "../../fields/number-max-width";
import { MinHeight } from "../../fields/number-min-height";
import { NumberPadding } from "../../fields/number-padding";
import { SelectBackground } from "../../fields/select-background";
import ImageCarousel from "../../blocks/common/image-carousel";
import Hero from "../../blocks/layouts/hero";
import Section from "../../blocks/layouts/section";
import { FRONTEND_URL_PREVIEW } from "../../utils/constant";
import { SelectTextColor } from "../../fields/select-text-color";

const COLLECTION_NAME = "menus";

const MenuGlobal: GlobalConfig = {
  slug: COLLECTION_NAME,
  label: "Menus",
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
    livePreview: {
      url: `${FRONTEND_URL_PREVIEW}/`,
    },
    group: {
      Contents: "Settings",
    },
  },
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [setUserCreatedOrUpdatedByHookGlobal],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "header",
          label: "Header",
          fields: [
            {
              type: "checkbox",
              name: "use_layout",
              label: "Use layout?",
              defaultValue: false,
            },
            {
              type: "collapsible",
              label: "Styling",
              admin: {
                initCollapsed: true,
              },
              fields: [
                SelectBackground,
                MaxWidth,
                MinHeight,
                NumberGap,
                NumberMargin,
                NumberPadding,
              ],
            },
            {
              name: "layout",
              label: "Layout",
              type: "blocks",
              blocks: [ImageCarousel, Section, Hero],
              admin: {
                condition: (_, data) => {
                  return data?.use_layout;
                },
              },
            },
            {
              ...SelectTextColor,
              admin: {
                condition: (_, data) => {
                  return !data?.use_layout;
                },
              },
            },
            {
              type: "array",
              name: "menu",
              label: "Menu",
              interfaceName: "MenuItems",
              fields: MenuFields,
              admin: {
                condition: (_, data) => {
                  return !data?.use_layout;
                },
              },
            },
          ],
        },
        {
          name: "footer",
          label: "Footer",
          fields: [
            {
              type: "checkbox",
              name: "use_layout",
              label: "Use layout?",
              defaultValue: false,
            },
            {
              type: "collapsible",
              label: "Styling",
              admin: {
                initCollapsed: true,
              },
              fields: [
                SelectBackground,
                MaxWidth,
                MinHeight,
                NumberGap,
                NumberMargin,
                NumberPadding,
              ],
            },
            {
              name: "layout",
              label: "Layout",
              type: "blocks",
              blocks: [ImageCarousel, Section, Hero],
              admin: {
                condition: (_, data) => {
                  return data?.use_layout;
                },
              },
            },
            {
              type: "array",
              name: "grouped_menu",
              label: "Grouped menu",
              labels: { plural: "Grouped menus", singular: "Grouped menu" },
              interfaceName: "MenuGroupedItems",
              admin: {
                condition: (_, data) => {
                  return !data?.use_layout;
                },
              },
              fields: [
                { type: "text", name: "name", label: "Group name", required: true },
                {
                  type: "array",
                  name: "menu",
                  label: "Menu",
                  interfaceName: "MenuItems",
                  fields: MenuFields,
                },
              ],
            },
          ],
        },
      ],
    },
    UpdatedByField,
  ],
};

export default MenuGlobal;
