import { fontPrimary } from "@/app/fonts";
import { COLORS_TEXT, TEXT_ALIGNMENT, ELEMENT_SIZE } from "@/constant-styles";
import { BlockHeading } from "@/payload-types";

import { formatHex } from "@/utils/helpers";
import { CSSProperties, Fragment } from "react";

export interface HeadingProps {
  block: BlockHeading;
}

export default function Heading({ block }: HeadingProps): JSX.Element {
  const color =
    block.color?.value !== "custom"
      ? COLORS_TEXT[block.color?.value || "primary"]
      : "";

  const fontBold = block?.font_bold ? "font-bold" : "";

  const styleColor: CSSProperties = !color
    ? { color: formatHex(block.color?.custom || "") || undefined }
    : {};

  const className = block?.full_width
    ? `${color} ${fontBold} w-full ${TEXT_ALIGNMENT[block?.text_alignment || ""]}`
    : `${color} ${fontBold} ${TEXT_ALIGNMENT[block?.text_alignment || ""]}`;

  const textSize = ELEMENT_SIZE[block?.text_size || ""];

  switch (block.variant_element) {
    case "h1": {
      return (
        <h1
          className={`${fontPrimary.className} ${className} ${textSize}`}
          style={styleColor}
        >
          {block?.text || ""}
        </h1>
      );
    }
    case "h2": {
      return (
        <h2
          className={`${fontPrimary.className} ${className} ${textSize}`}
          style={styleColor}
        >
          {block?.text || ""}
        </h2>
      );
    }
    case "h3": {
      return (
        <h3
          className={`${fontPrimary.className} ${className} ${textSize}`}
          style={styleColor}
        >
          {block?.text || ""}
        </h3>
      );
    }
    case "h4": {
      return (
        <h4
          className={`${fontPrimary.className} ${className} ${textSize}`}
          style={styleColor}
        >
          {block?.text || ""}
        </h4>
      );
    }
    case "h5": {
      return (
        <h5
          className={`${fontPrimary.className} ${className} ${textSize}`}
          style={styleColor}
        >
          {block?.text || ""}
        </h5>
      );
    }
    case "h6": {
      return (
        <h6
          className={`${fontPrimary.className} ${className} ${textSize}`}
          style={styleColor}
        >
          {block?.text || ""}
        </h6>
      );
    }
    case "p": {
      return (
        <p
          className={`${fontPrimary.className} ${className} ${textSize}`}
          style={styleColor}
        >
          {block?.text || ""}
        </p>
      );
    }
    default: {
      return <Fragment>{block?.text || ""}</Fragment>;
    }
  }
}
