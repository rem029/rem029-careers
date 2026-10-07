import { emailSendV2Careers } from "../controllers/email";
import { Endpoint } from "payload/config";
import { CareersEmailSetting } from "payload/generated-types";

export const emailSenderV2CareersEndpoint: Endpoint = {
  path: "/email/send/v2/careers",
  root: false,
  method: "post",
  handler: async (req, res, _) => {
    try {
      const { args, to, cc, html, title } = req.body;
      req.payload.logger.info(
        `/email/send/v2/careers ${args}, ${to} ${cc} ${html} ${title}`,
      );

      const { email, password, host, port, sender_name }: CareersEmailSetting =
        await req.payload.findGlobal({
          slug: "careers-email-settings",
        });

      const response = await emailSendV2Careers(
        { email, password, host, port: Number(port) },
        title,
        to,
        sender_name,
        cc,
        html ? html : undefined,
        args,
      );

      if (!response) throw new Error(`Error while sending email.`);

      res.status(200).send({ ...response });
    } catch (error) {
      req.payload.logger.error(`Error in /email/send/v2/careers: ${error.message}`);

      res.status(500).json({
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  },
};
