import { Field } from "payload/types";

export const MenuFields: Field[] = [
  {
    type: "group",
    name: "item",
    label: "Menu Item",
    interfaceName: "MenuItem",
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
        name: "internalGroup",
        label: "Internal Page Options",
        interfaceName: "MenuItemInternalPage",
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
        name: "externalGroup",
        label: "External URL Options",
        interfaceName: "MenuItemExternalPage",
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
        name: "dropdownGroup",
        interfaceName: "MenuItemDropdown",
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
                interfaceName: "MenuItemDropdownSubMenuItemn",
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
        name: "buttonGroup",
        interfaceName: "MenuItemButton",
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

      // Icon field (shared across all types)
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
];

export default MenuFields;
