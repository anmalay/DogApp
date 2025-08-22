import React from "react";
import { IonIcon, IonProgressBar, IonText } from "@ionic/react";
import { arrowBack } from "ionicons/icons";

interface StepperHeaderProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
}

export const StepperHeader: React.FC<StepperHeaderProps> = ({
  currentStep,
  totalSteps,
  onBack,
}) => {
  return (
    <div className="bg-background p-4 border-b border-border">
      <div className="flex items-center space-x-4">
        <IonIcon
          icon={arrowBack}
          className="text-2xl cursor-pointer"
          onClick={onBack}
        />
        <div className="flex-1">
          <IonProgressBar value={currentStep / totalSteps} color="primary" />
          <IonText className="text-sm text-text-muted mt-1 block">
            Шаг {currentStep} из {totalSteps}
          </IonText>
        </div>
      </div>
    </div>
  );
};