import React, { FC } from "react";
import { IonIcon } from "@ionic/react";

interface InfoBlockProps {
  icon: string;
  label: string;
  value: string | React.ReactNode;
  subValue?: string | React.ReactNode;
  color?: string;
}

export const InfoBlock: FC<InfoBlockProps> = ({
  icon,
  label,
  value,
  subValue,
  color = "var(--ion-color-primary)",
}) => {
  return (
    <div className="flex items-start gap-3">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: `${color.replace(")", "-rgb)")}1a`,
        }}
      >
        <IonIcon icon={icon} className="text-lg" style={{ color }} />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-600">{label}</p>
        <p className="font-medium text-gray-900">{value}</p>
        {subValue && (
          <div className="text-sm text-gray-600 mt-1">{subValue}</div>
        )}
      </div>
    </div>
  );
};
