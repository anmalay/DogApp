import React from "react";
import { IonPage } from "@ionic/react";
import { StepperIntroView, DogProfileStepper, VerificationView } from "@features/onboarding";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type ScreenType = "stepper-intro" | "stepper" | "verification";

export const OnboardingPage: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("stepper-intro");
  const { t } = useTranslation();

  const showToastMessage = (message: string) => {
    console.log(message); // TODO: Replace with proper toast implementation
  };

  if (currentScreen === "stepper-intro") {
    return (
      <IonPage>
        <StepperIntroView
          onNext={() => setCurrentScreen("stepper")}
          onSkip={() => showToastMessage(t("Switching to limited functionality mode"))}
        />
      </IonPage>
    );
  }

  if (currentScreen === "verification") {
    return (
      <IonPage>
        <VerificationView
          onVerify={() => showToastMessage(t("Proceeding to verification"))}
          onSkip={() => showToastMessage(t("Switching to limited functionality mode"))}
        />
      </IonPage>
    );
  }

  return (
    <DogProfileStepper
      onComplete={() => setCurrentScreen("verification")}
      onBack={() => setCurrentScreen("stepper-intro")}
    />
  );
};