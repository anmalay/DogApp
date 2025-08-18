// src/widgets/layout/ui/AppFooter/AppFooter.tsx
import React, { FC } from "react";
import {
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonBadge,
} from "@ionic/react";
import {
  homeOutline,
  home,
  mapOutline,
  map,
  addCircleOutline,
  addCircle,
  personOutline,
  person,
  heartOutline,
  heart,
} from "ionicons/icons";
import { useLocation, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import cn from "classnames";

interface TabConfig {
  path: string;
  icon: string;
  iconActive: string;
  label: string;
  badge?: number;
}

export const AppFooter: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();

  const tabs: TabConfig[] = [
    {
      path: "/activities",
      icon: homeOutline,
      iconActive: home,
      label: t("Home"),
    },
    {
      path: "/favorites",
      icon: heartOutline,
      iconActive: heart,
      label: t("Favorites"),
    },
    {
      path: "/activity/create",
      icon: addCircleOutline,
      iconActive: addCircle,
      label: t("Create"),
    },
    {
      path: "/map",
      icon: mapOutline,
      iconActive: map,
      label: t("Map"),
    },
    {
      path: "/profile",
      icon: personOutline,
      iconActive: person,
      label: t("Profile"),
      badge: 0, // TODO: implement badge count
    },
  ];

  const isActive = (path: string) => {
    if (path === "/activities" && location.pathname === "/") return true;
    return location.pathname.startsWith(path);
  };

  const handleTabClick = (path: string) => {
    history.push(path);
  };

  return (
    <IonTabBar
      slot="bottom"
      className="border-t border-gray-200"
      style={{
        "--background": "white",
        height: "56px",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {tabs.map((tab) => {
        const active = isActive(tab.path);
        const isCreate = tab.path === "/activity/create";

        return (
          <IonTabButton
            key={tab.path}
            tab={tab.path}
            onClick={() => handleTabClick(tab.path)}
            className={cn("relative", isCreate && "transform scale-110")}
          >
            <IonIcon
              icon={active ? tab.iconActive : tab.icon}
              className={cn(
                "text-2xl transition-all duration-200",
                active
                  ? isCreate
                    ? "text-[var(--ion-color-tertiary)]"
                    : "text-[var(--ion-color-primary)]"
                  : "text-gray-400"
              )}
            />
            <IonLabel
              className={cn(
                "text-[10px] mt-1 font-medium transition-all duration-200",
                active
                  ? isCreate
                    ? "text-[var(--ion-color-tertiary)]"
                    : "text-[var(--ion-color-primary)]"
                  : "text-gray-400"
              )}
            >
              {tab.label}
            </IonLabel>
            {tab.badge !== undefined && tab.badge > 0 && (
              <IonBadge
                color="danger"
                className="absolute -top-1 right-4 min-w-[16px] h-[16px] text-[9px] flex items-center justify-center rounded-full"
              >
                {tab.badge}
              </IonBadge>
            )}
          </IonTabButton>
        );
      })}
    </IonTabBar>
  );
};
