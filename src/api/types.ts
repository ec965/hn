export type Route =
  | `item/${number}`
  | "updates"
  | `user/${string}`
  | "maxitem"
  | `${"ask" | "show" | "job" | "top" | "new" | "best"}stories`;

export interface Updates {
  items: number[];
  profiles: string[];
}

export interface ItemBase {
  deleted?: true;
  dead?: true;
  by: string;
  id: number;
}

// Parent/Title items
export type ParentItem = Story | Ask | Poll | Job;
export type ItemsWithChildren = Story | Ask | Poll;

export interface Story extends ItemBase {
  descendants: number;
  kids?: number[];
  time: number;
  title: string;
  type: "story";
  url: string;
  score: number;
}

export interface Ask extends ItemBase {
  descendants: number;
  kids?: number[];
  text: string;
  time: number;
  title: string;
  type: "story";
  score: number;
}

export interface Job extends ItemBase {
  text: string;
  time: number;
  title: string;
  type: "job";
  url: string;
  score: number;
}

export interface Poll extends ItemBase {
  descendants: number;
  kids?: number[];
  parts: number[];
  text: string;
  time: number;
  title: string;
  type: "poll";
  score: number;
}

// Children Items
export type ChildItem = PollOpt | Comment;

export interface PollOpt extends ItemBase {
  poll: number;
  text: string;
  time: number;
  type: "pollopt";
  score: number;
}

export interface Comment extends ItemBase {
  kids: number[];
  parent: number;
  text: string;
  time: number;
  type: "comment";
}

export type Item = Story | Comment | Ask | Job | Poll | PollOpt;
export type Title = Story | Ask | Job | Poll;

export interface User {
  about: string;
  created: number;
  delay: number;
  id: string;
  karma: number;
  submitted: number[];
}
