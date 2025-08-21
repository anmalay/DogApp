import React, { useState } from "react";
import classNames from "classnames";

export interface TextareaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  maxLength?: number;
  rows?: number;
  showCharCount?: boolean;
  onInput?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  className?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  placeholder,
  value = "",
  disabled = false,
  required = false,
  error = false,
  errorMessage,
  helperText,
  maxLength,
  rows = 4,
  showCharCount = false,
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

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onInput?.(newValue);
  };

  // Determine textarea state for styling
  const getTextareaClasses = () => {
    const baseClasses = [
      "font-normal",
      "bg-cool-white",
      "w-full", // Textarea is always full width
      "transition-all",
      "duration-200",
      "border-0",
      "outline-none",
      "resize-none",
    ];

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
        <textarea
          value={value}
          placeholder={focused ? "" : placeholder}
          disabled={disabled}
          maxLength={maxLength}
          rows={rows}
          onChange={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={getTextareaClasses()}
          style={{
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '21px',
            padding: '20px',
            minHeight: '124px',
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

      <div className="flex justify-between items-start mt-2">
        <div>
          {/* Helper text (only show if no error) */}
          {helperText && !error && (
            <span className="text-sm text-cool-dark-gray font-normal">
              {helperText}
            </span>
          )}
        </div>

        {/* Character count */}
        {showCharCount && maxLength && (
          <span className="text-sm text-cool-dark-gray font-normal flex-shrink-0 ml-4">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};