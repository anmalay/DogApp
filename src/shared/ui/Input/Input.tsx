import React, { useState } from "react";
import classNames from "classnames";
import { IonInput } from "@ionic/react";

export interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string | number;
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "date";
  size?: "full" | "small";
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  requiredError?: boolean;
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
  requiredError = false,
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

  // Determine input state for styling
  const getInputClasses = () => {
    const baseClasses = [
      "font-normal",
      "font-sans",
      "bg-background",
      "border-0",
      "outline-none",
      "text-input",
      "leading-[21px]",
      "h-input",
      "rounded-[16px]",
    ];

    // Size classes
    if (size === "full") {
      baseClasses.push("w-full");
    } else {
      baseClasses.push("w-auto");
    }

    // Text color based on state
    if (error || requiredError || focused || hasValue) {
      baseClasses.push("text-text-primary");
    } else {
      baseClasses.push("text-text-muted");
    }

    if (disabled) {
      baseClasses.push("opacity-50", "cursor-not-allowed");
    }

    return classNames(baseClasses);
  };

  // Get border style based on state
  const getBorderStyle = () => {
    const baseStyle = {
      width: size === "full" ? "100%" : "auto",
    };

    if (error && required && !hasValue) {
      // Required field validation error - use info color
      return {
        ...baseStyle,
        border: "1px solid var(--color-info)",
        outline: "none",
      };
    } else if (error) {
      // Other error states - use error color
      return {
        ...baseStyle,
        border: "1px solid var(--color-error)",
        outline: "none",
      };
    } else if (requiredError) {
      return {
        ...baseStyle,
        border: "1px solid var(--color-info)",
        outline: "none",
      };
    } else if (focused) {
      return {
        ...baseStyle,
        border: "none",
        outline: "none",
      };
    } else {
      return {
        ...baseStyle,
        border: "none",
        outline: "none",
      };
    }
  };

  return (
    <div className={classNames("flex flex-col", className)}>
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2 font-sans">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      <div
        className={classNames("flex flex-col", {
          "gap-1.5": error && errorMessage,
        })}
      >
        <div className="relative">
          <IonInput
            type={type}
            value={value}
            placeholder={focused ? "" : placeholder}
            disabled={disabled}
            maxlength={maxLength}
            onIonInput={(e) => onInput?.(e.detail.value!)}
            onIonFocus={handleFocus}
            onIonBlur={handleBlur}
            className={getInputClasses()}
            style={
              {
                fontSize: "16px",
                "--background": "transparent",
                "--padding-start": "20px",
                "--padding-end": "20px",
                paddingLeft: "20px",
                paddingRight: "20px",
                "--padding-top": "20px",
                "--padding-bottom": "20px",
                "--border-width": "0",
                "--border-radius": "0",
                "--box-shadow": "none",
                "--transition": "none",
                "--webkit-transition": "none",
                "--moz-transition": "none",
                "--ms-transition": "none",
                transition: "none",
                "--min-height": "auto",
                "--inner-padding-top": "0",
                "--inner-padding-bottom": "0",
                touchAction: "manipulation",
                WebkitUserSelect: "text",
                userSelect: "text",
                ...getBorderStyle(),
              } as React.CSSProperties
            }
            fill="outline"
          />
        </div>

        {/* Error message */}
        {error && errorMessage && (
          <span className="text-error font-normal text-error-text leading-[18px] font-sans">
            {errorMessage}
          </span>
        )}
      </div>

      {/* Helper text (only show if no error) */}
      {helperText && !error && (
        <span className="text-sm text-text-muted font-normal mt-2 font-sans">
          {helperText}
        </span>
      )}
    </div>
  );
};
