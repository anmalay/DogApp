import React from "react";
import { DogProfileData, StepErrors } from "../../model/types";

interface DogCharacterStepProps {
  data: DogProfileData;
  errors: StepErrors;
  onUpdate: (updates: Partial<DogProfileData>) => void;
}

export const DogCharacterStep: React.FC<DogCharacterStepProps> = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Характер</h1>
        <p className="text-gray-600">Step content to be implemented</p>
      </div>
    </div>
  );
};