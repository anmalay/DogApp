import React from "react";
import { useTranslation } from "react-i18next";
import { DogProfileData, StepErrors } from "../../model/types";

interface DogPhotosStepProps {
  data: DogProfileData;
  errors: StepErrors;
  onUpdate: (updates: Partial<DogProfileData>) => void;
}

export const DogPhotosStep: React.FC<DogPhotosStepProps> = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-2">{t("Pet Photos")}</h1>
        <p className="text-text-secondary">{t("Step content to be implemented")}</p>
      </div>
    </div>
  );
};