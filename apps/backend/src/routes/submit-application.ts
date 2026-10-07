import { Endpoint } from "payload/config";
import { CareersApplication } from "payload/generated-types";

export const submitApplicationEndpoint: Endpoint = {
  path: "/submit-application",
  root: false,
  method: "post",
  handler: async (req, res, _) => {
    try {
      const career = req.body as CareersApplication;

      const response = await req.payload.create({
        collection: "careers-application",
        data: { ...career },
      });

      res.status(201).send({ doc: { ...response } });
    } catch (error) {
      let message = error?.message || "An unknown error occurred";

      req.payload.logger.error(`Error at /submit-application: ${message}`);

      res.status(500).json({
        message: message,
      });
    }
  },
};
