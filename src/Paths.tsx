import { Route, Routes } from "solid-app-router";
import { New } from "./pages/New";
import { Top } from "./pages/Top";

export function Paths() {
  return (
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/new" element={<New />} />
      <Route path="/best" element={<New />} />
      <Route path="/ask" element={<New />} />
      <Route path="/show" element={<New />} />
      <Route path="/jobs" element={<New />} />
    </Routes>
  );
}
