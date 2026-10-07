import React, { Fragment } from "react";
import escapeHTML from "escape-html";
import { Text, Node, BaseText, BaseEditor } from "slate";
import { decodeHTML4 } from "entities";
import { fontDefault, fontPrimary, fontSecondary } from "@/app/fonts";
import { TEXT_SIZES } from "@/constant-styles";

const getAlignmentClass = (node: any) => {
  switch (node?.textAlign) {
    case "center":
      return "text-center";
    case "right":
      return "text-right";
    case "left":
    default:
      return "text-left";
  }
};

export const serializeSlate = (children: any): string[] | JSX.Element[] =>
  children?.map((node: Node, i: number) => {
    if (Text.isText(node)) {
      let text: JSX.Element | string = decodeHTML4(escapeHTML(node.text));

      if ((node as BaseText).bold) {
        text = <strong key={`serializer_key_${i}`}>{text}</strong>;
      }

      if (node.code) {
        text = <code key={`serializer_key_${i}`}>{text}</code>;
      }

      if (node.italic) {
        text = <em key={`serializer_key_${i}`}>{text}</em>;
      }

      if (node.text === "") {
        text = <br />;
      }

      // Handle other leaf types here...

      return <Fragment key={`serializer_key_${i}`}>{text}</Fragment>;
    }

    const textAlignment = getAlignmentClass(node);

    if (!node) {
      return null;
    }

    switch ((node as BaseEditor).type) {
      case "h1":
        return (
          <h1
            key={`serializer_key_${i}`}
            className={`!text-9xl max-md:!text-7xl ${textAlignment} ${fontPrimary.className}`}
          >
            {serializeSlate(node.children)}
          </h1>
        );
      case "h2":
        return (
          <h2
            key={`serializer_key_${i}`}
            className={`!text-7xl max-md:!text-5xl ${textAlignment} ${fontPrimary.className}`}
          >
            {serializeSlate(node.children)}
          </h2>
        );
      case "h3":
        return (
          <h3
            key={`serializer_key_${i}`}
            className={`!text-5xl max-md:!text-3xl ${textAlignment} ${fontPrimary.className}`}
          >
            {serializeSlate(node.children)}
          </h3>
        );
      case "h4":
        return (
          <h4
            key={`serializer_key_${i}`}
            className={`!text-3xl max-md:!text-2xl ${textAlignment} ${fontPrimary.className}`}
          >
            {serializeSlate(node.children)}
          </h4>
        );
      case "h5":
        return (
          <h5
            key={`serializer_key_${i}`}
            className={`!text-2xl max-md:!text-xl ${textAlignment}`}
          >
            {serializeSlate(node.children)}
          </h5>
        );
      case "h6":
        return (
          <h6
            key={`serializer_key_${i}`}
            className={`!text-xl max-md:!text-lg ${textAlignment}`}
          >
            {serializeSlate(node.children)}
          </h6>
        );
      case "blockquote":
        return (
          <blockquote
            className={`text-lg max-md:text-sm italic`}
            key={`serializer_key_${i}`}
          >
            {serializeSlate(node.children)}
          </blockquote>
        );
      case "ul":
        return (
          <ul
            className={`flex flex-col gap-1 text-lg max-md:text-sm list-disc ${textAlignment}`}
            key={`serializer_key_${i}`}
          >
            {serializeSlate(node.children)}
          </ul>
        );
      case "ol":
        return (
          <ol
            className={`flex flex-col gap-1 text-lg max-md:text-sm list-decimal ${textAlignment}`}
            key={`serializer_key_${i}`}
          >
            {serializeSlate(node.children)}
          </ol>
        );
      case "li":
        return (
          <li
            className={`text-lg max-md:text-sm list-item list-inside ${textAlignment}`}
            key={`serializer_key_${i}`}
          >
            {serializeSlate(node.children)}
          </li>
        );
      case "link":
        return (node as BaseEditor)?.newTab ? (
          <a
            className={`link-primary font-bold underline ${textAlignment}`}
            href={escapeHTML(node.url)}
            key={`serializer_key_${i}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {serializeSlate(node.children)}
          </a>
        ) : (
          <a
            className={`link-primary font-bold underline ${textAlignment}`}
            href={escapeHTML(node.url)}
            key={`serializer_key_${i}`}
          >
            {serializeSlate(node.children)}
          </a>
        );

      default:
        return (
          <p
            key={`serializer_key_${i}`}
            className={`${TEXT_SIZES["lg"].join(" ")} ${textAlignment}`}
          >
            {serializeSlate(node.children)}
          </p>
        );
    }
  });
