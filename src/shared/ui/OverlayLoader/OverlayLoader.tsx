// src/shared/ui/PageLoader/OverlayLoader.tsx
import React, { FC } from "react";
import { IonSpinner } from "@ionic/react";

interface OverlayLoaderProps {
  fullscreen?: boolean;
  message?: string;
}

export const OverlayLoader: FC<OverlayLoaderProps> = ({
  fullscreen = true,
  message,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullscreen ? "h-screen" : "h-full min-h-[400px]"
      }`}
    >
      <div className="relative">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-2xl opacity-20 animate-pulse-slow" />

        {/* Spinner container */}
        <div className="relative bg-white rounded-2xl p-8 shadow-neumorphic">
          <IonSpinner
            name="crescent"
            className="text-[var(--ion-color-primary)] w-12 h-12"
          />
        </div>
      </div>

      {message && (
        <p className="mt-4 text-gray-600 text-sm animate-pulse">{message}</p>
      )}
    </div>
  );
};
