import {
  Match,
  onMount,
  Show,
  Switch,
  For,
  createResource,
  createSignal,
} from "solid-js";
import hnApi, { Job, Story, Ask } from "../api";
import { useNavigate, useParams } from "solid-app-router";
import style from "./pages.module.scss";
import { ListItem } from "../lib/ListItem";

export interface GetPageArgs {
  ids: number[];
  page: number;
  pageSize: number;
}
export interface ListProps {
  getPage: (args: GetPageArgs) => Promise<(Story | Ask | Job)[]>;
  pageSize: number;
  route: string;
}
export function PageList(props: ListProps) {
  const params = useParams<{ page?: string }>();
  const page = () => {
    if (!params.page) return 0;
    const page = parseInt(params.page);
    return isNaN(page) ? 0 : page;
  };
  const navigate = useNavigate();
  const [ids, setIds] = createSignal<number[]>([]);
  const [stories] = createResource(
    () => ({ ids: ids(), page: page(), pageSize: props.pageSize }),
    props.getPage
  );

  onMount(async () => {
    const res = await hnApi.topStories();
    setIds(res);
  });

  const handleNextPage = () => {
    navigate(`/${page() + 1}`);
  };

  const handleGoBack = () => {
    const lastPage = page() - 1;
    const goTo = lastPage === 0 ? "/" : `/${lastPage}`;
    navigate(goTo);
  };

  return (
    <section class={style.page}>
      <Switch>
        <Match when={stories.loading}>
          <h5>Loading...</h5>
        </Match>
        <Match when={page() * props.pageSize > ids().length}>
          <h5>No more content</h5>
        </Match>
        <Match when={!stories.loading}>
          <For each={stories()}>
            {(item, index) => (
              <ListItem
                index={index() + 1 + page() * props.pageSize}
                url={"url" in item ? item.url : ""}
                {...item}
              />
            )}
          </For>
          <Show when={page() > 0}>
            <button onClick={handleGoBack}>Go Back</button>
          </Show>
          <Show when={(stories() ?? []).length >= props.pageSize}>
            <button onClick={handleNextPage}>Load More</button>
          </Show>
        </Match>
      </Switch>
    </section>
  );
}
