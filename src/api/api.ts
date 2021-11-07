import { Item, Route, Updates, User } from "./types";

// https://github.com/HackerNews/API

async function hnFetch<T>(route: Route): Promise<T> {
  const res = await fetch(`//hacker-news.firebaseio.com/v0/${route}.json`);
  return await res.json();
}

export const item = (id: number): Promise<Item> => hnFetch<Item>(`item/${id}`);
export const user = (id: string): Promise<User> => hnFetch<User>(`user/${id}`);

/**
 * 500 posts per fetch
 */
export const topStories = (): Promise<number[]> =>
  hnFetch<number[]>("topstories");
export const newStories = (): Promise<number[]> =>
  hnFetch<number[]>("newstories");
export const bestStories = (): Promise<number[]> =>
  hnFetch<number[]>("beststories");

/**
 * 200 posts per fetch
 */
export const jobStories = (): Promise<number[]> =>
  hnFetch<number[]>("jobstories");
export const askStories = (): Promise<number[]> =>
  hnFetch<number[]>("askstories");
export const showStories = (): Promise<number[]> =>
  hnFetch<number[]>("showstories");

export const updates = (): Promise<Updates> => hnFetch<Updates>("updates");
export const maxItem = (): Promise<number> => hnFetch<number>("maxitem");

export * as hnApi from "./api";
