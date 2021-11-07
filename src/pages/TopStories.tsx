import { onMount, Show, For, createResource, createSignal } from "solid-js";
import hnApi, { Job, isJob, isStory, isAsk, Story, Ask } from "../api";
import { useNavigate, useParams } from "solid-app-router";
import style from "./pages.module.scss";
import { ListItem } from "../lib/ListItem";

const PAGE_SIZE = 30;

interface GetStoryArgs {
  ids: number[];
  page: number;
  pageSize: number;
}
async function getStories({
  ids,
  page,
  pageSize,
}: GetStoryArgs): Promise<(Story | Ask | Job)[]> {
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

export function TopStories() {
  const params = useParams<{ page?: string }>();
  const page = () => {
    if (!params.page) return 0;
    const page = parseInt(params.page);
    return isNaN(page) ? 0 : page;
  };
  const navigate = useNavigate();
  const [ids, setIds] = createSignal<number[]>([]);
  const [stories] = createResource(
    () => ({ ids: ids(), page: page(), pageSize: PAGE_SIZE }),
    getStories
  );

  onMount(async () => {
    const res = await hnApi.topStories();
    setIds(res);
  });

  return (
    <section class={style.page}>
      <Show when={!stories.loading} fallback={() => <h6>Loading...</h6>}>
        <Show
          when={(stories() ?? []).length > 0}
          fallback={() => <h5>No more content</h5>}
        >
          <For each={stories()}>
            {(item, index) => (
              <ListItem
                index={index() + 1 + parseInt(params.page ?? "0") * PAGE_SIZE}
                url={"url" in item ? item.url : ""}
                {...item}
              />
            )}
          </For>
          <Show when={(stories() ?? []).length >= PAGE_SIZE}>
            <button onClick={() => navigate(`/${page() + 1}`)}>
              Load More
            </button>
          </Show>
        </Show>
      </Show>
    </section>
  );
}
