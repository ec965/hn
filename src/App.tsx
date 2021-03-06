import { Router } from "solid-app-router";

import { Paths } from "./Paths";
import { config } from "./config";
import { Footer } from "./lib/Footer";
import { Nav, NavItem } from "./lib/Nav";

const Links: NavItem[] = [
  {
    url: "/new",
    name: "new",
  },
  {
    url: "/best",
    name: "best",
  },
  {
    url: "/ask",
    name: "ask",
  },
  {
    url: "/show",
    name: "show",
  },
  {
    url: "/jobs",
    name: "jobs",
  },
];

export function App() {
  return (
    <Router base={config.BASE_PATH}>
      <Nav links={Links} />
      <Paths />
      <Footer />
    </Router>
  );
}
