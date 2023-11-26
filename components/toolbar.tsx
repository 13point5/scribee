"use client";

import { track, useEditor } from "@tldraw/tldraw";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { EraserIcon, LassoSelectIcon, PencilIcon } from "lucide-react";

const Toolbar = track(() => {
  const editor = useEditor();

  const { currentToolId } = editor;

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Delete":
        case "Backspace": {
          editor.deleteShapes(editor.selectedShapeIds);
          break;
        }
        case "v": {
          editor.setCurrentTool("select");
          break;
        }
        case "e": {
          editor.setCurrentTool("eraser");
          break;
        }
        case "x":
        case "p":
        case "b":
        case "d": {
          editor.setCurrentTool("draw");
          break;
        }
      }
    };

    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  });

  return (
    <div className="fixed z-[300] inset-0 pointer-events-none bottom-0 flex items-center justify-center w-full">
      <div className="fixed bottom-0 left-auto flex items-center justify-center p-4 gap-2 pointer-events-auto bg-gray-100 rounded-tl-3xl rounded-tr-3xl">
        <Button
          onClick={() => editor.setCurrentTool("select")}
          size="icon"
          variant="ghost"
          className={`${
            currentToolId === "select" && "bg-white"
          } hover:bg-gray-200`}
        >
          <LassoSelectIcon />
        </Button>
        <Button
          onClick={() =>
            editor.setCurrentTool("draw", {
              data: {
                color: "red",
              },
            })
          }
          size="icon"
          variant="ghost"
          className={`${
            currentToolId === "draw" && "bg-white"
          } hover:bg-gray-200`}
        >
          <PencilIcon />
        </Button>
        <Button
          onClick={() => editor.setCurrentTool("eraser")}
          size="icon"
          variant="ghost"
          className={`${
            currentToolId === "eraser" && "bg-white"
          } hover:bg-gray-200`}
        >
          <EraserIcon />
        </Button>
      </div>
    </div>
  );
});

export default Toolbar;
