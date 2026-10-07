import { AfterChangeHook } from "payload/dist/collections/config/types";
import {
  Career,
  CareersApplication,
  CareersEmailSetting,
} from "payload/generated-types";
import { OPERATOR } from "../../utils/constant";
import { emailSendV2Careers } from "../../controllers/email";

export const afterChangeCareersApplication: AfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  try {
    const { serverURL, routes } = req.payload.config;

    req.payload.logger.info(`afterChangeCareersApplication.${operation}`);

    if (operation === "create") {
      const {
        recipients,
        port,
        email,
        password,
        host,
        sender_name,
      }: CareersEmailSetting = await req.payload.findGlobal({
        slug: "careers-email-settings",
      });
      const careerApplicant: CareersApplication = doc;
      const career: Career = careerApplicant.career as Career;

      const careerTitleApplicant = `Thank you for submitting your application to ${OPERATOR.label} for ${career.title}`;
      const careerTitleNew = `New Application received for ${career.title}`;

      await emailSendV2Careers(
        { email, password, host, port: Number(port) },
        careerTitleApplicant,
        careerApplicant.email,
        sender_name,
        [],
        undefined,
        {
          template: "email-careers-applicant",
          operator: OPERATOR.label,
          careerTitle: career?.title,
          addressTo: careerApplicant.first_name + " " + careerApplicant.last_name,
        },
      );

      for (const recipient of recipients) {
        await emailSendV2Careers(
          { email, password, host, port: Number(port) },
          careerTitleNew,
          recipient?.email || "",
          sender_name,
          [],
          undefined,
          {
            template: "email-careers-new",
            operator: OPERATOR.label,
            url: `${serverURL}${routes.admin}/collections/careers-application/${careerApplicant.id}`,
          },
        );
      }
    }
  } catch (error) {
    const message = error?.message || "Unknown error";
    req.payload.logger.error(`error at afterChangeCareersApplication: ${message}`);
  }
};
