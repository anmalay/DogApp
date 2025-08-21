import React, { useRef, useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';

export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  className?: string;
  disabled?: boolean;
}

export const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
  className,
  disabled = false,
}) => {
  const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? min);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const currentValue = value ?? internalValue;

  const updateValue = useCallback((newValue: number) => {
    const clampedValue = Math.min(max, Math.max(min, newValue));
    const steppedValue = Math.round(clampedValue / step) * step;
    
    if (value === undefined) {
      setInternalValue(steppedValue);
    }
    onChange?.(steppedValue);
  }, [min, max, step, value, onChange]);

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = event.clientX - rect.left;
    const percentage = x / rect.width;
    const newValue = min + percentage * (max - min);
    updateValue(newValue);
  }, [disabled, min, max, updateValue]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isDragging || disabled) return;
    
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = event.clientX - rect.left;
    const percentage = Math.min(1, Math.max(0, x / rect.width));
    const newValue = min + percentage * (max - min);
    updateValue(newValue);
  }, [isDragging, disabled, min, max, updateValue]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const percentage = ((currentValue - min) / (max - min)) * 100;

  return (
    <div className={classNames('relative w-full', className)}>
      <div
        ref={sliderRef}
        className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
        onMouseDown={handleMouseDown}
        style={{
          background: '#E5E7EB',
          height: '8px',
          borderRadius: '4px',
        }}
      >
        {/* Progress track */}
        <div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{
            width: `${percentage}%`,
            background: '#10B981',
            height: '8px',
            borderRadius: '4px',
          }}
        />
        
        {/* Thumb */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
          style={{
            left: `${percentage}%`,
            width: '20px',
            height: '20px',
            background: '#FFFFFF',
            border: '2px solid #10B981',
            borderRadius: '50%',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            cursor: disabled ? 'not-allowed' : 'grab',
          }}
        />
      </div>
    </div>
  );
};