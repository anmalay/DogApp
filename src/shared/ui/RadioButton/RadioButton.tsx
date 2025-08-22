import React from 'react';
import classNames from 'classnames';

export interface RadioButtonProps {
  label: string;
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  name?: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  checked = false,
  onChange,
}) => {
  const handleClick = () => {
    onChange?.(value);
  };

  const containerClasses = classNames(
    "w-80",
    "p-5",
    "bg-surface",
    "rounded-2xl",
    "inline-flex",
    "flex-col",
    "justify-end",
    "items-center",
    "gap-5",
    "overflow-hidden",
    "cursor-pointer"
  );

  const labelClasses = classNames(
    "flex-1",
    "justify-start",
    "text-text-primary",
    "text-base",
    "font-medium",
    "font-sans"
  );

  const checkedCircleClasses = classNames(
    "w-5",
    "h-5",
    "bg-primary",
    "rounded-full"
  );

  const uncheckedCircleClasses = classNames(
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
          <div className={labelClasses}>
            {label}
          </div>
        </div>
        {checked ? (
          <div data-state="on" className="w-6 h-6 flex justify-center items-center gap-2.5">
            <div className={checkedCircleClasses} />
          </div>
        ) : (
          <div data-state="off" className="p-0.5 flex justify-start items-center gap-2.5">
            <div className={uncheckedCircleClasses} />
          </div>
        )}
      </div>
    </div>
  );
};