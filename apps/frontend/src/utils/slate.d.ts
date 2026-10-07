import { BaseElement } from "slate";

declare module "slate" {
  export interface BaseText {
    bold: boolean;
    code: boolean;
    italic: boolean;
  }
  export interface BaseEditor {
    type: string;
    url: string;
    newTab?: boolean;
  }
  export interface BaseElement {
    url: string;
  }
}
