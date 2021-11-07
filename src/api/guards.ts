import { Item, Story, Comment, Ask, Job, Poll, PollOpt } from "./types";

export function isStory(item: Item): item is Story {
  return item.type === "story" && "url" in item;
}

export function isComment(item: Item): item is Comment {
  return item.type === "comment";
}

export function isAsk(item: Item): item is Ask {
  return item.type === "story" && "text" in item;
}

export function isJob(item: Item): item is Job {
  return item.type === "job";
}

export function isPoll(item: Item): item is Poll {
  return item.type === "poll";
}

export function isPollOpt(item: Item): item is PollOpt {
  return item.type === "pollopt";
}
