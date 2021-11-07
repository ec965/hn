import style from "./ListItem.module.scss";
import { DateTime, DurationObjectUnits, Interval } from "luxon";
import { Show } from "solid-js";

function removePlural(amount: number, str: string) {
  str = `${amount} ${str}`;
  return amount > 1 ? str : str.slice(0, -1);
}

function timeSince(since: DateTime): string {
  const now = DateTime.now();
  const durations: (keyof DurationObjectUnits)[] = [
    "months",
    "days",
    "hours",
    "minutes",
    "seconds",
  ];
  const diff = Interval.fromDateTimes(since, now)
    .toDuration(durations)
    .toObject();

  for (const duration of durations) {
    if (diff[duration]) return removePlural(diff[duration] as number, duration);
  }
  return "0 seconds";
}

interface ListItemProps {
  index: number;
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
        <h4 title={props.url}>
          {props.index}.{" "}
          <a href={props.url} target="_blank">
            {props.title}
          </a>
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
          | <a href={`/item/${props.id}`}>{props.descendants} comments</a>
        </Show>
      </p>
    </article>
  );
}
