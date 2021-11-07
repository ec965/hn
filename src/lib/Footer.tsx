import { useTheme } from "../util/useTheme";
import style from "./Footer.module.scss";

export function Footer() {
  const [theme, setTheme] = useTheme();

  const switchTheme = () => {
    setTheme(theme() === "dark" ? "light" : "dark");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer class={style.footer}>
      <a target="_blank" href="https://github.com/ec965/hn">
        source code
      </a>
      <p class={style.clickable} onClick={switchTheme}>
        {theme() === "dark" ? "light mode" : "dark mode"}
      </p>
      <p class={style.clickable} onClick={scrollToTop}>
        scroll to top
      </p>
    </footer>
  );
}
