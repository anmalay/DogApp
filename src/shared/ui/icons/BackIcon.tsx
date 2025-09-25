import React from "react";

export interface BackIconProps {
  className?: string;
  onClick?: () => void;
}

export const BackIcon: React.FC<BackIconProps> = ({ className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-2 bg-white rounded-full shadow-[0px_5px_9px_0px_rgba(66,58,58,0.06)] inline-flex flex-col justify-center items-center gap-2.5 cursor-pointer ${className || ""}`}
    >
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 18.5C14 18.5 8.00001 14.0811 8 12.5C7.99999 10.9188 14 6.5 14 6.5"
          stroke="#3F335A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};