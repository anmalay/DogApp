import React, { useState } from "react";
import { IonContent } from "@ionic/react";
import { WelcomeView } from "./WelcomeView";
import { StepperIntroView } from "./StepperIntroView";
import { DogProfileStepper } from "../DogProfileStepper/DogProfileStepper";
import { VerificationView } from "./VerificationView";

type ScreenType = "welcome" | "stepper-intro" | "stepper" | "verification";

export const WelcomeScreen: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("welcome");

  const showToastMessage = (message: string) => {
    console.log(message); // TODO: Replace with proper toast implementation
  };

  if (currentScreen === "welcome") {
    return (
      <IonContent className="bg-gradient-to-br from-purple-100 to-blue-100">
        <WelcomeView onNext={() => setCurrentScreen("stepper-intro")} />
      </IonContent>
    );
  }

  if (currentScreen === "stepper-intro") {
    return (
      <IonContent className="bg-white">
        <StepperIntroView
          onNext={() => setCurrentScreen("stepper")}
          onSkip={() => showToastMessage("Переход в режим ограниченного функционала")}
        />
      </IonContent>
    );
  }

  if (currentScreen === "verification") {
    return (
      <IonContent className="bg-white">
        <VerificationView
          onVerify={() => showToastMessage("Переход к верификации")}
          onSkip={() => showToastMessage("Переход в режим ограниченного функционала")}
        />
      </IonContent>
    );
  }

  return (
    <DogProfileStepper
      onComplete={() => setCurrentScreen("verification")}
      onBack={() => setCurrentScreen("stepper-intro")}
    />
  );
};