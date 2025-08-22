import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@shared/ui";

interface StepperIntroViewProps {
  onNext: () => void;
  onSkip: () => void;
}

export const StepperIntroView: React.FC<StepperIntroViewProps> = ({
  onNext,
  onSkip,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col h-full">
      <div className="p-6 text-center flex-1 flex flex-col justify-center">
        <div className="space-y-6">
          <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
            <div className="text-4xl">🐕</div>
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-text-primary">
              {t("Tell us about your dog")}
            </h1>
            <p className="text-text-secondary">
              {t("This will help find suitable friends for walks")}
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
{t("Create Profile")}
        </Button>

        <Button
          variant="outline"
          size="large"
          fullWidth
          onClick={onSkip}
        >
{t("Fill Later")}
        </Button>
      </div>
    </div>
  );
};