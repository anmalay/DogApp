import React from "react";
import { useTranslation } from "react-i18next";
import { Slider, Text } from "@shared/ui";
import { DogProfileData, StepErrors } from "../../model/types";

interface DogWeightStepProps {
  data: DogProfileData;
  errors: StepErrors;
  onUpdate: (updates: Partial<DogProfileData>) => void;
}

export const DogWeightStep: React.FC<DogWeightStepProps> = ({
  data,
  onUpdate,
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Text variant="bold-24" tag="h1" className="mb-2 text-center">
          {t("Pet Weight")}
        </Text>
      </div>

      <div className="w-full h-7 inline-flex justify-start items-start gap-6">
        <div className="flex-1 h-7 relative">
          <Slider
            min={1}
            max={50}
            value={data.weight || 1}
            onChange={(value) => onUpdate({ weight: value })}
            className="w-full"
          />
        </div>
        <div className="flex justify-end items-start gap-5">
          <Text variant="medium-16">
            {data.weight || 1} {t("kg")}
          </Text>
        </div>
      </div>
    </div>
  );
};