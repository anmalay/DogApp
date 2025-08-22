import React from "react";
import { Button } from "@shared/ui";

interface WelcomeViewProps {
  onNext: () => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 h-full">
      <div className="text-center space-y-8 max-w-sm w-full">
        <div className="w-32 h-32 mx-auto bg-primary rounded-full flex items-center justify-center mb-8">
          <div className="text-6xl">🐕</div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-text-primary">DogApp</h1>
          <p className="text-lg text-text-secondary">
            Найдите друзей для своего питомца
          </p>
        </div>

        <div className="space-y-4 w-full">
          <Button
            variant="primary"
            size="large"
            fullWidth
            onClick={onNext}
          >
            Создать аккаунт
          </Button>

          <Button
            variant="outline"
            size="large"
            fullWidth
            onClick={onNext}
          >
            Войти
          </Button>
        </div>
      </div>
    </div>
  );
};