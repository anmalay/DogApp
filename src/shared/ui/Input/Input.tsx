import React, { useState } from "react";
import classNames from "classnames";

export interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string | number;
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "date";
  size?: "full" | "small";
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  maxLength?: number;
  onInput?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value = "",
  type = "text",
  size = "full",
  disabled = false,
  required = false,
  error = false,
  errorMessage,
  helperText,
  maxLength,
  onInput,
  onBlur,
  onFocus,
  className,
}) => {
  const [focused, setFocused] = useState(false);

  const hasValue = value !== "" && value !== undefined && value !== null;

  const handleFocus = () => {
    setFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setFocused(false);
    onBlur?.();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onInput?.(newValue);
  };

  // Determine input state for styling
  const getInputClasses = () => {
    const baseClasses = [
      "font-normal",
      "bg-cool-white",
      "transition-all",
      "duration-200",
      "border-0",
      "outline-none",
    ];

    // Size classes
    if (size === "full") {
      baseClasses.push("w-full");
    } else {
      baseClasses.push("w-auto");
    }

    // State-based styling
    if (error) {
      baseClasses.push("outline", "outline-1", "outline-cool-red", "text-cool-dark");
    } else if (focused) {
      baseClasses.push("outline", "outline-1", "outline-cool-light-viola", "text-cool-dark");
    } else if (required && !hasValue) {
      baseClasses.push("outline", "outline-1", "outline-cool-viola", "text-cool-dark-gray");
    } else if (hasValue) {
      // Filled state
      baseClasses.push("text-cool-dark");
    } else {
      // Default state
      baseClasses.push("text-cool-dark-gray");
    }

    if (disabled) {
      baseClasses.push("opacity-50", "cursor-not-allowed");
    }

    return classNames(baseClasses);
  };

  return (
    <div className={classNames("flex flex-col", className)}>
      {label && (
        <label className="block text-sm font-medium text-cool-dark mb-2">
          {label}
          {required && <span className="text-cool-red ml-1">*</span>}
        </label>
      )}
      
      <div className={classNames("flex flex-col", { "gap-1.5": error && errorMessage })}>
        <input
          type={type}
          value={value}
          placeholder={focused ? "" : placeholder}
          disabled={disabled}
          maxLength={maxLength}
          onChange={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={getInputClasses()}
          style={{
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '21px',
            padding: '20px',
            height: '64px',
            borderRadius: '16px',
          }}
        />

        {/* Error message */}
        {error && errorMessage && (
          <span 
            className="text-cool-red font-normal"
            style={{
              fontSize: '14px',
              lineHeight: '18px',
              fontWeight: 400,
            }}
          >
            {errorMessage}
          </span>
        )}
      </div>

      {/* Helper text (only show if no error) */}
      {helperText && !error && (
        <span className="text-sm text-cool-dark-gray font-normal mt-2">
          {helperText}
        </span>
      )}
    </div>
  );
};