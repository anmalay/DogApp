import React from "react";
import { CheckIcon } from "../icons";

export interface CheckboxProps {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  disabled = false,
  onChange,
  className,
}) => {
  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div 
      data-checked={checked ? "Yes" : "No"}
      className="w-full p-5 bg-white rounded-2xl inline-flex flex-col justify-end items-center gap-5 overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <div className="self-stretch inline-flex justify-start items-center gap-3.5">
        <div className="flex-1 flex justify-start items-center gap-0.5">
          <div className="flex-1 justify-start text-gray-700 text-base font-medium font-['Golos_Text']">
            {label}
          </div>
        </div>
        {checked ? (
          <div data-state="on" className="w-6 h-6 flex justify-center items-center gap-2.5">
            <CheckIcon />
          </div>
        ) : (
          <div data-state="off" className="p-0.5 flex justify-start items-center gap-2.5">
            <div className="w-5 h-5 rounded-full outline outline-1 outline-offset-[-0.50px] outline-slate-500" />
          </div>
        )}
      </div>
    </div>
  );
};