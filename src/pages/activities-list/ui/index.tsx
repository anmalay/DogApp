// src/pages/activities/index.tsx
import { FC, lazy, Suspense } from "react";
import { IonSpinner } from "@ionic/react";

const LazyActivitiesList = lazy(() => import("./ActivitiesList"));

export const ActivitiesList: FC = () => (
  <Suspense
    fallback={
      <div className="flex items-center justify-center h-screen">
        <IonSpinner />
      </div>
    }
  >
    <LazyActivitiesList />
  </Suspense>
);
