import React from "react";
import { IonPage } from "@ionic/react";
import { WelcomeScreen } from "@features/onboarding";

export const WelcomePage: React.FC = () => {
  return (
    <IonPage>
      <WelcomeScreen />
    </IonPage>
  );
};