"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { StyleProp, track, useEditor } from "@tldraw/tldraw";

const tailwindColors = [
  "bg-black",
  "bg-gray-400",
  "bg-sky-400",
  "bg-yellow-300",
  "bg-orange-400",
  "bg-green-500",
  "bg-red-600",
];

const colors = [
  "black",
  "grey",
  "blue",
  "yellow",
  "orange",
  "green",
  "red",
] as const;

const DefaultColorStyle = StyleProp.defineEnum("tldraw:color", {
  defaultValue: "black",
  values: colors,
});

function useStyleChangeCallback() {
  const editor = useEditor();

  return React.useMemo(() => {
    return function handleStyleChange<T>(
      style: StyleProp<T>,
      value: T,
      squashing: boolean
    ) {
      editor.batch(() => {
        if (editor.isIn("select")) {
          editor.setStyleForSelectedShapes(style, value, { squashing });
        }
        editor.setStyleForNextShapes(style, value, { squashing });
        editor.updateInstanceState({ isChangingStyle: true });
      });
    };
  }, [editor]);
}

const Palette = track(() => {
  const handleValueChange = useStyleChangeCallback();

  const [currentColor, setCurrentColor] = React.useState<string>(colors[0]);

  const handleButtonClick = (e: React.PointerEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;

    setCurrentColor(id);
    handleValueChange(DefaultColorStyle, id, false);
  };

  return (
    <div className="fixed top-[70px] z-[300] inset-0 pointer-events-none">
      <div className="fixed w-full flex gap-2 items-center justify-center pointer-events-auto">
        {tailwindColors.map((color, index) => (
          <PaletteColor
            color={color}
            key={color}
            index={index}
            active={colors[index] === currentColor}
            onClick={handleButtonClick}
          />
        ))}
      </div>
    </div>
  );
});

export default Palette;

const PaletteColor = ({
  color,
  active,
  index,
  onClick,
}: {
  color: string;
  active: boolean;
  index: number;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <Button
      id={colors[index]}
      onClick={onClick}
      variant="ghost"
      className={`rounded-full h-15 w-15 p-3 ${active && "h-20 w-20"}`}
    >
      <div
        className={`rounded-full ${color} ${active ? "w-12 h-12" : "w-8 h-8"}`}
      ></div>
    </Button>
  );
};
