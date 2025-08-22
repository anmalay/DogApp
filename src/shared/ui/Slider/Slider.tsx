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
  label?: string;
  unit?: string;
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
  unit,
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

  const getPositionFromEvent = useCallback((event: MouseEvent | TouchEvent) => {
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return null;
    
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const x = clientX - rect.left;
    const percentage = Math.min(1, Math.max(0, x / rect.width));
    return min + percentage * (max - min);
  }, [min, max]);

  const handleStart = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (disabled) return;
    event.preventDefault();
    setIsDragging(true);
    
    const newValue = getPositionFromEvent(event.nativeEvent as MouseEvent | TouchEvent);
    if (newValue !== null) {
      updateValue(newValue);
    }
  }, [disabled, getPositionFromEvent, updateValue]);

  const handleMove = useCallback((event: MouseEvent | TouchEvent) => {
    if (!isDragging || disabled) return;
    event.preventDefault();
    
    const newValue = getPositionFromEvent(event);
    if (newValue !== null) {
      updateValue(newValue);
    }
  }, [isDragging, disabled, getPositionFromEvent, updateValue]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => handleMove(e);
      const handleTouchMove = (e: TouchEvent) => handleMove(e);
      const handleMouseUp = () => handleEnd();
      const handleTouchEnd = () => handleEnd();
      
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleMove, handleEnd]);

  const percentage = ((currentValue - min) / (max - min)) * 100;

  return (
    <div className={classNames('w-full h-7 inline-flex justify-start items-start gap-6', className)}>
      <div className="flex-1 h-7 relative">
        {/* Background track */}
        <div className="w-full h-[3px] left-0 top-[13px] absolute opacity-50 bg-border rounded-full" />
        
        {/* Progress track */}
        <div
          className="h-[3px] left-0 top-[13px] absolute bg-secondary rounded-full"
          style={{
            width: `${percentage}%`,
          }}
        />
        
        {/* Interactive area */}
        <div
          ref={sliderRef}
          className="absolute inset-0 cursor-pointer touch-none select-none"
          onMouseDown={handleStart}
          onTouchStart={handleStart}
          style={{ touchAction: 'none' }}
        />
        
        {/* Thumb */}
        <div
          className={classNames(
            "absolute top-[2px] transform -translate-x-1/2 z-10",
            {
              "cursor-grab": !disabled && !isDragging,
              "cursor-grabbing": !disabled && isDragging,
              "cursor-not-allowed": disabled,
            }
          )}
          style={{
            left: `${percentage}%`,
          }}
          onMouseDown={handleStart}
          onTouchStart={handleStart}
        >
          <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_622_3090)">
              <circle cx="21.5" cy="16.5" r="12.5" fill="white"/>
              <circle cx="21.5" cy="16.5" r="11" stroke="var(--color-secondary)" strokeWidth="3"/>
            </g>
            <defs>
              <filter id="filter0_d_622_3090" x="0" y="0" width="43" height="43" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="5"/>
                <feGaussianBlur stdDeviation="4.5"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.258824 0 0 0 0 0.227451 0 0 0 0 0.227451 0 0 0 0.06 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_622_3090"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_622_3090" result="shape"/>
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      
      {currentValue && unit && (
        <div className="flex justify-end items-start gap-5">
          <div className="text-text-primary text-base font-medium font-sans">
            {currentValue} {unit}
          </div>
        </div>
      )}
    </div>
  );
};