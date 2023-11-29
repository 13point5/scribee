import { Button } from "@/components/ui/button";
import { SpeakerIcon, User2Icon } from "lucide-react";

const Header = () => {
  return (
    <div className="px-8 h-[55px] flex items-center justify-between w-full border-b bg-white">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Scribee
      </h3>

      <div className="flex items-center space-x-4">
        {/* <Button variant="ghost" size="icon">
          <SpeakerIcon />
        </Button> */}

        <Button variant="ghost" size="icon">
          <User2Icon />
        </Button>
      </div>
    </div>
  );
};

export default Header;
