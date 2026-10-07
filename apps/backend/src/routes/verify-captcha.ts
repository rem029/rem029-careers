import { Endpoint } from "payload/config";
import { CF_SECREY_KET } from "../utils/constant";

export const verifyCaptchaEndpoint: Endpoint = {
  path: "/verify-captcha",
  root: false,
  method: "post",
  handler: async (req, res, _) => {
    try {
      const token = req.body?.token;

      if (!token) throw new Error("Token is missing");

      const verifyTokenBody = {
        secret: CF_SECREY_KET,
        response: token,
        remoteip: req.ip || undefined,
      };

      const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
      const result = await fetch(url, {
        body: JSON.stringify({ ...verifyTokenBody }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const verificationResult = await result.json();

      req.payload.logger.info(
        `Response at /verify-captcha: ${JSON.stringify(verificationResult, null, 4)}`,
      );

      if (!verificationResult.success) {
        req.payload.logger.info("verifying token not success");
        req.payload.logger.error(
          `CAPTCHA verification failed: ${JSON.stringify(verificationResult)}`,
        );
        return res
          .status(201)
          .json({ result: false, message: "CAPTCHA verification failed." });
      }

      res
        .status(201)
        .send({ result: true, message: "CAPTCHA verification success." });
    } catch (error) {
      let message = error?.message || "An unknown error occurred";

      req.payload.logger.error(`Error at /submit-application: ${message}`);

      res.status(500).json({
        message: message,
      });
    }
  },
};
