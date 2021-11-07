import { Route, Routes } from "solid-app-router";

import { Item } from "./pages/Item";
import { Main } from "./pages/Main";

export type ContentType = "new" | "best" | "ask" | "show" | "jobs";
export function Paths() {
  return (
    <Routes>
      <Route path="/item/:id" element={<Item />} />
      <Route path="/:contentType" element={<Main />} />
      <Route path="/" element={<Main />} />
    </Routes>
  );
}
