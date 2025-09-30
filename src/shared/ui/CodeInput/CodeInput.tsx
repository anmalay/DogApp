import React, { useRef, useEffect, useState } from 'react';
import { IonInput } from '@ionic/react';

export interface CodeInputProps {
  length?: number;
  onComplete?: (code: string) => void;
  onCodeChange?: (code: string) => void;
  className?: string;
  disabled?: boolean;
  hasError?: boolean;
  errorMessage?: string;
}

export const CodeInput: React.FC<CodeInputProps> = ({
  length = 4,
  onComplete,
  onCodeChange,
  className = '',
  disabled = false,
  hasError = false,
  errorMessage = '',
}) => {
  const [values, setValues] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<(HTMLIonInputElement | null)[]>([]);

  const handlePastedCode = (pastedDigits: string, startIndex: number = 0) => {
    const newValues = [...values];
    const digits = pastedDigits.slice(0, length);
    
    for (let i = 0; i < digits.length && (startIndex + i) < length; i++) {
      newValues[startIndex + i] = digits[i];
    }
    
    setValues(newValues);
    
    const code = newValues.join('');
    onCodeChange?.(code);
    
    // Focus the next empty input or the last input if all are filled
    const nextEmptyIndex = newValues.findIndex((val, idx) => idx > startIndex && val === '');
    const targetIndex = nextEmptyIndex === -1 ? Math.min(startIndex + digits.length, length - 1) : nextEmptyIndex;
    
    setTimeout(() => {
      inputRefs.current[targetIndex]?.setFocus();
    }, 0);
    
    // Call onComplete if all digits are filled
    if (newValues.every(val => val !== '') && onComplete) {
      onComplete(code);
    }
  };

  const handleInputChange = (value: string | null | undefined, index: number) => {
    const stringValue = value?.toString() || '';
    const digits = stringValue.replace(/[^0-9]/g, '');

    // If multiple digits are pasted, distribute them across inputs
    if (digits.length > 1) {
      handlePastedCode(digits, index);
      return;
    }

    const digit = digits.slice(-1);
    const newValues = [...values];
    newValues[index] = digit;
    setValues(newValues);

    const code = newValues.join('');
    onCodeChange?.(code);

    // Auto-focus next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.setFocus();
    }

    // Call onComplete when all digits are filled
    if (newValues.every(val => val !== '') && onComplete) {
      onComplete(code);
    }
  };

  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.setFocus();
    }
  };

  const handlePaste = (e: ClipboardEvent, index: number) => {
    e.preventDefault();
    const pastedText = e.clipboardData?.getData('text') || '';
    const digits = pastedText.replace(/[^0-9]/g, '');
    
    if (digits.length > 0) {
      handlePastedCode(digits, index);
    }
  };

  const focusFirstEmptyInput = () => {
    const firstEmptyIndex = values.findIndex(val => val === '');
    const targetIndex = firstEmptyIndex === -1 ? length - 1 : firstEmptyIndex;
    inputRefs.current[targetIndex]?.setFocus();
  };

  useEffect(() => {
    // Focus first input on mount
    setTimeout(() => {
      inputRefs.current[0]?.setFocus();
    }, 100);
  }, []);

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div className="inline-flex justify-center items-start gap-1">
        {Array.from({ length }).map((_, index) => (
          <div
            key={index}
            className={`w-16 h-16 p-5 bg-white rounded-2xl ${
              hasError
                ? 'border-2'
                : values[index]
                ? 'outline-1 outline-offset-[-1px] outline-violet-500'
                : 'border border-gray-200'
            } inline-flex flex-col justify-center items-center gap-5 overflow-hidden`}
            style={hasError ? { borderColor: 'var(--color-error)' } : {}}
            onClick={() => !disabled && focusFirstEmptyInput()}
          >
          <IonInput
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            value={values[index]}
            onIonInput={(e) => handleInputChange(e.detail.value, index)}
            onKeyDown={(e) => handleKeyDown(e.nativeEvent, index)}
            onPaste={(e) => handlePaste(e.nativeEvent, index)}
            type="tel"
            inputmode="numeric"
            maxlength={1}
            disabled={disabled}
            className="text-center text-base font-normal text-gray-700"
            style={{
              '--color': hasError ? 'var(--color-error)' : values[index] ? '#374151' : '#64748b',
              '--placeholder-color': '#94a3b8',
              textAlign: 'center',
            }}
          />
        </div>
      ))}
      </div>
      {hasError && errorMessage && (
        <div className="text-sm text-center mt-1" style={{ color: 'var(--color-error)' }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};