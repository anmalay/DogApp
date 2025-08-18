// src/pages/activity-detail/index.tsx
import { FC, lazy, Suspense } from "react";
import { IonSpinner } from "@ionic/react";

const LazyActivityDetail = lazy(() => import("./ActivityDetail"));

export const ActivityDetail: FC = () => (
  <Suspense
    fallback={
      <div className="flex items-center justify-center h-screen">
        <IonSpinner />
      </div>
    }
  >
    <LazyActivityDetail />
  </Suspense>
);
