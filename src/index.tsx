import "./styles.css";
import style from "./App.module.css";
import { render } from "solid-js/web";
import { createSignal, onMount, For, createEffect } from "solid-js";

type Route = "topstories" | `item/${number}`;

async function hnFetch<T>(route: Route): Promise<T> {
  const res = await fetch(`//hacker-news.firebaseio.com/v0/${route}.json`);
  return await res.json();
}

const hnApi = {
  item: (id: number): Promise<Item> => hnFetch<Item>(`item/${id}`),
  topStories: (): Promise<number[]> => hnFetch<number[]>("topstories"),
};

const PAGE_SIZE = 30;

interface Item {
  id: number;
  deleted?: true;
  type: "job" | "story" | "comment" | "poll" | "pollopt";
  by: string;
  time: number;
  text: string;
  dead?: true;
  parent: number;
  poll: number;
  kids: number[];
  url: string;
  score: number;
  title: string;
  parts: number[];
  descendants: number;
}

function App() {
  const [storyIds, setStoryIds] = createSignal<number[]>([]);
  const [stories, setStories] = createSignal<Item[]>([]);
  const [page, setPage] = createSignal(0);

  onMount(async () => {
    const topStoryIds = await hnApi.topStories();
    setStoryIds(topStoryIds);
  });

  const handleSeeMore = () => setPage(page() + 1);

  createEffect(() => {
    const start = page() * PAGE_SIZE;
    const storyIdsForPage = storyIds().slice(start, start + PAGE_SIZE);

    storyIdsForPage.forEach(async (id) => {
      const story = await hnApi.item(id);
      setStories([...stories(), story]);
    });
  });

  return (
    <div>
      <h1>Hacker News</h1>
      <For each={stories()}>
        {(story, i) => (
          <div>
            <a href={story.url}>
              <h2 class={style.title}>
                {i}. {story.title}
              </h2>
            </a>
            <p>
              {story.score} points by {story.by}
            </p>
          </div>
        )}
      </For>
      <h2 onClick={handleSeeMore}>See More</h2>
    </div>
  );
}

render(() => <App />, document.getElementById("root") as HTMLElement);
