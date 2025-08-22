// src/widgets/layout/ui/AppHeader/AppHeader.tsx
import React, { FC } from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonBadge,
} from "@ionic/react";
import {
  addOutline,
  notificationsOutline,
  personCircleOutline,
} from "ionicons/icons";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApp } from "@shared/hooks";
import cn from "classnames";

interface AppHeaderProps {
  showCreateButton?: boolean;
  showBackButton?: boolean;
  title?: string;
  transparent?: boolean;
}

export const AppHeader: FC<AppHeaderProps> = ({
  showCreateButton = true,
  showBackButton = false,
  title,
  transparent = false,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const { user } = useApp();

  const isActivitiesPage = location.pathname === "/activities";
  const notificationCount = 0; // TODO: implement notifications

  const handleCreateActivity = () => {
    history.push("/activity/create");
  };

  const handleProfile = () => {
    history.push("/profile");
  };

  const handleNotifications = () => {
    history.push("/notifications");
  };

  return (
    <IonHeader className={cn(transparent && "ion-no-border")}>
      <IonToolbar
        className={cn("px-2", transparent && "absolute z-10")}
        style={
          transparent
            ? {
                "--background": "transparent",
                "--border-color": "transparent",
              }
            : {
                "--background":
                  "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)",
                "--color": "white",
              }
        }
      >
        {/* Left side */}
        <IonButtons slot="start">
          {showBackButton ? (
            <IonButton
              fill="clear"
              onClick={() => history.goBack()}
              className={cn(
                transparent &&
                  "bg-white/90 border border-white/30 rounded-xl backdrop-blur-sm shadow-sm"
              )}
            >
              <IonIcon icon="chevron-back-outline" />
            </IonButton>
          ) : (
            <IonButton fill="clear" onClick={handleProfile}>
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.firstName}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <IonIcon
                  icon={personCircleOutline}
                  className="text-3xl"
                  style={{ color: transparent ? "var(--color-text-primary)" : "var(--color-text-on-primary)" }}
                />
              )}
            </IonButton>
          )}
        </IonButtons>

        {/* Title */}
        <IonTitle className="text-lg font-semibold">
          {title || (isActivitiesPage ? t("Activities") : "")}
        </IonTitle>

        {/* Right side */}
        <IonButtons slot="end">
          {/* Notifications */}
          <IonButton
            fill="clear"
            onClick={handleNotifications}
            className="relative"
          >
            <IonIcon
              icon={notificationsOutline}
              style={{ color: transparent ? "var(--color-text-primary)" : "var(--color-text-on-primary)" }}
            />
            {notificationCount > 0 && (
              <IonBadge
                color="danger"
                className="absolute -top-1 -right-1 min-w-[18px] h-[18px] text-[10px] flex items-center justify-center rounded-full"
              >
                {notificationCount}
              </IonBadge>
            )}
          </IonButton>

          {/* Create Activity */}
          {showCreateButton && (
            <IonButton
              fill="clear"
              onClick={handleCreateActivity}
              className={cn(
                "ml-1",
                !transparent && "bg-white/20 rounded-xl backdrop-blur-sm"
              )}
            >
              <IonIcon
                icon={addOutline}
                style={{ color: transparent ? "var(--color-text-primary)" : "var(--color-text-on-primary)" }}
              />
            </IonButton>
          )}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};
