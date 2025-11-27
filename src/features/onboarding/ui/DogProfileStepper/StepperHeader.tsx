import React from "react";
import { IonProgressBar } from "@ionic/react";

interface StepperHeaderProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
}

export const StepperHeader: React.FC<StepperHeaderProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div
      className="flex items-center gap-[5px] w-full h-1"
      data-step={currentStep}
    >
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="flex-1">
          <IonProgressBar
            value={index < currentStep ? 1 : 0}
            className="h-1 rounded-full"
            color={index < currentStep ? "dark" : "light"}
            style={{
              '--progress-background': index < currentStep ? '#3F335A' : 'white',
              '--background': 'transparent',
            }}
          />
        </div>
      ))}
    </div>
  );
};
