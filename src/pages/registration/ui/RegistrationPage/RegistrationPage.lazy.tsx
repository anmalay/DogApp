import { lazy } from "react";

export const RegistrationPage = lazy(() =>
  import("./RegistrationPage").then((module) => ({
    default: module.RegistrationPage,
  }))
);