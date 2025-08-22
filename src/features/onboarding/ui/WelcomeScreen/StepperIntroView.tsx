import React from "react";
import { Button } from "@shared/ui";

interface StepperIntroViewProps {
  onNext: () => void;
  onSkip: () => void;
}

export const StepperIntroView: React.FC<StepperIntroViewProps> = ({
  onNext,
  onSkip,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6 text-center flex-1 flex flex-col justify-center">
        <div className="space-y-6">
          <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
            <div className="text-4xl">🐕</div>
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-text-primary">
              Расскажите о своей собаке
            </h1>
            <p className="text-text-secondary">
              Это поможет найти подходящих друзей для прогулок
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <Button
          variant="primary"
          size="large"
          fullWidth
          onClick={onNext}
        >
          Создать профиль
        </Button>

        <Button
          variant="outline"
          size="large"
          fullWidth
          onClick={onSkip}
        >
          Заполнить позже
        </Button>
      </div>
    </div>
  );
};