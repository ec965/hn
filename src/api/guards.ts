import {
  Item,
  Story,
  Comment,
  Ask,
  Job,
  Poll,
  PollOpt,
  ParentItem,
  ChildItem,
} from "./types";

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

export function testDebugItem(item: Item): void {
  if (isStory(item)) return console.log("story");
  if (isComment(item)) return console.log("comment");
  if (isAsk(item)) return console.log("ask");
  if (isJob(item)) return console.log("job");
  if (isPoll(item)) return console.log("poll");
  if (isPollOpt(item)) return console.log("pollopt");
}

export function isParentItem(item: Item): item is ParentItem {
  return "descendants" in item || item.type === "job";
}

export function isChildItem(item: Item): item is ChildItem {
  return isPollOpt(item) || isComment(item);
}
