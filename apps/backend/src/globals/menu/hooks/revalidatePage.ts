import type { AfterChangeHook } from "payload/dist/globals/config/types";
import { revalidate } from "../../../helper/revalidate";

// Revalidate the page in the background, so the user doesn't have to wait
// Notice that the hook itself is not async and we are not awaiting `revalidate`
// Only revalidate existing docs that are published
// Don't scope to `operation` in order to purge static demo pages
export const revalidatePage: AfterChangeHook = async ({ doc, req: { payload } }) => {
  await revalidate({
    payload,
    collection: "menus",
    slug: "",
    isHomePage: false,
  });

  return doc;
};
