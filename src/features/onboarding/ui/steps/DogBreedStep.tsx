import React, { useState } from "react";
import { TagRadioGroup, TagRadioOption, Input } from "@shared/ui";
import { DogProfileData, StepErrors } from "../../model/types";

const mockBreeds = [
  "Лабрадор",
  "Немецкая овчарка",
  "Золотистый ретривер",
  "Французский бульдог",
  "Бульдог",
  "Пудель",
  "Бигль",
  "Ротвейлер",
  "Йоркширский терьер",
  "Далматин",
];

interface DogBreedStepProps {
  data: DogProfileData;
  errors: StepErrors;
  onUpdate: (updates: Partial<DogProfileData>) => void;
}

export const DogBreedStep: React.FC<DogBreedStepProps> = ({
  data,
  errors,
  onUpdate,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const filteredBreeds = mockBreeds.filter(breed =>
    breed.toLowerCase().includes(searchValue.toLowerCase())
  );

  const breedOptions: TagRadioOption[] = filteredBreeds.map(breed => ({
    value: breed,
    label: breed,
  }));

  const handleBreedChange = (value: string) => {
    onUpdate({ breed: value });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-cool-dark mb-2 font-sans">Порода</h1>
      </div>

      <Input
        placeholder="Начните вводить породу"
        value={searchValue}
        onInput={setSearchValue}
      />

      <TagRadioGroup
        options={breedOptions}
        value={data.breed || ""}
        onChange={handleBreedChange}
        size="medium"
        className="justify-center"
      />

      {errors.breed && (
        <p className="text-cool-red text-sm text-center">
          Пожалуйста, выберите породу питомца
        </p>
      )}
    </div>
  );
};