import { Field } from "payload/types";

const UpdatedByField: Field = {
  name: "updated_by",
  label: "Updated By",
  type: "relationship",
  relationTo: "users",
  maxDepth: 1,
  access: {
    update: () => false,
  },
  admin: {
    readOnly: true,
    position: "sidebar",
    condition: (data) => Boolean(data?.updated_by),
  },
};

export default UpdatedByField;
