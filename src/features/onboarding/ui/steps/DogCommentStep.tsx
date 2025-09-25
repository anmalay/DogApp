import React from "react";
import { useTranslation } from "react-i18next";
import { Textarea, Text } from "@shared/ui";
import { DogProfileData, StepErrors } from "../../model/types";

interface DogCommentStepProps {
  data: DogProfileData;
  errors: StepErrors;
  onUpdate: (updates: Partial<DogProfileData>) => void;
}

export const DogCommentStep: React.FC<DogCommentStepProps> = ({
  data,
  onUpdate,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <Text variant="bold-24" tag="h1" className="mb-8  text-start">
        {t("Tell us about your pet")}
      </Text>

      <Textarea
        placeholder={t("Tell what other owners should know before walks")}
        value={data.comment}
        rows={4}
        showCharCount
        onInput={(value) => onUpdate({ comment: value })}
      />
    </div>
  );
};
