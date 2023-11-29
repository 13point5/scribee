"use client";

import StoryIdeaPage from "@/app/idea-page";
import SelectIdeaPage from "@/app/select-idea-page";
import { StoryStateItem, Stage, PageState } from "@/app/types";
import { useState } from "react";

const Home = () => {
  const [stories, setStories] = useState<StoryStateItem[] | null>(null);
  console.log("stories", stories);

  const [stage, setStage] = useState(Stage.Idea);

  const [storyIndex, setStoryIndex] = useState(0);

  const [pages, setPages] = useState<PageState>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const handleStartWriting = (imgUrl: string) => {
    console.log("handleStartWriting");
    setPages([
      {
        imgUrl,
      },
    ]);
    setCurrentPageIndex(0);
    setStage(Stage.Page);
  };

  const handleSetStories = (stories: StoryStateItem[] | null) => {
    setStories(stories);

    if (stories) setStage(Stage.SelectIdea);
  };

  if (stage === Stage.Idea)
    return <StoryIdeaPage setStories={handleSetStories} />;

  if (stage === Stage.SelectIdea && stories)
    return (
      <SelectIdeaPage
        stories={stories}
        storyIndex={storyIndex}
        setStoryIndex={setStoryIndex}
        handleNext={handleStartWriting}
      />
    );

  if (stage === Stage.Page) return <p>page {currentPageIndex}</p>;

  return <div>home</div>;
};

export default Home;
