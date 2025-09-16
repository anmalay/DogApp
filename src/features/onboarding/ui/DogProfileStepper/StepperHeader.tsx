import React from "react";

interface StepperHeaderProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
}

export const StepperHeader: React.FC<StepperHeaderProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div 
      className="flex items-center gap-[5px] w-full h-1 py-0.5" 
      data-step={currentStep}
    >
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="flex-1">
          <svg 
            width="100%" 
            height="4" 
            viewBox="0 0 31 4" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <rect 
              width="100%" 
              height="4" 
              rx="2" 
              fill={index < currentStep ? "#3F335A" : "white"}
            />
          </svg>
        </div>
      ))}
    </div>
  );
};