import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { TagRadioGroup, TagRadioOption, Input, Text } from "@shared/ui";
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
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");

  const filteredBreeds = mockBreeds.filter((breed) =>
    breed.toLowerCase().includes(searchValue.toLowerCase())
  );

  const breedOptions: TagRadioOption[] = filteredBreeds.map((breed) => ({
    value: breed,
    label: t(breed),
  }));

  const handleBreedChange = (value: string) => {
    onUpdate({ breed: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <Text variant="bold-24" tag="h1" className="mb-2 text-start">
          {t("Breed")}
        </Text>
      </div>

      <Input
        placeholder={t("Start typing breed")}
        value={searchValue}
        onInput={setSearchValue}
      />

      <TagRadioGroup
        options={breedOptions}
        value={data.breed || ""}
        onChange={handleBreedChange}
        size="medium"
        className="justify-start"
      />

      {errors.breed && (
        <Text variant="medium-14" color="error" className="text-center">
          {t("Please select your pet's breed")}
        </Text>
      )}
    </div>
  );
};
