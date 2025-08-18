// shared/ui/PageHeader/PageHeader.tsx
import React, { FC } from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";

interface PageHeaderProps {
  onBack?: () => void;
  actions?: React.ReactNode;
  transparent?: boolean;
}

export const PageHeader: FC<PageHeaderProps> = ({
  onBack,
  actions,
  transparent = false,
}) => {
  const toolbarStyle = transparent
    ? {
        "--background": "transparent",
        "--border-color": "transparent",
      }
    : undefined;

  return (
    <IonHeader className={transparent ? "ion-no-border" : undefined}>
      <IonToolbar
        className={transparent ? "absolute z-10" : undefined}
        style={toolbarStyle}
      >
        {onBack && (
          <IonButtons slot="start">
            <IonButton
              fill="clear"
              className="ml-2 bg-white/90 border border-white/30 rounded-xl backdrop-blur-sm shadow-sm"
              onClick={onBack}
            >
              <IonIcon
                icon={chevronBackOutline}
                className="text-gray-900 text-lg"
              />
            </IonButton>
          </IonButtons>
        )}
        {actions && <IonButtons slot="end">{actions}</IonButtons>}
      </IonToolbar>
    </IonHeader>
  );
};
