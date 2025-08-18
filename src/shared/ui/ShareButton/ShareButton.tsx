// shared/ui/ShareButton/ShareButton.tsx
import React, { FC } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { shareOutline } from "ionicons/icons";
import cn from "classnames";
import { Button } from "../Button/Button";

interface ShareButtonProps {
  onClick: () => void;
  variant?: "primary" | "ghost" | "floating";
  size?: "small" | "medium";
  showText?: boolean;
  text?: string;
  className?: string;
}

export const ShareButton: FC<ShareButtonProps> = ({
  onClick,
  variant = "floating",
  size = "medium",
  showText = false,
  text = "Share",
  className,
}) => {
  if (variant === "floating") {
    return (
      <IonButton
        fill="clear"
        className={cn(
          "bg-white/90 border border-white/30 rounded-xl backdrop-blur-sm shadow-sm",
          size === "small" ? "w-9 h-9" : "w-11 h-11",
          className
        )}
        onClick={onClick}
      >
        <IonIcon icon={shareOutline} className="text-gray-900" />
      </IonButton>
    );
  }

  return (
    <Button
      variant={variant === "ghost" ? "ghost" : "outline"}
      size={size}
      icon={shareOutline}
      iconPosition={showText ? "start" : "icon-only"}
      onClick={onClick}
      className={className}
    >
      {showText && text}
    </Button>
  );
};
