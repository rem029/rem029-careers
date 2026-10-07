export const FRONTEND_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000/careers/printemps";

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3005";

export const BACKEND_LIVE_PREVIEW_URL =
  process.env.NEXT_PUBLIC_BACKEND_LIVE_PREVIEW_URL || "http://localhost:3005";

export const BACKEND_LIVE_PREVIEW_API_ROUTE =
  process.env.NEXT_PUBLIC_BACKEND_LIVE_PREVIEW_API_ROUTE || "/api";

export const BACKEND_API_KEY = process.env.NEXT_PUBLIC_BACKEND_API_KEY;

export const REVALIDATE_SECONDS = Number(
  process.env.NEXT_PUBLIC_REVALIDATE_SECONDS || 60,
);

export const REVALIDATE_JOBS_SECONDS = Number(
  process.env.NEXT_PUBLIC_REVALIDATE_JOBS_SECONDS || 5,
);

export const REVALIDATE_KEY = process.env.NEXT_PUBLIC_REVALIDATE_KEY;
export const NEXT_PUBLIC_CF_SITE_KEY = process.env.NEXT_PUBLIC_CF_SITE_KEY || "";

export const isDev =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development" ? true : false;

export const OPERATOR =
  process.env.NEXT_PUBLIC_OPERATOR?.toLowerCase() || "printemps".toLowerCase();
