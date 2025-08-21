import React from "react";
import { Input } from "@shared/ui";
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
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Как зовут вашего питомца?
        </h1>
      </div>

      <Input
        placeholder="Имя питомца"
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