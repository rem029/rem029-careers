import {
  BackgroundOverlay,
  Media,
  TextColor,
  BackgroundColor,
} from "@/payload-types";
import { DaisyUIThemeColors } from "./themes";
import { COLORS_BG, COLORS_TEXT } from "@/constant-styles";

export const titleToSlugFormat = (title: string) =>
  title.toLowerCase().replaceAll(" ", "-");

export type CSSProperties = {
  left?: number | null;
  top?: number | null;
  right?: number | null;
  bottom?: number | null;
};

export interface GenerateCSSPropertiesProps {
  desktop?: CSSProperties;
  mobile?: CSSProperties;
}

export type CSSProperty = "padding" | "margin" | "border";

export const generateCSSProperties = (
  property: CSSProperty,
  { desktop, mobile }: GenerateCSSPropertiesProps,
): { desktop: string[]; mobile: string[] } => {
  const createProperty = (
    side: string,
    value: number | null | undefined,
    fallbackValue?: string,
  ): string =>
    value !== null && value !== undefined
      ? `${property}-${side}: ${value}px;`
      : fallbackValue || "";

  const propertiesDesktop = [
    createProperty("left", desktop?.left),
    createProperty("top", desktop?.top),
    createProperty("right", desktop?.right),
    createProperty("bottom", desktop?.bottom),
  ];

  const propertiesMobile = [
    createProperty("left", mobile?.left, propertiesDesktop[0]),
    createProperty("top", mobile?.top, propertiesDesktop[1]),
    createProperty("right", mobile?.right, propertiesDesktop[2]),
    createProperty("bottom", mobile?.bottom, propertiesDesktop[3]),
  ];

  return {
    desktop: propertiesDesktop,
    mobile: propertiesMobile,
  };
};

export const generateCSSOverlay = (
  ov: BackgroundOverlay,
  theme: DaisyUIThemeColors,
) => {
  let overlayCSSRules = "";

  if (ov.option === "solid") {
    const baseColor =
      ov.solid_option === "custom"
        ? formatHex(ov.solid_custom || "")
        : theme[ov.solid_option || ""] || "";
    const opacity = ov.solid_opacity ?? 1;
    const rgbaColor = baseColor ? hexToRgba(baseColor, opacity) : "";

    overlayCSSRules = `background-color: ${rgbaColor};`;
  } else if (ov.option === "gradient") {
    const colorFrom =
      ov.gradient_from === "custom"
        ? formatHex(ov.gradient_from_custom || "")
        : theme[ov.gradient_from || ""] || "";
    const colorTo =
      ov.gradient_to === "custom"
        ? formatHex(ov.gradient_to_custom || "")
        : theme[ov.gradient_to || ""] || "";
    const degrees = ov.gradient_degrees || 0;
    const fromOpacity = ov.gradient_from_opacity ?? 1;
    const toOpacity = ov.gradient_to_opacity ?? 1;
    const rgbaFrom = colorFrom ? hexToRgba(colorFrom, fromOpacity) : "";
    const rgbaTo = colorTo ? hexToRgba(colorTo, toOpacity) : "";

    overlayCSSRules = `background-image: linear-gradient(${degrees}deg, ${rgbaFrom} 0%, ${rgbaTo} 100%);`;
  }

  return overlayCSSRules;
};

export const hexToRgba = (hex: string, opacity: number) => {
  let cleanHex = hex.replace("#", "");

  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  let r = parseInt(cleanHex.substring(0, 2), 16);
  let g = parseInt(cleanHex.substring(2, 4), 16);
  let b = parseInt(cleanHex.substring(4, 6), 16);

  if (isNaN(r)) r = 0;
  if (isNaN(g)) g = 0;
  if (isNaN(b)) b = 0;

  opacity = opacity > 1 ? opacity / 100 : opacity;
  opacity = Math.min(Math.max(opacity, 0), 1);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const formatHex = (hex: string) => (!hex.includes("#") ? `#${hex}` : hex);

export const getBgColor = (bg?: BackgroundColor) => {
  if (!bg) return { value: "", custom: undefined };

  const isBgColor = bg?.option !== "img" && bg?.option !== "custom";

  let value = isBgColor ? `${COLORS_BG[bg?.option || ""]}` : "bg-transparent";
  value = value === "undefined" ? "bg-transparent" : value;

  const custom =
    (bg?.option === "custom" && formatHex(bg?.color || "")) || undefined;

  const bgImg = bg?.option === "img" ? (bg?.img as Media) : undefined;
  const bgFit = bg?.object_fit;

  return { value, custom, opacity: bg?.opacity || "", img: bgImg, fit: bgFit };
};

export const getFontColor = (textColor?: TextColor) => {
  if (!textColor) return { value: "", custom: undefined };

  const value =
    textColor?.value !== "custom" ? COLORS_TEXT[textColor?.value || "primary"] : "";

  const custom = !value ? formatHex(textColor?.custom || "") : undefined;

  return { value, custom };
};
