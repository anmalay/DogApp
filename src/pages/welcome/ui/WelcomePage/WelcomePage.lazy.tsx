import { lazy } from "react";

export const WelcomePage = lazy(() =>
  import("./WelcomePage").then((module) => ({
    default: module.WelcomePage,
  }))
);