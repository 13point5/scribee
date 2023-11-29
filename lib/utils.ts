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

export const toDataURL = async (
  url: string
): Promise<string | ArrayBuffer | null> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    // Handle any errors that occur during the fetch, blob, or read operations
    console.error(error);
    throw error;
  }
};

export const dataURLtoFile = (dataurl: string, filename: string) => {
  let arr = dataurl.split(","),
    mime = arr[0]?.match(/:(.*?);/)?.[1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export const b64_json_to_dataUrl = (b64_json_str: string) =>
  `data:image/png;base64,${b64_json_str}`;
// `data:image/octet-stream;base64,${b64_json_str}`;
