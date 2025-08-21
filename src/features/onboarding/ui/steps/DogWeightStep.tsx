import React from "react";
import { Slider } from "@shared/ui";
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
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-cool-dark mb-2 font-sans">Вес питомца</h1>
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
          <div className="text-gray-700 text-base font-medium font-['Golos_Text']">
            {data.weight || 1} кг
          </div>
        </div>
      </div>
    </div>
  );
};