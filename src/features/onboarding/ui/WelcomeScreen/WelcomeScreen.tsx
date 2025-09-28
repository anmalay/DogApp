import React from "react";
import { IonContent } from "@ionic/react";
import { useIonRouter } from "@ionic/react";
import { WelcomeView } from "./WelcomeView";

interface WelcomeScreenProps {
  onCreateAccount?: () => void;
  onSignIn?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onCreateAccount,
  onSignIn,
}) => {
  const router = useIonRouter();

  const handleCreateAccount = () => {
    if (onCreateAccount) {
      onCreateAccount();
    } else {
      router.push("/registration", "forward", "push");
    }
  };

  const handleSignIn = () => {
    if (onSignIn) {
      onSignIn();
    } else {
      router.push("/login", "forward", "push");
    }
  };

  return (
    <IonContent className="bg-zinc-100">
      <WelcomeView
        onCreateAccount={handleCreateAccount}
        onSignIn={handleSignIn}
      />
    </IonContent>
  );
};