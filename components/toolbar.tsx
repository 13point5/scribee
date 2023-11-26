"use client";

import { track, useEditor } from "@tldraw/tldraw";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const Toolbar = track(() => {
  const editor = useEditor();

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
    <div className="fixed z-[300] inset-0 pointer-events-none bottom-0">
      <div className="fixed bottom-0 left-0 w-full flex items-center justify-center p-2 gap-2 pointer-events-auto">
        <Button
          data-isactive={editor.currentToolId === "select"}
          onClick={() => editor.setCurrentTool("select")}
        >
          Select
        </Button>
        <Button
          data-isactive={editor.currentToolId === "draw"}
          onClick={() => editor.setCurrentTool("draw")}
        >
          Pencil
        </Button>
        <Button
          data-isactive={editor.currentToolId === "eraser"}
          onClick={() => editor.setCurrentTool("eraser")}
        >
          Eraser
        </Button>
      </div>
    </div>
  );
});

export default Toolbar;
