import themes from "./src/utils/themes";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    { pattern: /bg-(primary|secondary|black|info|success|warning|error|white)-.*/ },
    {
      pattern: /text-(primary|secondary|black|info|success|warning|error|white)-.*/,
    },
    {
      pattern: /text-(xs|sm|lg|xl|2xl|3xl|5xl|7xl|9xl)/,
    },
    { pattern: /from-gray-(950|50)\/(?:[0-9]|[1-9][0-9]|100)$/ },
    { pattern: /^(from|to)-black\/(?:[0-9]|[1-9][0-9]|100)$/ },
    {
      pattern: /bg-opacity-.*/,
    },
    {
      pattern: /rounded-(xs|sm|md|lg|xl|2xl|3xl|none|full)/,
    },
  ],
  daisyui: {
    themes: [themes],
  },
  theme: { extend: { colors: { "base-500": "#696969" } } },
  plugins: [require("daisyui")],
};
export default config;
