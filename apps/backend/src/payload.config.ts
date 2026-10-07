import path from "path";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { Config, buildConfig } from "payload/config";

import Users from "./collections/users";
import { ADMIN_SUB_ROUTE, ENV, MAX_FILE_SIZE, OPERATOR } from "./utils/constant";

import { healthEndpoint } from "./routes/health";

import "../tailwind.css";
import { emailSenderV2CareersEndpoint } from "./routes/email";
import { resolveAlias, serverOnlyModules } from "payload-plugin-resolve-alias";
import CareersMedia from "./collections/careers-media";
import CareersWorkType from "./collections/careers-work-type";
import Media from "./collections/media";
import UserAccess from "./collections/users-access";
import CareersCategory from "./collections/careers-category";
import Pages from "./collections/pages";
import Logo from "./components/common/logo";
import Icon from "./components/common/icon";
import MenuGlobal from "./globals/menu";
import EmailSettingsGlobal from "./globals/email-settings";
import CareersPageSettings from "./globals/careers-list";
import CareersPageInfoSettings from "./globals/careers-info";
import Careers from "./collections/careers";
import CareersApplication from "./collections/careers-application";
import CareersQueries from "./collections/careers-queries";
import LogoGlobal from "./globals/logo";

import seoPlugin from "@payloadcms/plugin-seo";
import { submitApplicationEndpoint } from "./routes/submit-application";
import Analytics from "./collections/analytics";
import ReportingsCareersGlobal from "./globals/reporting/careers";
import ReportingsPageGlobal from "./globals/reporting/page";
import { verifyCaptchaEndpoint } from "./routes/verify-captcha";
import SiteSettingsGlobal from "./globals/site-settings";
import { Career, Page } from "./payload-types";

const isProd = process.env.NODE_ENV === "production";

export const config: Config = {
  rateLimit: { trustProxy: true },
  admin: {
    autoLogin:
      ENV !== "production"
        ? {
            email: "default@payload.com",
            password: "default@payload.com",
            prefillOnly: true,
          }
        : false,
    user: Users.slug,
    bundler: webpackBundler(),
    css: path.resolve(__dirname, "./css/compiledTailwind.css"),
    webpack: (config) => {
      return {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve.alias,
          },
          fallback: {
            ...config.resolve.fallback,
          },
        },
        module: {
          ...config.module,
          rules: [
            ...config.module.rules,
            {
              test: /\tailwind.css$/i,
              use: ["css-loader", "postcss-loader"],
            },
          ],
        },
      };
    },
    components: {
      // beforeDashboard: [CareersApplicationChart, PageViewChart],
      graphics: { Logo, Icon },
      // afterNavLinks: [CustomLinks],
    },
    meta: {
      favicon: `/assets/${OPERATOR.key}-favicon.ico`,
      titleSuffix: ` - ${OPERATOR.label} Careers`,
    },
  },
  endpoints: [
    healthEndpoint,
    emailSenderV2CareersEndpoint,
    submitApplicationEndpoint,
    verifyCaptchaEndpoint,
  ],
  serverURL: process.env.PAYLOAD_PUBLIC_BACKEND_URL || "http://localhost:3005",
  cors: !isProd
    ? [
        "http://localhost:3005, http://localhost:3000",
        "http://localhost:3005/careers/dohaoasis/p/api/media",
      ]
    : "*",
  routes: {
    admin: ADMIN_SUB_ROUTE + "/p/admin",
    api: ADMIN_SUB_ROUTE + "/p/api",
    graphQL: ADMIN_SUB_ROUTE + "/p/graphql",
    graphQLPlayground: ADMIN_SUB_ROUTE + "/p/graphql-playground",
  },
  localization: {
    locales: [
      {
        label: "English",
        code: "en",
      },
      {
        label: "Arabic",
        code: "ar",
        rtl: true,
      },
      {
        label: "French",
        code: "fr",
      },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  debug: !isProd,
  editor: slateEditor({
    admin: {
      elements: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "blockquote",
        "link",
        "ul",
        "ol",
        "textAlign",
      ],
    },
  }),
  collections: [
    Careers,
    CareersApplication,
    CareersQueries,
    CareersCategory,
    CareersMedia,
    CareersWorkType,
    Media,
    Users,
    UserAccess,
    Pages,
    Analytics,
  ],
  globals: [
    EmailSettingsGlobal,
    MenuGlobal,
    CareersPageSettings,
    CareersPageInfoSettings,
    ReportingsCareersGlobal,
    ReportingsPageGlobal,
    LogoGlobal,
    SiteSettingsGlobal,
  ],
  upload: {
    limits: {
      fileSize: MAX_FILE_SIZE,
    },
  },
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [
    resolveAlias(serverOnlyModules, ["uuidv4", "tls"]),
    seoPlugin({
      collections: ["pages", "careers"],
      globals: ["careers-list-settings"],
      uploadsCollection: "media",
    }),
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
};

export default buildConfig(config);
