import React from "react";
import { TagRadioGroup, TagRadioOption } from "@shared/ui";
import { DogProfileData, StepErrors } from "../../model/types";

interface DogGenderStepProps {
  data: DogProfileData;
  errors: StepErrors;
  onUpdate: (updates: Partial<DogProfileData>) => void;
}

export const DogGenderStep: React.FC<DogGenderStepProps> = ({
  data,
  errors,
  onUpdate,
}) => {
  const genderOptions: TagRadioOption[] = [
    { value: "male", label: "Мальчик 🐕" },
    { value: "female", label: "Девочка 🐕" },
  ];

  const handleGenderChange = (value: string) => {
    onUpdate({ gender: value as "male" | "female" });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-cool-dark mb-2 font-sans">Пол питомца</h1>
      </div>

      <TagRadioGroup
        options={genderOptions}
        value={data.gender || ""} 
        onChange={handleGenderChange}
        className="justify-center"
      />

      {errors.gender && (
        <p className="text-cool-red text-sm text-center">
          Пожалуйста, выберите пол питомца
        </p>
      )}
    </div>
  );
};