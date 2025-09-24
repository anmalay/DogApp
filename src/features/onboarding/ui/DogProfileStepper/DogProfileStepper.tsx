import React from "react";
import { useTranslation } from "react-i18next";
import { IonToast, IonPage, IonContent } from "@ionic/react";
import { Button } from "@shared/ui";
import { useDogProfileStepper } from "../../model/useDogProfileStepper";
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
import welcomeDogImage from "@shared/assets/images/welcome/welcomeDog.webp";

interface DogProfileStepperProps {
  onComplete: () => void;
  onBack: () => void;
}

export const DogProfileStepper: React.FC<DogProfileStepperProps> = ({
  onComplete,
  onBack,
}) => {
  const { t } = useTranslation();
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
    <IonPage>
      <IonContent
        fullscreen
        scrollY={true}
        style={{
          "--scroll-behavior": "smooth",
          "--overscroll-behavior": "contain",
        }}
      >
        <div
          className="w-full bg-[#F3F3F3] pb-5 px-5 pt-15 min-h-full flex flex-col"
          style={{
            scrollBehavior: "auto",
            overscrollBehavior: "contain",
          }}
        >
          {/* Header Section */}
          <div className="flex flex-col gap-[40px]">
            <StepperHeader
              currentStep={currentStep}
              totalSteps={10}
              onBack={handleStepBack}
            />

            {/* Dog Image */}
            {(currentStep === 1 ||
              currentStep === 2 ||
              currentStep === 3 ||
              currentStep === 8) && (
              <div className="w-full h-[380px] relative overflow-hidden rounded-[24px]">
                <img
                  src={welcomeDogImage}
                  alt="Welcome Dog"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Content Section - Now flexible */}
          <div className="flex-1 flex flex-col gap-[40px] py-[40px]">
            <div className="w-full">{renderStep()}</div>
          </div>

          {/* Action Buttons - Now at bottom */}
          <div className="w-full flex gap-[10px] mt-auto">
            <Button
              variant="outline"
              size="large"
              fullWidth
              onClick={handleStepBack}
              className="text-[#3F335A] bg-white hover:bg-gray-50"
            >
              {t("Back")}
            </Button>

            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={handleNext}
              className="bg-[#3F335A] hover:bg-[#342B47]"
            >
              {currentStep === 9 && stepperData.photos.length === 0
                ? t("Add Photo")
                : t("Next")}
            </Button>
          </div>
        </div>

        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};
