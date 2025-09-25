import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../Button";

interface StepperNavigationProps {
  onBack: () => void;
  onNext: () => void;
  nextButtonText?: string;
  backButtonText?: string;
  className?: string;
}

export const StepperNavigation: React.FC<StepperNavigationProps> = ({
  onBack,
  onNext,
  nextButtonText,
  backButtonText,
  className = "",
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 w-full flex gap-[10px]  z-10 ${className}`}
      style={{ padding: "0px 16px 40px" }}
    >
      <Button
        variant="outline"
        size="large"
        fullWidth
        onClick={onBack}
        className="text-[#3F335A] bg-white hover:bg-gray-50"
      >
        {backButtonText || t("Back")}
      </Button>

      <Button
        variant="primary"
        size="large"
        fullWidth
        onClick={onNext}
        className="bg-[#3F335A] hover:bg-[#342B47]"
      >
        {nextButtonText || t("Next")}
      </Button>
    </div>
  );
};
