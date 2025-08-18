// src/pages/activity-edit/index.tsx
import { FC, lazy, Suspense } from "react";
import { IonSpinner } from "@ionic/react";

const LazyEditActivity = lazy(() => import("./EditActivityPage"));

export const EditActivity: FC = () => (
  <Suspense
    fallback={
      <div className="flex items-center justify-center h-screen">
        <IonSpinner />
      </div>
    }
  >
    <LazyEditActivity />
  </Suspense>
);
