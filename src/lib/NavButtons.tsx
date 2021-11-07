import { Show } from "solid-js";
import styles from "./index.module.scss";
import { Match, Switch } from "solid-js";
import { useNavigate, useLocation } from "solid-app-router";
import { trimSubpath } from "../../util/trimSubpath";
import { pageQuery } from "../../util/pageQuery";
import { FiChevronsLeft, FiChevronsRight } from "solid-icons/fi";
import style from "./index.module.scss";

interface ButtonProps {
  direction: "forward" | "backward";
}
function Button(props: ButtonProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const page = () => pageQuery(location);

  const handleClick = () => {
    const subPath = trimSubpath(location);
    if (props.direction === "forward") {
      navigate(`${subPath}/?page=${page() + 1}`);
    } else {
      const goTo =
        page() - 1 === 0 ? subPath : `${subPath}/?page=${page() - 1}`;
      navigate(goTo);
    }
  };

  return (
    <div className={style.control} onClick={handleClick}>
      <Switch>
        <Match when={props.direction === "forward"}>
          <h4>load more</h4>
          <FiChevronsRight size={24} />
        </Match>
        <Match when={props.direction === "backward"}>
          <Match when={props.direction === "backward"}>go back</Match>
          <FiChevronsLeft size={24} />
        </Match>
      </Switch>
    </div>
  );
}

interface NavButtonProps {
  showForward?: boolean;
  showBackward?: boolean;
}
export function NavButtons(props: NavButtonProps) {
  return (
    <div class={styles.container}>
      <Show when={props.showBackward}>
        <Button direction="backward" />
      </Show>
      <Show when={props.showForward}>
        <Button direction="forward" />
      </Show>
    </div>
  );
}
