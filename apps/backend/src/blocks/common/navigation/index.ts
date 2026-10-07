import { Block } from "payload/types";

const NavigationBlock: Block = {
  slug: "block-nav",
  interfaceName: "BlockNavigation",
  // imageURL: `${thumbnail}`,
  labels: { plural: "Navigation", singular: "Navigations" },
  fields: [
    {
      type: "array",
      name: "menu",
      label: "Menu",
      interfaceName: "NavigationMenuItems",
      fields: [
        {
          type: "select",
          name: "type",
          label: "Menu Item Type",
          required: true,
          options: [
            { label: "Internal Page", value: "internal" },
            { label: "External URL", value: "external" },
            { label: "Career Categories", value: "career categories" },
            { label: "Dropdown", value: "dropdown" },
            { label: "Button", value: "button" },
          ],
        },
        {
          type: "group",
          name: "int",
          label: "Internal Page Options",
          interfaceName: "NavigationMenuItemInternal",
          admin: {
            condition: (_, data) => data?.type === "internal",
          },
          fields: [
            {
              type: "relationship",
              name: "page",
              label: "Page",
              relationTo: "pages",
            },
          ],
        },
        {
          type: "group",
          name: "ext",
          label: "External URL Options",
          interfaceName: "NavigationMenuItemExternal",
          admin: {
            condition: (_, data) => data?.type === "external",
          },
          fields: [
            {
              type: "text",
              name: "url_external_title",
              label: "Title",
            },
            {
              type: "text",
              name: "url",
              label: "URL",
            },
          ],
        },
        {
          type: "group",
          name: "dropdown",
          interfaceName: "NavigationMenuItemDropdown",
          label: "Dropdown Menu Options",
          admin: {
            condition: (_, data) => data?.type === "dropdown",
          },
          fields: [
            { type: "text", name: "label", label: "Label", required: true },
            {
              type: "array",
              name: "submenu",
              label: "Submenu Items",
              fields: [
                {
                  type: "group",
                  name: "item",
                  interfaceName: "NavigationMenuItemDropdownSubMenuItemn",
                  fields: [
                    {
                      type: "text",
                      name: "label",
                      label: "Submenu Label",
                      required: true,
                    },
                    {
                      type: "text",
                      name: "url",
                      label: "Submenu URL",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "group",
          name: "buttons",
          interfaceName: "NavigationMenuItemButton",
          label: "Button Options",
          admin: {
            condition: (_, data) => data?.type === "button",
          },
          fields: [
            {
              type: "text",
              name: "button_text",
              label: "Title",
            },
            {
              type: "text",
              name: "url",
              label: "URL",
            },
            {
              type: "text",
              name: "button_style",
              label: "Button Classname(s)",
              admin: { description: "Refer to tailwind's class names" },
              defaultValue: "btn btn-primary btn-sm text-white hover:text-white",
            },
          ],
        },
        {
          type: "upload",
          name: "icon",
          label: "Menu Icon",
          relationTo: "media",
          required: false,
          admin: {
            description: "Optional icon to display next to the menu item",
          },
        },
      ],
    },
  ],
};

export default NavigationBlock;
