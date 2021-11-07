import { Location, LocationState } from "solid-app-router";

export const pageQuery = (location: Location<LocationState>) => {
  const page = parseInt(location.query.page);
  return isNaN(page) ? 0 : page;
};
