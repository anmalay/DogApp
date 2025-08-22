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
      <div className="text-center">
        <Text variant="bold-24" tag="h1" className="mb-2 text-center">
          {t("Расскажите о питомце")}
        </Text>
        <Text variant="medium-14" color="muted" className="text-center">
          {t("Необязательный шаг")}
        </Text>
      </div>

      <Textarea
        placeholder={t("Расскажите, что важно знать другим хозяевам перед прогулкой")}
        value={data.comment}
        maxLength={200}
        rows={4}
        showCharCount
        helperText={t("Поделитесь особенностями характера, привычками или важными деталями")}
        onInput={(value) => onUpdate({ comment: value })}
      />
    </div>
  );
};