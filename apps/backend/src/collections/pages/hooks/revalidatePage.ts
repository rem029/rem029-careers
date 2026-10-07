import type { AfterChangeHook } from "payload/dist/collections/config/types";
import { revalidate } from "../../../helper/revalidate";
import { Page } from "payload/generated-types";

// Revalidate the page in the background, so the user doesn't have to wait
// Notice that the hook itself is not async and we are not awaiting `revalidate`
// Only revalidate existing docs that are published
// Don't scope to `operation` in order to purge static demo pages
export const revalidatePage: AfterChangeHook<Page> = async ({
  doc,
  req: { payload },
}) => {
  if (doc._status === "published") {
    await revalidate({
      payload,
      collection: "pages",
      slug: doc.slug,
      isHomePage: doc.is_homepage,
    });
  }

  return doc;
};
