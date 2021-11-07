import { Accessor, createSignal } from "solid-js";

export type Theme = "light" | "dark";

export function useTheme(): [Accessor<Theme>, (theme: Theme) => void] {
  const [rootTheme, setRootTheme] = createSignal<Theme>(
    document.documentElement.className as Theme
  );

  const setTheme = (theme: "light" | "dark") => {
    document.documentElement.className = theme;
    setRootTheme(document.documentElement.className as Theme);
    localStorage.setItem("theme", theme);
  };
  return [rootTheme, setTheme];
}
