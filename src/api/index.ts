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
} from "./types";
export { isStory, isComment, isAsk, isJob, isPoll, isPollOpt } from "./guards";
