import { OPERATOR } from "@/utils/constant";
import {
  Roboto_Flex,
  Roboto_Condensed,
  Inter,
  Poppins,
  Baskervville,
} from "next/font/google";
import localFont from "next/font/local";

const robotoCondensed = Roboto_Condensed({ weight: "500", subsets: ["latin"] });
const robotoFlex = Roboto_Flex({
  weight: "300",
  subsets: ["latin"],
});
const inter = Inter({
  weight: "500",
  subsets: ["latin"],
});
const noah = localFont({
  src: [
    { path: "./Noah-Bold.ttf", weight: "700", style: "bold" },
    { path: "./Noah-Regular.ttf", weight: "500", style: "normal" },
    { path: "./Noah-RegularItalic.ttf", weight: "500", style: "italic" },
  ],
});
const poppinsLight = Poppins({
  weight: "200",
  subsets: ["latin"],
});
const poppinsNormal = Poppins({
  weight: "500",
  subsets: ["latin"],
});
export const baskerville = Baskervville({ weight: "400", subsets: ["latin"] });

const _fonts = (operator: string) => {
  switch (operator) {
    case "printemps": {
      return {
        primary: robotoCondensed,
        secondary: robotoFlex,
        default: inter,
      };
    }
    case "dohaoasis": {
      return {
        primary: noah,
        secondary: poppinsLight,
        default: poppinsNormal,
      };
    }
    default: {
      return {
        primary: robotoCondensed,
        secondary: robotoFlex,
        default: inter,
      };
    }
  }
};

export const fontPrimary = _fonts(OPERATOR).primary;
export const fontSecondary = _fonts(OPERATOR).secondary;
export const fontDefault = _fonts(OPERATOR).default;
