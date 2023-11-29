"use client";

import { useCallback } from "react";
import Header from "@/components/header";
import NextPageButton from "@/components/next-page-button";
import Palette from "@/components/palette";
import Toolbar from "@/components/toolbar";
import { Canvas, Tldraw, Editor, Box2d, StyleProp } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

function dataURLtoFile(dataurl: string, filename: string) {
  let arr = dataurl.split(","),
    mime = arr[0]?.match(/:(.*?);/)?.[1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

const DefaultSizeStyle = StyleProp.defineEnum("tldraw:size", {
  defaultValue: "m",
  values: ["s", "m", "l", "xl"],
});

export default function StoryPage() {
  const insertImg = async (editor: Editor) => {
    // const imgFile = dataURLtoFile("", "bla.png");

    // await editor.putExternalContent({
    //   type: "files",
    //   files: Array.from([imgFile]),
    //   ignoreParent: true,
    // });

    editor.batch(() => {
      if (editor.isIn("select")) {
        editor.setStyleForSelectedShapes(DefaultSizeStyle, "m", {
          squashing: false,
        });
      }
      editor.setStyleForNextShapes(DefaultSizeStyle, "m", {
        squashing: false,
      });
      editor.updateInstanceState({ isChangingStyle: true });
    });

    editor.setCurrentTool("draw");
  };

  const handleMount = useCallback((editor: Editor) => {
    insertImg(editor);
  }, []);

  return (
    <main className="flex flex-col items-center relative overflow-hidden">
      <Header />

      <div className="w-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center mt-[105px] w-[900px] h-[385px]">
          <Tldraw hideUi onMount={handleMount} className="rounded-lg">
            <Palette />
            <Canvas />

            <div className="z-[300] fixed bottom-[45px] left-[50px]">
              <img src="scribee1.svg" className="w-20" alt="scribee" />
            </div>

            <Toolbar />

            <NextPageButton />
          </Tldraw>
        </div>
      </div>
    </main>
  );
}
