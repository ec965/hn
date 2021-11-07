import { hnApi } from "./api";

export default hnApi;
export type {
  Title,
  Updates,
  Story,
  ItemBase,
  Comment,
  Ask,
  Job,
  Poll,
  PollOpt,
  Item,
  User,
  ParentItem,
  ItemsWithChildren,
  ChildItem,
} from "./types";
export {
  isStory,
  isComment,
  isAsk,
  isJob,
  isPoll,
  isPollOpt,
  testDebugItem,
  isChildItem,
  isParentItem,
} from "./guards";
