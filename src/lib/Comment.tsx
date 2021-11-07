import { DateTime } from "luxon";
import { Index, Show, createSignal, onMount } from "solid-js";

import hnApi, { Comment as CommentData, isComment } from "../api";
import { timeSince } from "../util/timeSince";
import style from "./Comment.module.scss";

interface CommentProps {
  id: number;
}
export function Comment(props: CommentProps) {
  const [item, setItem] = createSignal<CommentData>();

  onMount(async () => {
    const res = await hnApi.item(props.id);
    if (!isComment(res))
      throw new Error(
        "Comment component tried to process an item that isn't a comment"
      );
    if (res.deleted) {
      res.by = "[deleted]";
      res.text = "-- removed --";
    }
    setItem(res);
  });

  return (
    <Show when={item() !== undefined}>
      <article>
        <section class={style.comment}>
          <h5>
            {(item() as CommentData).by}{" "}
            {timeSince(DateTime.fromSeconds((item() as CommentData).time))} ago
          </h5>
          <div innerHTML={(item() as CommentData).text} />
        </section>
        <Index each={(item() as CommentData).kids}>
          {(kid) => (
            <div class={style.child}>
              <Comment id={kid()} />
            </div>
          )}
        </Index>
      </article>
    </Show>
  );
}
