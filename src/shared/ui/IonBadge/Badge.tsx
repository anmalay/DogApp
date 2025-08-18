// shared/ui/Badge/Badge.tsx
import React, { FC } from "react";
import { IonBadge } from "@ionic/react";
import cn from "classnames";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "tertiary"
  | "outline";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "text-white",
  secondary: "text-white",
  success: "text-white",
  tertiary: "text-gray-900",
  outline: "border border-gray-200 bg-white text-gray-700",
};

const variantColors: Record<BadgeVariant, string | undefined> = {
  primary: "var(--ion-color-primary)",
  secondary: "var(--ion-color-secondary)",
  success: "var(--ion-color-success)",
  tertiary: "var(--ion-color-tertiary)",
  outline: undefined,
};

export const Badge: FC<BadgeProps> = ({
  variant = "primary",
  children,
  className,
}) => {
  return (
    <IonBadge
      className={cn(
        "px-3 py-1.5 rounded-full text-sm font-medium",
        variantStyles[variant],
        className
      )}
      style={{ backgroundColor: variantColors[variant] }}
    >
      {children}
    </IonBadge>
  );
};
