import React from "react";
import { Checkbox } from "@shared/ui";
import { DogProfileData, StepErrors } from "../../model/types";

interface DogHealthStepProps {
  data: DogProfileData;
  errors: StepErrors;
  onUpdate: (updates: Partial<DogProfileData>) => void;
}

export const DogHealthStep: React.FC<DogHealthStepProps> = ({
  data,
  onUpdate,
}) => {
  const handleHealthChange = (key: string, checked: boolean) => {
    onUpdate({
      health: {
        ...data.health,
        [key]: checked,
      },
    });
  };


  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-cool-dark mb-2 font-sans">
          Информация о здоровье
        </h1>
        <p className="text-cool-gray">Необязательный шаг</p>
      </div>

      <div className="space-y-4">
        <Checkbox
          label="Стерилизована"
          checked={data.health.sterilized || false}
          onChange={(checked) => handleHealthChange("sterilized", checked)}
        />
        
        <Checkbox
          label="Вакцинирована"
          checked={data.health.vaccinated || false}
          onChange={(checked) => handleHealthChange("vaccinated", checked)}
        />
        
        <Checkbox
          label="Обработана от паразитов"
          checked={data.health.parasite_treated || false}
          onChange={(checked) => handleHealthChange("parasite_treated", checked)}
        />
      </div>
    </div>
  );
};