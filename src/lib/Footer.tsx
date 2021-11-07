import style from "./Footer.module.scss";
export function Footer() {
  return (
    <footer class={style.footer}>
      <a target="_blank" href="https://github.com/ec965/hn">
        source code
      </a>
    </footer>
  );
}
