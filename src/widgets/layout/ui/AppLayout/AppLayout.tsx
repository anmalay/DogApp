import React, { FC } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { AppHeader } from "../AppHeader/AppHeader";
import { AppFooter } from "../AppFooter/AppFooter";
import { useLocation } from "react-router-dom";

interface AppLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  showCreateButton?: boolean;
  showBackButton?: boolean;
  headerTitle?: string;
  transparentHeader?: boolean;
  fullscreen?: boolean;
  contentClassName?: string;
}

export const AppLayout: FC<AppLayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  showCreateButton = true,
  showBackButton = false,
  headerTitle,
  transparentHeader = false,
  fullscreen = false,
  contentClassName,
}) => {
  const location = useLocation();

  // Скрываем футер на страницах создания/редактирования
  const hideFooterPaths = [
    // "/activity/create",
    // "/activity/edit",
    // "/profile/edit",
    "/auth",
    "/onboarding",
  ];

  const shouldHideFooter = hideFooterPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <IonPage>
      {showHeader && (
        <AppHeader
          showCreateButton={showCreateButton}
          showBackButton={showBackButton}
          title={headerTitle}
          transparent={transparentHeader}
        />
      )}

      <IonContent fullscreen={fullscreen} className={contentClassName}>
        {children}
      </IonContent>

      {showFooter && !shouldHideFooter && <AppFooter />}
    </IonPage>
  );
};
