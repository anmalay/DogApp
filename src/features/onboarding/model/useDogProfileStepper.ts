import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DogProfileData, StepErrors } from "./types";

const getCurrentDate = () => {
  const today = new Date();
  return {
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  };
};

const initialData: DogProfileData = {
  name: "",
  gender: "",
  weight: 20,
  breed: "",
  birthDate: getCurrentDate(),
  health: {
    sterilized: false,
    vaccinated: false,
    parasite_treated: false,
  },
  character: {
    activity: "",
    comfortable_with: {
      big_dogs: false,
      small_dogs: false,
      same_size: false,
      males: false,
      females: false,
    },
  },
  comment: "",
  photos: [],
  owner: {
    photo: null,
    name: "",
    birth_date: null,
  },
};

export const useDogProfileStepper = (
  onComplete: () => void,
  onExit: () => void
) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [stepperData, setStepperData] = useState<DogProfileData>(initialData);
  const [errors, setErrors] = useState<StepErrors>({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const updateStepperData = (updates: Partial<DogProfileData>) => {
    setStepperData((prev) => ({ ...prev, ...updates }));

    // Clear relevant errors when data is updated
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      let hasChanges = false;

      if (updates.name !== undefined && newErrors.name) {
        delete newErrors.name;
        hasChanges = true;
      }
      if (updates.gender !== undefined && newErrors.gender) {
        delete newErrors.gender;
        hasChanges = true;
      }
      if (updates.breed !== undefined && newErrors.breed) {
        delete newErrors.breed;
        hasChanges = true;
      }
      if (updates.owner?.name !== undefined && newErrors.ownerName) {
        delete newErrors.ownerName;
        hasChanges = true;
      }

      return hasChanges ? newErrors : prevErrors;
    });
  };

  const validateStep = (
    step: number,
    currentData?: DogProfileData
  ): boolean => {
    const dataToValidate = currentData || stepperData;
    const newErrors: StepErrors = {};

    switch (step) {
      case 1:
        if (!dataToValidate.name.trim()) {
          newErrors.name = true;
          setErrors(newErrors);
          return false;
        }
        break;
      case 2:
        if (!dataToValidate.gender) {
          newErrors.gender = true;
          setErrors(newErrors);
          return false;
        }
        break;
      case 4:
        if (!stepperData.breed) {
          showToastMessage(t("Please select a breed to continue"));
          return false;
        }
        break;
      case 9:
        if (stepperData.photos.length === 0) {
          return false; // Special case for photo step
        }
        break;
      case 10:
        if (!stepperData.owner.name.trim()) {
          newErrors.ownerName = true;
          setErrors(newErrors);
          return false;
        }
        break;
    }

    setErrors({});
    return true;
  };

  const handleNext = () => {
    // Use setTimeout to ensure we have the latest state
    setTimeout(() => {
      setStepperData((currentData) => {
        if (!validateStep(currentStep, currentData)) {
          return currentData;
        }

        if (currentStep < 10) {
          setCurrentStep(currentStep + 1);
        } else {
          showToastMessage(t("Excellent! One step left"));
          setTimeout(() => {
            onComplete();
          }, 2000);
        }

        return currentData;
      });
    }, 0);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onExit();
    }
  };

  return {
    currentStep,
    stepperData,
    errors,
    showToast,
    toastMessage,
    handleNext,
    handleBack,
    updateStepperData,
    setShowToast,
    showToastMessage,
    setCurrentStep,
  };
};

export type { DogProfileData };
