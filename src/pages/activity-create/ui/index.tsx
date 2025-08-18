// src/pages/activity-create/index.tsx
import { FC, lazy, Suspense } from "react";
import { IonSpinner } from "@ionic/react";

const LazyCreateActivity = lazy(() => import("./CreateActivityPage"));

export const CreateActivity: FC = () => (
  <Suspense
    fallback={
      <div className="flex items-center justify-center h-screen">
        <IonSpinner />
      </div>
    }
  >
    <LazyCreateActivity />
  </Suspense>
);
