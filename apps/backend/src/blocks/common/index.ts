import { Block } from "payload/types";
import Button from "./button";
import Heading from "./heading";
import ImageCarousel from "./image-carousel";
import TextEditor from "./text-editor";
import EmbedBlock from "./embed";
import ImageBlock from "./image";
import Spacer from "./spacer";
import NavigationBlock from "./navigation";
import Link from "./link";
import CarouselV2 from "./carousel-v2";

export const CommonBlocks: Block[] = [
  Button,
  Link,
  Heading,
  ImageBlock,
  ImageCarousel,
  CarouselV2,
  TextEditor,
  EmbedBlock,
  Spacer,
  NavigationBlock,
];
