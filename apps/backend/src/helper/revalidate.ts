import type { Payload } from "payload";
import { FRONTEND_URL, REVALIDATE_KEY } from "../utils/constant";

export const revalidate = async (args: {
  collection: string;
  slug: string;
  payload: Payload;
  isHomePage: boolean;
}): Promise<void> => {
  const { collection, slug, payload, isHomePage } = args;

  try {
    const res = await fetch(
      `${FRONTEND_URL}/next/revalidate?secret=${REVALIDATE_KEY}&collection=${collection}&slug=${slug}&is_home_page=${isHomePage}`,
    );

    if (res.ok) {
      payload.logger.info(
        `Revalidated page '${slug}' in collection '${collection}'`,
      );
    } else {
      payload.logger.error(
        `Error revalidating page '${slug}' in collection '${collection}': ${JSON.stringify(res, null, 4)}`,
      );
    }
  } catch (err: unknown) {
    payload.logger.error(
      `Error hitting revalidate route for page '${slug}' in collection '${collection}': ${err}`,
    );
  }
};
