export type StoryStateItem = { title: string; imgUrl: string };

export enum Stage {
  Idea,
  SelectIdea,
  Page,
}

export type PageStateItem = {
  picUrl: string;
  feedbacks: FeedbacksForPage;
};

export type PageState = PageStateItem[];

export type FeedbacksForPage = null | {
  mechanics: string;
  creative: string;
};

export type StageSetter = (stage: Stage) => void;
