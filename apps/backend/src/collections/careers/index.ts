import { Career, User } from "payload/generated-types";
import { CollectionConfig, Where } from "payload/types";
import { _getAccess, _isHidden } from "../../helper/access";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";
import { uuid } from "uuidv4";
import CareersId from "../../components/careers-id";
import CreatedByField from "../../fields/created-by";
import UpdatedByField from "../../fields/updated-by";
import { setUserCreatedOrUpdatedByHook } from "../../hooks/before-change/created-or-updated-by";
import { FRONTEND_URL_PREVIEW } from "../../utils/constant";
import { revalidatePage } from "./hooks/revalidatePage";
import { updateSEO } from "./hooks/updateSEO";

const COLLECTION_NAME = `careers`;

const Careers: CollectionConfig = {
  slug: COLLECTION_NAME,
  labels: {
    plural: `Careers`,
    singular: `Career`,
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
        const career = data as Career;
        return `${FRONTEND_URL_PREVIEW}/jobs/${career.id}`;
      },
    },
    useAsTitle: "title",
    hidden: ({ user }) => {
      return _isHidden(user as unknown as User, COLLECTION_NAME);
    },
    group: {
      [`Careers`]: "Careers",
    },
    listSearchableFields: [
      "title",
      "id",
      "work_type.title",
      "responsibilities.title",
      "responsibilities.sub_title",
      "qualifications.title",
      "qualifications.sub_title",
    ],
  },
  endpoints: [
    {
      path: "/search/:keyword",
      method: "get",
      handler: async (req, res, next) => {
        const { limit, page, sort } = req.query;
        let { keyword } = req.params;
        let { category } = req.query;

        keyword = keyword ? `%${keyword}%` : `%%`;
        category = category ? `%${category}%` : `%%`;

        const fields = ["title", "description"];
        const fieldsOrQuery = fields.map((field) => ({
          [field]: {
            like: `${keyword}`,
          },
        }));

        const fieldsQuery: Where = {
          _status: {
            equals: "published",
          },
          ...(category && {
            "category.title": { like: category },
          }),
          or: fieldsOrQuery,
        };

        try {
          const response = await req.payload.find({
            collection: COLLECTION_NAME,
            where: fieldsQuery,
            limit: Number(limit),
            page: Number(page),
            sort: sort as string,
          });

          res.status(200).send({ ...response });
        } catch (error) {
          next(error);
        }
      },
    },
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeValidate: [
      ({ data }) => {
        if (!data?.id) {
          const customID = uuid();
          data = { ...data, id: customID };
        }

        return data;
      },
    ],
    beforeChange: [setUserCreatedOrUpdatedByHook, updateSEO],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "id",
      type: "text",
      admin: {
        components: {
          Field: CareersId,
        },
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "code",
      label: "Code",
      type: "text",
      admin: {
        description:
          "If job code is not provided, default ID will be displayed as a job reference.",
        position: "sidebar",
      },
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "category",
          label: "Category",
          type: "relationship",
          relationTo: "category",
          required: true,
        },
        {
          name: "work_type",
          label: "Work Type",
          type: "relationship",
          relationTo: "careers-work-type",
          required: true,
        },
      ],
    },
    {
      name: "description_rt",
      label: "Description (as Rich text)",
      admin: { description: "Displayed at application page." },
      type: "richText",
      required: false,
    },
    {
      name: "description",
      label: "Description (as preview)",
      type: "textarea",
      required: false,
      admin: { description: "Displayed at careers list page." },
    },
    {
      name: "active",
      label: "Is position active?",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "expires_at",
      label: "Expires at?",
      type: "date",
      admin: { date: { pickerAppearance: "dayAndTime" }, hidden: true },
    },
    {
      name: "responsibilities_rt",
      label: "Responsibilities",
      admin: { position: "sidebar" },
      type: "richText",
    },
    {
      name: "qualifications_rt",
      label: "Qualifications",
      admin: { position: "sidebar" },
      type: "richText",
    },
    {
      name: "responsibilities",
      label: "Responsibilities",
      type: "array",

      fields: [
        {
          name: "title",
          label: "Title",
          type: "text",
        },
        {
          name: "sub_title",
          label: "Sub Title",
          type: "text",
        },
      ],
      admin: {
        hidden: true,
        components: {
          RowLabel: ({ data, index }: RowLabelArgs) => {
            return data?.title || `Responsibility ${String(index).padStart(2, "0")}`;
          },
        },
        position: "sidebar",
      },
    },
    {
      name: "qualifications",
      label: "Qualifications",
      type: "array",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "text",
        },
        {
          name: "sub_title",
          label: "Sub Title",
          type: "text",
        },
      ],
      admin: {
        hidden: true,
        components: {
          RowLabel: ({ data, index }: RowLabelArgs) => {
            return data?.title || `Qualification ${String(index).padStart(2, "0")}`;
          },
        },
        position: "sidebar",
      },
    },
    {
      name: "career_queries",
      label: "Queries",
      labels: { plural: "Queries", singular: "Query" },
      type: "array",
      fields: [
        {
          name: "item",
          label: "Item",
          type: "relationship",
          relationTo: "careers-queries",
        },
        {
          name: "required",
          label: "Is Question Required?",
          type: "checkbox",
        },
      ],
      admin: {
        components: {
          RowLabel: ({ data, index }: RowLabelArgs) => {
            return data?.item || `Query ${String(index).padStart(2, "0")}`;
          },
        },
        position: "sidebar",
      },
    },
    CreatedByField,
    UpdatedByField,
  ],
};

export default Careers;
