import { createSignal } from "solid-js";

import style from "./Footer.module.scss";

export function Footer() {
  const [rootTheme, setRootTheme] = createSignal(
    document.documentElement.className
  );

  const switchTheme = () => {
    document.documentElement.className =
      rootTheme() === "dark" ? "light" : "dark";
    setRootTheme(document.documentElement.className);
  };

  const scrollToTop = () => {
    document.documentElement.scrollTop = 0;
  };

  return (
    <footer class={style.footer}>
      <a target="_blank" href="https://github.com/ec965/hn">
        source code
      </a>
      <p class={style.clickable} onClick={switchTheme}>
        {rootTheme() === "dark" ? "light mode" : "dark mode"}
      </p>
      <p class={style.clickable} onClick={scrollToTop}>
        back to top
      </p>
    </footer>
  );
}
