import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IonToast, IonPage, IonContent } from "@ionic/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
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
  const swiperRef = useRef<any>(null);
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

  // Sync swiper with current step
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(currentStep - 1, 300);
    }
  }, [currentStep]);

  const handleSlideChange = (swiper: any) => {
    const newStep = swiper.activeIndex + 1;
    if (newStep !== currentStep && newStep <= 10 && newStep >= 1) {
      setCurrentStep(newStep);
    }
  };

  const stepProps = {
    data: stepperData,
    errors,
    onUpdate: updateStepperData,
  };

  const steps = [
    <DogNameStep {...stepProps} />,
    <DogGenderStep {...stepProps} />,
    <DogWeightStep {...stepProps} />,
    <DogBreedStep {...stepProps} />,
    <DogBirthDateStep {...stepProps} />,
    <DogHealthStep {...stepProps} />,
    <DogCharacterStep {...stepProps} />,
    <DogCommentStep {...stepProps} />,
    <DogPhotosStep {...stepProps} />,
    <OwnerInfoStep {...stepProps} />,
  ];

  return (
    <IonPage>
      <IonContent
        fullscreen
        scrollY={false}
        style={{
          "--scroll-behavior": "smooth",
          "--overscroll-behavior": "contain",
        }}
      >
        <div className="w-full bg-[#F3F3F3] h-full flex flex-col">
          {/* Header Section - Fixed */}
          <div className="flex flex-col gap-[40px] px-5 pt-15 pb-5 bg-[#F3F3F3] z-10">
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

          {/* Swiper Content Section */}
          <div className="flex-1 relative">
            <Swiper
              ref={swiperRef}
              modules={[EffectFade, Pagination]}
              effect="slide"
              speed={300}
              allowTouchMove={true}
              onSlideChange={handleSlideChange}
              initialSlide={currentStep - 1}
              className="h-full onboarding-swiper"
              resistance={true}
              resistanceRatio={0.85}
              followFinger={true}
              shortSwipes={true}
              longSwipes={true}
              style={{
                height: '100%',
              }}
            >
              {steps.map((step, index) => (
                <SwiperSlide key={index} className="flex flex-col h-full">
                  <div className="flex-1 flex flex-col px-5 py-[40px] overflow-y-auto">
                    <div className="w-full">{step}</div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Action Buttons - Fixed at bottom */}
          <div className="w-full flex gap-[10px] p-5 bg-[#F3F3F3] z-10">
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
