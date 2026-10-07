import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { Career } from "payload/generated-types";

export const updateSEO: BeforeChangeHook<Career> = async ({
  data,
  originalDoc,
  operation,
}) => {
  if (operation === "create") {
    if (!data?.meta?.title) {
      data.meta.title = data?.title || "";
    }
  } else if (operation === "update") {
    if (originalDoc?.title !== data?.title) {
      data.meta.title = data?.title || "";
    }
  }

  return data;
};
