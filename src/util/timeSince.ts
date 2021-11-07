import { DateTime, DurationObjectUnits, Interval } from "luxon";

function removePlural(amount: number, str: string) {
  str = `${amount} ${str}`;
  return amount > 1 ? str : str.slice(0, -1);
}

export function timeSince(since: DateTime): string {
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
