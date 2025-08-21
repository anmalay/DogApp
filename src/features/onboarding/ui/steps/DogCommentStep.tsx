import React from "react";
import { Textarea } from "@shared/ui";
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
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Расскажите о питомце
        </h1>
        <p className="text-gray-600">Необязательный шаг</p>
      </div>

      <Textarea
        placeholder="Расскажите, что важно знать другим хозяевам перед прогулкой"
        value={data.comment}
        maxLength={200}
        rows={4}
        showCharCount
        helperText="Поделитесь особенностями характера, привычками или важными деталями"
        onInput={(value) => onUpdate({ comment: value })}
      />
    </div>
  );
};