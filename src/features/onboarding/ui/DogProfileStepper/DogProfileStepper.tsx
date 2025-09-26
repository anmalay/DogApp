import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IonToast, IonPage, IonContent } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import { EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { StepperNavigation } from "@shared/ui";
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
  const swiperRef = useRef<SwiperRef>(null);
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
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideTo(currentStep - 1, 300);
    }
  }, [currentStep]);

  const handleSlideChange = (swiper: { activeIndex: number; slideTo: (index: number, duration: number) => void }) => {
    const newStep = swiper.activeIndex + 1;
    // Only allow going back via swipe, not forward
    if (newStep < currentStep && newStep >= 1) {
      setCurrentStep(newStep);
    } else if (newStep > currentStep) {
      // Block forward swipe by returning to current step immediately
      setTimeout(() => {
        swiper.slideTo(currentStep - 1, 0);
      }, 0);
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
          <div className="flex flex-col gap-[40px] px-5 pt-15  bg-[#F3F3F3] z-10">
            <StepperHeader
              currentStep={currentStep}
              totalSteps={10}
              onBack={handleStepBack}
            />

            {/* Dog Image */}
            {getStepImage(currentStep) &&
              (currentStep === 1 ||
                currentStep == 2 ||
                currentStep == 3 ||
                currentStep == 8) && (
                <div className="w-full h-[350px] relative overflow-hidden rounded-[24px]">
                  <img
                    src={getStepImage(currentStep)!}
                    alt={`Step ${currentStep}`}
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
              resistance={false}
              resistanceRatio={0}
              followFinger={false}
              shortSwipes={true}
              longSwipes={true}
              threshold={30}
              onTouchStart={(swiper, event) => {
                const target = event.target as HTMLElement;
                // Allow touch on slider/range inputs
                if (
                  target.closest(".slider-container") ||
                  target.closest('input[type="range"]') ||
                  target.closest('[role="slider"]')
                ) {
                  swiper.allowTouchMove = false;
                  return;
                }
                swiper.allowTouchMove = true;
                (swiper as { touchStartX?: number }).touchStartX =
                  (event as TouchEvent).touches?.[0]?.clientX ||
                  (event as MouseEvent).clientX;
              }}
              onTouchMove={(swiper, event) => {
                const target = event.target as HTMLElement;
                // Allow touch on slider/range inputs
                if (
                  target.closest(".slider-container") ||
                  target.closest('input[type="range"]') ||
                  target.closest('[role="slider"]')
                ) {
                  return;
                }

                const touchX =
                  (event as TouchEvent).touches?.[0]?.clientX ||
                  (event as MouseEvent).clientX;
                const deltaX = (swiper as { touchStartX?: number }).touchStartX! - touchX;

                // Completely block forward swipe (right to left)
                if (deltaX > 5) {
                  event.preventDefault();
                  event.stopPropagation();
                  swiper.allowTouchMove = false;
                  return false;
                }
              }}
              onTouchEnd={(swiper) => {
                swiper.allowTouchMove = true;
              }}
              style={{
                height: "100%",
              }}
            >
              {steps.map((step, index) => (
                <SwiperSlide key={index} className="flex flex-col h-full">
                  <div className="flex-1 flex flex-col px-5 py-[40px] pb-[120px] overflow-y-auto">
                    <div className="w-full">{step}</div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Action Buttons - Fixed at bottom */}
          <StepperNavigation
            onBack={handleStepBack}
            onNext={handleNext}
            nextButtonText={
              currentStep === 9 && stepperData.photos.length === 0
                ? t("Add Photo")
                : undefined
            }
          />
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
