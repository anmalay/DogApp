// features/activities-list/model/useActivitiesList.ts
import { ActivityDtoType } from "@shared/api/generated/types";
import { mockExtendedActivities } from "@shared/api/mock/activities.mock";
import { useState, useCallback } from "react";

const ITEMS_PER_PAGE = 10;

export const useActivitiesList = () => {
  const [activities, setActivities] = useState<ActivityDtoType[]>(
    mockExtendedActivities.slice(0, ITEMS_PER_PAGE)
  );
  const [page, setPage] = useState(1);

  const loadMore = useCallback(
    (event: CustomEvent<void>) => {
      setTimeout(() => {
        const nextPage = page + 1;
        const start = nextPage * ITEMS_PER_PAGE;
        const newActivities = mockExtendedActivities.slice(
          start,
          start + ITEMS_PER_PAGE
        );

        setActivities([...activities, ...newActivities]);
        setPage(nextPage);

        (event.target as HTMLIonInfiniteScrollElement).complete();

        if (
          activities.length + newActivities.length >=
          mockExtendedActivities.length
        ) {
          (event.target as HTMLIonInfiniteScrollElement).disabled = true;
        }
      }, 500);
    },
    [activities, page]
  );

  return {
    activities,
    loadMore,
  };
};
