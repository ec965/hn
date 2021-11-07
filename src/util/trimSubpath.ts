import { Location, LocationState } from "solid-app-router";
import { config } from "../config";

export function trimSubpath(location: Location<LocationState>): string {
  const subPath = location.pathname.replace(config.BASE_PATH, "");
  return subPath === "/" ? "" : subPath;
}
