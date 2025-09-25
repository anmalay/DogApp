import React from "react";
import classNames from "classnames";

export interface TagProps {
  children: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  size?: "small" | "medium";
  variant?: "default" | "accent" | "outline";
  onClick?: () => void;
  className?: string;
  hasError?: boolean;
}

export const Tag: React.FC<TagProps> = ({
  children,
  selected = false,
  disabled = false,
  icon,
  size = "medium",
  variant = "default",
  onClick,
  className,
  hasError = false,
}) => {
  const getTagClasses = () => {
    const baseClasses = [
      "inline-flex",
      "items-center",
      "justify-center",
      "rounded-[96px]",
      "font-normal",
      "font-sans",
      "transition-all",
      "duration-200",
      "cursor-pointer",
      "overflow-hidden",
    ];

    // Size classes
    if (size === "small") {
      baseClasses.push("px-3", "py-2", "text-sm", "font-medium");
    } else {
      baseClasses.push("h-12", "px-5", "py-3.5", "text-base");
    }

    // Gap for icon
    if (icon) {
      baseClasses.push("gap-2");
    }

    // Variant and state classes using Tailwind theme classes
    if (disabled) {
      baseClasses.push("bg-background-secondary", "text-text-muted", "cursor-not-allowed");
    } else if (selected) {
      if (variant === "accent") {
        baseClasses.push("bg-warning", "text-text-on-primary");
      } else {
        baseClasses.push("bg-primary", "text-text-on-primary");
      }
    } else {
      if (variant === "outline") {
        baseClasses.push(
          "bg-transparent",
          "text-text-muted",
          "border",
          "border-border"
        );
      } else {
        baseClasses.push("bg-surface", "text-text-primary", "hover:bg-background-secondary");
      }
    }

    return classNames(baseClasses);
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const getBorderStyle = () => {
    if (hasError && !selected) {
      return {
        border: "1px solid var(--color-info)",
      };
    }
    return {};
  };

  return (
    <div
      className={classNames(getTagClasses(), className)}
      style={getBorderStyle()}
      onClick={handleClick}
    >
      {icon && (
        <div className={size === "small" ? "w-4 h-4" : "w-5 h-5"}>
          {icon}
        </div>
      )}
      <span>{children}</span>
    </div>
  );
};