import { lazy } from "react";

export const CodeVerificationPage = lazy(() =>
  import("./CodeVerificationPage").then((module) => ({
    default: module.CodeVerificationPage,
  }))
);