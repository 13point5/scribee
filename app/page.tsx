"use client";

import StoryIdeaPage from "@/app/idea-page";
import SelectIdeaPage from "@/app/select-idea-page";
import { StoryStateItem, Stage } from "@/app/types";
import { useState } from "react";

const Home = () => {
  const [stories, setStories] = useState<StoryStateItem[] | null>(null);
  console.log("stories", stories);

  const [stage, setStage] = useState(Stage.SelectIdea);

  const handleSetStories = (stories: StoryStateItem[] | null) => {
    setStories(stories);

    if (stories) setStage(Stage.SelectIdea);
  };

  if (stage === Stage.Idea)
    return <StoryIdeaPage setStories={handleSetStories} />;

  if (stage === Stage.SelectIdea) return <SelectIdeaPage />;

  return <div>home</div>;
};

export default Home;
