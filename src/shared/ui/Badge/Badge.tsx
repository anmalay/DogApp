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
  primary: "bg-purple-100 text-purple-800 border-purple-200",
  secondary: "bg-gray-100 text-gray-800 border-gray-200",
  success: "bg-green-100 text-green-800 border-green-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  error: "bg-red-100 text-red-800 border-red-200",
  info: "bg-blue-100 text-blue-800 border-blue-200",
};

const sizeStyles = {
  small: "px-2 py-1 text-xs",
  medium: "px-3 py-1 text-sm",
  large: "px-4 py-2 text-base",
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