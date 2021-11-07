import { useParams } from "solid-app-router";
import { Index, Show, createSignal, onMount } from "solid-js";

import hnApi, { Ask, ItemsWithChildren, Story } from "../api";
import { Comment } from "../lib/Comment";
import { ListItem } from "../lib/ListItem";
import { Loading } from "../lib/Loading";
import style from "./pages.module.scss";

export function Item() {
  const params = useParams<{ id: string }>();
  const [item, setItem] = createSignal<ItemsWithChildren>();

  onMount(async () => {
    const res = (await hnApi.item(parseInt(params.id))) as ItemsWithChildren;
    if (res.descendants && res.kids) {
      const kids = await Promise.all(
        res.kids.map((kidId) => hnApi.item(kidId))
      );
      console.log(kids);
    }
    console.log(res);
    setItem(res as Story & Ask);
  });

  return (
    <Show when={item() !== undefined} fallback={() => <Loading />}>
      <section class={style.page}>
        <ListItem {...(item() as ItemsWithChildren)} />
        <Index each={(item() as ItemsWithChildren).kids}>
          {(kid) => <Comment id={kid()} />}
        </Index>
      </section>
    </Show>
  );
}
