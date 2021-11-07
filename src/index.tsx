import { render } from "solid-js/web";

import { App } from "./App";
import "./styles/global.scss";

// set the default theme here
document.documentElement.className = localStorage.getItem("theme") ?? "light";
render(() => <App />, document.getElementById("root") as HTMLElement);
