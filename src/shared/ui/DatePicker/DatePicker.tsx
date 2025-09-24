import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export interface DatePickerProps {
  value: { day: number; month: number; year: number };
  onChange: (date: { day: number; month: number; year: number }) => void;
  className?: string;
}

const MONTHS_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const MONTHS_RU = [
  "O=20@O", "D52@0;O", "<0@B0", "0?@5;O", "<0O", "8N=O",
  "8N;O", "023CAB0", "A5=BO1@O", ">:BO1@O", "=>O1@O", "45:01@O"
];

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  className = "",
}) => {
  const { i18n } = useTranslation();
  const isRussian = i18n.language === 'ru';
  const months = isRussian ? MONTHS_RU : MONTHS_EN;

  const [isDragging, setIsDragging] = useState({ day: false, month: false, year: false });
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleScroll = (type: 'day' | 'month' | 'year', element: HTMLDivElement) => {
    const itemHeight = 56;
    const scrollTop = element.scrollTop;
    const centerIndex = Math.round(scrollTop / itemHeight);

    const newValue = { ...value };

    switch (type) {
      case 'day':
        newValue.day = Math.max(1, Math.min(31, centerIndex + 1));
        break;
      case 'month':
        newValue.month = Math.max(1, Math.min(12, centerIndex + 1));
        break;
      case 'year':
        newValue.year = years[Math.max(0, Math.min(years.length - 1, centerIndex))];
        break;
    }

    // Prevent infinite loops by checking if value actually changed
    if (newValue.day !== value.day || newValue.month !== value.month || newValue.year !== value.year) {
      onChange(newValue);
    }
  };

  useEffect(() => {
    const scrollToValue = (type: 'day' | 'month' | 'year') => {
      const element = scrollRefs.current[type];
      if (!element || isDragging[type]) return;

      const itemHeight = 56;
      let targetIndex = 0;

      switch (type) {
        case 'day':
          targetIndex = value.day - 1;
          break;
        case 'month':
          targetIndex = value.month - 1;
          break;
        case 'year':
          targetIndex = years.indexOf(value.year);
          if (targetIndex === -1) targetIndex = 0;
          break;
      }

      const targetScrollTop = targetIndex * itemHeight;
      if (Math.abs(element.scrollTop - targetScrollTop) > 5) {
        element.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth',
        });
      }
    };

    const timer = setTimeout(() => {
      scrollToValue('day');
      scrollToValue('month');
      scrollToValue('year');
    }, 100);

    return () => clearTimeout(timer);
  }, [value.day, value.month, value.year, years, isDragging]);

  const renderColumn = (
    type: 'day' | 'month' | 'year',
    items: (string | number)[],
    width: string
  ) => {
    return (
      <div className="flex-1 relative h-72 overflow-hidden">
        <div
          ref={(el) => {
            scrollRefs.current[type] = el;
          }}
          className="h-full overflow-y-auto scrollbar-hide"
          style={{ scrollSnapType: 'y mandatory' }}
          onScroll={(e) => handleScroll(type, e.currentTarget)}
          onMouseDown={() => setIsDragging(prev => ({ ...prev, [type]: true }))}
          onMouseUp={() => setIsDragging(prev => ({ ...prev, [type]: false }))}
          onMouseLeave={() => setIsDragging(prev => ({ ...prev, [type]: false }))}
          onTouchStart={() => setIsDragging(prev => ({ ...prev, [type]: true }))}
          onTouchEnd={() => setIsDragging(prev => ({ ...prev, [type]: false }))}
        >
          {/* Padding items at start */}
          <div className="h-28" />
          
          {items.map((item, index) => {
            // Calculate if this item is selected based on scroll position
            const isSelected = (() => {
              switch (type) {
                case 'day':
                  return item === value.day;
                case 'month':
                  return item === months[value.month - 1];
                case 'year':
                  return item === value.year;
                default:
                  return false;
              }
            })();
            
            return (
              <div
                key={`${type}-${item}`}
                className="h-14 flex items-center justify-center scroll-snap-align-center relative z-20"
                style={{ scrollSnapAlign: 'center' }}
              >
                <span className={`${width} text-center text-base font-medium font-['Golos_Text'] ${
                  isSelected ? 'text-gray-700' : 'text-slate-500'
                }`}>
                  {item}
                </span>
              </div>
            );
          })}
          
          {/* Padding items at end */}
          <div className="h-28" />
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full h-72 relative flex flex-col justify-start items-center overflow-hidden ${className}`}>
      <div className="flex justify-between items-center w-full h-full relative">
        {renderColumn('day', days, 'w-7')}
        {renderColumn('month', months, 'w-24')}
        {renderColumn('year', years, 'w-12')}
      </div>

      {/* Selection highlight overlay spanning full component width */}
      <div className="absolute top-1/2 left-0 right-0 h-14 -translate-y-1/2 bg-white rounded-2xl pointer-events-none z-10" />

      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-14 bg-gradient-to-b from-zinc-100 to-zinc-100/0 pointer-events-none z-30" />
      <div className="absolute bottom-0 left-0 w-full h-14 bg-gradient-to-b from-zinc-100/0 to-zinc-100 pointer-events-none z-30" />
    </div>
  );
};