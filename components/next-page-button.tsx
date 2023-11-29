import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { track, useEditor, Editor } from "@tldraw/tldraw";
import { getSvgAsImage } from "./export";

function blobToBase64(blob: Blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export const exportAs = async (editor: Editor) => {
  const svg = await editor.getSvg([...editor.currentPageShapeIds]);

  if (!svg) {
    throw new Error("Could not construct SVG.");
  }

  const format = "png";

  const image = await getSvgAsImage(svg, editor.environment.isSafari, {
    type: format,
    quality: 1,
    scale: 2,
  });
  if (!image) throw Error();

  const b64 = await blobToBase64(image);
  return b64;
};

const NextPageButton = track(() => {
  const editor = useEditor();

  const getCanvasImage = async () => {
    console.log(await exportAs(editor));
  };

  return (
    <div className="fixed top-[50%] right-[0px] left-0 z-[300] inset-0 pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-end fixed right-[50px]">
        <Button onClick={getCanvasImage}>
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
});

export default NextPageButton;
