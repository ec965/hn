import './styles.css';
import style from './App.module.css';
import { render } from "solid-js/web";
import { createSignal , onMount, For, createEffect } from "solid-js";

const hnApi = (route) => `//hacker-news.firebaseio.com/v0/${route}.json`;
const PAGE_SIZE = 30;

function App() {
  const [storyIds, setStoryIds] = createSignal([]);
  const [stories, setStories] = createSignal([]);
  const [page, setPage] = createSignal(0);

  onMount(async () => {
    let topStoryIds = await fetch(hnApi("topstories"));
    topStoryIds = await topStoryIds.json();
    setStoryIds(topStoryIds);
  });

  const handleSeeMore = () => setPage(page() + 1);

  createEffect(() => {
    const start = page() * PAGE_SIZE;
    const storyIdsForPage = storyIds().slice(start, start + PAGE_SIZE);

    storyIdsForPage.forEach(async (id) => {
      let story = await fetch(hnApi(`item/${id}`));
      story = await story.json();
      setStories([...stories(), story]);
    });
  })


  return (
    <div>
      <h1>Hacker News</h1>
      <For each={stories()}>{(story, i) => 
      <div>
        <a href={story.url}><h2 class={style.title}>{i}. {story.title}</h2></a>
        <p>{story.score} points by {story.by}</p>
      </div>
      }</For>
      <h2 onClick={handleSeeMore}>See More</h2>
    </div>
  );
}

render(() => <App/>, document.getElementById("root"));
