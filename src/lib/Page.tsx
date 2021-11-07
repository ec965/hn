import { JSX } from "solid-js";

import style from "./Page.module.scss";

export interface PageProps {
  children: JSX.Element;
}
export function Page(props: PageProps) {
  return <section class={style.page}>{props.children}</section>;
}
