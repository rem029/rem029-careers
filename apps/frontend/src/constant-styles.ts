import { NextFont } from "next/dist/compiled/@next/font";
import { fontDefault, fontPrimary, fontSecondary } from "./app/fonts";
import {
  TextColor,
  BackgroundColor,
  ButtonBlock,
  BorderRadius,
} from "./payload-types";

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
};

export const COLORS_TEXT: Record<
  Exclude<TextColor["value"], null | undefined | "custom">,
  string
> = {
  primary: "text-primary",
  secondary: "text-secondary",
  success: "text-success",
  warning: "text-warning",
  information: "text-information",
  error: "text-error",
  accent: "text-accent",
};

export const FONTS_STYLES: Record<"default" | "primary" | "secondary", NextFont> = {
  default: fontDefault,
  primary: fontPrimary,
  secondary: fontSecondary,
};

export const COLORS_BG: Record<
  Exclude<BackgroundColor["color"], null | undefined | "custom">,
  string
> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  success: "bg-success",
  warning: "bg-warning",
  information: "bg-information",
  error: "bg-error",
  accent: "bg-accent",
};

export const TEXT_ALIGNMENT: Record<string, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export const ELEMENT_SIZE: Record<string, string> = {
  h1: "text-9xl max-md:text-7xl",
  h2: "text-7xl max-md:text-5xl",
  h3: "text-5xl max-md:text-3xl",
  h4: "text-3xl max-md:text-2xl",
  h5: "text-2xl max-md:text-xl",
  h6: "text-xl max-md:text-lg",
  p: "text-lg max-md:text-sm",
};

export const TEXT_SIZES: Record<string, string[]> = {
  "4xl": ["text-4xl", "max-md:text-2xl"],
  "2xl": ["text-2xl", "max-md:text-xl"],
  xl: ["text-xl", "max-md:text-lg"],
  lg: ["text-lg", "max-md:text-sm"],
  sm: ["text-sm", "max-md:text-xs"],
  xs: ["text-xs", "max-md:text-xs"],
};

export const VARIANTS: Record<NonNullable<ButtonBlock["variant"]>, string> = {
  default: "btn-secondary",
  primary: "btn-primary",
  secondary: "btn-secondary",
};

export const BORDER_RADIUS: Record<NonNullable<BorderRadius["value"]>, string> = {
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
  lg: "rounded-lg",
  md: "rounded-md",
  none: "rounded-none",
  sm: "rounded-sm",
  xl: "rounded-xl",
  xs: "rounded-xs",
};
