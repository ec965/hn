import { Router } from "solid-app-router";
import { Footer } from "./lib/Footer";
import { Paths } from "./Paths";
import { Nav, NavItem } from "./lib/Nav";
import { config } from "./config";

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
