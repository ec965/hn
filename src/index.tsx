import "./styles/reset.css";
import "./styles/global.scss";
import { render } from "solid-js/web";
import { App } from "./App";

render(() => <App />, document.getElementById("root") as HTMLElement);
