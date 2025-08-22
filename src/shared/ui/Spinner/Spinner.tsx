import React from "react";
import classNames from "classnames";

export interface SpinnerProps {
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "white";
  className?: string;
}

const sizeStyles = {
  small: "w-4 h-4 border-2",
  medium: "w-8 h-8 border-2",
  large: "w-12 h-12 border-4",
};

const colorStyles = {
  primary: "border-primary border-t-transparent",
  secondary: "border-secondary border-t-transparent",
  white: "border-white border-t-transparent",
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = "medium",
  color = "primary",
  className,
}) => {
  const spinnerClasses = classNames(
    "animate-spin rounded-full",
    sizeStyles[size],
    colorStyles[color],
    className
  );

  return <div className={spinnerClasses} />;
};