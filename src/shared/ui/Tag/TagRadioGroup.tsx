import React from "react";
import { Tag } from "./Tag";
import classNames from "classnames";

export interface TagRadioOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TagRadioGroupProps {
  options: TagRadioOption[];
  value?: string;
  onChange: (value: string) => void;
  size?: "small" | "medium";
  variant?: "default" | "accent" | "outline";
  className?: string;
}

export const TagRadioGroup: React.FC<TagRadioGroupProps> = ({
  options,
  value,
  onChange,
  size = "medium",
  variant = "default",
  className,
}) => {
  return (
    <div className={classNames("flex flex-wrap gap-2", className)}>
      {options.map((option) => (
        <Tag
          key={option.value}
          selected={value === option.value}
          disabled={option.disabled}
          icon={option.icon}
          size={size}
          variant={variant}
          onClick={() => !option.disabled && onChange(option.value)}
        >
          {option.label}
        </Tag>
      ))}
    </div>
  );
};