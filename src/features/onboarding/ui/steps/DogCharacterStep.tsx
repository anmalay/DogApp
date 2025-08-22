import React from "react";
import { useTranslation } from "react-i18next";
import { TagRadioGroup, TagCheckboxGroup, TagRadioOption, TagCheckboxOption, Text } from "@shared/ui";
import { DogProfileData, StepErrors } from "../../model/types";

interface DogCharacterStepProps {
  data: DogProfileData;
  errors: StepErrors;
  onUpdate: (updates: Partial<DogProfileData>) => void;
}

export const DogCharacterStep: React.FC<DogCharacterStepProps> = ({
  data,
  onUpdate,
}) => {
  const { t } = useTranslation();
  
  const activityOptions: TagRadioOption[] = [
    { value: "low", label: t("Low") },
    { value: "medium", label: t("Medium") },
    { value: "high", label: t("High") },
  ];

  const genderComfortOptions: TagCheckboxOption[] = [
    { value: "females", label: t("With girls") },
    { value: "males", label: t("With boys") },
  ];

  const sizeComfortOptions: TagCheckboxOption[] = [
    { value: "same_size", label: t("With same size dogs") },
    { value: "small", label: t("With small dogs") },
    { value: "large", label: t("With large dogs") },
  ];

  const handleActivityChange = (value: string) => {
    onUpdate({
      character: {
        ...data.character,
        activity: value as "low" | "medium" | "high",
      },
    });
  };

  const handleGenderComfortChange = (values: string[]) => {
    onUpdate({
      character: {
        ...data.character,
        comfortable_with_gender: values,
      },
    });
  };

  const handleSizeComfortChange = (values: string[]) => {
    onUpdate({
      character: {
        ...data.character,
        comfortable_with_size: values,
      },
    });
  };

  return (
    <div className="self-stretch pb-5 inline-flex flex-col justify-between items-center">
      <div className="self-stretch flex flex-col justify-start items-start gap-10">
        <div className="self-stretch relative flex flex-col justify-start items-center gap-9">
          <Text variant="bold-24" tag="h2" className="self-stretch justify-start">
            {t("Activity")}
          </Text>
          <div className="self-stretch inline-flex justify-start items-start gap-1 flex-wrap content-start">
            <TagRadioGroup
              options={activityOptions}
              value={data.character?.activity || ""}
              onChange={handleActivityChange}
              size="medium"
              className="justify-start"
            />
          </div>
        </div>
        
        <div className="self-stretch flex flex-col justify-start items-center gap-9">
          <Text variant="bold-24" tag="h2" className="self-stretch justify-start">
            {t("Comfortable with")}
          </Text>
          
          <div className="self-stretch flex flex-col justify-start items-start gap-3.5">
            <Text variant="medium-16" className="self-stretch justify-start">
              {t("Gender")}
            </Text>
            <div className="self-stretch inline-flex justify-start items-start gap-1 flex-wrap content-start">
              <TagCheckboxGroup
                options={genderComfortOptions}
                values={data.character?.comfortable_with_gender || []}
                onChange={handleGenderComfortChange}
                size="medium"
                className="justify-start"
              />
            </div>
          </div>
          
          <div className="self-stretch flex flex-col justify-start items-start gap-3.5">
            <Text variant="medium-16" className="self-stretch justify-start">
              {t("Size")}
            </Text>
            <div className="self-stretch inline-flex justify-start items-start gap-1 flex-wrap content-start">
              <TagCheckboxGroup
                options={sizeComfortOptions}
                values={data.character?.comfortable_with_size || []}
                onChange={handleSizeComfortChange}
                size="medium"
                className="justify-start"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};