import { useLocation, useParams } from "solid-app-router";
import {
  For,
  Match,
  Switch,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";

import { ContentType } from "../Paths";
import hnApi, { ParentItem, isParentItem } from "../api";
import { config } from "../config";
import { ListItem } from "../lib/ListItem";
import { Loading } from "../lib/Loading";
import { NavButtons } from "../lib/NavButtons";
import { NoContent } from "../lib/NoContent";
import { pageQuery } from "../util/pageQuery";
import style from "./pages.module.scss";

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
}: GetPageArgs): Promise<ParentItem[]> {
  const start = page * pageSize;
  const end = start + pageSize;
  const pageIds = ids.slice(start, end);

  const items = await Promise.all(
    pageIds.map(async (id) => await hnApi.item(id))
  );
  return items.filter((item): item is ParentItem => isParentItem(item));
}

function mapContentTypeToApi(contentType: ContentType | undefined) {
  switch (contentType) {
    case "ask":
      return hnApi.askStories();
    case "new":
      return hnApi.newStories();
    case "best":
      return hnApi.bestStories();
    case "jobs":
      return hnApi.jobStories();
    case "show":
      return hnApi.showStories();
    default:
      return hnApi.topStories();
  }
}

function mapContentTypeToLimit(contentType: ContentType | undefined) {
  switch (contentType) {
    case "ask":
    case "jobs":
    case "show":
      return config.LIMIT_JOB_ASK_SHOW;
    case "new":
    case "best":
    default:
      return config.LIMIT_TOP_NEW_BEST;
  }
}

export function Main() {
  const location = useLocation();
  const params = useParams<{ contentType?: ContentType }>();
  const page = () => pageQuery(location);
  const [ids, setIds] = createSignal<number[]>([]);
  const [stories] = createResource(
    () => ({ ids: ids(), page: page(), pageSize: PAGE_SIZE }),
    getPage
  );

  createEffect(async () => {
    const res = await mapContentTypeToApi(params.contentType);
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
        <Match when={!stories.loading && ids().length > 0}>
          <For each={stories()}>
            {(item, index) => (
              <ListItem
                index={index() + 1 + page() * PAGE_SIZE}
                url={"url" in item ? item.url : undefined}
                {...item}
              />
            )}
          </For>
          <NavButtons
            showBackward={page() > 0}
            showForward={
              (page() + 1) * PAGE_SIZE <
              mapContentTypeToLimit(params.contentType)
            }
          />
        </Match>
      </Switch>
    </section>
  );
}
