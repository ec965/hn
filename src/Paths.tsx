import { Route, Routes } from "solid-app-router";
import { Main } from "./pages/Main";

export type ContentType = "new" | "best" | "ask" | "show" | "jobs";
export function Paths() {
  return (
    <Routes>
      <Route path="/:contentType" element={<Main />} />
      <Route path="/" element={<Main />} />
    </Routes>
  );
}
