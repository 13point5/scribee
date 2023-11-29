import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const NextPageButton = () => {
  return (
    <div className="fixed top-[50%] right-[0px] left-0 z-[300] inset-0 pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-end fixed right-[50px]">
        <Button>
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};

export default NextPageButton;
