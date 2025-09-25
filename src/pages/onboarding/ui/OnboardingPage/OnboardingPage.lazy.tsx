import { lazy } from "react";

export const OnboardingPage = lazy(() =>
  import("./OnboardingPage").then((module) => ({
    default: module.OnboardingPage,
  }))
);