import React, { useState } from "react";
import { IonContent, IonToast } from "@ionic/react";
import { Button } from "@shared/ui";
import { DogProfileData, useDogProfileStepper } from "../../model/useDogProfileStepper";
import { StepperHeader } from "./StepperHeader";
import { DogNameStep } from "../steps/DogNameStep";
import { DogGenderStep } from "../steps/DogGenderStep";
import { DogWeightStep } from "../steps/DogWeightStep";
import { DogBreedStep } from "../steps/DogBreedStep";
import { DogBirthDateStep } from "../steps/DogBirthDateStep";
import { DogHealthStep } from "../steps/DogHealthStep";
import { DogCharacterStep } from "../steps/DogCharacterStep";
import { DogCommentStep } from "../steps/DogCommentStep";
import { DogPhotosStep } from "../steps/DogPhotosStep";
import { OwnerInfoStep } from "../steps/OwnerInfoStep";

interface DogProfileStepperProps {
  onComplete: () => void;
  onBack: () => void;
}

export const DogProfileStepper: React.FC<DogProfileStepperProps> = ({
  onComplete,
  onBack,
}) => {
  const {
    currentStep,
    stepperData,
    errors,
    showToast,
    toastMessage,
    handleNext,
    handleBack: handleStepBack,
    updateStepperData,
    setShowToast,
  } = useDogProfileStepper(onComplete, onBack);

  const renderStep = () => {
    const stepProps = {
      data: stepperData,
      errors,
      onUpdate: updateStepperData,
    };

    switch (currentStep) {
      case 1:
        return <DogNameStep {...stepProps} />;
      case 2:
        return <DogGenderStep {...stepProps} />;
      case 3:
        return <DogWeightStep {...stepProps} />;
      case 4:
        return <DogBreedStep {...stepProps} />;
      case 5:
        return <DogBirthDateStep {...stepProps} />;
      case 6:
        return <DogHealthStep {...stepProps} />;
      case 7:
        return <DogCharacterStep {...stepProps} />;
      case 8:
        return <DogCommentStep {...stepProps} />;
      case 9:
        return <DogPhotosStep {...stepProps} />;
      case 10:
        return <OwnerInfoStep {...stepProps} />;
      default:
        return null;
    }
  };

  return (
    <>
      <StepperHeader
        currentStep={currentStep}
        totalSteps={10}
        onBack={handleStepBack}
      />

      <IonContent className="bg-white">
        <div className="p-6">{renderStep()}</div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={handleStepBack}
              className="flex-1"
            >
              Назад
            </Button>

            <Button
              variant="primary"
              onClick={handleNext}
              className="flex-1"
            >
              {currentStep === 9 && stepperData.photos.length === 0
                ? "Добавить фото"
                : "Дальше"}
            </Button>
          </div>
        </div>
      </IonContent>

      <IonToast
        isOpen={showToast}
        message={toastMessage}
        duration={2000}
        onDidDismiss={() => setShowToast(false)}
      />
    </>
  );
};