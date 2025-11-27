import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IonToast, IonImg } from "@ionic/react";
import { useIonRouter } from "@ionic/react";
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
import welcomeDogImage1 from "@shared/assets/images/welcome/welcomeDogStep1.webp";
import welcomeDogImage2 from "@shared/assets/images/welcome/welcomeDogStep2.webp";
import welcomeDogImage3 from "@shared/assets/images/welcome/welcomeDogStep3.webp";
import welcomeDogImage8 from "@shared/assets/images/welcome/welcomeDogStep8.webp";

// Function to get image for each step
const getStepImage = (step: number): string | null => {
  if (step === 1) return welcomeDogImage1;
  if (step === 2) return welcomeDogImage2;
  if (step === 3) return welcomeDogImage3;
  if (step === 8) return welcomeDogImage8;
  return null;
};

interface DogProfileStepperProps {
  onComplete: () => void;
  onBack: () => void;
}

export const DogProfileStepper: React.FC<DogProfileStepperProps> = ({
  onComplete,
  onBack,
}) => {
  const { t } = useTranslation();
  const router = useIonRouter();
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
    setCurrentStep,
  } = useDogProfileStepper(onComplete, onBack);

  // Sync step with URL parameter - only once on mount
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const stepParam = searchParams.get('step');
    if (stepParam) {
      const step = parseInt(stepParam, 10);
      if (step >= 1 && step <= 10) {
        setCurrentStep(step);
      }
    } else {
      // If no step param, default to step 1 and update URL
      setCurrentStep(1);
      router.push(`/onboarding?step=1`, 'none', 'replace');
    }
  }, [router, setCurrentStep]); // Only run once on mount

  // Update URL when step changes (but not on initial load)
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const currentStepParam = searchParams.get('step');
    
    // Only update if URL step is different from current step
    if (currentStepParam !== currentStep.toString()) {
      router.push(`/onboarding?step=${currentStep}`, 'forward', 'replace');
    }
  }, [currentStep, router]);

  const stepProps = {
    data: stepperData,
    errors,
    onUpdate: updateStepperData,
  };

  const renderCurrentStep = () => {
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
        return <DogNameStep {...stepProps} />;
    }
  };

  return (
    <>
      <div className="w-full bg-[#F3F3F3] min-h-screen flex flex-col">
        {/* Header Section */}
        <div className="flex flex-col gap-[40px] px-5 pt-15 bg-[#F3F3F3]">
          <StepperHeader
            currentStep={currentStep}
            totalSteps={10}
            onBack={handleStepBack}
          />

          {/* Dog Image */}
          {getStepImage(currentStep) &&
            (currentStep === 1 ||
              currentStep === 2 ||
              currentStep === 3 ||
              currentStep === 8) && (
              <div className="w-full h-[350px] relative overflow-hidden rounded-[24px]">
                <IonImg
                  src={getStepImage(currentStep)!}
                  alt={`Step ${currentStep}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
        </div>

        {/* Step Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 px-5 py-[40px]">
            {renderCurrentStep()}
          </div>

          {/* Navigation buttons */}
          <div className="px-5 pb-10 safe-area-bottom">
            <div className="flex gap-[10px]">
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
        </div>
      </div>

      <IonToast
        isOpen={showToast}
        message={toastMessage}
        duration={2000}
        onDidDismiss={() => setShowToast(false)}
      />
    </>
  );
};
