// pages/activity-detail/ui/ActivityDetailPage.tsx
import React, { FC } from "react";
import { IonContent, IonButton, IonIcon, IonSpinner } from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import { heartOutline, heartSharp } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { useApp } from "@shared/hooks";
import { useShare } from "@shared/hooks/useShare";
import { useJoinActivity } from "@features/activity-details/model/useJoinActivity";
import { handleContactMethod } from "@features/activity-details/lib/contactUtils";
import { PageHeader } from "@shared/ui/PageHeader/PageHeader";
import { ShareButton } from "@shared/ui/ShareButton/ShareButton";
import { HeroImage } from "@shared/ui/HeroImage/HeroImage";
import { ActivityDetailContent } from "@widgets/activity-detail/ui/ActivityDetailContent/ActivityDetailContent";
import { ActivityActions } from "@widgets/activity-detail/ui/ActivityActions/ActivityActions";
import { AppLayout } from "@widgets/layout";
import { useGetActivitiesGet } from "@shared/api/generated/activities/activities";
import { useGetUsersGet } from "@shared/api/generated/users/users";
import { useState } from "react";
import { mapActivityFromDto } from "@shared/typings/types";

interface RouteParams {
  id: string;
}

const ActivityDetailPage: FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { id } = useParams<RouteParams>();
  const { user } = useApp();
  const { share } = useShare();
  const [isFavorite, setIsFavorite] = useState(false);

  // Получаем данные активности
  const { data: activityData, isLoading: isLoadingActivity } =
    useGetActivitiesGet({
      Ids: [id],
    });

  const activity = activityData?.items?.[0]
    ? mapActivityFromDto(activityData.items[0])
    : null;

  // Получаем данные организатора
  const { data: organizerData } = useGetUsersGet(
    { Ids: activity?.organizerId ? [activity.organizerId] : [] },
    { query: { enabled: !!activity?.organizerId } }
  );

  const organizer = organizerData?.items?.[0];

  // Управление присоединением к активности
  const { isJoined, isLoading, handleJoin, handleLeave } = useJoinActivity({
    activityId: id,
    requiresApproval: false, // activity?.requiresApproval - временно false
  });

  if (isLoadingActivity) {
    return (
      <AppLayout showBackButton transparentHeader>
        <div className="flex items-center justify-center h-full">
          <IonSpinner />
        </div>
      </AppLayout>
    );
  }

  if (!activity) {
    return (
      <AppLayout showBackButton>
        <div className="flex items-center justify-center h-full">
          <p>{t("Activity not found")}</p>
        </div>
      </AppLayout>
    );
  }

  const isOrganizer = user?.id === activity.organizerId;
  // const isActivityFull = activity.maxParticipants && activity.currentParticipants >= activity.maxParticipants;
  const isActivityFull = false; // TODO: реализовать когда API будет поддерживать

  const handleBack = () => history.goBack();
  const handleEdit = () => history.push(`/activity/${activity.id}/edit`);
  const handleContact = () => {
    if (activity.contacts && activity.contacts.length > 0) {
      const contact = activity.contacts[0];
      if (contact.value) {
        handleContactMethod(contact.value);
      }
    }
  };
  const handleShareActivity = () =>
    share({
      title: activity.title,
      text: activity.description,
    });

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: сохранить в API когда будет поддержка
  };

  return (
    <AppLayout showHeader={false} showFooter={false}>
      <PageHeader
        transparent
        onBack={handleBack}
        actions={<ShareButton onClick={handleShareActivity} />}
      />

      {/* Hero секция */}
      <HeroImage src={activity.imageUrl} alt={activity.title} />

      {/* Контент */}
      <div className="bg-white rounded-t-3xl -mt-6 relative border-t border-gray-200">
        <div className="p-6">
          {/* Кнопка избранного */}
          <div className="absolute top-6 right-6">
            <IonButton
              fill="clear"
              className="text-gray-600"
              onClick={handleToggleFavorite}
            >
              <IonIcon
                icon={isFavorite ? heartSharp : heartOutline}
                className={isFavorite ? "text-red-500" : ""}
              />
            </IonButton>
          </div>

          {/* Основной контент */}
          <ActivityDetailContent
            activity={activity}
            organizer={organizer}
            category={null} // TODO: использовать когда API будет поддерживать категории
            subcategory={null}
            isCurrentUser={isOrganizer}
            onContactOrganizer={handleContact}
          />

          {/* Действия */}
          <div className="mt-8">
            <ActivityActions
              isOrganizer={isOrganizer}
              isJoined={isJoined}
              isFull={isActivityFull}
              requiresApproval={false} // activity.requiresApproval - временно false
              isLoading={isLoading}
              contactMethod={activity.contacts?.[0]?.value || ""}
              onJoin={handleJoin}
              onLeave={handleLeave}
              onEdit={isOrganizer ? handleEdit : undefined}
              onContact={handleContact}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ActivityDetailPage;
