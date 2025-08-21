import React from 'react';

export interface RadioButtonProps {
  label: string;
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  name?: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  checked = false,
  onChange,
  name,
}) => {
  const handleClick = () => {
    onChange?.(value);
  };

  return (
    <div 
      data-checked={checked ? "Yes" : "No"}
      className="w-80 p-5 bg-white rounded-2xl inline-flex flex-col justify-end items-center gap-5 overflow-hidden cursor-pointer"
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
            <div className="w-5 h-5 bg-purple-500 rounded-full" />
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