import {
  Match,
  onMount,
  Show,
  Switch,
  For,
  createResource,
  createSignal,
} from "solid-js";
import hnApi, { Job, isJob, isStory, isAsk, Story, Ask } from "../api";
import { useLocation } from "solid-app-router";
import style from "./pages.module.scss";
import { ListItem } from "../lib/ListItem";
import { LoadMoreButton } from "../lib/NavButtons/LoadMoreButton";
import { GoBackButton } from "../lib/NavButtons/GoBackButton";
import { pageQuery } from "../util/pageQuery";
import { NoContent } from "../lib/NoContent";
import { Loading } from "../lib/Loading";
import { NavButtons } from "../lib/NavButtons";

const PAGE_SIZE = 30;

interface GetPageArgs {
  ids: number[];
  page: number;
  pageSize: number;
}
async function getPage({
  ids,
  page,
  pageSize,
}: GetPageArgs): Promise<(Story | Ask | Job)[]> {
  const start = page * pageSize;
  const end = start + pageSize;
  const pageIds = ids.slice(start, end);

  const stories = await Promise.all(
    pageIds.map(async (id) => {
      const story = await hnApi.item(id);
      if (isStory(story) || isAsk(story) || isJob(story)) return story;
      else return false;
    })
  );
  const filteredStories = stories.filter((story): story is Story | Ask | Job =>
    Boolean(story)
  );
  return filteredStories;
}

export function Top() {
  const location = useLocation();
  const page = () => pageQuery(location);
  const [ids, setIds] = createSignal<number[]>([]);
  const [stories] = createResource(
    () => ({ ids: ids(), page: page(), pageSize: PAGE_SIZE }),
    getPage
  );

  onMount(async () => {
    const res = await hnApi.topStories();
    setIds(res);
  });

  return (
    <section class={style.page}>
      <Switch>
        <Match when={stories.loading}>
          <Loading />
        </Match>
        <Match when={page() * PAGE_SIZE > ids().length}>
          <NoContent />
        </Match>
        <Match when={!stories.loading}>
          <For each={stories()}>
            {(item, index) => (
              <ListItem
                index={index() + 1 + page() * PAGE_SIZE}
                url={"url" in item ? item.url : ""}
                {...item}
              />
            )}
          </For>
          <NavButtons
            showBackward={page() > 0}
            showForward={(stories() ?? []).length >= PAGE_SIZE}
          />
        </Match>
      </Switch>
    </section>
  );
}
