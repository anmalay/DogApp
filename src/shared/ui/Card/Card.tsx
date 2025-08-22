import React from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from "@ionic/react";
import classNames from "classnames";

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  variant?: "default" | "elevated" | "outlined";
  padding?: "none" | "small" | "medium" | "large";
  onClick?: () => void;
  className?: string;
}

const variantStyles = {
  default: "bg-surface shadow-sm",
  elevated: "bg-surface shadow-lg",
  outlined: "bg-surface border-2 border-border shadow-none",
};

const paddingStyles = {
  none: "",
  small: "p-3",
  medium: "p-4",
  large: "p-6",
};

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  variant = "default",
  padding = "medium",
  onClick,
  className,
}) => {
  const cardClasses = classNames(
    "rounded-xl transition-all duration-200",
    variantStyles[variant],
    {
      "cursor-pointer hover:shadow-md transform hover:-translate-y-1": onClick,
    },
    className
  );

  const hasHeader = title || subtitle;

  return (
    <IonCard className={cardClasses} onClick={onClick}>
      {hasHeader && (
        <IonCardHeader className="pb-2">
          {title && (
            <IonCardTitle className="text-lg font-semibold text-text-primary font-sans">
              {title}
            </IonCardTitle>
          )}
          {subtitle && (
            <IonCardSubtitle className="text-sm text-text-secondary font-sans">
              {subtitle}
            </IonCardSubtitle>
          )}
        </IonCardHeader>
      )}
      
      <IonCardContent className={classNames(paddingStyles[padding], { "pt-0": hasHeader })}>
        {children}
      </IonCardContent>
    </IonCard>
  );
};