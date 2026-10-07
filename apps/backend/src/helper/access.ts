import { User, UserAccess } from "payload/generated-types";
import { PayloadRequest } from "payload/types";
import { AccessType } from "../types";

/**
 *
 * @param req
 * @param type
 * @param itemId - Required if function is used in 'items' collection. Can be undefined if used in a field component
 * @param slug - Required if function is used in a field component
 * @returns
 */
export const _getAccess = async (
  req: PayloadRequest<any>,
  type: AccessType,
  itemId?: string,
  slug?: string,
): Promise<boolean> => {
  try {
    const { user, collection } = req;
    const currentSlug = slug ? slug : collection?.config?.slug || "";

    req.payload.logger.info(
      `_getAccess ${type} ${
        (user as User)?.email
      },slug: ${currentSlug} itemId: ${itemId}`,
    );

    if (!user) return false;
    let userAccess: UserAccess;

    if (!user.access) {
      return false;
    }

    userAccess = user.access as UserAccess;
    if (typeof user.access === "number") {
      const response = await req.payload.find({
        collection: "user-access",
        where: {
          id: {
            equals: user.access,
          },
        },
      });

      if (!response.docs) {
        return true;
      }

      userAccess = response.docs[0];
    }

    const currentAccess = userAccess.access.find((a) => a.name === currentSlug);
    const hasAccess = currentAccess ? currentAccess[type] : true;

    return hasAccess;
  } catch (err) {
    req.payload.logger.error(`_getAccess.error: ${err?.message || "Unknown error"}`);
    return false;
  }
};

export const _isHidden = (user: User, slug: string) => {
  if (!user.access) return true;

  const userAccess = user.access as UserAccess;
  const currentAccess = userAccess.access.find((a) => a.name === slug);

  return currentAccess !== undefined ? currentAccess.hidden : true;
};
