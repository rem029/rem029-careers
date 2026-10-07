import { AfterChangeHook } from "payload/dist/globals/config/types";
import { revalidate } from "../../../helper/revalidate";

export const revalidatePages: AfterChangeHook = async ({
  doc,
  req: { payload },
}) => {
  await revalidate({
    payload,
    collection: "menus",
    slug: "",
    isHomePage: false,
  });

  return doc;
};
