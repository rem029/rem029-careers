import { fontDefault, fontPrimary, fontSecondary } from "@/app/fonts";
import { COLORS_TEXT } from "@/constant-styles";
import { serializeSlate } from "@/lib/serialize";
import { BlockTextEditor } from "@/payload-types";
import { formatHex } from "@/utils/helpers";
import { CSSProperties } from "react";

export interface TextEditorProps {
  block: BlockTextEditor;
}

const fonts: Record<NonNullable<BlockTextEditor["text_font"]>, string> = {
  default: fontDefault.className,
  primary: fontPrimary.className,
  secondary: fontSecondary.className,
};

export default function TextEditor({ block }: TextEditorProps): JSX.Element {
  const color =
    block.color?.value !== "custom"
      ? COLORS_TEXT[block.color?.value || "primary"]
      : "";

  const styleColor: CSSProperties = !color
    ? { color: formatHex(block.color?.custom || "") || undefined }
    : {};

  const font = block?.text_font ? fonts[block.text_font] : fonts.default;

  const className = `w-full ${color} ${font}`;

  return (
    <span className={className} style={styleColor}>
      {serializeSlate(block?.text)}
    </span>
  );
}
