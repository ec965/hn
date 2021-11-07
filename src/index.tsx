import { render } from "solid-js/web";

import { App } from "./App";
import "./styles/global.scss";

document.documentElement.className = "dark";
render(() => <App />, document.getElementById("root") as HTMLElement);
