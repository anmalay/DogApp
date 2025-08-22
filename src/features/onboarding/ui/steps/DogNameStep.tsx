import React from "react";
import { useTranslation } from "react-i18next";
import { Input, Text } from "@shared/ui";
import { DogProfileData, StepErrors } from "../../model/types";

interface DogNameStepProps {
  data: DogProfileData;
  errors: StepErrors;
  onUpdate: (updates: Partial<DogProfileData>) => void;
}

export const DogNameStep: React.FC<DogNameStepProps> = ({
  data,
  errors,
  onUpdate,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Text variant="bold-24" tag="h1" className="mb-2 text-center">
          {t("Как зовут вашего питомца?")}
        </Text>
      </div>

      <Input
        placeholder={t("Имя питомца")}
        value={data.name}
        maxLength={30}
        error={errors.name}
        onInput={(value) => {
          onUpdate({
            name: value.charAt(0).toUpperCase() + value.slice(1),
          });
        }}
      />
    </div>
  );
};