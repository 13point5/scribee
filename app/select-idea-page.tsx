import { StageSetter, StoryStateItem } from "@/app/types";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { b64_json_to_dataUrl } from "@/lib/utils";
import axios from "axios";
import { ArrowRightIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";

const SelectIdeaPage = ({
  stories,
  storyIndex,
  setStoryIndex,
  handleNext,
  setStage,
}: {
  stories: StoryStateItem[];
  storyIndex: number;
  setStoryIndex: (index: number) => void;
  handleNext: (imgUrl: string) => void;
  setStage: StageSetter;
}) => {
  const [loading, setLoading] = useState(false);

  const handleStartWriting = async () => {
    setLoading(true);

    try {
      const story = stories[storyIndex];

      const res = await axios.post("/api/genPagePic", {
        story: story.title,
      });
      console.log("res", res);

      handleNext(b64_json_to_dataUrl(res.data.image));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <Header setStage={setStage} />

      <div className="w-[745px] h-full grow flex flex-col gap-8 items-center py-10 px-15">
        <img
          src={stories[storyIndex].imgUrl}
          className="rounded-lg h-[300px]"
          alt={stories[storyIndex].title}
        />

        <div className="flex flex-col gap-2 justify-center items-center text-lg">
          <p>That sounds like a fantastic theme for a story!</p>
          <p>Here are 3 story ideas you can explore</p>
        </div>

        <div className="flex flex-wrap gap-4 items-center justify-center h-fit">
          {stories.map((story, index) => (
            <div
              className={`flex-grow flex-shrink-0 basis-auto border-4 rounded-lg p-5 cursor-pointer ${
                index === storyIndex && "border-yellow-300"
              }`}
              key={story.imgUrl}
              onClick={() => setStoryIndex(index)}
            >
              <p className="text-xl font-semibold text-center">{story.title}</p>
            </div>
          ))}
        </div>

        <Button onClick={handleStartWriting}>
          Next
          {loading ? (
            <Loader2Icon className="animate-spin ml-2" />
          ) : (
            <ArrowRightIcon className="ml-2" />
          )}
        </Button>
      </div>
    </main>
  );
};

export default SelectIdeaPage;
