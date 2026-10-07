import dotenv from "dotenv";
dotenv.config();

export const FRONTEND_URL =
  process.env.PAYLOAD_PUBLIC_FRONTEND_URL || "http://localhost:3000";
export const FRONTEND_URL_PREVIEW = `${FRONTEND_URL}/preview`;
export const ENV = process.env.NODE_ENV || "development";
export const MAX_FILE_SIZE = process.env.PAYLOAD_PUBLIC_MAX_FILE_SIZE || 5000000;

export const REVALIDATE_KEY = process.env.PAYLOAD_PUBLIC_REVALIDATE_KEY;

export const NODE_MAILER_USER = process.env.PAYLOAD_PUBLIC_NODE_MAILER_USER;
export const NODE_MAILER_PASS = process.env.PAYLOAD_PUBLIC_NODE_MAILER_PASS;
export const NODE_MAILER_FROM = process.env.PAYLOAD_PUBLIC_NODE_MAILER_FROM;
export const NODE_MAILER_HOST = process.env.PAYLOAD_PUBLIC_NODE_MAILER_HOST;
export const NODE_MAILER_PORT = process.env.PAYLOAD_PUBLIC_NODE_MAILER_PORT;

export const CF_SECREY_KET = process.env.PAYLOAD_PUBLIC_CF_SECREY_KET || "";

export const OPERATOR = {
  key: process.env.PAYLOAD_PUBLIC_OPERATOR_KEY || "dohaoasis",
  label: process.env.PAYLOAD_PUBLIC_OPERATOR_LABEL || "Doha Oasis",
};

export const ADMIN_SUB_ROUTE = process.env.PAYLOAD_PUBLIC_ADMIN_SUB_ROUTE || "";
