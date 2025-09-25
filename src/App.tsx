import React, { useEffect } from "react";
import { IonApp, setupIonicReact } from "@ionic/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "./app/routes/AppRoutes";
import { useAppStore } from "./shared/store/app.store";
import { LoaderScreen } from "./shared/ui";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./shared/styles/global.css";

setupIonicReact({
  mode: "ios",
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  const { isInitializing, initializeApp } = useAppStore();

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  if (isInitializing) {
    return (
      <QueryClientProvider client={queryClient}>
        <IonApp>
          <LoaderScreen />
        </IonApp>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <QueryClientProvider client={queryClient}>
        <IonApp>
          <AppRoutes />
        </IonApp>
      </QueryClientProvider>
    </QueryClientProvider>
  );
};

export default App;
