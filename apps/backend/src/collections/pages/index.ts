import { CollectionConfig } from "payload/types";
import { _getAccess, _isHidden } from "../../helper/access";
import { Page, User } from "payload/generated-types";
import ImageCarousel from "../../blocks/common/image-carousel";
import Section from "../../blocks/layouts/section";
import { FRONTEND_URL_PREVIEW } from "../../utils/constant";
import Hero from "../../blocks/layouts/hero";
import CreatedByField from "../../fields/created-by";
import UpdatedByField from "../../fields/updated-by";
import { setUserCreatedOrUpdatedByHook } from "../../hooks/before-change/created-or-updated-by";
import { revalidatePage } from "./hooks/revalidatePage";
import { updateSlug } from "./hooks/updateSlug";
import { SelectBackground } from "../../fields/select-background";
import { updateSEO } from "./hooks/updateSEO";

const COLLECTION_NAME = "pages";
const RESERVE_SLUGS = ["jobs", "admin", "api", "graphql", "graphql-playground"];

const Pages: CollectionConfig = {
  slug: COLLECTION_NAME,
  labels: {
    plural: "Pages",
    singular: "Page",
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
    livePreview: {
      url: ({ data }) => {
        const page = data as Page;
        return page.is_homepage
          ? `${FRONTEND_URL_PREVIEW}`
          : `${FRONTEND_URL_PREVIEW}/${page.slug}`;
      },
    },

    useAsTitle: "title",
    hidden: ({ user }) => {
      return _isHidden(user as unknown as User, COLLECTION_NAME);
    },
    defaultColumns: ["title", "description", "slug", "is_homepage"],
    group: {
      Pages: "Careers Content",
    },
    listSearchableFields: ["title", "description", "slug", "is_homepage"],
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [setUserCreatedOrUpdatedByHook, updateSlug, updateSEO],
  },
  fields: [
    { type: "text", name: "title", label: "Title", required: true },
    {
      type: "textarea",
      name: "description",
      label: "Description",
    },
    {
      type: "text",
      name: "slug",
      label: "Slug",
      unique: true,
      required: true,
      validate: (slug: string) => {
        if (RESERVE_SLUGS.includes(slug?.toLowerCase())) {
          return `The slug "${slug}" is reserved and cannot be used.`;
        }
        return true;
      },
    },
    {
      type: "checkbox",
      name: "is_homepage",
      label: "Set as Homepage",
      required: true,
      defaultValue: false,
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
      blocks: [ImageCarousel, Section, Hero],
    },
    {
      name: "seo",
      label: "SEO",
      type: "group",
      admin: { hidden: true },
      fields: [
        {
          name: "metaTitle",
          type: "text",
        },
        {
          name: "metaDescription",
          type: "textarea",
        },
        {
          name: "ogImage",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    CreatedByField,
    UpdatedByField,
  ],
};

export default Pages;
