import React from "react";
import { CheckIcon } from "../icons";
import classNames from "classnames";

export interface CheckboxProps {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  disabled = false,
  onChange,
  className = "",
}) => {
  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const containerClasses = classNames(
    "w-full",
    "p-5",
    "rounded-2xl",
    "inline-flex",
    "flex-col",
    "justify-end",
    "items-center",
    "gap-5",
    "overflow-hidden",
    "bg-surface",
    "text-text-primary",
    "font-sans",
    {
      "cursor-pointer": !disabled,
      "cursor-not-allowed": disabled,
    },
    className
  );

  const circleClasses = classNames(
    "w-5",
    "h-5",
    "rounded-full",
    "border",
    "border-border"
  );

  return (
    <div 
      data-checked={checked ? "Yes" : "No"}
      className={containerClasses}
      onClick={handleClick}
    >
      <div className="self-stretch inline-flex justify-start items-center gap-3.5">
        <div className="flex-1 flex justify-start items-center gap-0.5">
          <div className="flex-1 justify-start text-base font-medium">
            {label}
          </div>
        </div>
        {checked ? (
          <div data-state="on" className="w-6 h-6 flex justify-center items-center gap-2.5">
            <CheckIcon />
          </div>
        ) : (
          <div data-state="off" className="p-0.5 flex justify-start items-center gap-2.5">
            <div className={circleClasses} />
          </div>
        )}
      </div>
    </div>
  );
};