import { CollectionConfig } from "payload/types";
import { _getAccess, _isHidden } from "../../helper/access";
import { CareersApplication, User } from "payload/generated-types";
import { afterChangeCareersApplication } from "../../hooks/after-change/careers-application";
import { uuid } from "uuidv4";
import CareersId from "../../components/careers-id";
import CreatedByField from "../../fields/created-by";
import UpdatedByField from "../../fields/updated-by";
import { setUserCreatedOrUpdatedByHook } from "../../hooks/before-change/created-or-updated-by";
import CustomLink from "./link";

const COLLECTION_NAME = `careers-application`;
const COLLECTION_NAME_CAREERS = `careers`;

const CareersApplication: CollectionConfig = {
  slug: COLLECTION_NAME,
  labels: {
    plural: `Applications`,
    singular: `Application`,
  },
  access: {
    read: async ({ req }) => await _getAccess(req, "read"),
    create: async ({ req }) => await _getAccess(req, "create"),
    update: async ({ req }) => await _getAccess(req, "update"),
    admin: async ({ req }) => await _getAccess(req, "admin"),
    delete: async ({ req }) => await _getAccess(req, "delete"),
  },
  admin: {
    useAsTitle: "email",
    hidden: ({ user }) => {
      return _isHidden(user as unknown as User, COLLECTION_NAME);
    },
    group: {
      [`Applications`]: "Careers",
    },
    listSearchableFields: [
      "id",
      "first_name",
      "last_name",
      "phone",
      "email",
      "career.title",
      "career_queries.item.title",
      "career_queries.response",
    ],
    defaultColumns: [
      "first_name",
      "last_name",
      "phone",
      "email",
      "resume",
      "career",
    ],
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data?.id) {
          const customID = uuid();
          return { ...data, id: customID };
        }
        return data;
      },
    ],
    beforeOperation: [
      async ({ operation, req, args }) => {
        if (operation === "create") {
          const newEntry: CareersApplication = args.data;

          const career = await req.payload.findByID({
            collection: "careers",
            id: newEntry.career as string,
          });

          if (!career.active || career?._status !== "published") {
            throw new Error(
              `Position is unavailable or currently not accepting new applicants.`,
            );
          }

          const { docs: existingCareerApplications } = await req.payload.find({
            collection: "careers-application",
            where: {
              and: [
                { email: { equals: newEntry.email } },
                { career: { equals: newEntry.career } },
              ],
            },
          });

          if (existingCareerApplications.length > 0)
            throw new Error(
              `Existing application found for ${newEntry.email} for career id: ${newEntry.career}`,
            );
        }

        return args;
      },
    ],
    afterChange: [afterChangeCareersApplication],
    beforeChange: [setUserCreatedOrUpdatedByHook],
  },
  fields: [
    {
      name: "id",
      type: "text",
      admin: {
        components: {
          Field: CareersId,
        },
      },
    },
    {
      name: "first_name",
      label: "First Name",
      type: "text",
      required: true,
    },
    {
      name: "last_name",
      label: "Last Name",
      type: "text",
      required: true,
    },
    {
      name: "phone",
      label: "Phone",
      type: "text",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      required: true,
    },
    {
      name: "nationality",
      label: "Nationality",
      type: "text",
      required: true,
    },
    {
      name: "country_of_residence",
      label: "Country of residence",
      type: "text",
      required: true,
    },
    {
      name: "nationalIdPassportNumber",
      label: "National ID or Passport#",
      type: "text",
      required: true,
    },
    {
      name: "resume",
      label: "Resume",
      type: "relationship",
      relationTo: "careers-media",
      required: true,
      admin: {
        components: {
          Cell: CustomLink,
        },
      },
    },
    {
      name: "career",
      label: "Applying for",
      type: "relationship",
      relationTo: COLLECTION_NAME_CAREERS,
      required: true,
    },
    {
      name: "career_queries",
      label: "Query",
      labels: {
        plural: "Queries",
        singular: "Query",
      },
      type: "array",
      fields: [
        {
          name: "item",
          label: "Item",
          type: "relationship",
          relationTo: "careers-queries",
        },
        {
          name: "response",
          label: "Response",
          type: "text",
          admin: {
            condition: (data, _) => {
              console.log("data", "_");
              console.log(data, _);
              return true;
            },
          },
        },
        {
          name: "response_file",
          label: "Response File",
          type: "upload",
          relationTo: "careers-media",
        },
      ],
    },
    CreatedByField,
    UpdatedByField,
  ],
};

export default CareersApplication;
