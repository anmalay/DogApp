import React from "react";
import { IonRadio, IonRadioGroup, IonItem, IonLabel } from "@ionic/react";
import classNames from "classnames";

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  name?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  onChange: (value: string) => void;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  name,
  disabled = false,
  error = false,
  helperText,
  onChange,
  className,
}) => {
  const groupClasses = classNames(
    "space-y-2",
    {
      "opacity-50": disabled,
    },
    className
  );

  const handleChange = (e: CustomEvent) => {
    onChange(e.detail.value);
  };

  return (
    <div className="space-y-2">
      <IonRadioGroup
        value={value}
        onIonChange={handleChange}
        className={groupClasses}
      >
        {options.map((option) => (
          <IonItem
            key={option.value}
            className={classNames("rounded-lg border transition-colors", {
              "border-purple-500 bg-purple-50": value === option.value && !error,
              "border-red-500 bg-red-50": error,
              "border-gray-200": value !== option.value && !error,
              "opacity-50 cursor-not-allowed": option.disabled || disabled,
            })}
            lines="none"
            button={!disabled && !option.disabled}
            onClick={() => {
              if (!disabled && !option.disabled) {
                onChange(option.value);
              }
            }}
          >
            <IonRadio
              slot="start"
              value={option.value}
              disabled={disabled || option.disabled}
              color={error ? "danger" : "primary"}
            />
            <IonLabel className={classNames("ml-3", {
              "text-red-600": error,
              "text-gray-800": !error,
            })}>
              {option.label}
            </IonLabel>
          </IonItem>
        ))}
      </IonRadioGroup>

      {helperText && (
        <span className={classNames("text-sm block", {
          "text-red-600": error,
          "text-gray-500": !error,
        })}>
          {helperText}
        </span>
      )}
    </div>
  );
};