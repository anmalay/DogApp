import React from "react";
import { Tag } from "./Tag";
import classNames from "classnames";

export interface TagCheckboxOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TagCheckboxGroupProps {
  options: TagCheckboxOption[];
  values: string[];
  onChange: (values: string[]) => void;
  size?: "small" | "medium";
  variant?: "default" | "accent" | "outline";
  className?: string;
}

export const TagCheckboxGroup: React.FC<TagCheckboxGroupProps> = ({
  options,
  values,
  onChange,
  size = "medium",
  variant = "default",
  className,
}) => {
  const handleToggle = (value: string) => {
    const newValues = values.includes(value)
      ? values.filter(v => v !== value)
      : [...values, value];
    onChange(newValues);
  };

  return (
    <div className={classNames("flex flex-wrap gap-2", className)}>
      {options.map((option) => (
        <Tag
          key={option.value}
          selected={values.includes(option.value)}
          disabled={option.disabled}
          icon={option.icon}
          size={size}
          variant={variant}
          onClick={() => !option.disabled && handleToggle(option.value)}
        >
          {option.label}
        </Tag>
      ))}
    </div>
  );
};