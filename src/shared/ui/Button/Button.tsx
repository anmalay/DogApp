import React from "react";
import classNames from "classnames";

export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "disabled";
  shape?: "default" | "round";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  shape = "default",
  size = "medium",
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  onClick,
  type = "button",
  className,
}) => {
  const getButtonClasses = () => {
    const baseClasses = [
      "inline-flex",
      "items-center",
      "justify-center",
      "font-medium",
      "transition-all",
      "duration-200",
      "font-sans",
    ];

    // Shape-specific styles
    if (shape === "round") {
      baseClasses.push("rounded-full");
      // Round buttons are typically icon-only with specific padding
      if (size === "small") {
        baseClasses.push("p-2"); // 8px padding
      } else if (size === "large") {
        baseClasses.push("p-3"); // 12px padding
      } else {
        baseClasses.push("p-2"); // default 8px padding
      }
    } else {
      // Default rectangular buttons
      baseClasses.push("rounded-[59px]");
      if (size === "small") {
        baseClasses.push("h-12", "px-5", "py-3", "text-base");
      } else if (size === "large") {
        baseClasses.push("px-6", "py-5", "text-base");
      } else {
        baseClasses.push("h-12", "px-6", "py-3", "text-base");
      }
    }

    // Width
    if (fullWidth) {
      baseClasses.push("w-full");
    }

    // Variant-specific styles
    if (disabled || variant === "disabled") {
      baseClasses.push("bg-zinc-100", "text-cool-dark-gray", "cursor-not-allowed");
    } else {
      switch (variant) {
        case "primary":
          baseClasses.push("bg-gray-700", "text-white", "hover:bg-gray-800");
          break;
        case "secondary":
          baseClasses.push(
            "bg-white",
            "text-gray-700", 
            "shadow-[0px_5px_9px_0px_rgba(66,58,58,0.06)]",
            "hover:shadow-[0px_7px_12px_0px_rgba(66,58,58,0.08)]"
          );
          break;
        case "outline":
          baseClasses.push(
            "bg-white",
            "text-gray-700",
            "outline",
            "outline-1",
            "outline-slate-200",
            "hover:outline-slate-300"
          );
          break;
        default:
          baseClasses.push("bg-gray-700", "text-white", "hover:bg-gray-800");
      }
    }

    // Gap for icon + text
    if (icon && children && shape !== "round") {
      baseClasses.push("gap-2.5");
    }

    return classNames(baseClasses);
  };

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
          {shape !== "round" && <span>Loading...</span>}
        </div>
      );
    }

    if (shape === "round") {
      // Round buttons typically only show icon
      return icon || children;
    }

    // Default buttons with optional icon
    if (icon && children) {
      return iconPosition === "left" ? (
        <>
          {icon}
          <span>{children}</span>
        </>
      ) : (
        <>
          <span>{children}</span>
          {icon}
        </>
      );
    }

    return icon || <span>{children}</span>;
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={handleClick}
      className={classNames(getButtonClasses(), className)}
      style={{
        fontFamily: 'Golos Text',
      }}
    >
      {renderContent()}
    </button>
  );
};