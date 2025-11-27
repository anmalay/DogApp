import React from "react";
import { useTranslation } from "react-i18next";
import { IonIcon } from "@ionic/react";
import { pawOutline } from "ionicons/icons";
import { Button, Text } from "@shared/ui";

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
            <IonIcon icon={pawOutline} className="text-6xl text-primary" />
          </div>

          <div className="space-y-4">
            <Text variant="bold-24" tag="div" className="text-text-primary">
              {t("Tell us about your dog")}
            </Text>
            <Text variant="regular-16" tag="div" className="text-text-secondary">
              {t("This will help find suitable friends for walks")}
            </Text>
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