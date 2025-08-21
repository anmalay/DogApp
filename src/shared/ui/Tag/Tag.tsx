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

    // Variant and state classes
    if (disabled) {
      baseClasses.push("bg-zinc-100", "text-gray-400", "cursor-not-allowed");
    } else if (selected) {
      if (variant === "accent") {
        baseClasses.push("bg-pink-300", "text-white");
      } else {
        baseClasses.push("bg-gray-700", "text-white");
      }
    } else {
      if (variant === "outline") {
        baseClasses.push(
          "bg-transparent",
          "text-gray-500",
          "outline",
          "outline-1",
          "outline-slate-200"
        );
      } else {
        baseClasses.push("bg-white", "text-gray-700", "hover:bg-gray-50");
      }
    }

    return classNames(baseClasses);
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <div
      className={classNames(getTagClasses(), className)}
      onClick={handleClick}
      style={{
        fontFamily: 'Golos Text',
        lineHeight: size === "small" ? 'normal' : 'tight',
      }}
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