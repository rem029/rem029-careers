import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { BeforeChangeHook as BeforeChangeHookGlobal } from "payload/dist/globals/config/types";

export const setUserCreatedOrUpdatedByHook: BeforeChangeHook = ({
  req,
  operation,
  data,
}) => {
  const createdByString = "created_by";
  const updatedByString = "updated_by";
  const id = req?.user?.id;

  req.payload.logger.info(
    `@setUserCreatedOrUpdatedBy.prefixCreatedBy`,
    id,
    data,
    createdByString,
    data[createdByString],
  );

  if (operation === "create" && id) {
    data[createdByString] = id;
    data[updatedByString] = id;
    return data;
  }
  if (operation === "update" && id) {
    data[updatedByString] = id;
    return data;
  }

  return data;
};

export const setUserCreatedOrUpdatedByHookGlobal: BeforeChangeHookGlobal = ({
  req,
  data,
}) => {
  const createdByString = "created_by";
  const updatedByString = "updated_by";
  const id = req?.user?.id;

  req.payload.logger.info(
    `@setUserCreatedOrUpdatedBy.prefixCreatedBy`,
    id,
    data,
    createdByString,
    data[createdByString],
  );

  data[updatedByString] = id;

  return data;
};
