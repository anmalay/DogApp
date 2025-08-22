import React from "react";
import classNames from "classnames";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
  size?: "small" | "medium" | "large";
  rounded?: boolean;
  className?: string;
}

const variantStyles = {
  primary: "bg-primary/10 text-primary border-primary/20",
  secondary: "bg-secondary/10 text-secondary border-secondary/20",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  error: "bg-error/10 text-error border-error/20",
  info: "bg-info/10 text-info border-info/20",
};

const sizeStyles = {
  small: "px-[8px] py-[4px] text-[12px]",
  medium: "px-[12px] py-[4px] text-[14px]",
  large: "px-[16px] py-[8px] text-[16px]",
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  size = "medium",
  rounded = true,
  className,
}) => {
  const badgeClasses = classNames(
    "inline-flex items-center font-medium border",
    variantStyles[variant],
    sizeStyles[size],
    {
      "rounded-full": rounded,
      "rounded-md": !rounded,
    },
    className
  );

  return <span className={badgeClasses}>{children}</span>;
};