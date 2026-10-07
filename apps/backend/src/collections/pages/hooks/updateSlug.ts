import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { Page } from "payload/generated-types";

export const updateSlug: BeforeChangeHook = async ({ data, req }) => {
  let currentPage = data as Page;
  let slug = currentPage.is_homepage ? "" : currentPage?.slug || currentPage.title;

  currentPage = {
    ...currentPage,
    slug: slug.replaceAll(" ", "-")?.toLowerCase(),
  };

  if (currentPage.is_homepage) {
    await req.payload.update({
      collection: "pages",
      where: { is_homepage: { equals: true } },
      data: {
        is_homepage: false,
      },
    });
  }

  return currentPage;
};
