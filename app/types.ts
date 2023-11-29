export type StoryStateItem = { title: string; imgUrl: string };

export enum Stage {
  Idea,
  SelectIdea,
  Page,
}

export type PageStateItem = {
  picUrl: string;
};

export type PageState = PageStateItem[];
