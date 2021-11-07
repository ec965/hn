import { Link, NavLink } from "solid-app-router";
import { For } from "solid-js";

import style from "./Nav.module.scss";

export interface NavItem {
  url: string;
  name: string;
}
export interface NavProps {
  links: NavItem[];
}
export function Nav(props: NavProps) {
  return (
    <div class={style.container}>
      <nav class={style.nav}>
        <Link href="/">
          <h1>HN</h1>
        </Link>
        <For each={props.links}>
          {(link: NavItem) => (
            <NavLink activeClass={style.active} href={link.url}>
              <h2>{link.name}</h2>
            </NavLink>
          )}
        </For>
      </nav>
    </div>
  );
}
