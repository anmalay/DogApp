import React from "react";
import { IonContent } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { WelcomeView } from "./WelcomeView";

interface WelcomeScreenProps {
  onCreateAccount?: () => void;
  onSignIn?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onCreateAccount,
  onSignIn,
}) => {
  const history = useHistory();

  const handleCreateAccount = () => {
    if (onCreateAccount) {
      onCreateAccount();
    } else {
      history.push("/registration");
    }
  };

  const handleSignIn = () => {
    if (onSignIn) {
      onSignIn();
    } else {
      history.push("/login");
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