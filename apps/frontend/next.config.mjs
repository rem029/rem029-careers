import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

/** @type {import('next').NextConfig} */
export default (phase) => {
  const FRONTEND_URL =
    process.env.NEXT_PUBLIC_FRONTEND_URL ||
    "http://localhost:3000/careers/printemps";

  const FRONTEND_URL_BASE_PATH =
    process.env.NEXT_PUBLIC_FRONTEND_URL_BASE_PATH || "";
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    crossOrigin: "anonymous",
    images: {
      deviceSizes: [640, 1024, 1920],
      remotePatterns: [
        { protocol: "http", hostname: "localhost" },
        { protocol: "https", hostname: "public.dohaoasis.com" },
        { protocol: "https", hostname: "careers.dohaoasis.com" },
        { protocol: "https", hostname: "img.daisyui.com" },
        { protocol: "https", hostname: "images.pexels.com" },
        { protocol: "https", hostname: "flagcdn.com" },
      ],
    },
    assetPrefix: FRONTEND_URL,
    basePath: FRONTEND_URL_BASE_PATH,
  };
  return nextConfig;
};
