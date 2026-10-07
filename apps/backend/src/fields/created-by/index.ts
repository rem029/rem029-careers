import { Field } from "payload/types";

const CreatedByField: Field = {
  name: "created_by",
  label: "Created By",
  type: "relationship",
  relationTo: "users",
  maxDepth: 1,
  access: {
    update: () => false,
  },
  admin: {
    readOnly: true,
    position: "sidebar",
    condition: (data) => Boolean(data?.created_by),
  },
};

export default CreatedByField;
