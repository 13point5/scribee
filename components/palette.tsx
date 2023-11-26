import { Button } from "@/components/ui/button";

const tailwindColors = [
  "bg-rose-900",
  "bg-sky-400",
  "bg-green-500",
  "bg-yellow-300",
  "bg-orange-400",
  "bg-red-600",
  "bg-gray-400",
  "bg-black",
];

const Palette = () => {
  return (
    <div className="fixed top-[80px] z-[300] inset-0 pointer-events-none">
      <div className="fixed w-full flex gap-2 items-center justify-center pointer-events-auto">
        {tailwindColors.map((color, index) => (
          <PaletteColor color={color} key={color} active={false} />
        ))}
      </div>
    </div>
  );
};

export default Palette;

const PaletteColor = ({
  color,
  active,
}: {
  color: string;
  active: boolean;
}) => {
  return (
    <Button
      variant="ghost"
      className={`rounded-full h-15 w-15 p-3 ${
        active && "bg-gray-200 hover:bg-gray-200"
      }`}
    >
      <div className={`w-8 h-8 rounded-full ${color}`}></div>
    </Button>
  );
};
