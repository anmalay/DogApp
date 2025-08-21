import React from "react";
import classNames from "classnames";

export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: "small" | "medium" | "large" | "xlarge";
  variant?: "circular" | "rounded" | "square";
  backgroundColor?: string;
  onClick?: () => void;
  className?: string;
}

const sizeStyles = {
  small: "w-8 h-8 text-sm",
  medium: "w-12 h-12 text-base",
  large: "w-16 h-16 text-lg",
  xlarge: "w-24 h-24 text-xl",
};

const variantStyles = {
  circular: "rounded-full",
  rounded: "rounded-lg",
  square: "rounded-none",
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  initials,
  size = "medium",
  variant = "circular",
  backgroundColor = "bg-gray-300",
  onClick,
  className,
}) => {
  const avatarClasses = classNames(
    "flex items-center justify-center font-semibold text-gray-700 overflow-hidden",
    "transition-transform duration-200",
    sizeStyles[size],
    variantStyles[variant],
    backgroundColor,
    {
      "cursor-pointer hover:scale-105": onClick,
    },
    className
  );

  if (src) {
    return (
      <div className={avatarClasses} onClick={onClick}>
        <img
          src={src}
          alt={alt || "Avatar"}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={avatarClasses} onClick={onClick}>
      {initials || "?"}
    </div>
  );
};