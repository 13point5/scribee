"use client";

import StoryIdeaPage from "@/app/idea-page";
import SelectIdeaPage from "@/app/select-idea-page";
import StoryPage from "@/app/story-page";
import {
  StoryStateItem,
  Stage,
  PageState,
  FeedbacksForPage,
} from "@/app/types";
import { toDataURL } from "@/lib/utils";
import { useState } from "react";

const Home = () => {
  const [stories, setStories] = useState<StoryStateItem[] | null>(null);
  console.log("stories", stories);

  const [stage, setStage] = useState(Stage.Idea);
  console.log("stage", stage);

  const [storyIndex, setStoryIndex] = useState(0);
  console.log("storyIndex", storyIndex);

  const [pages, setPages] = useState<PageState>([]);
  console.log("pages", pages);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  console.log("currentPageIndex", currentPageIndex);

  const handleStartWriting = async (picUrl: string) => {
    console.log("handleStartWriting");
    setPages([
      {
        picUrl,
        feedbacks: null,
      },
    ]);
    setCurrentPageIndex(0);
    setStage(Stage.Page);
  };

  const handleSetStories = (stories: StoryStateItem[] | null) => {
    setStories(stories);

    if (stories) setStage(Stage.SelectIdea);
  };

  const setFeedbacks = (newFeedbacks: FeedbacksForPage) => {
    setPages((prevPages) =>
      prevPages.map((page, index) => {
        if (index !== currentPageIndex) return page;

        return {
          ...page,
          feedbacks: newFeedbacks,
        };
      })
    );
  };

  if (stage === Stage.Idea)
    return <StoryIdeaPage setStories={handleSetStories} setStage={setStage} />;

  if (stage === Stage.SelectIdea && stories)
    return (
      <SelectIdeaPage
        stories={stories}
        storyIndex={storyIndex}
        setStoryIndex={setStoryIndex}
        handleNext={handleStartWriting}
        setStage={setStage}
      />
    );

  if (
    stage === Stage.Page &&
    stories &&
    stories?.length > 0 &&
    pages.length > 0
  )
    return (
      <StoryPage
        title={stories[storyIndex].title}
        picUrl={pages[currentPageIndex].picUrl}
        feedbacks={pages[currentPageIndex].feedbacks}
        setFeedbacks={setFeedbacks}
        setStage={setStage}
        pageIndex={currentPageIndex}
      />
    );

  return <div>home</div>;
};

export default Home;
