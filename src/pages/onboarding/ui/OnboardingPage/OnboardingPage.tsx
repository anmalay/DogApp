import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import { StepperIntroView, DogProfileStepper, VerificationView } from "@features/onboarding";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type ScreenType = "stepper-intro" | "stepper" | "verification";

export const OnboardingPage: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("stepper-intro");
  const { t } = useTranslation();

  const showToastMessage = (message: string) => {
    // TODO: Replace with proper IonToast implementation
    console.log(message);
  };

  if (currentScreen === "stepper-intro") {
    return (
      <IonPage>
        <IonContent scrollOnOverflow={true} keyboardClose={true}>
          <StepperIntroView
            onNext={() => setCurrentScreen("stepper")}
            onSkip={() => showToastMessage(t("Switching to limited functionality mode"))}
          />
        </IonContent>
      </IonPage>
    );
  }

  if (currentScreen === "verification") {
    return (
      <IonPage>
        <IonContent scrollOnOverflow={true} keyboardClose={true}>
          <VerificationView
            onVerify={() => showToastMessage(t("Proceeding to verification"))}
            onSkip={() => showToastMessage(t("Switching to limited functionality mode"))}
          />
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent scrollOnOverflow={true} keyboardClose={true}>
        <DogProfileStepper
          onComplete={() => setCurrentScreen("verification")}
          onBack={() => setCurrentScreen("stepper-intro")}
        />
      </IonContent>
    </IonPage>
  );
};