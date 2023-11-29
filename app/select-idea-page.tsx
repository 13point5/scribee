import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { useState } from "react";

const stories = [
  {
    imgUrl:
      "https://oaidalleapiprodscus.blob.core.windows.net/private/org-thwguH1bYRgf3CYtswoIbAr2/user-iW5doYaXhVJ3yI16hmqsyvL1/img-jD8R3R6mEfI6vbaMVyUAur9q.png?st=2023-11-29T14%3A42%3A43Z&se=2023-11-29T16%3A42%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-29T12%3A44%3A36Z&ske=2023-11-30T12%3A44%3A36Z&sks=b&skv=2021-08-06&sig=gKpoDzqnZiUXejqSkWZhp2uHsWsVBnak470hF5KHJZg%3D",
    title: "Daisy's Cat Adventure",
  },
  {
    imgUrl:
      "https://oaidalleapiprodscus.blob.core.windows.net/private/org-thwguH1bYRgf3CYtswoIbAr2/user-iW5doYaXhVJ3yI16hmqsyvL1/img-pBxtOXhsuHIG5xcXn4M5IzxJ.png?st=2023-11-29T14%3A42%3A43Z&se=2023-11-29T16%3A42%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-28T20%3A03%3A54Z&ske=2023-11-29T20%3A03%3A54Z&sks=b&skv=2021-08-06&sig=%2BNjEyNuxB4%2BGnYqCL/3/nLeE1G6R1C64deGT/uyOoWc%3D",
    title: "The Mischievous Kitty",
  },
  {
    imgUrl:
      "https://oaidalleapiprodscus.blob.core.windows.net/private/org-thwguH1bYRgf3CYtswoIbAr2/user-iW5doYaXhVJ3yI16hmqsyvL1/img-ui5VG5FZG8jsdTYKfh8CUpz3.png?st=2023-11-29T14%3A42%3A41Z&se=2023-11-29T16%3A42%3A41Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-29T11%3A14%3A25Z&ske=2023-11-30T11%3A14%3A25Z&sks=b&skv=2021-08-06&sig=sRmD6C9WogSkQnSUUrIkOlaPRTf4n4B7d3bsvejldIc%3D",
    title: "The Magical Cat Kingdom",
  },
];

const SelectIdeaPage = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const handleStartWriting = () => {
    console.log("bla");
  };

  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <Header />

      <div className="w-[745px] h-full grow flex flex-col gap-8 items-center py-10 px-15">
        <img
          src={stories[currentStoryIndex].imgUrl}
          className="rounded-lg h-[300px]"
          alt={stories[currentStoryIndex].title}
        />

        <div className="flex flex-col gap-2 justify-center items-center text-xl">
          <p>That sounds like a fantastic theme for a story!</p>
          <p>Here are 3 story ideas you can explore</p>
        </div>

        <div className="flex gap-4 items-center justify-center h-fit">
          {stories.map((story, index) => (
            <div
              className={`flex-grow flex-shrink-0 basis-auto border-4 rounded-lg p-5 cursor-pointer ${
                index === currentStoryIndex && "border-yellow-300"
              }`}
              key={story.imgUrl}
              onClick={() => setCurrentStoryIndex(index)}
            >
              <p className="text-2xl font-semibold text-center">
                {story.title}
              </p>
            </div>
          ))}
        </div>

        <Button onClick={handleStartWriting}>
          Next <ArrowRightIcon className="ml-2" />
          {/* {loading ? (
        <Loader2Icon className="animate-spin ml-2" />
      ) : (
        <ArrowRightIcon className="ml-2" />
      )} */}
        </Button>
      </div>
    </main>
  );
};

export default SelectIdeaPage;
