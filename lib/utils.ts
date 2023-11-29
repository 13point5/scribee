import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { track, useEditor, Editor, resizeBox } from "@tldraw/tldraw";
import { getSvgAsImage } from "./export";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function blobToBase64(blob: Blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export const exportAs = async (editor: Editor) => {
  console.log({
    shapeIds: [...editor.currentPageShapeIds],
    shapes: editor.currentPageShapes,
  });
  const shapes = editor.currentPageShapes;
  const filteredShapeIds = shapes
    .filter((shape) => shape.type !== "image")
    .map((shape) => shape.id);
  const svg = await editor.getSvg(filteredShapeIds);

  if (!svg) {
    throw new Error("Could not construct SVG.");
  }

  const format = "png";

  const image = await getSvgAsImage(svg, editor.environment.isSafari, {
    type: format,
    quality: 1,
    scale: 2,
  });
  return image;
  // if (!image) throw Error();

  // const b64 = await blobToBase64(image);
  // return b64;
};
