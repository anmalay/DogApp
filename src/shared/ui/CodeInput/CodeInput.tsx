import React, { useRef, useEffect, useState } from 'react';
import { IonInput } from '@ionic/react';

export interface CodeInputProps {
  length?: number;
  onComplete?: (code: string) => void;
  onCodeChange?: (code: string) => void;
  className?: string;
  disabled?: boolean;
}

export const CodeInput: React.FC<CodeInputProps> = ({
  length = 4,
  onComplete,
  onCodeChange,
  className = '',
  disabled = false,
}) => {
  const [values, setValues] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<(HTMLIonInputElement | null)[]>([]);

  const handleInputChange = (value: string | null | undefined, index: number) => {
    const stringValue = value?.toString() || '';
    const digit = stringValue.replace(/[^0-9]/g, '').slice(-1);

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
    <div className={`inline-flex justify-center items-start gap-1 ${className}`}>
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className={`w-16 h-16 p-5 bg-white rounded-2xl ${
            values[index]
              ? 'outline outline-1 outline-offset-[-1px] outline-violet-500'
              : 'border border-gray-200'
          } inline-flex flex-col justify-center items-center gap-5 overflow-hidden`}
          onClick={() => !disabled && focusFirstEmptyInput()}
        >
          <IonInput
            ref={(el) => (inputRefs.current[index] = el)}
            value={values[index]}
            onIonInput={(e) => handleInputChange(e.detail.value, index)}
            onKeyDown={(e) => handleKeyDown(e.nativeEvent, index)}
            type="tel"
            inputmode="numeric"
            maxlength={1}
            disabled={disabled}
            className="text-center text-base font-normal text-gray-700"
            style={{
              '--color': values[index] ? '#374151' : '#64748b',
              '--placeholder-color': '#94a3b8',
              textAlign: 'center',
            }}
          />
        </div>
      ))}
    </div>
  );
};