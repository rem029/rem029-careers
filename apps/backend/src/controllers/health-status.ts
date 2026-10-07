import axios, { AxiosError } from "axios";
import https from "https";
import tls from "tls";

export interface URLStatusSSL {
  validTo: string;
  validFrom: string;
  validFor?: string[];
  daysRemaining: number;
  valid: boolean;
}
export interface URLStatusResponse {
  url: string;
  status: number;
  text: string;
  sslInfo?: URLStatusSSL;
}

export const checkStatus = async (
  url: string,
  skipSSLVerification?: boolean,
): Promise<URLStatusResponse> => {
  try {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: skipSSLVerification ? false : true,
    });

    const responseSSL = await checkSSL(url);
    const response = await axios.get(url, {
      timeout: 5000,
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      },
      httpsAgent,
    });

    return {
      url: url,
      status: response.status,
      text: response.statusText,
      sslInfo: responseSSL ? { ...responseSSL } : undefined,
    };
  } catch (error) {
    const isAxiosError = error instanceof AxiosError;
    const axiosError = error as AxiosError;

    if (isAxiosError && axiosError.response) {
      return {
        url: url,
        status: axiosError.response?.status || 500,
        text: axiosError.response.statusText,
      };
    } else if (isAxiosError && axiosError.request) {
      return {
        url: url,
        status: axiosError?.status || 500,
        text: axiosError.message,
      };
    } else {
      return {
        url: url,
        status: undefined,
        text: `Error, ${(error as AxiosError).message}`,
      };
    }
  }
};

async function checkSSL(url: string): Promise<URLStatusSSL | undefined> {
  return new Promise((resolve, reject) => {
    const { hostname } = new URL(url);

    const options = {
      host: hostname,
      port: 443,
      servername: hostname,
      rejectUnauthorized: false,
    };

    const socket = tls.connect(options, () => {
      const certificate = socket.getPeerCertificate();
      socket.end();

      if (certificate && certificate.valid_to) {
        const validTo = new Date(certificate.valid_to).getTime();
        const validFrom = new Date(certificate.valid_from).getTime();
        const currentTime = new Date().getTime();
        const daysRemaining = Math.floor(
          (validTo - currentTime) / (1000 * 60 * 60 * 24),
        );

        resolve({
          valid: validTo >= currentTime,
          validFrom: new Date(certificate.valid_from).toISOString(),
          validTo: new Date(certificate.valid_to).toISOString(),
          validFor: certificate.subjectaltname?.split(", ") || [
            certificate.subject.CN,
          ],
          daysRemaining: daysRemaining,
        });
      } else {
        resolve(undefined);
      }
    });

    socket.on("error", (error) => {
      reject(`Error checking SSL: ${error.message}`);
    });
  });
}
