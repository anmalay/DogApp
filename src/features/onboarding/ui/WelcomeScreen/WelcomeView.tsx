import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@shared/ui";

interface WelcomeViewProps {
  onNext: () => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({ onNext }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center p-6 h-full">
      <div className="text-center space-y-8 max-w-sm w-full">
        <div className="w-32 h-32 mx-auto bg-primary rounded-full flex items-center justify-center mb-8">
          <div className="text-6xl">🐕</div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-text-primary">
            {t("DogApp")}
          </h1>
          <p className="text-lg text-text-secondary">
            {t("Find friends for your pet")}
          </p>
        </div>

        <div className="space-y-4 w-full">
          <Button variant="primary" size="large" fullWidth onClick={onNext}>
            {t("Create Account")}
          </Button>

          <Button variant="outline" size="large" fullWidth onClick={onNext}>
            {t("Sign In")}
          </Button>
        </div>
      </div>
    </div>
  );
};
