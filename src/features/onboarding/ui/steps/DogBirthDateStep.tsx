import React from "react";
import { useTranslation } from "react-i18next";
import { DogProfileData, StepErrors } from "../../model/types";

interface DogBirthDateStepProps {
  data: DogProfileData;
  errors: StepErrors;
  onUpdate: (updates: Partial<DogProfileData>) => void;
}

export const DogBirthDateStep: React.FC<DogBirthDateStepProps> = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-2">{t("Birth Date")}</h1>
        <p className="text-text-secondary">{t("Step content to be implemented")}</p>
      </div>
    </div>
  );
};