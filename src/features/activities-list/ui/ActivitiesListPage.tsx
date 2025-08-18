// pages/activities-list/ui/ActivitiesListPage.tsx
import React, { FC } from "react";
import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApp } from "@shared/hooks";
import { useActivitiesFilters } from "@features/activities-list/model/useActivitiesFilters";
import { QuickFilters } from "@widgets/activity-list/ui/activity-filters/QuickFilters/QuickFilters";
import { getCategoryById } from "@shared/config/categories";
import { ActivityCard } from "@entities/activity-list/ui/ActivityCard/ActivityCard";
import { AppLayout } from "@widgets/layout";
import { useGetActivitiesGetInfinite } from "@shared/api/generated/activities/activities";
import { ActivityCardSkeleton } from "@entities/activity-list/ui/ActivityCardSkeleton/ActivityCardSkeleton";
import { EmptyState } from "@shared/ui/EmptyState/EmptyState";
import { RefresherEventDetail } from "@ionic/react";
import { sadOutline } from "ionicons/icons";
import { ActivityDtoType } from "@shared/api/generated/types";
import { mapActivityFromDto } from "@shared/typings/types";

export const ActivitiesListPage: FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { user } = useApp();

  // Фильтры
  const {
    selectedDateFilter,
    showFreeOnly,
    showAvailableOnly,
    setSelectedDateFilter,
    setShowFreeOnly,
    setShowAvailableOnly,
  } = useActivitiesFilters();

  // Запрос к API с бесконечной прокруткой
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useGetActivitiesGetInfinite(
    {
      // TODO: добавить фильтры когда API будет поддерживать
      // dateFilter: selectedDateFilter,
      // onlyFree: showFreeOnly,
      // onlyAvailable: showAvailableOnly,
    },
    {
      query: {
        getNextPageParam: (lastPage, pages) => {
          // TODO: реализовать пагинацию когда API будет поддерживать
          return undefined;
        },
      },
    }
  );

  // Объединяем все страницы данных
  const activities: ActivityDtoType[] =
    data?.pages.flatMap((page) => (page.items || []).map(mapActivityFromDto)) ||
    [];

  // Handlers
  const handleActivityClick = (activityId: string) => {
    history.push(`/activity/${activityId}`);
  };

  const handleJoinActivity = (
    e: React.MouseEvent,
    activityId: string,
    requiresApproval: boolean
  ) => {
    e.stopPropagation();
    // TODO: реализовать присоединение к активности
    console.log(
      requiresApproval ? "Request sent" : "Joined activity",
      activityId
    );
  };

  const handleEditActivity = (e: React.MouseEvent, activityId: string) => {
    e.stopPropagation();
    history.push(`/activity/${activityId}/edit`);
  };

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await refetch();
    event.detail.complete();
  };

  const loadMore = async (event: CustomEvent<void>) => {
    if (hasNextPage) {
      await fetchNextPage();
    }
    (event.target as HTMLIonInfiniteScrollElement).complete();
  };

  return (
    <AppLayout>
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent />
      </IonRefresher>

      {/* Quick Filters */}
      <QuickFilters
        selectedDateFilter={selectedDateFilter}
        showFreeOnly={showFreeOnly}
        showAvailableOnly={showAvailableOnly}
        onDateFilterChange={setSelectedDateFilter}
        onFreeToggle={() => setShowFreeOnly(!showFreeOnly)}
        onAvailableToggle={() => setShowAvailableOnly(!showAvailableOnly)}
      />

      {/* Loading State */}
      {isLoading ? (
        <div className="px-5 py-5 space-y-5">
          {[1, 2, 3].map((i) => (
            <ActivityCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          {/* Activities List */}
          {activities.length > 0 ? (
            <div className="px-5 py-5 space-y-5">
              {activities.map((activity) => {
                // TODO: использовать categoryIds когда будет поддержка
                const category = null; // getCategoryById(activity.categoryId);
                const isOrganizer = user?.id === activity.organizerId;

                return (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    category={category}
                    isOrganizer={isOrganizer}
                    onClick={() => handleActivityClick(activity.id || "")}
                    onJoin={
                      (e) => handleJoinActivity(e, activity.id || "", false) // requiresApproval временно false
                    }
                    onEdit={(e) => handleEditActivity(e, activity.id || "")}
                  />
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="h-[60vh] flex items-center justify-center">
              <EmptyState
                icon={sadOutline}
                title={t("No activities found")}
                description={t(
                  "Try changing your filters or create your own activity"
                )}
                action={{
                  label: t("Create Activity"),
                  onClick: () => history.push("/activity/create"),
                }}
              />
            </div>
          )}

          {/* Infinite Scroll */}
          <IonInfiniteScroll onIonInfinite={loadMore} disabled={!hasNextPage}>
            <IonInfiniteScrollContent
              loadingSpinner="crescent"
              loadingText={t("Loading more...")}
            />
          </IonInfiniteScroll>
        </>
      )}
    </AppLayout>
  );
};
