// src/shared/ui/EmptyState/EmptyState.tsx
import React, { FC } from "react";
import { IonIcon } from "@ionic/react";
import { Button } from "../Button/Button";
import cn from "classnames";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState: FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center px-6 py-12",
        className
      )}
    >
      {icon && (
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <IonIcon icon={icon} className="text-4xl text-gray-400" />
        </div>
      )}

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>

      {description && (
        <p className="text-sm text-gray-500 mb-6 max-w-sm">{description}</p>
      )}

      {action && (
        <Button variant="primary" size="medium" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
};
