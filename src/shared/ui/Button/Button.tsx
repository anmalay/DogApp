// shared/ui/Button/Button.tsx
import React, { FC } from "react";
import { IonButton, IonIcon, IonSpinner } from "@ionic/react";
import cn from "classnames";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "tertiary";
export type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  expand?: "block" | "full";
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  iconPosition?: "start" | "end" | "icon-only";
  className?: string;
  onClick?: (() => void) | ((e: React.MouseEvent) => void);
  children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "font-medium border border-transparent transition-all",
  secondary:
    "font-medium border border-gray-300 transition-all hover:border-gray-400",
  outline: "font-medium border transition-all",
  ghost: "font-medium transition-all",
  danger: "font-medium border border-transparent transition-all",
  tertiary: "font-medium border border-transparent transition-all",
};

const variantCssVars: Record<
  ButtonVariant,
  React.CSSProperties & { [key: string]: string }
> = {
  primary: {
    "--background":
      "linear-gradient(135deg, var(--ion-color-primary) 0%, var(--ion-color-secondary) 100%)",
    "--color": "var(--ion-color-primary-contrast)",
    "--border-radius": "12px",
    "--box-shadow": "none",
  },
  secondary: {
    "--background": "#ffffff",
    "--color": "var(--ion-color-dark)",
    "--border-radius": "12px",
    "--box-shadow": "none",
  },
  outline: {
    "--background": "transparent",
    "--color": "var(--ion-color-primary)",
    "--border-color": "var(--ion-color-primary)",
    "--border-radius": "12px",
    "--box-shadow": "none",
  },
  ghost: {
    "--background": "transparent",
    "--color": "var(--ion-color-dark)",
    "--border-radius": "12px",
    "--box-shadow": "none",
  },
  danger: {
    "--background": "var(--ion-color-danger)",
    "--color": "var(--ion-color-danger-contrast)",
    "--border-radius": "12px",
    "--box-shadow": "none",
  },
  tertiary: {
    "--background": "var(--ion-color-tertiary)",
    "--color": "var(--ion-color-tertiary-contrast)",
    "--border-radius": "12px",
    "--box-shadow": "none",
  },
};

const sizeClasses: Record<ButtonSize, string> = {
  small: "h-9 text-sm",
  medium: "h-12",
  large: "h-14 text-lg",
};

export const Button: FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  expand,
  disabled = false,
  loading = false,
  icon,
  iconPosition = "start",
  className,
  onClick,
  children,
}) => {
  const fill =
    variant === "outline" ? "outline" : variant === "ghost" ? "clear" : "solid";

  return (
    <IonButton
      expand={expand}
      fill={fill}
      disabled={disabled || loading}
      className={cn(
        variantStyles[variant],
        sizeClasses[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      style={variantCssVars[variant]}
      onClick={onClick}
    >
      {loading ? (
        <IonSpinner />
      ) : (
        <>
          {icon && iconPosition === "icon-only" ? (
            <IonIcon icon={icon} slot="icon-only" />
          ) : (
            <>
              {icon && iconPosition === "start" && (
                <IonIcon icon={icon} slot="start" />
              )}
              {children}
              {icon && iconPosition === "end" && (
                <IonIcon icon={icon} slot="end" />
              )}
            </>
          )}
        </>
      )}
    </IonButton>
  );
};
