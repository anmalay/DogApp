import React from "react";
import { useTranslation } from "react-i18next";
import { DatePicker, Text } from "@shared/ui";
import { DogProfileData, StepErrors } from "../../model/types";

interface DogBirthDateStepProps {
  data: DogProfileData;
  errors: StepErrors;
  onUpdate: (updates: Partial<DogProfileData>) => void;
}

export const DogBirthDateStep: React.FC<DogBirthDateStepProps> = ({
  data,
  onUpdate,
}) => {
  const { t } = useTranslation();

  const handleDateChange = (birthDate: {
    day: number;
    month: number;
    year: number;
  }) => {
    onUpdate({ birthDate });
  };

  return (
    <div className="self-stretch relative inline-flex flex-col justify-start items-start gap-12 w-full">
      <div>
        <Text variant="bold-24" tag="h1" className="mb-2 text-start">
          {t("When was {{name}} born?", { name: data.name || t("your dog") })}
        </Text>
      </div>

      <div className="self-stretch h-72 relative flex flex-col justify-start items-center overflow-hidden">
        <DatePicker
          value={data.birthDate}
          onChange={handleDateChange}
          className="w-full"
        />
      </div>
    </div>
  );
};
