import React from "react";
import { Button } from "@shared/ui";

interface VerificationViewProps {
  onVerify: () => void;
  onSkip: () => void;
}

export const VerificationView: React.FC<VerificationViewProps> = ({
  onVerify,
  onSkip,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6 text-center flex-1 flex flex-col justify-center">
        <div className="space-y-6">
          <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <div className="text-4xl">🛡️</div>
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Мы за безопасность
            </h1>
            <p className="text-gray-600">
              Пройдите верификацию, чтобы получить доступ ко всем функциям
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <Button
          variant="primary"
          size="large"
          fullWidth
          onClick={onVerify}
        >
          Пройти верификацию
        </Button>

        <Button
          variant="outline"
          size="large"
          fullWidth
          onClick={onSkip}
        >
          Пройти позже
        </Button>
      </div>
    </div>
  );
};