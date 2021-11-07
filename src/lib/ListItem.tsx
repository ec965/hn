import { DateTime } from "luxon";
import { Link } from "solid-app-router";
import { Show } from "solid-js";

import { timeSince } from "../util/timeSince";
import style from "./ListItem.module.scss";

interface ListItemProps {
  index?: number;
  id: number;
  title: string;
  time: number;
  // either external link or link to comments
  url?: string;
  descendants?: number;
  by: string;
  score: number;
}
export function ListItem(props: ListItemProps) {
  return (
    <article>
      <div class={style.title}>
        <h4>
          <Show when={typeof props.index === "number"}>{props.index}. </Show>
          <Show when={props.url} fallback={<>{props.title}</>}>
            <a href={props.url} target="_blank" title={props.title}>
              {props.title}
            </a>
          </Show>
        </h4>
        <Show when={props.url}>
          <h6>{props.url && `(${new URL(props.url).hostname})`}</h6>
        </Show>
      </div>
      <p>
        {props.score} points by {props.by} |{" "}
        {timeSince(DateTime.fromSeconds(props.time))} ago
        <Show when={props.descendants}>
          {" "}
          | <Link href={`/item/${props.id}`}>{props.descendants} comments</Link>
        </Show>
      </p>
    </article>
  );
}
