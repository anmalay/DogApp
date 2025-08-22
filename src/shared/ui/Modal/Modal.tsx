import React from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonIcon,
} from "@ionic/react";
import { close } from "ionicons/icons";
import classNames from "classnames";

export interface ModalProps {
  isOpen: boolean;
  onDidDismiss: () => void;
  title?: string;
  size?: "small" | "medium" | "large" | "fullscreen";
  showCloseButton?: boolean;
  children: React.ReactNode;
  className?: string;
}

const sizeStyles = {
  small: "max-w-md",
  medium: "max-w-2xl",
  large: "max-w-4xl",
  fullscreen: "max-w-none",
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onDidDismiss,
  title,
  size = "medium",
  showCloseButton = true,
  children,
  className,
}) => {
  const modalClasses = classNames("rounded-t-xl", sizeStyles[size], className);

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
      className={modalClasses}
      breakpoints={size === "fullscreen" ? undefined : [0, 0.25, 0.5, 0.75, 1]}
      initialBreakpoint={size === "fullscreen" ? undefined : 0.75}
    >
      {title && (
        <IonHeader>
          <IonToolbar>
            <IonTitle className="text-lg font-semibold">{title}</IonTitle>
            {showCloseButton && (
              <IonButtons slot="end">
                <IonButton
                  fill="clear"
                  onClick={onDidDismiss}
                  className="text-text-muted hover:text-text-primary"
                >
                  <IonIcon icon={close} />
                </IonButton>
              </IonButtons>
            )}
          </IonToolbar>
        </IonHeader>
      )}

      <IonContent className="p-6">{children}</IonContent>
    </IonModal>
  );
};
