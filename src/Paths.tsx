import { Route, Routes } from "solid-app-router";
import { TopStories } from "./pages/TopStories";

export function Paths() {
  return (
    <Routes>
      <Route path="/" element={<TopStories />} />
      <Route path="/:page" element={<TopStories />} />
    </Routes>
  );
}
