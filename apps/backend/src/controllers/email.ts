import payload from "payload";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { generateCareersApplicationNewHTML } from "../helper/email-templates/careers-application-new";
import { generateCareersApplicationResponseHTML } from "../helper/email-templates/careers-application-response";

export const generateError = (email: string, message: string) => {
  throw new Error(`Error sending email to: ${email}, response: ` + message, {
    cause: message || "",
  });
};

export const emailSendV2Careers = async (
  emailConfig: { email: string; password?: string; host: string; port: number },
  title: string,
  to: string | string[],
  senderName?: string,
  cc?: string | string[],
  html?: string,
  data?:
    | any
    | {
        template: "email-settings" | "email-careers-new" | "email-careers-applicant";
      },
): Promise<SMTPTransport.SentMessageInfo | undefined> => {
  try {
    payload.logger.info(`@emailSendV2Careers`);
    const { email, port, host, password } = emailConfig;

    const emailer = nodemailer.createTransport({
      host: host,
      from: email,
      auth: {
        user: email,
        pass: password,
      },
      port: Number(port),
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
      logger: true,
      debug: true,
    });

    let response: SMTPTransport.SentMessageInfo;
    let addressTo: string = "";

    if (Array.isArray(to)) {
      addressTo = to[0] || "";
    } else if (typeof to === "string") {
      addressTo = to;
    }

    if (data && data?.template) {
      if (data.template === "email-settings") {
        html = "Congratulations! Email setting works!";
      }
      if (data.template === "email-careers-new") {
        html = generateCareersApplicationNewHTML(title, addressTo, data?.url || "#");
      }
      if (data.template === "email-careers-applicant") {
        html = generateCareersApplicationResponseHTML(
          title,
          data?.addressTo || "",
          data?.operator || "",
          data?.careerTitle || "",
        );
      }
    }
    const from = senderName ? `${senderName} <${email}>` : email;
    response = await emailer.sendMail({ from: from, to, cc, subject: title, html });

    return response;
  } catch (error) {
    const message = error?.message || "";
    payload.logger.error(`@emailSendV2Careers.error ${message}`);
  }
};
